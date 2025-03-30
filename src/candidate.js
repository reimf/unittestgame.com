import { Code, Div, Span } from './html.js';
import { TestResult } from './test_result.js';
export class Candidate {
    constructor(lines, indices) {
        this.lines = lines.map(line => line.replace(/\\\\/g, '\\'));
        this.indices = indices;
        const code = lines.join('\n');
        this.function = new Function('return ' + code)();
        this.complexity = this.computeComplexity(code);
    }
    computeComplexity(code) {
        const chunks = code
            .replace(/\n/g, ' ') // simplify white space
            .replace(/\(([^(]*?)\)/g, ' function $1 ') // each function definition/call is 1 extra point
            .replace(/"(.*?)"/g, ' string $1 ') // each string is 1 extra point
            .replace(/\.(?=[a-z])/g, ' ') // each class mention is 1 point
            .replace(/(?<=\d)0+ /g, ' ') // 200 is 1 point
            .replace(/(?<=\d)(?=\d)/g, ' ') // 3199 is 4 points, 3200 only 2
            .replace(/(?<=\d)\.(?=\d)/g, ' dot ') // each float is 1 point extra
            .trim() // remove trailing white space
            .split(/\s+/); // each token is 1 point
        return chunks.length;
    }
    execute(argumentsList) {
        try {
            return this.function(...argumentsList);
        }
        catch (error) {
            return undefined;
        }
    }
    testResults(unitTests) {
        return unitTests.map(unitTest => new TestResult(this, unitTest));
    }
    failingTestResults(unitTests) {
        return this.testResults(unitTests).filter(testResult => !testResult.passes);
    }
    failCount(unitTests) {
        return this.failingTestResults(unitTests).length;
    }
    passCount(unitTests) {
        return unitTests.length - this.failCount(unitTests);
    }
    isAmputeeOf(candidate) {
        return this.indices.every((index, pos) => index === 0 || index === candidate.indices[pos]);
    }
    compareComplexity(candidate) {
        return Math.sign(this.complexity - candidate.complexity);
    }
    toString() {
        return this.lines.join('\n');
    }
    toHtml() {
        return new Code().appendChildren(this.lines.map(line => new Div().text(line)));
    }
    toHtmlWithPrevious(previousCandidate) {
        if (!previousCandidate)
            return this.toHtml();
        const divs = [new Div().text(this.lines[0])];
        let currentLine = 1;
        let previousLine = 1;
        for (let i = 0; i < this.indices.length; i++) {
            const currentIndex = this.indices[i];
            const previousIndex = previousCandidate.indices[i];
            if (currentIndex === 0 && previousIndex === 0)
                continue;
            else if (currentIndex === previousIndex)
                divs.push(new Div().text(this.lines[currentLine]));
            else if (currentIndex === 0)
                divs.push(new Div().text('').appendChild(new Span().text(`// was: ${previousCandidate.lines[previousLine].trim()}`).addClass('comment')).addClass('changed'));
            else if (previousIndex === 0)
                divs.push(new Div().text(this.lines[currentLine]).appendChild(new Span().text('// new').addClass('comment')).addClass('changed'));
            else
                divs.push(new Div().text(this.lines[currentLine]).appendChild(new Span().text(`// was: ${previousCandidate.lines[previousLine].trim()}`).addClass('comment')).addClass('changed'));
            if (currentIndex > 0)
                currentLine++;
            if (previousIndex > 0)
                previousLine++;
        }
        divs.push(new Div().text(this.lines[currentLine]));
        return new Code().appendChildren(divs);
    }
    toHtmlWithCoverage(coveredCandidates) {
        if (coveredCandidates.length === 0)
            return this.toHtml();
        return new Code().appendChildren(this.lines.map(line => {
            const isNotIndented = !line.startsWith('  ');
            const isUsed = coveredCandidates.some(candidate => candidate.lines.includes(line));
            return new Div().text(line).addClass('covered', isNotIndented || isUsed);
        }));
    }
}

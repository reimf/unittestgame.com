import { Code, Div, Span } from './html.js';
import { TestResult } from './test_result.js';
export class Candidate {
    constructor(lines) {
        this.lines = lines.map(line => line.replace(/\\\\/g, '\\'));
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
        return this.lines.every((line, pos) => line === '' || line === candidate.lines[pos]);
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
        const lines = this.lines.reduce((lines, currentLine, pos) => {
            const previousLine = previousCandidate.lines[pos];
            const comment = currentLine === '' && previousLine === '' ? ''
                : currentLine === previousLine ? ''
                    : currentLine === '' ? `// was: ${previousLine.trim()}`
                        : previousLine === '' ? '// new'
                            : `// was: ${previousLine.trim()}`;
            const div = new Div();
            if (currentLine !== '')
                div.text(currentLine);
            if (comment !== '')
                div.appendChild(new Span().text(comment).addClass('comment'));
            return [...lines, div];
        }, []);
        return new Code().appendChildren(lines);
    }
    toHtmlWithCoverage(coveredCandidates) {
        if (coveredCandidates.length === 0)
            return this.toHtml();
        return new Code().appendChildren(this.lines.map((line, pos) => {
            const isNotIndented = !line.startsWith('  ');
            const isUsed = coveredCandidates.some(candidate => candidate.lines[pos] === line);
            return new Div().text(line).addClass('covered', isNotIndented || isUsed);
        }));
    }
}

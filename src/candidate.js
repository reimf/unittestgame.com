import { Code } from './html.js';
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
            .replace(/\((.*?)\)/g, ' () $1 ') // each function call is 1 extra point
            .replace(/"(.*?)"/g, ' "" $1 ') // each string is 1 extra point
            .replace(/\.(?=[a-z])/g, ' ') // each class mention is 1 point
            .replace(/(?<=\d)0+ /g, ' ') // 200 is 1 point
            .replace(/(?<=\d)(?=\d)/g, ' ') // 3199 is 4 points, 3200 only 2
            .replace(/(?<=\d)\.(?=\d)/g, ' . ') // each float is 1 point extra
            .trim() // remove trailing white space
            .split(/\s+/); // each token is 1 point
        return chunks.length;
    }
    execute(argumentsList) {
        try {
            return this.function(...argumentsList);
        }
        catch (error) {
            return error.name;
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
        return this.indices.every((index, i) => index === 0 || index === candidate.indices[i]);
    }
    compareComplexity(candidate) {
        return Math.sign(this.complexity - candidate.complexity);
    }
    toHtml() {
        return new Code().markdown(this.lines.join('\n'));
    }
    toHtmlWithCoverage(coveredCandidates) {
        if (coveredCandidates.length === 0)
            return this.toHtml();
        const covered = this.lines.map(line => {
            const isNotIndented = !line.startsWith('  ');
            const isUsed = coveredCandidates.some(candidate => candidate.lines.includes(line));
            if (isNotIndented || isUsed)
                return `**${line}**`;
            return line;
        });
        return new Code().markdown(covered.join('\n'));
    }
}

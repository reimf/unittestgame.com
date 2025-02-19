import { TestResult } from './test_result.js';
export class Candidate {
    constructor(code) {
        this.code = code;
        this.function = new Function('return ' + code)();
        this.complexity = this.computeComplexity(code);
    }
    computeComplexity(code) {
        const chunks = code.
            replace(/,/g, ' ').
            replace(/;/g, ' ').
            replace(/\((.*?)\)/g, ' () $1 ').
            replace(/\[(.*?)\]/g, ' [] $1 ').
            replace(/\{(.*?)\}/g, ' {} $1 ').
            replace(/(\d)0+ /g, '$1 '). // 199 is more complex than 200
            replace(/(\d)(\d)/g, '$1 $2'). // 199 is more complex than 200
            trim().
            split(/\s+/);
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
    toString() {
        return this.function.toString();
    }
}

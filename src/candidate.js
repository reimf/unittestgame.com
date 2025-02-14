import TestResult from './test_result.js';
export default class Candidate {
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

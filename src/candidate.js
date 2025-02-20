import { TestResult } from './test_result.js';
export class Candidate {
    constructor(code) {
        this.code = code;
        this.function = new Function('return ' + code)();
        this.complexity = this.computeComplexity(code);
    }
    computeComplexity(code) {
        const chunks = code.
            replace(/,/g, ' '). // each argument is 1 point
            replace(/;/g, ' '). // each statement is 1 point
            replace(/\((.*?)\)/g, ' () $1 '). // each function call is 1 extra point
            replace(/\[(.*?)\]/g, ' [] $1 '). // each array index is 1 extra point
            replace(/\{(.*?)\}/g, ' {} $1 '). // each block of commands is 1 extra point
            replace(/\.(?=[a-z])/g, ' . '). // each method call is 1 point
            replace(/(?<=\d)0+ /g, ' '). // 200 is 1 point
            replace(/(?<=\d)(?=\d)/g, ' '). // 3199 is 4 points, 3200 only 2
            replace(/(?<=\d)\.(?=\d)/g, ' . '). // each float is 1 point extra
            trim().
            split(/\s+/); // each token is 1 point
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

"use strict";
class Candidate {
    constructor(code) {
        this.function = new Function('return ' + code)();
    }
    callFunction(argumentsList) {
        try {
            return this.function(...argumentsList);
        }
        catch (error) {
            return error.name;
        }
    }
    complexity() {
        return this.function.toString().length;
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
    toHtml() {
        return new Code().appendText(this.toString());
    }
}

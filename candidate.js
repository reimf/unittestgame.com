"use strict";
class Candidate {
    constructor(code) {
        this.complexity = [];
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
    setComplexity(hints) {
        this.complexity = [this.function.toString().length, this.passCount(hints)];
    }
    simplest(other) {
        return this.complexity < other.complexity ? this : other;
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

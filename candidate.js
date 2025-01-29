"use strict";
class Candidate {
    constructor(code) {
        this.func = new Function("return " + code)();
        this.quality = '';
    }
    callFunc(argumentsList) {
        try {
            return this.func(...argumentsList);
        }
        catch (error) {
            return error.name;
        }
    }
    setQuality(specialUnitTests, generalUnitTests) {
        const elements = [
            this.passCount(specialUnitTests),
            this.passCount(generalUnitTests),
            this.func.toString().length,
        ];
        this.quality = 'quality:' + elements.map(element => element.toString().padStart(4, '0')).join(':');
    }
    static worst(candidateOne, candidateTwo) {
        return candidateOne.quality < candidateTwo.quality ? candidateOne : candidateTwo;
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
    toHtmlElement() {
        const element = document.createElement('p');
        element.innerHTML = this.func.toString();
        return element;
    }
}

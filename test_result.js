"use strict";
class TestResult {
    constructor(candidate, unitTest) {
        this.unitTest = unitTest;
        this.result = candidate.callFunc(unitTest.argumentList);
        this.passes = this.result === unitTest.expected;
    }
    toHtml() {
        return new Paragraph(`${this.unitTest.argumentList} -> ${this.result}`);
    }
}

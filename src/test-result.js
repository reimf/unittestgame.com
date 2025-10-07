export class TestResult {
    unitTest;
    result;
    passes;
    constructor(candidate, unitTest) {
        this.unitTest = unitTest;
        this.result = candidate.execute(unitTest.argumentList);
        this.passes = this.result === unitTest.expected;
    }
    toHtml() {
        return this.unitTest.toHtmlWithResult(this.result);
    }
}

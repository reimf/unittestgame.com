export class TestResult {
    constructor(candidate, unitTest) {
        this.unitTest = unitTest;
        this.result = candidate.execute(unitTest.argumentList);
        this.passes = this.result === unitTest.expected;
    }
    toString() {
        return this.unitTest.toStringWithResult(this.result);
    }
}

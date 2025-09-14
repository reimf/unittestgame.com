export class TestResult {
    unitTest;
    result;
    passes;
    constructor(candidate, unitTest) {
        this.unitTest = unitTest;
        this.result = candidate.execute(unitTest.argumentList);
        this.passes = this.result === unitTest.expected;
    }
    toTranslation() {
        return this.unitTest.toTranslationWithResult(this.result);
    }
}

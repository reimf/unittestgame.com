class TestResult {
    readonly unitTest: UnitTest
    private result: any
    readonly passes: boolean

    public constructor(candidate: Candidate, unitTest: UnitTest) {
        this.unitTest = unitTest
        this.result = candidate.callFunc(unitTest.argumentList)
        this.passes = this.result === unitTest.expected
    }

    public toHtml(): Html {
        return new Paragraph(`${this.unitTest.argumentList} -> ${this.result}`)
    }
}

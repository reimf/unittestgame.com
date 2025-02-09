class TestResult {
    private result: any
    readonly passes: boolean

    public constructor(candidate: Candidate, readonly unitTest: UnitTest) {
        this.unitTest = unitTest
        this.result = candidate.execute(unitTest.argumentList)
        this.passes = this.result === unitTest.expected
    }

    public toString(): string {
        return `${this.unitTest.argumentList} -> ${this.result}`
    }
}

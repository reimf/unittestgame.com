class Candidate {
    private readonly function: Function
    private complexity: number

    public constructor(code: string) {
        this.function = new Function('return ' + code)()
        this.complexity = code.length
    }

    public execute(argumentsList: any[]): any {
        try {
            return this.function(...argumentsList)
        } catch (error: any) {
            return error.name
        }
    }

    public refineComplexity(hints: UnitTest[]): void {
        this.complexity += this.passCount(hints) / (hints.length + 1)
    }

    public simplest(other: Candidate): Candidate {
        return this.complexity < other.complexity ? this : other
    }

    public testResults(unitTests: UnitTest[]): TestResult[] {
        return unitTests.map(unitTest => new TestResult(this, unitTest))
    }

    public failingTestResults(unitTests: UnitTest[]): TestResult[] {
        return this.testResults(unitTests).filter(testResult => !testResult.passes)
    }

    public failCount(unitTests: UnitTest[]): number {
        return this.failingTestResults(unitTests).length
    }

    public passCount(unitTests: UnitTest[]): number {
        return unitTests.length - this.failCount(unitTests)
    }

    public toString(): string {
        return this.function.toString()
    }

    public toHtml(): Html {
        return new Code(this.toString())
    }
}

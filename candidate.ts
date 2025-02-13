class Candidate {
    private readonly function: Function
    public readonly complexity: number

    public constructor(private code: string) {
        this.function = new Function('return ' + code)()
        this.complexity = code.split(/\s+/).length
    }

    public execute(argumentsList: any[]): any {
        try {
            return this.function(...argumentsList)
        } catch (error: any) {
            return error.name
        }
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
}

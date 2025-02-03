class Candidate {
    private function: Function

    public constructor(code: string) {
        this.function = new Function('return ' + code)()
    }

    public callFunction(argumentsList: any[]): any {
        try {
            return this.function(...argumentsList)
        } catch (error: any) {
            return error.name
        }
    }

    public complexity(): number {
        return this.function.toString().length
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
        return new Code().appendText(this.toString())
    }
}

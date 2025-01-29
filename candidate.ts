class Candidate {
    private func: Function
    private quality: string

    public constructor(code: string) {
        this.func = new Function("return " + code)()
        this.quality = ''
    }

    public callFunc(argumentsList: any[]): any {
        try {
            return this.func(...argumentsList)
        } catch (error: any) {
            return error.name
        }
    }

    public setQuality(specialUnitTests: UnitTest[], generalUnitTests: UnitTest[]): void {
        const elements = [
            this.passCount(specialUnitTests),
            this.passCount(generalUnitTests),
            this.func.toString().length,
        ]
        this.quality = 'quality:' + elements.map(element => element.toString().padStart(4, '0')).join(':')
    }

    public static worst(candidateOne: Candidate, candidateTwo: Candidate): Candidate {
        return candidateOne.quality < candidateTwo.quality ? candidateOne : candidateTwo
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

    public toHtmlElement(): HTMLElement {
        const element = document.createElement('p')
        element.innerHTML = this.func.toString()
        return element
    }
}

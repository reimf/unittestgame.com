abstract class Game {
    INITIALSCORE = 100
    PENALTYHINT = 10
    PENALTYBUG = 20
    PENALTYEND = 100

    public readonly abstract theme: Theme
    public readonly abstract description: string
    private parameters: Variable[] = this.getParameters()
    private unit: Variable = this.getUnit()
    private candidates: Candidate[] = [...this.generateCandidates(this.getCandidateElements())]
    private minimalUnitTests: UnitTest[] = this.getMinimalUnitTests()
    private perfectCandidates: Candidate[] = this.findPerfectCandidates(this.candidates, this.minimalUnitTests)
    private perfectCandidate: Candidate = this.perfectCandidates.randomElement()
    private hints: UnitTest[] = [...this.hintGenerator()].map(argumentList => new UnitTest(argumentList, this.perfectCandidate.execute(argumentList)))
    private userdefinedUnitTests: UnitTest[] = []
    private score: number = this.INITIALSCORE
    private failingTestResult: TestResult | undefined = undefined

    protected abstract getParameters(): Variable[]
    protected abstract getUnit(): Variable
    protected abstract getCandidateElements(): string[][]
    protected abstract getMinimalUnitTests(): UnitTest[]
    protected abstract hintGenerator(): Generator<any[]>
    protected abstract introductionMessage(): ComputerMessage
    protected abstract specificationPanel(): Panel

    public constructor() {
        this.checkUnitTestsAreNeeded(this.candidates, this.minimalUnitTests)
        this.candidates.forEach(candidate => candidate.refineComplexity(this.hints))
    }

    private *generateCandidates(listOfListOfLines: string[][], lines: string[] = []): Generator<Candidate> {
        if (listOfListOfLines.length > 0) {
            const [firstListOfLines, ...remainingListOfListOfLines] = listOfListOfLines
            for (const line of firstListOfLines)
                yield* this.generateCandidates(remainingListOfListOfLines, [...lines, line])
        }
        else
            yield this.createCandidate(lines)
    }

    private createCandidate(lines: string[]): Candidate {
        const parameterList = this.parameters.map((parameter) => parameter.name).join(', ')
        const code = [
            `function ${this.unit.name}(${parameterList}) {`,
            ...lines.filter((line) => line !== '').map((line) => '  ' + line),
            '}',
        ].join('\n')
        return new Candidate(code)
    }

    private findPassingCandidates(candidates: Candidate[], unitTests: UnitTest[]): Candidate[] {
        return candidates.filter(candidate => candidate.failCount(unitTests) == 0)
    }

    private findPerfectCandidates(candidates: Candidate[], unitTests: UnitTest[]): Candidate[] {
        const perfectCandidates = this.findPassingCandidates(candidates, unitTests)
        if (perfectCandidates.length === 0)
            throw new Error(`There is no perfect function for game ${this.constructor.name}.`)
        return perfectCandidates
    }

    private checkUnitTestsAreNeeded(candidates: Candidate[], unitTests: UnitTest[]): void {
        for (const unitTest of unitTests) {
            const allMinusOneUnitTests = unitTests.filter(otherUnitTest => otherUnitTest !== unitTest)
            const almostPerfectCandidates = this.findPassingCandidates(candidates, allMinusOneUnitTests)
            if (almostPerfectCandidates.length === 1)
                throw new Error(`Unit test ${unitTest} is not needed.\n${almostPerfectCandidates[0]}`)
        }
    }

    private findSimplestPassingCandidate(candidates: Candidate[], userDefinedUnitTests: UnitTest[], perfectCandidates: Candidate[]): Candidate {
        const passingCandidates = this.findPassingCandidates(candidates, userDefinedUnitTests)
        return passingCandidates.reduce((simplestSoFar, current) => simplestSoFar.simplest(current))
    }

    public play(): void {
        this.specificationPanel().show('specification')
        this.introductionMessage().show()
        this.theme.contractMessage(this.INITIALSCORE, this.PENALTYHINT, this.PENALTYBUG).show()
        this.menu()
    }

    private menu(): void {
        this.theme.unitTestsPanel(this.userdefinedUnitTests).show('unit-tests')

        const simplestPassingCandidate = this.findSimplestPassingCandidate(this.candidates, this.userdefinedUnitTests, this.perfectCandidates)
        this.theme.currentCandidatePanel(simplestPassingCandidate).show('current-candidate')

        const failingTestResultsHints = simplestPassingCandidate.failingTestResults(this.hints)
        const failingTestResultsUnitTests = simplestPassingCandidate.failingTestResults(this.minimalUnitTests)
        const failingTestResultsToChooseFrom = failingTestResultsHints ? failingTestResultsHints : failingTestResultsUnitTests
        this.failingTestResult = failingTestResultsToChooseFrom
            ? failingTestResultsToChooseFrom.randomElement()
            : undefined

        this.theme.scorePanel(this.score).show('score')
        new HumanMenuMessage([
            new Button(this.theme.formUnitTestButton(), () => this.showFormUnitTest()),
            new Button(this.theme.showHintButton(this.PENALTYHINT), () => this.showHint()),
            new Button(this.theme.submitButton(this.PENALTYBUG), () => this.submit()),
            new Button(this.theme.endButton(this.PENALTYEND), () => this.end()),
        ]).show()
    }

    private showFormUnitTest(): void {
        const form = new Form(
            [...this.parameters, this.unit],
            this.theme.addUnitTestFormButtonText(),
            () => this.addUnitTest(),
            this.theme.cancelUnitTestFormButtonText(),
            () => this.menu()
        )
        this.theme.addUnitTestFormMessage(form).replace()
    }

    private addUnitTest(): void {
        const argumentList = this.parameters.map(parameter => parameter.value())
        const expected = this.unit.value()
        const unitTest = new UnitTest(argumentList, expected)
        this.theme.addUnitTestTextMessage(unitTest).replace()
        const testResult = new TestResult(this.perfectCandidate, unitTest)
        if (testResult.passes) {
            const passingCandidatesBefore = this.findPassingCandidates(this.candidates, this.userdefinedUnitTests)
            const simplestPassingCandidateBefore = this.findSimplestPassingCandidate(this.candidates, this.userdefinedUnitTests, this.perfectCandidates)
            this.userdefinedUnitTests.push(unitTest)
            const passingCandidatesAfter = this.findPassingCandidates(this.candidates, this.userdefinedUnitTests)
            const simplestPassingCandidateAfter = this.findSimplestPassingCandidate(this.candidates, this.userdefinedUnitTests, this.perfectCandidates)
            if (passingCandidatesAfter.length === passingCandidatesBefore.length)
                this.theme.overallUselessUnitTestMessage().show()
            else if (simplestPassingCandidateAfter === simplestPassingCandidateBefore)
                this.theme.currentlyUselessUnitTestMessage().show()
            else
                this.theme.usefulUnitTestMessage().show()
        }
        else
            this.theme.incorrectUnitTestMessage().show()
        this.menu()
    }

    private showHint(): void {
        if (this.failingTestResult)
            this.theme.hintUnitTestMessage(this.failingTestResult.unitTest, this.PENALTYHINT).show()
        else
            this.theme.noHintUnitTestMessage(this.PENALTYHINT).show()
        this.score -= this.PENALTYHINT
        this.menu()
    }

    private submit(): void {
        if (this.failingTestResult) {
            this.theme.bugFoundMessage(this.failingTestResult, this.PENALTYBUG).show()
            this.score -= this.PENALTYBUG
            this.menu()
        }
        else
            this.end()
    }

    private end(): void {
        if (this.failingTestResult) {
            this.score = 0
            this.theme.scorePanel(this.score).show('score')
            this.theme.endWithBugMessage().show()
        }
        else if (this.score == 100)
            this.theme.endPerfectMessage(this.score).show()
        else if (this.score > 50)
            this.theme.endPositiveMessage(this.score).show()
        else
            this.theme.endNegativeMessage(this.score).show()
        new HighScore(
            this.constructor.name,
            this.score,
            this.theme.formatScore(this.score),
        ).save()
        Main.instance.restart()
    }
}

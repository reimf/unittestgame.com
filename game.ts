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
    private perfectCandidate: Candidate = this.perfectCandidates.random()
    private hints: UnitTest[] = [...this.hintGenerator()].map(argumentList => new UnitTest(argumentList, this.perfectCandidate.execute(argumentList)))
    private userdefinedUnitTests: UnitTest[] = []
    private score: number = this.INITIALSCORE
    private failingTestResult: TestResult | undefined = undefined

    protected abstract getParameters(): Variable[]
    protected abstract getUnit(): Variable
    protected abstract getCandidateElements(): string[][]
    protected abstract getMinimalUnitTests(): UnitTest[]
    protected abstract hintGenerator(): Generator<any[]>
    protected abstract introductionMessage(): Message
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
        this.introductionMessage().addAsComputer()
        this.theme.contractMessage(this.INITIALSCORE, this.PENALTYHINT, this.PENALTYBUG).addAsComputer()
        this.menu()
    }

    private menuMessage(buttons: Button[]): Message {
        return new Message([
            new Menu(buttons),
        ])
    }

    private menu(): void {
        this.theme.unitTestsPanel(this.userdefinedUnitTests).show('unit-tests')

        const simplestPassingCandidate = this.findSimplestPassingCandidate(this.candidates, this.userdefinedUnitTests, this.perfectCandidates)
        this.theme.currentCandidatePanel(simplestPassingCandidate).show('current-candidate')

        const failingTestResultsHints = simplestPassingCandidate.failingTestResults(this.hints)
        const failingTestResultsUnitTests = simplestPassingCandidate.failingTestResults(this.minimalUnitTests)
        const failingTestResultsToChooseFrom = failingTestResultsHints ? failingTestResultsHints : failingTestResultsUnitTests
        this.failingTestResult = failingTestResultsToChooseFrom
            ? failingTestResultsToChooseFrom.random()
            : undefined

        this.theme.scorePanel(this.score).show('score')
        this.menuMessage([
            new Button(this.theme.formUnitTestButton(), () => this.showFormUnitTest()),
            new Button(this.theme.showHintButton(this.PENALTYHINT), () => this.showHint()),
            new Button(this.theme.submitButton(this.PENALTYBUG), () => this.submit()),
            new Button(this.theme.endButton(this.PENALTYEND), () => this.end()),
        ]).addAsHuman()
    }

    private showFormUnitTest(): void {
        const form = new Form(
            [...this.parameters, this.unit],
            this.theme.addUnitTestFormButton(),
            () => this.addUnitTest(),
            this.theme.cancelUnitTestFormButton(),
            () => this.menu()
        )
        this.theme.addUnitTestFormMessage(form).replaceLastHuman()
    }

    private addUnitTest(): void {
        const argumentList = this.parameters.map(parameter => parameter.value())
        const expected = this.unit.value()
        const unitTest = new UnitTest(argumentList, expected)
        this.theme.addUnitTestTextMessage(unitTest).replaceLastHuman()
        const testResult = new TestResult(this.perfectCandidate, unitTest)
        if (testResult.passes) {
            const passingCandidatesBefore = this.findPassingCandidates(this.candidates, this.userdefinedUnitTests)
            const simplestPassingCandidateBefore = this.findSimplestPassingCandidate(this.candidates, this.userdefinedUnitTests, this.perfectCandidates)
            this.userdefinedUnitTests.push(unitTest)
            const passingCandidatesAfter = this.findPassingCandidates(this.candidates, this.userdefinedUnitTests)
            const simplestPassingCandidateAfter = this.findSimplestPassingCandidate(this.candidates, this.userdefinedUnitTests, this.perfectCandidates)
            if (passingCandidatesAfter.length === passingCandidatesBefore.length)
                this.theme.overallUselessUnitTestMessage().addAsComputer()
            else if (simplestPassingCandidateAfter === simplestPassingCandidateBefore)
                this.theme.currentlyUselessUnitTestMessage().addAsComputer()
            else
                this.theme.usefulUnitTestMessage().addAsComputer()
        }
        else
            this.theme.incorrectUnitTestMessage().addAsComputer()
        this.menu()
    }

    private showHint(): void {
        if (this.failingTestResult) {
            this.theme.hintUnitTestMessage(this.failingTestResult.unitTest, this.PENALTYHINT).addAsComputer()
            this.score -= this.PENALTYHINT
        }
        this.menu()
    }

    private submit(): void {
        if (this.failingTestResult) {
            this.theme.bugFoundMessage(this.failingTestResult, this.PENALTYBUG).addAsComputer()
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
            this.theme.endWithBugMessage().addAsComputer()
        }
        else if (this.score == 100)
            this.theme.endPerfectMessage(this.score).addAsComputer()
        else if (this.score > 50)
            this.theme.endPositiveMessage(this.score).addAsComputer()
        else
            this.theme.endNegativeMessage(this.score).addAsComputer()
        new HighScore(
            this.constructor.name,
            this.score.toString().padStart(3, '0'),
            this.theme.formatScore(this.score),
        ).save()
        Main.instance.restart()
    }
}

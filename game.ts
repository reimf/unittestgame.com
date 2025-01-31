abstract class Game {
    private parameters: Variable[]
    private unit: Variable
    private candidates: Candidate[]
    private perfectCandidate: Candidate
    private specialUnitTests: UnitTest[]
    private generalUnitTests: UnitTest[]
    private userdefinedUnitTests: UnitTest[]
    private score: number
    private failingTestResult: TestResult | undefined

    public abstract theme() : string
    public abstract description(): string
    protected abstract choiceLabel(): string
    protected abstract buttonText(): string
    protected abstract getParameters(): Variable[]
    protected abstract getUnit(): Variable
    protected abstract getCandidateElements(): string[][]
    protected abstract getSpecialUnitTests(): UnitTest[]
    protected abstract generalArgumentsGenerator(): Generator<any[]>
    protected abstract formatScore(score: number): string
    protected abstract introductionMessage(initialScore: number, penaltyBug: number): Section
    protected abstract addUnitTestOption(): string
    protected abstract seeHintOption(penaltyHint: number): string
    protected abstract submitOption(penaltyBug: number): string
    protected abstract endOption(penaltyend: number): string
    protected abstract menuMessage(form: Form): Section
    protected abstract seeHintMessage(): Section
    protected abstract submitMessage(): Section
    protected abstract optionEndMessage(): Section
    protected abstract unitTestsPanel(unitTests: UnitTest[]): Section
    protected abstract currentCandidatePanel(candidate: Candidate): Section
    protected abstract scorePanel(score: number): Section
    protected abstract addUnitTestFormMessage(form: Form): Section
    protected abstract addUnitTestTextMessage(unitTest: UnitTest): Section
    protected abstract hintUnitTestMessage(unitTest: UnitTest, penaltyHint: number): Section
    protected abstract bugFoundMessage(testResult: TestResult, penaltyBug: number): Section
    protected abstract endWithBugMessage(): Section
    protected abstract endPerfectMessage(score: number): Section
    protected abstract endPositiveMessage(score: number): Section
    protected abstract endNegativeMessage(score: number): Section
    protected abstract uselessUnitTestMessage(): Section
    protected abstract usefulUnitTestMessage(): Section
    protected abstract incorrectUnitTestMessage(): Section
    protected abstract specificationPanel(): Section

    INITIALSCORE = 100
    PENALTYHINT = 10
    PENALTYBUG = 20
    PENALTYEND = 100

    public constructor() {
        this.parameters = this.getParameters()
        this.unit = this.getUnit()
        this.candidates = [...this.generateFunctions(this.getCandidateElements())]
        this.specialUnitTests = this.getSpecialUnitTests()
        this.perfectCandidate = this.findOnePerfectCandidate(this.candidates, this.specialUnitTests)
        this.checkUnitTestsAreNeeded(this.candidates, this.specialUnitTests)
        this.generalUnitTests = [...this.generalArgumentsGenerator()].map(argumentList => new UnitTest(argumentList, this.perfectCandidate.callFunction(argumentList)))
        this.userdefinedUnitTests = []
        this.score = this.INITIALSCORE
        this.failingTestResult = undefined
    }

    private *generateFunctions(listOfListOfLines: string[][], lines: string[] = []): Generator<Candidate> {
        if (listOfListOfLines.length > 0) {
            const [firstListOfLines, ...remainingListOfListOfLines] = listOfListOfLines
            for (const line of firstListOfLines)
                yield* this.generateFunctions(remainingListOfListOfLines, [...lines, line])
        }
        else
            yield this.createCandidate(lines)
    }

    private createCandidate(lines: string[]): Candidate {
        const parameterList = this.parameters.map((parameter) => parameter.name).join(", ")
        const code = [
            `function ${this.unit.name}(${parameterList}) {`,
            ...lines.filter((line) => line !== "").map((line) => "  " + line),
            "}",
        ].join("\n")
        return new Candidate(code)
    }

    private findPassingCandidates(candidates: Candidate[], unitTests: UnitTest[]): Candidate[] {
        return candidates.filter(candidate => candidate.failCount(unitTests) == 0)
    }

    private findOnePerfectCandidate(candidates: Candidate[], unitTests: UnitTest[]): Candidate {
        const perfectFunctions = this.findPassingCandidates(candidates, unitTests)
        if (perfectFunctions.length === 0)
            throw new Error(`There is no perfect function for game ${this.constructor.name}.`)
        return perfectFunctions.random()
    }

    private checkUnitTestsAreNeeded(candidates: Candidate[], unitTests: UnitTest[]): void {
        for (const unitTest of unitTests) {
            const allMinusOneUnitTests = unitTests.filter(otherUnitTest => otherUnitTest !== unitTest)
            const almostPerfectFunctions = this.findPassingCandidates(candidates, allMinusOneUnitTests)
            if (almostPerfectFunctions.length === 1)
                throw new Error(`Unit test ${unitTest} is not needed.\n${almostPerfectFunctions[0]}`)
        }
    }

    private findShortestPassingCandidate(candidates: Candidate[], userDefinedUnitTests: UnitTest[]): Candidate {
        const passingCandidates = this.findPassingCandidates(candidates, userDefinedUnitTests)
        return passingCandidates.reduce((shortestSoFar, current) => current.complexity() < shortestSoFar.complexity() ? current : shortestSoFar)
    }

    public play(): void {
        this.specificationPanel().show('specification')
        this.introductionMessage(this.INITIALSCORE, this.PENALTYBUG).addAsComputer()
        this.menu()
    }

    private menu(): void {
        this.unitTestsPanel(this.userdefinedUnitTests).show('unit-tests')

        const shortestPassingCandidate = this.findShortestPassingCandidate(this.candidates, this.userdefinedUnitTests)
        this.currentCandidatePanel(shortestPassingCandidate).show('current-candidate')

        const failingGeneralTestResults = shortestPassingCandidate.failingTestResults(this.generalUnitTests)
        const failingSpecialTestResults = shortestPassingCandidate.failingTestResults(this.specialUnitTests)
        const failingTestResultsToChooseFrom = failingGeneralTestResults ? failingGeneralTestResults : failingSpecialTestResults
        this.failingTestResult = failingTestResultsToChooseFrom
            ? failingTestResultsToChooseFrom.random()
            : undefined

        this.scorePanel(this.score).show('score')
        const choices = [
            this.addUnitTestOption(),
            this.seeHintOption(this.PENALTYHINT),
            this.submitOption(this.PENALTYBUG),
            this.endOption(this.PENALTYEND),
        ]
        this.menuMessage(
            new Form([new VerticalRadioVariable(this.choiceLabel(), 'choice', choices)], this.buttonText(), this.answer.bind(this)),
        ).addAsHuman()
    }

    private answer(choice: string): void {
        if (choice === this.addUnitTestOption()) {
            this.addUnitTestFormMessage(new Form([...this.parameters, this.unit], this.buttonText(), this.addUnitTest.bind(this))).replaceLastHuman()
        }
        else if (choice === this.seeHintOption(this.PENALTYHINT)) {
            if (this.failingTestResult) {
                this.seeHintMessage().replaceLastHuman()
                this.hintUnitTestMessage(this.failingTestResult.unitTest, this.PENALTYHINT).addAsComputer()
                this.score -= this.PENALTYHINT
            }
            this.menu()
        }
        else if (choice === this.submitOption(this.PENALTYBUG)) {
            this.submitMessage().replaceLastHuman()
            if (this.failingTestResult) {
                this.bugFoundMessage(this.failingTestResult, this.PENALTYBUG).addAsComputer()
                this.score -= this.PENALTYBUG
            }
            else
                this.end()
        }
        else if (choice === this.endOption(this.PENALTYEND))
            this.end()
        else
            this.menu()
    }

    private end(): void {
        if (this.failingTestResult) {
            this.score = 0
            this.scorePanel(this.score).show('score')
            this.endWithBugMessage().addAsComputer()
        }
        else if (this.score == 100)
            this.endPerfectMessage(this.score).addAsComputer()
        else if (this.score > 50)
            this.endPositiveMessage(this.score).addAsComputer()
        else
            this.endNegativeMessage(this.score).addAsComputer()
    }

    private addUnitTest(...values: any[]): void {
        const argumentList = values.slice(0, -1)
        const expected = values.slice(-1).pop()
        const unitTest = new UnitTest(argumentList, expected)
        this.addUnitTestTextMessage(unitTest).replaceLastHuman()
        const testResult = new TestResult(this.perfectCandidate, unitTest)
        if (testResult.passes) {
            const passingCandidatesBefore = this.findPassingCandidates(this.candidates, this.userdefinedUnitTests)
            this.userdefinedUnitTests.push(unitTest)
            const passingCandidatesAfter = this.findPassingCandidates(this.candidates, this.userdefinedUnitTests)
            if (passingCandidatesAfter.length === passingCandidatesBefore.length)
                this.uselessUnitTestMessage().addAsComputer()
            else
                this.usefulUnitTestMessage().addAsComputer()
        }
        else
            this.incorrectUnitTestMessage().addAsComputer()
        this.menu()
    }
}

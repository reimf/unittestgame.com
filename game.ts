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

    public abstract language() : string
    public abstract description(): string
    protected abstract getParameters(): Variable[]
    protected abstract getUnit(): Variable
    protected abstract getCandidateElements(): string[][]
    protected abstract getSpecialUnitTests(): UnitTest[]
    protected abstract generalArgumentsGenerator(): Generator<any[]>
    protected abstract introductionTemplate(): Template
    protected abstract menuTemplate(penaltyhint: number, penaltybug: number, penaltyend: number, form: Form): Template
    protected abstract option1Template(): Template
    protected abstract option2Template(): Template
    protected abstract option4Template(): Template
    protected abstract option5Template(): Template
    protected abstract option0Template(): Template
    protected abstract noUnitTestsTemplate(): Template
    protected abstract unitTestsTemplate(unitTests: UnitTest[]): Template
    protected abstract currentCandidateTemplate(candidate: Candidate): Template
    protected abstract scoreTemplate(score: number): Template
    protected abstract contractTemplate(initialscore: number, penaltybug: number): Template
    protected abstract addUnitTestTemplate(form: Form): Template
    protected abstract hintUnitTestTemplate(unitTest: UnitTest, penaltyhint: number): Template
    protected abstract bugFoundTemplate(testResult: TestResult, penaltybug: number): Template
    protected abstract endWithBugTemplate(): Template
    protected abstract endPerfectTemplate(score: number): Template
    protected abstract endPositiveTemplate(score: number): Template
    protected abstract endNegativeTemplate(score: number): Template
    protected abstract uselessUnitTestTemplate(): Template
    protected abstract usefulUnitTestTemplate(): Template
    protected abstract incorrectUnitTestTemplate(): Template
    protected abstract specificationTemplate(): Template
    protected abstract choiceLabel(): string

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
        this.generalUnitTests = [...this.generalArgumentsGenerator()].map(argumentList => new UnitTest(argumentList, this.perfectCandidate.callFunc(argumentList)))
        for (const candidate of this.candidates)
            candidate.setQuality(this.specialUnitTests, this.generalUnitTests)
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
        const parameterList = this.parameters
            .map((parameter) => parameter.name)
            .join(", ")
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
        return perfectFunctions[Math.floor(Math.random() * perfectFunctions.length)]
    }

    private checkUnitTestsAreNeeded(candidates: Candidate[], unitTests: UnitTest[]): void {
        for (const unitTest of unitTests) {
            const allMinusOneUnitTests = unitTests.filter(otherUnitTest => otherUnitTest !== unitTest)
            const almostPerfectFunctions = this.findPassingCandidates(candidates, allMinusOneUnitTests)
            if (almostPerfectFunctions.length === 1)
                throw new Error(`Unit test ${unitTest} is not needed.\n${almostPerfectFunctions[0]}`)
        }
    }

    private findWorstPassingCandidate(candidates: Candidate[], userDefinedUnitTests: UnitTest[]): Candidate {
        const passingCandidates = this.findPassingCandidates(candidates, userDefinedUnitTests)
        return passingCandidates.reduce((worstSoFar, current) => Candidate.worst(current, worstSoFar))
    }

    public play(): void {
        this.introductionTemplate().newComputerMessage()
        this.menu()
    }

    private menu(): void {
        if (this.userdefinedUnitTests.length > 0)
            this.unitTestsTemplate(this.userdefinedUnitTests).inSidebar('unit-tests')
        else
            this.noUnitTestsTemplate().inSidebar('unit-tests')

        const worstPassingCandidate = this.findWorstPassingCandidate(this.candidates, this.userdefinedUnitTests)
        this.currentCandidateTemplate(worstPassingCandidate).inSidebar('current-candidate')

        const failingGeneralTestResults = worstPassingCandidate.failingTestResults(this.generalUnitTests)
        const failingSpecialTestResults = worstPassingCandidate.failingTestResults(this.specialUnitTests)
        const failingTestResultsToChooseFrom = failingGeneralTestResults ? failingGeneralTestResults : failingSpecialTestResults
        this.failingTestResult = failingTestResultsToChooseFrom
            ? failingTestResultsToChooseFrom[Math.floor(Math.random() * failingTestResultsToChooseFrom.length)]
            : undefined

        this.scoreTemplate(this.score).inSidebar('score')
        this.menuTemplate(
            this.PENALTYHINT,
            this.PENALTYBUG,
            this.PENALTYEND,
            new Form([new RadioVariable(this.choiceLabel(), 'choice', ['1', '2', '3', '4', '5', '0'])], this.answer.bind(this)),
        ).newHumanMessage()
    }

    private answer(choice: string): void {
        if (choice === '1') {
            this.option1Template().replaceHumanMessage()
            this.contractTemplate(this.INITIALSCORE, this.PENALTYBUG).newComputerMessage()
            this.menu()
        }
        else if (choice === '2') {
            this.option2Template().replaceHumanMessage()
            this.specificationTemplate().newComputerMessage()
            this.menu()
        }
        else if (choice === '3') {
            this.addUnitTestTemplate(new Form([...this.parameters, this.unit], this.addUnitTest.bind(this))).replaceHumanMessage()
        }
        else if (choice === '4') {
            if (this.failingTestResult) {
                this.option4Template().replaceHumanMessage()
                this.hintUnitTestTemplate(this.failingTestResult.unitTest, this.PENALTYHINT).newComputerMessage()
                this.score -= this.PENALTYHINT
            }
            this.menu()
        }
        else if (choice === '5') {
            this.option5Template().replaceHumanMessage()
            if (this.failingTestResult) {
                this.bugFoundTemplate(this.failingTestResult, this.PENALTYBUG).newComputerMessage()
                this.score -= this.PENALTYBUG
            }
            else
                this.end()
        }
        else if (choice === '0') {
            this.end()
        }
        else {
            this.menu()
        }
    }

    private end(): void {
        if (this.failingTestResult) {
            this.score = 0
            this.scoreTemplate(this.score).inSidebar('score')
            this.endWithBugTemplate().newComputerMessage()
        }
        else if (this.score == 100) {
            this.endPerfectTemplate(this.score).newComputerMessage()
        }
        else if (this.score > 50) {
            this.endPositiveTemplate(this.score).newComputerMessage()
        }
        else {
            this.endNegativeTemplate(this.score).newComputerMessage()
        }
    }

    private addUnitTest(...values: any[]): void {
        const argumentList = values.slice(0, -1)
        const expected = values.slice(-1).pop()
        const unitTest = new UnitTest(argumentList, expected)
        const testResult = new TestResult(this.perfectCandidate, unitTest)
        if (testResult.passes) {
            const passingCandidatesBefore = this.findPassingCandidates(this.candidates, this.userdefinedUnitTests)
            this.userdefinedUnitTests.push(unitTest)
            const passingCandidatesAfter = this.findPassingCandidates(this.candidates, this.userdefinedUnitTests)
            if (passingCandidatesAfter.length === passingCandidatesBefore.length)
                this.uselessUnitTestTemplate().newComputerMessage()
            else
                this.usefulUnitTestTemplate().newComputerMessage()
        }
        else
            this.incorrectUnitTestTemplate().newComputerMessage()
        this.menu()
    }
}

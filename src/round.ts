import { UnitTest } from './unit_test.js'
import { Random } from './random.js'
import { Button, Form, Input, Paragraph } from './html.js'
import { HumanMessage, ComputerMessage } from './frame.js'
import { Candidate } from './candidate.js'
import { TestResult } from './test_result.js'
import { Level } from './level.js'
import { Game } from './game.js'

export class Round {
    protected readonly PERFECTSCORE = 100
    protected readonly PENALTYINCORRECTUNITTEST = 5
    protected readonly PENALTYHINT = 10
    protected readonly PENALTYSUBMITWITHBUG = 20
    protected readonly MINIMUMSCORE = 0

    protected readonly level: Level
    protected readonly game: Game
    protected readonly userdefinedUnitTests: UnitTest[]
    protected readonly coveredCandidates: Candidate[]
    protected currentCandidate: Candidate
    protected failingTestResult?: TestResult
    protected score: number
    private readonly callback: () => void

    protected readonly name: string = this.constructor.name

    public constructor(game: Game, level: Level, callback: () => void) {
        this.game = game
        this.level = level
        this.userdefinedUnitTests = []
        this.coveredCandidates = []
        this.currentCandidate = this.findSimplestWorstPassingCandidate()
        this.failingTestResult = this.findFailingTestResult()
        this.score = this.PERFECTSCORE
        this.callback = callback
    }

    public get description(): string {
        return `${this.game.name} - Level ${this.level.index} - ${this.level.name}`
    }

    public getHighScore(storage: Storage): number {
        return Number(storage.getItem(this.description))
    }

    public saveScore(storage: Storage, score: number): void {
        if (score > this.getHighScore(storage))
            storage.setItem(this.description, score.toString())
    }

    protected findWorstCandidates(candidates: Candidate[], attribute: (key: Candidate) => number): Candidate[] {
        const attributes = candidates.map(attribute)
        const minimum = Math.min(...attributes)
        return candidates.filter(candidate => attribute(candidate) === minimum)
    }

    protected findSimplestCandidates(candidates: Candidate[]): Candidate[] {
        return this.findWorstCandidates(candidates, candidate => candidate.complexity)
    }

    protected findSimplestWorstPassingCandidate(): Candidate {
        const passingCandidates = this.level.findPassingCandidates(this.userdefinedUnitTests)
        const worstPassingCandidates = this.findWorstCandidates(passingCandidates, candidate => candidate.passCount(this.level.minimalUnitTests))
        const simplestPassingCandidates = this.findSimplestCandidates(worstPassingCandidates)
        return Random.elementFrom(simplestPassingCandidates)
    }

    protected findCoveredCandidate(unitTest: UnitTest): Candidate {
        const passingCandidates = this.level.descendantsOfPerfectCandidate
            .filter(candidate => candidate.failCount([unitTest]) == 0)
        const simplestPassingCandidates = this.findSimplestCandidates(passingCandidates)
        return Random.elementFrom(simplestPassingCandidates)
    }

    protected findFailingTestResult(): TestResult | undefined {
        const failingHints = this.currentCandidate.failingTestResults(this.level.hints)
        if (failingHints.length > 0)
            return Random.elementFrom(failingHints)
        const failingMinimalUnitTests = this.currentCandidate.failingTestResults(this.level.minimalUnitTests)
        if (failingMinimalUnitTests.length > 0)
            return Random.elementFrom(failingMinimalUnitTests)
        return undefined
    }

    public play(): void {
        this.game.showPanelsOnPlay(this.level.perfectCandidate, this.coveredCandidates, this.level.showSpecificationPanel)
        this.game.showContractMessage()
        this.menu()
    }

    protected menu(): void {
        this.game.showUnitTestsPanel(this.userdefinedUnitTests)
        this.game.showPanelsOnMenu(this.currentCandidate, this.level.perfectCandidate, this.coveredCandidates)
        this.game.showScorePanel(this.description, this.score)
        if (this.score === this.MINIMUMSCORE)
            this.end()
        else
            this.showMenuMessage()
    }

    protected showMenuMessage(): void {
        new HumanMessage([
            new Button().onClick(() => this.startAddUnitTestFlow()).appendText(`I want to add a unit test (-${this.PENALTYINCORRECTUNITTEST}% on error)`),
            new Button().onClick(() => this.showHint()).appendText(`I want to see a hint for a unit test (-${this.PENALTYHINT}%)`),
            new Button().onClick(() => this.submit()).appendText(`I want to submit the unit tests (-${this.PENALTYSUBMITWITHBUG}% on error)`),
            new Button().onClick(() => this.end()).appendText(`I want to exit this level (${this.MINIMUMSCORE}% on error)`),
        ]).show()
    }

    protected startAddUnitTestFlow(): void {
        this.showConfirmStartUnitTestFlowMessage()
        this.showFormUnitTestMessage()
    }

    protected showConfirmStartUnitTestFlowMessage(): void {
        new ComputerMessage([
            new Paragraph().appendText('Which unit test do you want to add?'),
        ]).show()
    }

    protected showFormUnitTestMessage(): void {
        const submitButton = new Input().type('submit').value('I want to add this unit test')
        const cancelButton = new Button().onClick(() => this.cancelAddUnitTestFlow()).appendText('I don\'t want to add a unit test now')
        const buttonBlock = new Paragraph().appendChild(submitButton).appendChild(cancelButton)
        new HumanMessage([
            new Form()
            .onSubmit(() => this.addUnitTest())
            .appendChildren([...this.level.parameters, this.level.unit].map(variable => variable.toHtml()))
            .appendChild(buttonBlock)
        ]).show()
    }

    protected showAddUnitTestMessage(unitTest: UnitTest): void {
        new HumanMessage([
            new Paragraph().appendText('I want to add the following unit test:'),
            new Paragraph().appendText(unitTest.toString()),
        ]).replace()
    }

    protected showConfirmCancelAddUnitTestFlowMessage(): void {
        new ComputerMessage([
            new Paragraph().appendText('Ok.'),
        ]).show()
    }

    protected cancelAddUnitTestFlow(): void {
        this.showConfirmCancelAddUnitTestFlowMessage()
        this.menu()
    }

    protected addUnitTest(): void {
        const argumentList = this.level.parameters.map(parameter => parameter.value())
        const expected = this.level.unit.value()
        const unitTest = new UnitTest(this.level.parameters, argumentList, this.level.unit, expected)
        this.showAddUnitTestMessage(unitTest)
        const unitTestIsCorrect = new TestResult(this.level.perfectCandidate, unitTest).passes
        if (unitTestIsCorrect) {
            this.userdefinedUnitTests.push(unitTest)
            this.coveredCandidates.push(this.findCoveredCandidate(unitTest))
            const currentCandidateAlreadyPasses = new TestResult(this.currentCandidate, unitTest).passes
            if (currentCandidateAlreadyPasses)
                this.game.showUselessUnitTestMessage()
            else {
                this.game.showUsefulUnitTestMessage()
                this.currentCandidate = this.findSimplestWorstPassingCandidate()
                this.failingTestResult = this.findFailingTestResult()
            }
        }
        else {
            this.game.showIncorrectUnitTestMessage(this.PENALTYINCORRECTUNITTEST)
            this.subtractPenalty(this.PENALTYINCORRECTUNITTEST)
        }
        this.menu()
    }

    protected showHint(): void {
        if (this.failingTestResult)
            this.game.showHintMessage(this.currentCandidate, this.failingTestResult, this.PENALTYHINT)
        else
            this.game.showNoHintMessage(this.PENALTYHINT)
        this.subtractPenalty(this.PENALTYHINT)
        this.menu()
    }

    protected submit(): void {
        if (this.failingTestResult) {
            this.game.showBugFoundMessage(this.currentCandidate, this.failingTestResult, this.PENALTYSUBMITWITHBUG)
            this.subtractPenalty(this.PENALTYSUBMITWITHBUG)
            this.menu()
        }
        else
            this.end()
    }

    protected end(): void {
        if (this.score === this.MINIMUMSCORE)
            this.game.showMinimumScoreEndMessage(this.score)
        else if (this.failingTestResult) {
            this.score = this.MINIMUMSCORE
            this.game.showScorePanel(this.description, this.score)
            this.game.showUnsuccessfulEndMessage(this.score)
        }
        else
            this.game.showSuccessfulEndMessage(this.score)
        this.saveScore(localStorage, this.score)
        this.callback!()
    }

    protected subtractPenalty(penalty: number): void {
        this.score = Math.max(this.score - penalty, this.MINIMUMSCORE)
    }
}

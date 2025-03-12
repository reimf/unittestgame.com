import { Candidate } from './candidate.js'
import { HumanMessage, ComputerMessage } from './frame.js'
import { Game } from './game.js'
import { Button, Form, Input, Paragraph } from './html.js'
import { Level } from './level.js'
import { Random } from './random.js'
import { TestResult } from './test_result.js'
import { UnitTest } from './unit_test.js'

export class Round {
    private readonly PERFECTSCORE = 100
    private readonly PENALTYINCORRECTUNITTEST = 5
    private readonly PENALTYHINT = 10
    private readonly PENALTYSUBMITWITHBUG = 20
    private readonly PENALTYREDUNDANTUNITTEST = 5
    private readonly MINIMUMSCORE = 0

    private readonly index: number
    private readonly game: Game
    private readonly level: Level
    private readonly callback: () => void

    private readonly userdefinedUnitTests: UnitTest[]
    private readonly coveredCandidates: Candidate[]
    private currentCandidate: Candidate
    private failingTestResult?: TestResult
    private score: number

    public constructor(index: number, game: Game, level: Level, callback: () => void) {
        this.index = index
        this.game = game
        this.level = level
        this.callback = callback
        this.userdefinedUnitTests = []
        this.coveredCandidates = []
        this.currentCandidate = this.findSimplestPassingCandidate()
        this.failingTestResult = this.findFailingTestResult()
        this.score = this.PERFECTSCORE
    }

    public get description(): string {
        return `Round ${this.index} - ${this.game.name} - ${this.level.name}`
    }

    public getHighScore(storage: Storage): number {
        return Number(storage.getItem(this.description))
    }

    private saveScore(storage: Storage, score: number): void {
        if (score > this.getHighScore(storage))
            storage.setItem(this.description, score.toString())
    }

    private findWorstCandidates(candidates: Candidate[], attribute: (key: Candidate) => number): Candidate[] {
        const attributes = candidates.map(attribute)
        const minimum = Math.min(...attributes)
        return candidates.filter(candidate => attribute(candidate) === minimum)
    }

    private findSimplestCandidates(candidates: Candidate[]): Candidate[] {
        return this.findWorstCandidates(candidates, candidate => candidate.complexity)
    }

    private findSimplestPassingCandidate(): Candidate {
        const passingCandidates = this.level.candidates.filter(candidate => candidate.failCount(this.userdefinedUnitTests) == 0)
        const passingImperfectCandidates = passingCandidates.filter(candidate => !this.level.perfectCandidates.includes(candidate))
        if (passingImperfectCandidates.length === 0)
            return Random.elementFrom(this.level.perfectCandidates)
        const simplestPassingCandidates = this.findSimplestCandidates(passingImperfectCandidates)
        return Random.elementFrom(simplestPassingCandidates)
    }

    private findCoveredCandidate(unitTest: UnitTest): Candidate {
        const passingCandidates = this.level.amputeesOfPerfectCandidate
            .filter(candidate => candidate.failCount([unitTest]) == 0)
        const simplestPassingCandidates = this.findSimplestCandidates(passingCandidates)
        return Random.elementFrom(simplestPassingCandidates)
    }

    private findFailingTestResult(): TestResult | undefined {
        const failingHints = this.currentCandidate.failingTestResults(this.level.hints)
        if (failingHints.length > 0)
            return Random.elementFrom(failingHints)
        const failingMinimalUnitTests = this.currentCandidate.failingTestResults(this.level.minimalUnitTests)
        if (failingMinimalUnitTests.length > 0)
            return Random.elementFrom(failingMinimalUnitTests)
        return undefined
    }

    public play(): void {
        this.game.showWelcomeMessage()
        this.menu()
    }

    private menu(): void {
        this.game.showPanelsOnMenu(this.level.getSpecification(),
            this.currentCandidate,
            this.level.perfectCandidate,
            this.coveredCandidates)
        this.game.showUnitTestsPanel(this.userdefinedUnitTests)
        this.game.showScorePanel(this.description, this.score)
        if (this.score === this.MINIMUMSCORE)
            this.end()
        else
            this.showMenuMessage()

    }

    private showMenuMessage(): void {
        new HumanMessage([
            new Button().onClick(() => this.startAddUnitTestFlow()).text('I want to add a unit test'),
            new Button().onClick(() => this.showHint()).text('I want to see a hint for a unit test'),
            new Button().onClick(() => this.submit()).text('I want to submit the unit tests'),
            new Button().onClick(() => this.end()).text('I want to exit this level'),
        ]).show()
    }

    private startAddUnitTestFlow(): void {
        this.showConfirmStartUnitTestFlowMessage()
        this.showFormUnitTestMessage()
    }

    private showConfirmStartUnitTestFlowMessage(): void {
        new ComputerMessage([new Paragraph().text('Which unit test do you want to add?')]).show()
    }

    private showFormUnitTestMessage(): void {
        const submitButton = new Input().type('submit').value('I want to add this unit test')
        const cancelButton = new Button()
            .onClick(() => this.cancelAddUnitTestFlow())
            .text('I don\'t want to add a unit test now')
            .addClass('secondary')
            .addClass('cancel')
        const buttonBlock = new Paragraph().child(submitButton).child(cancelButton).addClass('buttonrow')
        new HumanMessage([
            new Form()
                .onSubmit(() => this.addUnitTest())
                .children([...this.level.parameters, this.level.unit].map(variable => variable.toHtml()))
                .child(buttonBlock),
        ]).show()
    }

    private showAddUnitTestMessage(unitTest: UnitTest): void {
        new HumanMessage([
            new Paragraph().text('I want to add the following unit test.'),
            new Paragraph().text(unitTest.toString()),
        ]).replace()
    }

    private showConfirmCancelAddUnitTestFlowMessage(): void {
        new ComputerMessage([new Paragraph().text('Ok.')]).show()
    }

    private cancelAddUnitTestFlow(): void {
        this.showConfirmCancelAddUnitTestFlowMessage()
        this.menu()
    }

    private addUnitTest(): void {
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
                this.currentCandidate = this.findSimplestPassingCandidate()
                this.failingTestResult = this.findFailingTestResult()
            }
        } else {
            this.game.showIncorrectUnitTestMessage(this.PENALTYINCORRECTUNITTEST)
            this.subtractPenalty(this.PENALTYINCORRECTUNITTEST)
        }
        this.menu()
    }

    private showHint(): void {
        if (this.failingTestResult)
            this.game.showHintMessage(this.currentCandidate, this.failingTestResult, this.PENALTYHINT)
        else
            this.game.showNoHintMessage(this.PENALTYHINT)
        this.subtractPenalty(this.PENALTYHINT)
        this.menu()
    }

    private submit(): void {
        if (this.failingTestResult) {
            this.game.showBugFoundMessage(this.currentCandidate, this.failingTestResult, this.PENALTYSUBMITWITHBUG)
            this.subtractPenalty(this.PENALTYSUBMITWITHBUG)
            this.menu()
        } else
            this.end()

    }

    private end(): void {
        if (this.score === this.MINIMUMSCORE)
            this.game.showMinimumScoreEndMessage(this.score)
        else if (this.failingTestResult) {
            this.score = this.MINIMUMSCORE
            this.game.showScorePanel(this.description, this.score)
            this.game.showUnsuccessfulEndMessage(this.score)
        } else {
            const numberOfRedundantUnitTests = this.userdefinedUnitTests.length - this.level.minimalUnitTests.length
            if (numberOfRedundantUnitTests > 0) {
                this.subtractPenalty(numberOfRedundantUnitTests * this.PENALTYREDUNDANTUNITTEST)
                this.game.showRedundantUnitTestsEndMessage(this.score,
                    numberOfRedundantUnitTests,
                    this.PENALTYREDUNDANTUNITTEST)
            } else
                this.game.showSuccessfulEndMessage(this.score)

        }
        this.saveScore(localStorage, this.score)
        this.callback!()
    }

    private subtractPenalty(penalty: number): void {
        this.score = Math.max(this.score - penalty, this.MINIMUMSCORE)
    }
}

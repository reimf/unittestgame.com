import { Candidate } from './candidate.js'
import { HumanMessage, ComputerMessage, Panel } from './frame.js'
import { Methodology } from './methodology.js'
import { Button, Div, Form, Input, Paragraph } from './html.js'
import { Random } from './random.js'
import { TestResult } from './test_result.js'
import { UnitTest } from './unit_test.js'
import { UseCase } from './use_case.js'

export class Level {
    private readonly PERFECTSCORE = 100
    private readonly PENALTYINCORRECTUNITTEST = 5
    private readonly PENALTYHINT = 10
    private readonly PENALTYSUBMITWITHBUG = 20
    private readonly MINIMUMSCORE = 0

    private readonly methodology: Methodology
    private readonly useCase: UseCase

    private callback?: () => void
    private userdefinedUnitTests: UnitTest[] = []
    private coveredCandidates: Candidate[] = []
    private currentCandidate: Candidate = new Candidate([])
    private failingTestResult?: TestResult = undefined
    private score: number = this.PERFECTSCORE
    private newUnitTest?: UnitTest = undefined
    private previousCandidate?: Candidate = undefined

    public constructor(methodology: Methodology, useCase: UseCase) {
        this.methodology = methodology
        this.useCase = useCase
    }

    public description(): string {
        return `${this.methodology.name()} - ${this.useCase.name()}`
    }

    public getHighScore(storage: Storage): number {
        return Number(storage.getItem(this.description()))
    }

    private saveScore(storage: Storage, score: number): void {
        if (score > this.getHighScore(storage))
            storage.setItem(this.description(), score.toString())
    }

    public play(callback: () => void): void {
        this.callback = callback
        this.userdefinedUnitTests = []
        this.coveredCandidates = []
        this.currentCandidate = this.findSimplestPassingCandidate()
        this.failingTestResult = this.findFailingTestResult()
        this.score = this.PERFECTSCORE
        this.methodology.showWelcomeMessage()
        this.menu()
    }

    private findSimplestCandidates(candidates: Candidate[]): Candidate[] {
        return candidates.reduce((simplestCandidatesSoFar: Candidate[], candidate) => {
            if (simplestCandidatesSoFar.length === 0)
                return [candidate]
            const sign = candidate.compareComplexity(simplestCandidatesSoFar[0])
            if (sign < 0)
                return [candidate]
            if (sign > 0)
                return simplestCandidatesSoFar
            return [...simplestCandidatesSoFar, candidate]
        }, [])
    }

    private findSimplestPassingCandidate(): Candidate {
        const passingCandidates = this.useCase.candidates.filter(candidate => candidate.failCount(this.userdefinedUnitTests) === 0)
        const passingImperfectCandidates = passingCandidates.filter(candidate => !this.useCase.perfectCandidates.includes(candidate))
        if (passingImperfectCandidates.length === 0)
            return Random.elementFrom(this.useCase.perfectCandidates)
        const simplestPassingCandidates = this.findSimplestCandidates(passingImperfectCandidates)
        return Random.elementFrom(simplestPassingCandidates)
    }

    private findCoveredCandidate(unitTest: UnitTest): Candidate {
        const passingCandidates = this.useCase.amputeesOfPerfectCandidate
            .filter(candidate => candidate.failCount([unitTest]) === 0)
        const simplestPassingCandidates = this.findSimplestCandidates(passingCandidates)
        return Random.elementFrom(simplestPassingCandidates)
    }

    private findFailingTestResult(): TestResult | undefined {
        const failingHints = this.currentCandidate.failingTestResults(this.useCase.hints)
        if (failingHints.length > 0)
            return Random.elementFrom(failingHints)
        const failingMinimalUnitTests = this.currentCandidate.failingTestResults(this.useCase.minimalUnitTests)
        if (failingMinimalUnitTests.length > 0)
            return Random.elementFrom(failingMinimalUnitTests)
        return undefined
    }

    public showScorePanel(): void {
        new Panel('Score', [`${this.description()}: ${this.score}%`]).show()
    }

    private showUnitTestsPanel(): void {
        new Panel('Unit Tests',
            this.userdefinedUnitTests.length === 0
            ? ['You have not written any unit tests yet.']
            : this.userdefinedUnitTests.map(unitTest => new Div().text(unitTest.toString()).addClass('new', unitTest === this.newUnitTest))
        ).show()
        this.newUnitTest = undefined
    }

    private menu(): void {
        this.showPanels()
        if (this.score === this.MINIMUMSCORE)
            this.end()
        else
            this.showMenuMessage()
    }

    private showPanels(): void {
        this.methodology.showPanelsOnMenu(this.useCase.specification(), this.currentCandidate, this.previousCandidate, this.useCase.perfectCandidate, this.coveredCandidates)
        this.previousCandidate = undefined
        this.showUnitTestsPanel()
        this.showScorePanel()
    }

    private showMenuMessage(): void {
        new HumanMessage([
            new Paragraph().appendChildren([
                new Button().onClick(() => this.startAddUnitTestFlow()).title('I want to add a unit test').text('Add unit test'),
                new Button().onClick(() => this.showHint()).title('I want to see a hint').text('Show hint'),
                new Button().onClick(() => this.prepareSubmitUnitTests()).title('I want to submit the unit tests').text('Submit unit tests'),
                new Button().onClick(() => this.end()).title('I want to exit this level').text('Exit level'),
            ]),
        ]).add()
    }

    private startAddUnitTestFlow(): void {
        this.showConfirmStartUnitTestFlowMessage()
        this.showFormUnitTestMessage()
    }

    private showConfirmStartUnitTestFlowMessage(): void {
        new ComputerMessage(['Which unit test do you want to add?']).add()
    }

    private showFormUnitTestMessage(): void {
        const parameterFields = this.useCase.parameters.map(variable => variable.toHtml())
        const unitField = this.useCase.unit.toHtml()
        const submitButton = new Input().type('submit').value('I want to add this unit test')
        const cancelButton = new Button()
            .onClick(() => this.cancelAddUnitTestFlow())
            .title('I don\'t want to add a unit test now')
            .text('Cancel')
            .addClass('cancel')
        const buttonBlock = new Paragraph().appendChildren([submitButton, cancelButton])
        new HumanMessage([
            new Form()
                .onSubmit(() => this.prepareAddUnitTest())
                .appendChildren([...parameterFields, unitField, buttonBlock]),
        ]).add()
    }

    private showAddUnitTestMessage(unitTest: UnitTest): void {
        new HumanMessage([
            'I want to add the following unit test.',
            unitTest.toString(),
        ]).replace()
    }

    private showConfirmCancelAddUnitTestFlowMessage(): void {
        new ComputerMessage(['Ok.']).add()
    }

    private cancelAddUnitTestFlow(): void {
        this.showConfirmCancelAddUnitTestFlowMessage()
        this.menu()
    }

    private prepareAddUnitTest(): void {
        const argumentList = this.useCase.parameters.map(parameter => parameter.value())
        const expected = this.useCase.unit.value()
        const unitTest = new UnitTest(this.useCase.parameters, argumentList, this.useCase.unit, expected)
        this.showAddUnitTestMessage(unitTest)
        this.showProcessing(() => this.addUnitTest(unitTest))
    }

    private showProcessing(callback: () => void): void {
        Panel.appendProcessingTo('Unit Tests')
        Panel.appendProcessingTo('Current Function')
        Panel.appendProcessingTo('The Function')
        new ComputerMessage(['Processing... ']).appendProcessing().add()
        window.setTimeout(() => {
            ComputerMessage.removeLast()
            callback()
        }, Math.random() == 0 ? 0 : 1000 + this.userdefinedUnitTests.length * 500 * Math.random())
    }

    private addUnitTest(unitTest: UnitTest): void {
        const unitTestIsCorrect = new TestResult(this.useCase.perfectCandidate, unitTest).passes
        if (unitTestIsCorrect) {
            this.newUnitTest = unitTest
            this.userdefinedUnitTests.push(unitTest)
            this.coveredCandidates.push(this.findCoveredCandidate(unitTest))
            if (new TestResult(this.currentCandidate, unitTest).passes)
                this.methodology.showUselessUnitTestMessage()
            else {
                this.methodology.showUsefulUnitTestMessage()
                this.previousCandidate = this.currentCandidate
                this.currentCandidate = this.findSimplestPassingCandidate()
                this.failingTestResult = this.findFailingTestResult()
            }
        }
        else {
            this.methodology.showIncorrectUnitTestMessage(this.PENALTYINCORRECTUNITTEST)
            this.subtractPenalty(this.PENALTYINCORRECTUNITTEST)
        }
        this.menu()
    }

    private showHint(): void {
        if (this.failingTestResult)
            this.methodology.showHintMessage(this.currentCandidate, this.failingTestResult, this.PENALTYHINT)
        else
            this.methodology.showNoHintMessage(this.PENALTYHINT)
        this.subtractPenalty(this.PENALTYHINT)
        this.menu()
    }

    private prepareSubmitUnitTests(): void {
        this.showProcessing(() => this.submitUnitTests())
    }

    private submitUnitTests(): void {
        if (this.failingTestResult) {
            this.methodology.showBugFoundMessage(this.currentCandidate, this.failingTestResult, this.PENALTYSUBMITWITHBUG)
            this.subtractPenalty(this.PENALTYSUBMITWITHBUG)
            this.menu()
        }
        else
            this.end()
    }

    private end(): void {
        if (this.score === this.MINIMUMSCORE)
            this.methodology.showMinimumScoreEndMessage(this.score)
        else if (this.failingTestResult) {
            this.score = this.MINIMUMSCORE
            this.methodology.showUnsuccessfulEndMessage(this.score)
        }
        else
            this.methodology.showSuccessfulEndMessage(this.score)
        this.showPanels()
        this.saveScore(localStorage, this.score)
        this.callback!()
    }

    private subtractPenalty(penalty: number): void {
        this.score = Math.max(this.score - penalty, this.MINIMUMSCORE)
    }
}

import { UnitTest } from './unit_test.js'
import { Random } from './random.js'
import { Button, Form, Input, Paragraph } from './html.js'
import { Panel, HumanMessage, ComputerMessage } from './frame.js'
import { Candidate } from './candidate.js'
import { TestResult } from './test_result.js'
import { Level } from './level.js'

export abstract class Round {
    protected readonly PERFECTSCORE = 100
    protected readonly PENALTYINCORRECTUNITTEST = 5
    protected readonly PENALTYHINT = 10
    protected readonly PENALTYSUBMITWITHBUG = 20
    protected readonly MINIMUMSCORE = 0

    protected readonly level: Level
    protected userdefinedUnitTests: UnitTest[]
    protected currentCandidate: Candidate
    protected failingTestResult?: TestResult
    protected score: number
    private readonly callback: () => void

    protected abstract showPanelsOnPlay(): void
    protected abstract showContractMessage(): void
    protected abstract showPanelsOnMenu(): void
    protected abstract showHintMessage(): void
    protected abstract showNoHintMessage(): void
    protected abstract showBugFoundMessage(): void
    protected abstract showMinimumScoreEndMessage(): void
    protected abstract showUnsuccessfulEndMessage(): void
    protected abstract showSuccessfulEndMessage(): void
    protected abstract showUselessUnitTestMessage(): void
    protected abstract showUsefulUnitTestMessage(): void
    protected abstract showIncorrectUnitTestMessage(): void

    public constructor(level: Level, callback: () => void) {
        this.level = level
        this.userdefinedUnitTests = []
        this.currentCandidate = this.findSimplestPassingCandidate()
        this.failingTestResult = this.findFailingTestResult()
        this.score = this.PERFECTSCORE
        this.callback = callback
    }

    public play(): void {
        this.showPanelsOnPlay()
        this.showContractMessage()
        this.menu()
    }

    protected menu(): void {
        this.showUnitTestsPanel()
        this.showPanelsOnMenu()
        this.showScorePanel()
        if (this.score === this.MINIMUMSCORE)
            this.end()
        else
            this.showMenuMessage()
    }

    protected findSimplestPassingCandidate(): Candidate {
        const passingCandidates = this.level.findPassingCandidates(this.userdefinedUnitTests)
        const complexities = passingCandidates.map(candidate => candidate.complexity)
        const minimumComplexity = Math.min(...complexities)
        const simplestCandidates = passingCandidates.filter(candidate => candidate.complexity === minimumComplexity)
        return Random.elementFrom(simplestCandidates)
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

    protected showScorePanel(): void {
        new Panel('Score', [
            new Paragraph().appendText(`${this.level.description}: ${this.score}%`),
        ]).show()
    }

    protected showUnitTestsPanel(): void {
        new Panel('Unit Tests',
            this.userdefinedUnitTests.length === 0
            ? [new Paragraph().appendText('You have not written any unit tests yet.')]
            : this.userdefinedUnitTests.map(unitTest => new Paragraph().appendText(unitTest.toString())),
        ).show()
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
            const currentCandidateAlreadyPasses = new TestResult(this.currentCandidate, unitTest).passes
            if (currentCandidateAlreadyPasses)
                this.showUselessUnitTestMessage()
            else {
                this.showUsefulUnitTestMessage()
                this.currentCandidate = this.findSimplestPassingCandidate()
                this.failingTestResult = this.findFailingTestResult()
            }
        }
        else
            this.showIncorrectUnitTestMessage()
        this.menu()
    }

    protected showHint(): void {
        if (this.failingTestResult)
            this.showHintMessage()
        else
            this.showNoHintMessage()
        this.menu()
    }

    protected submit(): void {
        if (this.failingTestResult) {
            this.showBugFoundMessage()
            this.menu()
        }
        else
            this.end()
    }

    protected end(): void {
        if (this.score === this.MINIMUMSCORE)
            this.showMinimumScoreEndMessage()
        else if (this.failingTestResult) {
            this.score = this.MINIMUMSCORE
            this.showScorePanel()
            this.showUnsuccessfulEndMessage()
        }
        else
            this.showSuccessfulEndMessage()
        this.level.saveScore(localStorage, this.score)
        this.callback!()
    }

    protected subtractPenalty(penalty: number): void {
        this.score = Math.max(this.score - penalty, this.MINIMUMSCORE)
    }
}

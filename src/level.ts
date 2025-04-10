import { Candidate } from './candidate.js'
import { HumanMessage, ProcessingMessage, ComputerMessage, Panel } from './frame.js'
import { Methodology } from './methodology.js'
import { Button, Div, Form, Input, Paragraph } from './html.js'
import { Random } from './random.js'
import { TestResult } from './test_result.js'
import { UnitTest } from './unit_test.js'
import { UseCase } from './use_case.js'
import { Completed } from './completed.js'

export class Level {
    private readonly methodology: Methodology
    private readonly useCase: UseCase
    private readonly isLevelFinished: Completed

    private callback?: () => void
    private userdefinedUnitTests: UnitTest[] = []
    private coveredCandidates: Candidate[] = []
    private currentCandidate: Candidate = new Candidate([])
    private failingTestResult?: TestResult = undefined
    private newUnitTest?: UnitTest = undefined
    private previousCandidate?: Candidate = undefined

    public constructor(methodology: Methodology, useCase: UseCase) {
        this.methodology = methodology
        this.useCase = useCase
        this.isLevelFinished = new Completed(this.description())
    }

    public description(): string {
        return `${this.methodology.name()} - ${this.useCase.name()}`
    }

    public methodologyName(): string {
        return this.methodology.name()
    }

    public getExampleSeen(): boolean {
        return this.methodology.getExampleSeen()
    }

    public setExampleSeen(): void {
        this.methodology.setExampleSeen()
    }

    public showExample(callback: () => void): void {
        this.methodology.showExample(callback)
    }

    public isFinished(): boolean {
        return this.isLevelFinished.get()
    }

    public play(callback: () => void): void {
        this.callback = callback
        this.userdefinedUnitTests = []
        this.coveredCandidates = []
        this.currentCandidate = this.findSimplestPassingCandidate()
        this.failingTestResult = this.findFailingTestResult()
        this.newUnitTest = undefined
        this.previousCandidate = undefined
        this.showCurrentLevelPanel()
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

    private showCurrentLevelPanel(): void {
        new Panel('Current Level', [new Paragraph().appendText(this.description())]).show()
    }

    private showUnitTestsPanel(): void {
        new Panel('Unit Tests',
            this.userdefinedUnitTests.length === 0
            ? ['You have not written any unit tests yet.']
            : this.userdefinedUnitTests.map(unitTest => new Div().appendText(unitTest.toString()).addClass('new', unitTest === this.newUnitTest))
        ).show()
        this.newUnitTest = undefined
    }

    private menu(): void {
        this.showPanels()
        this.showMenuMessage()
    }

    private showPanels(): void {
        this.methodology.showPanelsOnMenu(this.useCase.specification(), this.currentCandidate, this.previousCandidate, this.useCase.perfectCandidate, this.coveredCandidates)
        this.previousCandidate = undefined
        this.showUnitTestsPanel()
    }

    private showMenuMessage(): void {
        new HumanMessage([
            new Paragraph().appendChildren([
                new Button().setTitle('I want to add a unit test').appendText('Add unit test').onClick(() => this.startAddUnitTestFlow()),
                new Button().setTitle('I want to see a hint').appendText('Show hint').onClick(() => this.showHint()),
                new Button().setTitle('I want to submit the unit tests').appendText('Submit unit tests').onClick(() => this.prepareSubmitUnitTests()),
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
        const submitButton = new Input().setType('submit').setValue('I want to add this unit test')
        const cancelButton = new Button()
            .appendText('Cancel')
            .setTitle('I don\'t want to add a unit test now')
            .onClick(() => this.cancelAddUnitTestFlow())
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
        const argumentList = this.useCase.parameters.map(parameter => parameter.getValue())
        const expected = this.useCase.unit.getValue()
        const unitTest = new UnitTest(this.useCase.parameters, argumentList, this.useCase.unit, expected)
        this.showAddUnitTestMessage(unitTest)
        new ProcessingMessage('Processing this new unit test...', () => this.addUnitTest(unitTest), 1000 + this.userdefinedUnitTests.length * 500).add()
    }

    private addUnitTest(unitTest: UnitTest): void {
        const unitTestIsCorrect = new TestResult(this.useCase.perfectCandidate, unitTest).passes
        if (unitTestIsCorrect) {
            this.newUnitTest = unitTest
            this.userdefinedUnitTests.push(unitTest)
            this.coveredCandidates.push(this.findCoveredCandidate(unitTest))
            this.previousCandidate = this.currentCandidate
            if (new TestResult(this.currentCandidate, unitTest).passes)
                this.methodology.showUselessUnitTestMessage()
            else {
                this.methodology.showUsefulUnitTestMessage()
                this.currentCandidate = this.findSimplestPassingCandidate()
                this.failingTestResult = this.findFailingTestResult()
            }
        }
        else
            this.methodology.showIncorrectUnitTestMessage()
        this.menu()
    }

    private showHint(): void {
        if (this.failingTestResult)
            this.methodology.showHintMessage(this.currentCandidate, this.failingTestResult)
        else
            this.methodology.showNoHintMessage()
        this.menu()
    }

    private prepareSubmitUnitTests(): void {
        new ProcessingMessage('Checking...', () => this.submitUnitTests(), 1000 + this.userdefinedUnitTests.length * 500).add()
    }

    private submitUnitTests(): void {
        if (this.failingTestResult) {
            this.methodology.showBugFoundMessage(this.currentCandidate, this.failingTestResult)
            this.menu()
        }
        else
            this.end()
    }

    private end(): void {
        this.isLevelFinished.set()
        this.methodology.showEndMessage()
        this.callback!()
    }
}

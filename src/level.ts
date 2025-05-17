import { Candidate } from './candidate.js'
import { HumanMessage, CheckingMessage, Panel, ComputerMessage } from './frame.js'
import { Methodology } from './methodology.js'
import { Button, Div, Form, Input, Paragraph, StringMap } from './html.js'
import { TestResult } from './test-result.js'
import { UnitTest } from './unit-test.js'
import { UseCase } from './use-case.js'
import { Completed } from './completed.js'

export class Level {
    protected readonly methodology: Methodology
    protected readonly useCase: UseCase
    private readonly isLevelFinished: Completed
    private readonly exampleGuidance: Generator<string>

    private callback?: () => void
    private humanUnitTests: UnitTest[] = []
    private previousCandidate?: Candidate = undefined
    private coveredCandidate?: Candidate = undefined
    private currentCandidate: Candidate = new Candidate([])
    private failingTestResult?: TestResult = undefined
    private newUnitTest?: UnitTest = undefined
    private numberOfSubmissions: number = 0

    public constructor(methodology: Methodology, useCase: UseCase) {
        this.methodology = methodology
        this.useCase = useCase
        this.isLevelFinished = new Completed(this.description())
        this.exampleGuidance = methodology.exampleGuidanceGenerator(useCase)        
    }

    private nextGuidance(): string {
        const text = this.exampleGuidance.next()
        return text.done ? '' : text.value
    }

    public description(): string {
        return `${this.methodology.name()} - ${this.useCase.name()}`
    }

    public isFinished(): number {
        return this.isLevelFinished.get()
    }

    private reset(): void {
        this.humanUnitTests = []
        this.previousCandidate = undefined
        this.coveredCandidate = undefined
        this.currentCandidate = this.methodology.findSimplestPassingCandidate(this.useCase.candidates, this.useCase.perfectCandidates, this.humanUnitTests)
        this.failingTestResult = this.methodology.findFailingTestResult(this.currentCandidate, this.useCase.hints, this.useCase.minimalUnitTests)
        this.newUnitTest = undefined
        this.numberOfSubmissions = 0
    }

    public play(callback: () => void): void {
        this.callback = callback
        this.reset()
        this.showCurrentLevelPanel()
        const firstMessage = this.nextGuidance()
        if (firstMessage)
            new ComputerMessage([firstMessage]).add()
        const secondMessage = this.nextGuidance()
        if (secondMessage)
            new ComputerMessage([secondMessage]).add()
        this.methodology.showWelcomeMessage()
        this.menu()
    }

    private showCurrentLevelPanel(): void {
        new Panel('Current Level', [new Paragraph().appendText(this.description())]).show()
    }

    private showUnitTestsPanel(): void {
        new Panel('Unit Tests',
            this.humanUnitTests.length === 0
            ? ['You have not written any unit tests yet.']
            : this.humanUnitTests.map(unitTest => new Div().appendText(unitTest.toString()).addClass(unitTest === this.newUnitTest ? 'new' : ''))
        ).show()
        this.newUnitTest = undefined
    }

    private menu(): void {
        this.showPanels()
        this.showMenuMessage()
    }

    private showPanels(): void {
        this.methodology.showPanelsOnMenu(this.useCase.specification(), this.currentCandidate, this.previousCandidate, this.useCase.perfectCandidate, this.coveredCandidate)
        this.showUnitTestsPanel()
    }

    protected showMenuMessage(): void {
        const message = this.nextGuidance()
        if (message)
            new ComputerMessage([message]).add()
        const buttonToClick = this.nextGuidance()
        const fields = [...this.useCase.parameters, this.useCase.unit].map(variable => variable
            .setValue(buttonToClick === 'I want to add this unit test' ? this.nextGuidance() : '')
            .setDisabled(buttonToClick !== '')
            .toHtml()
        )
        const submitButton = new Input()
            .setType('submit')
            .setValue('I want to add this unit test')
            .setDisabled(buttonToClick === 'I want to submit the unit tests')
        new HumanMessage([
            new Form()
                .onSubmit(formData => this.prepareAddUnitTest(formData))
                .appendChildren(fields)
                .appendChild(new Paragraph().appendChild(submitButton)),
            new Div().appendText('OR').addClass('or'),
            new Paragraph().appendChild(
                new Button()
                    .appendText('I want to submit the unit tests')
                    .onClick(() => this.prepareSubmitUnitTests())
                    .setDisabled(buttonToClick === 'I want to add this unit test')
            ),
        ]).add()
    }

    protected prepareAddUnitTest(formData: StringMap): void {
        const argumentList = this.useCase.parameters.map(parameter => parameter.getInput(formData.get(parameter.name)!))
        const expected = this.useCase.unit.getInput(formData.get(this.useCase.unit.name)!)
        const unitTest = new UnitTest(this.useCase.parameters, argumentList, this.useCase.unit, expected)
        new HumanMessage([unitTest.toString()]).add()
        new CheckingMessage('Checking the new unit test', 'I checked the new unit test', () => this.addUnitTest(unitTest), 2000 + this.humanUnitTests.length * 500).add()
    }

    private addUnitTest(unitTest: UnitTest): void {
        const unitTestIsCorrect = new TestResult(this.useCase.perfectCandidate, unitTest).passes
        if (unitTestIsCorrect) {
            this.newUnitTest = unitTest
            this.humanUnitTests.push(unitTest)
            this.previousCandidate = this.currentCandidate
            this.coveredCandidate = this.methodology.findSimplestCoveredCandidate(this.useCase.amputeesOfPerfectCandidate, this.humanUnitTests)
            if (new TestResult(this.currentCandidate, unitTest).passes)
                this.methodology.showUselessUnitTestMessage()
            else {
                this.methodology.showUsefulUnitTestMessage()
                this.currentCandidate = this.methodology.findSimplestPassingCandidate(this.useCase.candidates, this.useCase.perfectCandidates, this.humanUnitTests)
                this.failingTestResult = this.methodology.findFailingTestResult(this.currentCandidate, this.useCase.hints, this.useCase.minimalUnitTests)
            }
        }
        else
            this.methodology.showIncorrectUnitTestMessage()
        this.menu()
    }

    protected prepareSubmitUnitTests(): void {
        new CheckingMessage('Checking the unit tests', 'I checked the unit tests', () => this.submitUnitTests(), 2000 + this.humanUnitTests.length * 500).add()
    }

    private submitUnitTests(): void {
        this.numberOfSubmissions += 1
        if (this.failingTestResult) {
            const numberOfUnitTestsStillNeeded = this.methodology.findNumberOfUnitTestsStillNeeded(this.humanUnitTests, this.useCase.subsetsOfMinimalUnitTests, this.useCase.candidates, this.useCase.perfectCandidates.length)
            this.methodology.showBugFoundMessage(this.currentCandidate, this.failingTestResult, numberOfUnitTestsStillNeeded)
            this.menu()
        }
        else
            this.end()
    }

    protected levelFinishedValue(): number {
        const isExample = this.nextGuidance()
        if (isExample)
            return 1
        return this.numberOfSubmissions
    }

    private end(): void {
        this.isLevelFinished.set(this.levelFinishedValue())
        this.previousCandidate = undefined
        this.coveredCandidate = undefined
        this.showPanels()
        this.methodology.showEndMessage()
        this.processCallback()
    }

    protected processCallback(): void {
        const isExample = this.nextGuidance()
        if (isExample)
            new ComputerMessage([`Congratulations, now you understand the basics of ${this.methodology.name()}.`]).add()
        this.callback!()
    }
}

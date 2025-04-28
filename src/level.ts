import { Candidate } from './candidate.js'
import { HumanMessage, CheckingMessage, Panel } from './frame.js'
import { Methodology } from './methodology.js'
import { Button, Div, Form, Input, Paragraph, StringMap } from './html.js'
import { Random } from './random.js'
import { TestResult } from './test_result.js'
import { UnitTest } from './unit_test.js'
import { UseCase } from './use_case.js'
import { Completed } from './completed.js'

export class Level {
    protected readonly methodology: Methodology
    protected readonly useCase: UseCase
    private readonly isLevelFinished: Completed

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
    }

    public description(): string {
        return `${this.methodology.name()} - ${this.useCase.name()}`
    }

    public isFinished(): number {
        return this.isLevelFinished.get()
    }

    public play(callback: () => void): void {
        this.callback = callback
        this.humanUnitTests = []
        this.previousCandidate = undefined
        this.coveredCandidate = undefined
        this.currentCandidate = this.findSimplestPassingCandidate()
        this.failingTestResult = this.findFailingTestResult()
        this.newUnitTest = undefined
        this.numberOfSubmissions = 0
        this.showCurrentLevelPanel()
        this.methodology.showWelcomeMessage()
        this.menu()
    }

    private findSimplestCandidates(candidates: Candidate[]): Candidate[] {
        return candidates.reduce((simplestCandidatesSoFar: Candidate[], candidate) => {
            if (simplestCandidatesSoFar.length === 0)
                return [candidate]
            const sign = this.methodology.compareComplexity(candidate, simplestCandidatesSoFar[0])
            if (sign < 0)
                return [candidate]
            if (sign > 0)
                return simplestCandidatesSoFar
            return [...simplestCandidatesSoFar, candidate]
        }, [])
    }

    private findSimplestPassingCandidate(): Candidate {
        const passingCandidates = this.useCase.candidates
            .filter(candidate => candidate.failCount(this.humanUnitTests) === 0)
        const passingImperfectCandidates = passingCandidates
            .filter(candidate => !this.useCase.perfectCandidates.includes(candidate))
        if (passingImperfectCandidates.length === 0)
            return Random.elementFrom(this.useCase.perfectCandidates)
        const simplestPassingCandidates = this.findSimplestCandidates(passingImperfectCandidates)
        return Random.elementFrom(simplestPassingCandidates)
    }

    private findCoveredCandidate(unitTest: UnitTest): Candidate {
        const passingCandidates = this.useCase.amputeesOfPerfectCandidate
            .filter(candidate => candidate.failCount([unitTest]) === 0)
        console.log(passingCandidates)
        const simplestPassingCandidates = this.findSimplestCandidates(passingCandidates)
        return Random.elementFrom(simplestPassingCandidates)
    }

    private findFailingTestResult(): TestResult|undefined {
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
        const fields = [...this.useCase.parameters, this.useCase.unit].map(variable => variable.toHtml())
        const submitButton = new Input().setType('submit').setValue('I want to add this unit test')
        new HumanMessage([
            new Form()
                .onSubmit(formData => this.prepareAddUnitTest(formData))
                .appendChildren(fields)
                .appendChild(new Paragraph().appendChild(submitButton)),
            new Div().appendText('OR').addClass('or'),
            new Paragraph().appendChild(
                new Button().appendText('I want to submit the unit tests').onClick(() => this.prepareSubmitUnitTests())
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
            const coveredCandidate = this.findCoveredCandidate(unitTest)
            console.log(coveredCandidate)
            this.coveredCandidate = coveredCandidate.combine(this.coveredCandidate)
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

    protected prepareSubmitUnitTests(): void {
        new CheckingMessage('Checking the unit tests', 'I checked the unit tests', () => this.submitUnitTests(), 2000 + this.humanUnitTests.length * 500).add()
    }

    private submitUnitTests(): void {
        this.numberOfSubmissions += 1
        if (this.failingTestResult) {
            this.methodology.showBugFoundMessage(this.currentCandidate, this.failingTestResult)
            this.menu()
        }
        else
            this.end()
    }

    protected levelFinishedValue(): number { // is overridden in class Example to return 1
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
        this.callback!()
    }
}

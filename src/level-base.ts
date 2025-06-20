import { Candidate } from './candidate.js'
import { HumanMessage, CheckingMessage, Panel, ComputerMessage } from './frame.js'
import { Button, Div, Form, Input, StringMap } from './html.js'
import { Random } from './random.js'
import { TestResult } from './test-result.js'
import { UnitTest } from './unit-test.js'
import { UseCase } from './use-case-base.js'
import { Completed } from './completed.js'

export abstract class Level {
    public abstract name(): string
    public abstract showBasicDefinition(): void
    protected abstract showWelcomeMessage(): void
    protected abstract showSpecificationPanel(specification: string): void
    protected abstract showCurrentFunctionPanel(currentCandidate: Candidate, previousCandidate: Candidate|undefined): void
    protected abstract showCodeCoveragePanel(perfectCandidate: Candidate, coveredCandidate: Candidate|undefined): void
    protected abstract showBugFoundMessage(currentCandidate: Candidate, failingTestResult: TestResult, numberOfUnitTestsStillNeeded: number): void
    protected abstract showEndMessage(): void
    protected abstract showIncorrectUnitTestMessage(): void
    protected abstract showUselessUnitTestMessage(): void
    protected abstract showUsefulUnitTestMessage(): void
    protected abstract exampleGuidanceGenerator(useCase: UseCase): Generator<string>
    protected abstract compareComplexity(candidate: Candidate, otherCandidate: Candidate): number

    private readonly useCase: UseCase
    private readonly isLevelFinished: Completed
    private readonly exampleGuidance: Generator<string>
    private readonly hasExampleGuidance: boolean

    private callback?: () => void
    private humanUnitTests: UnitTest[] = []
    private previousCandidate?: Candidate = undefined
    private coveredCandidate?: Candidate = undefined
    private currentCandidate: Candidate = new Candidate([])
    private failingTestResult?: TestResult = undefined
    private newUnitTest?: UnitTest = undefined
    private numberOfSubmissions: number = 0

    public constructor(useCase: UseCase) {
        this.useCase = useCase
        this.isLevelFinished = new Completed(this.description())
        this.exampleGuidance = this.exampleGuidanceGenerator(useCase)
        this.hasExampleGuidance = this.nextExampleGuidance() !== ''
    }

    private findSimplestCandidate(candidates: Candidate[]): Candidate {
        const simplestCandidates = candidates.reduce((simplestCandidatesSoFar: Candidate[], candidate) => {
            if (simplestCandidatesSoFar.length === 0)
                return [candidate]
            const sign = this.compareComplexity(candidate, simplestCandidatesSoFar[0])
            if (sign < 0)
                return [candidate]
            if (sign > 0)
                return simplestCandidatesSoFar
            return [...simplestCandidatesSoFar, candidate]
        }, [])
        return Random.elementFrom(simplestCandidates)
    }

    public findSimplestPassingCandidate(candidates: Candidate[], perfectCandidates: Candidate[], unitTests: UnitTest[]): Candidate {
        const passingCandidates = candidates.filter(candidate => candidate.passes(unitTests))
        const passingImperfectCandidates = passingCandidates.filter(candidate => !perfectCandidates.includes(candidate))
        if (passingImperfectCandidates.length === 0)
            return Random.elementFrom(perfectCandidates)
        return this.findSimplestCandidate(passingImperfectCandidates)
    }

    public findSimplestCoveredCandidate(amputeesOfPerfectCandidate: Candidate[], unitTests: UnitTest[]): Candidate {
        return unitTests.reduce((simplestCoveredCandidateSoFar: Candidate, unitTest: UnitTest) => {
            const passingCandidates = amputeesOfPerfectCandidate.filter(candidate => candidate.passes([unitTest]))
            const simplestPassingCandidate = this.findSimplestCandidate(passingCandidates)
            return simplestPassingCandidate.combine(simplestCoveredCandidateSoFar)
        }, this.findSimplestPassingCandidate(amputeesOfPerfectCandidate, [], []))
    }

    public findFailingTestResult(candidate: Candidate, hints: UnitTest[], minimalUnitTestsList: UnitTest[]): TestResult|undefined {
        for (const unitTests of [hints, minimalUnitTestsList]) {
            const failingUnitTests = candidate.failingTestResults(unitTests)
            if (failingUnitTests.length > 0)
                return Random.elementFrom(failingUnitTests)
        }
        return undefined
    }

    public findNumberOfUnitTestsStillNeeded(unitTests: UnitTest[], subsetsOfMinimalUnitTests: UnitTest[][], candidates: Candidate[], numberOfPerfectCandidates: number): number {
        for (const subsetOfMinimalUnitTests of subsetsOfMinimalUnitTests) {
            const extendedUnitTests = [...unitTests, ...subsetOfMinimalUnitTests]
            const passingCandidates = candidates.filter(candidate => candidate.passes(extendedUnitTests))
            if (passingCandidates.length === numberOfPerfectCandidates)
                return subsetOfMinimalUnitTests.length
        }
        return Infinity
    }

    private nextExampleGuidance(): string {
        const value = this.exampleGuidance.next()
        return value.done ? '' : value.value
    }

    private showExampleMessage(): void {
        if (this.hasExampleGuidance)
            new ComputerMessage([this.nextExampleGuidance()]).add()
    }

    public description(): string {
        return `${this.name()} - ${this.useCase.name()}`
    }

    public isFinished(): number {
        return this.isLevelFinished.get()
    }

    private initialize(): void {
        this.humanUnitTests = []
        this.previousCandidate = undefined
        this.coveredCandidate = undefined
        this.currentCandidate = this.findSimplestPassingCandidate(this.useCase.candidates, this.useCase.perfectCandidates, this.humanUnitTests)
        this.failingTestResult = this.findFailingTestResult(this.currentCandidate, this.useCase.hints, this.useCase.minimalUnitTests)
        this.newUnitTest = undefined
        this.numberOfSubmissions = 0
    }

    public play(callback: () => void): void {
        this.callback = callback
        this.initialize()
        this.showCurrentLevelPanel()
        this.showExampleMessage()
        this.showExampleMessage()
        this.showWelcomeMessage()
        this.menu()
    }

    private showCurrentLevelPanel(): void {
        new Panel('Current Level', [this.description()]).show()
    }

    private showUnitTestsPanel(unitTests: UnitTest[], newUnitTest: UnitTest|undefined): void {
        new Panel('Unit Tests',
            unitTests.length === 0
            ? ['You have not written any unit tests yet.']
            : unitTests.map(unitTest => new Div().appendText(unitTest.toString()).addClass(unitTest === newUnitTest ? 'new' : 'old'))
        ).show()
    }

    private menu(): void {
        this.showPanels()
        this.showMenuMessage()
    }

    private showPanels(): void {
        this.showSpecificationPanel(this.useCase.specification())
        this.showCurrentFunctionPanel(this.currentCandidate, this.previousCandidate)
        this.showCodeCoveragePanel(this.useCase.perfectCandidate, this.coveredCandidate)
        this.showUnitTestsPanel(this.humanUnitTests, this.newUnitTest)
        this.newUnitTest = undefined
    }

    private showMenuMessage(): void {
        this.showExampleMessage()
        const buttonText = this.hasExampleGuidance ? this.nextExampleGuidance() : undefined
        const elementsToShow = []
        if (!buttonText || buttonText === 'I want to add this unit test') {
            const variables = [...this.useCase.parameters, this.useCase.unit]
            if (buttonText)
                variables.forEach(variable => variable.setValue(this.nextExampleGuidance()).setDisabled(true))
            const addThisUnitTestButton = new Input().setType('submit').setValue('I want to add this unit test')
            const form = new Form()
                .onSubmit(formData => this.prepareAddUnitTest(formData))
                .appendChildren(variables.map(variable => variable.toHtml()))
                .appendChild(addThisUnitTestButton)
            elementsToShow.push(form)
        }
        if (!buttonText) {
            const divider = new Div().appendText('OR').addClass('or')
            elementsToShow.push(divider)
        }
        if (!buttonText || buttonText === 'I want to submit the unit tests') {
            const submitTheUnitTestsButton = new Button().appendText('I want to submit the unit tests').onClick(() => this.prepareSubmitUnitTests())
            elementsToShow.push(submitTheUnitTestsButton)
        }
        new HumanMessage(elementsToShow).add()
    }

    private prepareAddUnitTest(formData: StringMap): void {
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
            this.coveredCandidate = this.findSimplestCoveredCandidate(this.useCase.amputeesOfPerfectCandidate, this.humanUnitTests)
            if (new TestResult(this.currentCandidate, unitTest).passes)
                this.showUselessUnitTestMessage()
            else {
                this.showUsefulUnitTestMessage()
                this.currentCandidate = this.findSimplestPassingCandidate(this.useCase.candidates, this.useCase.perfectCandidates, this.humanUnitTests)
                this.failingTestResult = this.findFailingTestResult(this.currentCandidate, this.useCase.hints, this.useCase.minimalUnitTests)
            }
        }
        else
            this.showIncorrectUnitTestMessage()
        this.menu()
    }

    private prepareSubmitUnitTests(): void {
        new CheckingMessage('Checking the unit tests', 'I checked the unit tests', () => this.submitUnitTests(), 2000 + this.humanUnitTests.length * 500).add()
    }

    private submitUnitTests(): void {
        this.numberOfSubmissions += 1
        if (this.failingTestResult) {
            const numberOfUnitTestsStillNeeded = this.findNumberOfUnitTestsStillNeeded(this.humanUnitTests, this.useCase.subsetsOfMinimalUnitTests, this.useCase.candidates, this.useCase.perfectCandidates.length)
            this.showBugFoundMessage(this.currentCandidate, this.failingTestResult, numberOfUnitTestsStillNeeded)
            this.menu()
        }
        else
            this.end()
    }

    private end(): void {
        if (this.hasExampleGuidance)
            this.numberOfSubmissions = Number(this.nextExampleGuidance())
        this.isLevelFinished.set(this.numberOfSubmissions)
        this.previousCandidate = undefined
        this.coveredCandidate = undefined
        this.showPanels()
        this.showEndMessage()
        this.showExampleMessage()
        this.callback!()
    }
}

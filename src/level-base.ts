import { Candidate } from './candidate.js'
import { Completed } from './completed.js'
import { HumanMessage, CheckingMessage, Panel, ComputerMessage } from './frame.js'
import { Button, Div, Form, Input, StringMap } from './html.js'
import { Locale } from './locale.js'
import { Random } from './random.js'
import { TestResult } from './test-result.js'
import { UnitTest } from './unit-test.js'
import { UseCase } from './use-case-base.js'

export abstract class Level {
    public abstract identifier(): string
    public abstract name(): string
    protected abstract showWelcomeMessage(): void
    protected abstract showSpecificationPanel(specification: string): void
    protected abstract showCurrentFunctionPanel(currentCandidate: Candidate, previousCandidate: Candidate|undefined): void
    protected abstract showCodeCoveragePanel(perfectCandidate: Candidate, coveredCandidate: Candidate|undefined): void
    protected abstract showBugFoundMessage(currentCandidate: Candidate, failingTestResult: TestResult, numberOfUnitTestsStillNeeded: number): void
    protected abstract showEndMessage(): void
    protected abstract showIncorrectUnitTestMessage(): void
    protected abstract showUselessUnitTestMessage(): void
    protected abstract showUsefulUnitTestMessage(): void
    protected abstract exampleStringGenerator(useCase: UseCase): Generator<string>
    protected abstract compareComplexity(candidate: Candidate, otherCandidate: Candidate): number

    protected readonly locale: Locale
    private readonly useCase: UseCase
    private readonly levelNumber: number
    private readonly totalNumberOfLevels: number
    private readonly isLevelFinished: Completed
    private readonly exampleStrings: string[]

    private callback?: () => void
    private humanUnitTests: UnitTest[] = []
    private previousCandidate?: Candidate = undefined
    private coveredCandidate?: Candidate = undefined
    private currentCandidate: Candidate = new Candidate([])
    private failingTestResult?: TestResult = undefined
    private newUnitTest?: UnitTest = undefined
    private numberOfSubmissions: number = 0

    public constructor(locale: Locale, useCase: UseCase, levelNumber: number, totalNumberOfLevels: number) {
        this.locale = locale
        this.useCase = useCase
        this.levelNumber = levelNumber
        this.totalNumberOfLevels = totalNumberOfLevels
        this.isLevelFinished = new Completed(`level-${this.identifier()}-${useCase.identifier()}-finished`)
        this.exampleStrings = [...this.exampleStringGenerator(useCase)]
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

    private nextExampleString(): string {
        return this.exampleStrings.shift() || ''
    }

    private showExampleMessage(): void {
        const exampleMessage = this.nextExampleString()
        if (exampleMessage)
            new ComputerMessage([exampleMessage]).add()
    }

    public description(): string {
        const emoji = ['🔓', '🥇', '🥈', '🥉'].at(this.isFinished()) || '🥉'
        return this.locale.level(this.levelNumber, this.totalNumberOfLevels, this.name(), this.useCase.name(), emoji)
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
        new Panel('current-level', this.locale.currentLevel(), [this.description()]).show()
    }

    private showUnitTestsPanel(unitTests: UnitTest[], newUnitTest: UnitTest|undefined): void {
        new Panel('unit-tests', this.locale.unitTests(),
            unitTests.length === 0
            ? [new Div().appendText(this.locale.youHaveNotWrittenAnyUnitTestsYet())]
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
        const buttonText = this.nextExampleString()
        const elementsToShow = []
        const disableIWantToAddThisUnitTest = buttonText !== '' && buttonText !== this.locale.iWantToAddThisUnitTest().toString()
        const variables = [...this.useCase.parameters, this.useCase.unit]
        if (buttonText === this.locale.iWantToAddThisUnitTest().toString())
            variables.forEach(variable => variable.setValue(this.nextExampleString()).setDisabled(true))
        else
            variables.forEach(variable => variable.setValue(''))
        const addThisUnitTestButton = new Input()
            .setType('submit')
            .setValue(this.locale.iWantToAddThisUnitTest().toString())
            .setDisabled(disableIWantToAddThisUnitTest)
        const form = new Form()
            .onSubmit(formData => this.prepareAddUnitTest(formData))
            .appendChildren(variables.map(variable => variable.toHtml()))
            .appendChild(addThisUnitTestButton)
        elementsToShow.push(form)
        const divider = new Div().appendText(this.locale.or()).addClass('or')
        elementsToShow.push(divider)
        const disableIWantToSubmitTheUnitTests = buttonText !== '' && buttonText !== this.locale.iWantToSubmitTheUnitTests().toString()
        const submitTheUnitTestsButton = new Button()
            .appendText(this.locale.iWantToSubmitTheUnitTests())
            .onClick(() => this.prepareSubmitUnitTests())
            .setDisabled(disableIWantToSubmitTheUnitTests)
        elementsToShow.push(submitTheUnitTestsButton)
        new HumanMessage(elementsToShow).add()
    }

    private prepareAddUnitTest(formData: StringMap): void {
        const argumentList = this.useCase.parameters.map(parameter => parameter.getInput(formData.get(parameter.name)!))
        const expected = this.useCase.unit.getInput(formData.get(this.useCase.unit.name)!)
        const unitTest = new UnitTest(this.useCase.parameters, argumentList, this.useCase.unit, expected)
        new HumanMessage([unitTest.toString()]).add()
        new CheckingMessage(this.locale.checkingTheNewUnitTest(), this.locale.iCheckedTheNewUnitTest(), () => this.addUnitTest(unitTest), 2000 + this.humanUnitTests.length * 500).add()
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
        new CheckingMessage(this.locale.checkingTheUnitTests(), this.locale.iCheckedTheUnitTests(), () => this.submitUnitTests(), 2000 + this.humanUnitTests.length * 500).add()
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
        if (this.exampleStrings)
            this.numberOfSubmissions = 1
        this.isLevelFinished.set(this.numberOfSubmissions)
        this.previousCandidate = undefined
        this.coveredCandidate = undefined
        this.showPanels()
        this.showEndMessage()
        this.showExampleMessage()
        this.callback!()
    }
}

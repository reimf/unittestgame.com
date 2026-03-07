import { Candidate } from './candidate.js'
import { Completed } from './completed.js'
import { HumanMessage, CheckingMessage, Panel, ComputerMessage } from './frame.js'
import { Button, Code, Div, Form, Input, ListItem, OrderedList, Paragraph, StringMap } from './html.js'
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
    protected abstract showCurrentFunctionPanel(currentCandidate: Candidate, previousCurrentCandidate: Candidate|undefined): void
    protected abstract showTheFunctionPanel(perfectCandidate: Candidate, coveredCandidate: Candidate|undefined, previousCoveredCandidate: Candidate|undefined, lastCoveredCandidate: Candidate|undefined): void
    protected abstract showBugFoundMessage(currentCandidate: Candidate, failingTestResult: TestResult, numberOfUnitTestsStillNeeded: number): void
    protected abstract showEndMessage(): void
    protected abstract showIncorrectUnitTestMessage(): void
    protected abstract showUselessUnitTestMessage(): void
    protected abstract showUsefulUnitTestMessage(): void
    protected abstract exampleStringGenerator(useCase: UseCase): Generator<string>
    protected abstract compareComplexity(candidate: Candidate, otherCandidate: Candidate): number

    protected readonly locale: Locale
    public readonly useCase: UseCase
    public readonly levelNumber: number
    private readonly isLevelFinished: Completed
    private readonly exampleStrings: string[]
    public readonly isExample: boolean

    private callback?: () => void
    private humanUnitTests: UnitTest[] = []
    private perfectCandidate: Candidate
    private amputeesOfPerfectCandidate: Candidate[]
    private coveredCandidate: Candidate|undefined = undefined
    private previousCoveredCandidate: Candidate|undefined = undefined
    private lastCoveredCandidate: Candidate|undefined = undefined
    private currentCandidate: Candidate = new Candidate([])
    private previousCurrentCandidate: Candidate|undefined = undefined
    private failingTestResult: TestResult|undefined = undefined
    private lastUnitTest: UnitTest|undefined = undefined
    private numberOfSubmissions: number = 0

    public constructor(locale: Locale, useCase: UseCase, levelNumber: number) {
        this.locale = locale
        this.useCase = useCase
        this.levelNumber = levelNumber
        this.isLevelFinished = new Completed(`level-${this.identifier()}-${useCase.identifier()}-finished`)
        this.exampleStrings = [...this.exampleStringGenerator(useCase)]
        this.isExample = this.exampleStrings.length > 0
        this.perfectCandidate = this.getRandomElementFrom(this.useCase.perfectCandidates)
        this.amputeesOfPerfectCandidate = this.useCase.findAmputeesOf(this.perfectCandidate)
    }

    private getRandomElementFrom<T>(elements: readonly T[]): T {
        if (this.isExample)
            return elements[0]!
        return Random.elementFrom(elements)
    }

    private findSimplestCandidate(candidates: readonly Candidate[]): Candidate {
        const simplestCandidates = candidates.reduce((simplestCandidatesSoFar: Candidate[], candidate) => {
            if (simplestCandidatesSoFar.length === 0)
                return [candidate]
            const sign = this.compareComplexity(candidate, simplestCandidatesSoFar[0]!)
            if (sign < 0)
                return [candidate]
            if (sign > 0)
                return simplestCandidatesSoFar
            return [...simplestCandidatesSoFar, candidate]
        }, [])
        return this.getRandomElementFrom(simplestCandidates)
    }

    public findSimplestPassingCandidate(candidates: readonly Candidate[], perfectCandidates: readonly Candidate[], unitTests: readonly UnitTest[]): Candidate {
        const passingCandidates = candidates.filter(candidate => candidate.passes(unitTests))
        const passingImperfectCandidates = passingCandidates.filter(candidate => !perfectCandidates.includes(candidate))
        if (passingImperfectCandidates.length === 0)
            return this.getRandomElementFrom(perfectCandidates)
        return this.findSimplestCandidate(passingImperfectCandidates)
    }

    public findSimplestCoveredCandidate(unitTests: readonly UnitTest[]): Candidate {
        return unitTests.reduce((simplestCoveredCandidateSoFar: Candidate, unitTest: UnitTest) => {
            const passingCandidates = this.amputeesOfPerfectCandidate.filter(candidate => candidate.passes([unitTest]))
            const simplestPassingCandidate = this.findSimplestCandidate(passingCandidates)
            return simplestPassingCandidate.combine(simplestCoveredCandidateSoFar)
        }, this.findSimplestPassingCandidate(this.amputeesOfPerfectCandidate, [], []))
    }

    public findFailingTestResult(candidate: Candidate, hints: readonly UnitTest[], minimalUnitTestsList: readonly UnitTest[]): TestResult|undefined {
        for (const unitTests of [hints, minimalUnitTestsList]) {
            const failingUnitTests = candidate.failingTestResults(unitTests)
            if (failingUnitTests.length > 0)
                return this.getRandomElementFrom(failingUnitTests)
        }
        return undefined
    }

    public findNumberOfUnitTestsStillNeeded(unitTests: readonly UnitTest[], subsetsOfMinimalUnitTests: readonly UnitTest[][], candidates: readonly Candidate[], numberOfPerfectCandidates: number): number {
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

    private showMessageIfExample(): void {
        if (this.isExample)
            new ComputerMessage([this.nextExampleString()]).add()
    }

    public emoji(nextLevel?: Level): string {
        return this === nextLevel ? '▶️' : ['🔒', '🥇', '🥈', '🥉'].at(this.isFinished()) || '🥉'
    }

    public description(): string {
        return this.locale.level(this.levelNumber, this.name(), this.useCase.name())
    }

    public isFinished(): number {
        return this.isLevelFinished.get()
    }

    private initialize(): void {
        this.humanUnitTests = []
        this.coveredCandidate = undefined
        this.previousCoveredCandidate = undefined
        this.lastCoveredCandidate = undefined
        this.currentCandidate = this.findSimplestPassingCandidate(this.useCase.candidates, this.useCase.perfectCandidates, this.humanUnitTests)
        this.previousCurrentCandidate = undefined
        this.failingTestResult = this.findFailingTestResult(this.currentCandidate, this.useCase.hints, this.useCase.minimalUnitTests)
        this.lastUnitTest = undefined
        this.numberOfSubmissions = 0
    }

    public play(callback: () => void): void {
        this.callback = callback
        this.initialize()
        this.showCurrentLevelPanel()
        this.showMessageIfExample()
        this.showMessageIfExample()
        this.showWelcomeMessage()
        this.menu()
    }

    private showCurrentLevelPanel(): void {
        new Panel('current-level', this.locale.currentLevel(), [this.description()]).show()
    }

    private showUnitTestsPanel(unitTests: readonly UnitTest[], lastUnitTest?: UnitTest): void {
        new Panel('unit-tests', this.locale.unitTests(),
            unitTests.length === 0
            ? [new Paragraph().appendText(this.locale.youHaveNotWrittenAnyUnitTestsYet())]
            : [new OrderedList().appendChildren(
                unitTests.map(unitTest =>
                    new ListItem().appendChild(
                        new Code().appendChild(
                            unitTest.toHtml().addClass(unitTest === lastUnitTest ? 'new' : 'old')
                        )
                    )
                )
            )]
        ).show()
    }

    private menu(): void {
        this.showPanels()
        this.showMenuMessage()
    }

    private showPanels(): void {
        this.showSpecificationPanel(this.useCase.specification())
        this.showCurrentFunctionPanel(this.currentCandidate, this.previousCurrentCandidate)
        this.showTheFunctionPanel(this.perfectCandidate, this.coveredCandidate, this.previousCoveredCandidate, this.lastCoveredCandidate)
        this.showUnitTestsPanel(this.humanUnitTests, this.lastUnitTest)
    }

    private showMenuMessage(): void {
        this.showMessageIfExample()
        const addThisUnitTestButton = new Input()
            .setType('submit')
            .setValue(this.locale.iWantToAddThisUnitTest())
        const submitTheUnitTestsButton = new Button()
            .appendText(this.locale.iWantToSubmitTheUnitTests())
            .onClick(() => this.prepareSubmitUnitTests())
        const variables = [...this.useCase.parameters, this.useCase.unit]
        variables.forEach(variable => variable.setDisabled(this.isExample))
        if (this.isExample) {
            const buttonText = this.nextExampleString()
            if (buttonText === this.locale.iWantToAddThisUnitTest()) {
                variables.forEach(variable => variable.setValue(this.nextExampleString()))
                submitTheUnitTestsButton.setDisabled(true)
            }
            if (buttonText === this.locale.iWantToSubmitTheUnitTests()) {
                variables.forEach(variable => variable.setValue(""))
                addThisUnitTestButton.setDisabled(true)
            }
        }
        const form = new Form()
            .onSubmit(formData => this.prepareAddUnitTest(formData))
            .appendChildren(variables.map(variable => variable.toHtml()))
            .appendChild(addThisUnitTestButton)
        const divider = new Div().appendText(this.locale.or()).addClass('or')
        new HumanMessage([form, divider, submitTheUnitTestsButton]).add()
    }

    private prepareAddUnitTest(formData: StringMap): void {
        const argumentList = this.useCase.parameters.map(parameter => parameter.getInput(formData.get(parameter.name)!))
        const expected = this.useCase.unit.getInput(formData.get(this.useCase.unit.name)!)
        const unitTest = new UnitTest(this.useCase.parameters, argumentList, this.useCase.unit, expected)
        new HumanMessage([new Code().appendChild(unitTest.toHtml().addClass('new'))]).add()
        new CheckingMessage(this.locale.checkingTheNewUnitTest(), this.locale.iCheckedTheNewUnitTest(), () => this.addUnitTest(unitTest), 500 + this.humanUnitTests.length * 250).add()
    }

    private addUnitTest(unitTest: UnitTest): void {
        const unitTestIsCorrect = new TestResult(this.perfectCandidate, unitTest).passes
        if (unitTestIsCorrect) {
            this.lastUnitTest = unitTest
            this.humanUnitTests.push(unitTest)
            this.previousCurrentCandidate = this.currentCandidate
            this.lastCoveredCandidate = this.findSimplestCoveredCandidate([unitTest])
            this.previousCoveredCandidate = this.coveredCandidate
            this.coveredCandidate = this.findSimplestCoveredCandidate(this.humanUnitTests)
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
        new CheckingMessage(this.locale.checkingTheUnitTests(), this.locale.iCheckedTheUnitTests(), () => this.submitUnitTests(), 500 + this.humanUnitTests.length * 250).add()
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
        if (this.isExample)
            this.numberOfSubmissions = 1
        this.isLevelFinished.set(this.numberOfSubmissions)
        this.previousCurrentCandidate = undefined
        this.coveredCandidate = undefined
        this.previousCoveredCandidate = undefined
        this.lastCoveredCandidate = undefined
        this.showPanels()
        this.showEndMessage()
        this.showMessageIfExample()
        this.callback!()
    }
}

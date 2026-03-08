import { Candidate } from './candidate.js'
import { Completed } from './completed.js'
import { HumanMessage, CheckingMessage, Panel, ComputerMessage } from './frame.js'
import { Button, Code, Div, Form, Input, ListItem, OrderedList, Paragraph, StringMap } from './html.js'
import { Locale } from './locale.js'
import { Random } from './random.js'
import { TestResult } from './test-result.js'
import { UnitTest } from './unit-test.js'
import { Variable } from './variable.js'

export abstract class Level {
    protected readonly locale: Locale
    public readonly levelNumber: number
    private readonly isLevelFinished: Completed
    private readonly exampleStrings: string[]
    public readonly isExample: boolean
    public abstract identifier(): string
    public abstract name(): string
    public abstract specification(): string
    protected abstract getParameters(): Variable[]
    protected abstract getUnit(): Variable
    protected abstract getCandidateElements(): string[][]
    protected abstract minimalUnitTestGenerator(): Generator<any[]>
    protected abstract hintGenerator(): Generator<any[]>
    protected* exampleStringGenerator(): Generator<string> { }

    private callback?: () => void
    private humanUnitTests: UnitTest[] = []
    private perfectCandidate: Candidate
    private currentCandidate: Candidate = new Candidate([])
    private previousCurrentCandidate: Candidate|undefined = undefined
    private failingTestResult: TestResult|undefined = undefined
    private lastUnitTest: UnitTest|undefined = undefined
    private numberOfSubmissions: number = 0
    public readonly parameters: Variable[] = this.getParameters()
    public readonly unit: Variable = this.getUnit()
    public readonly candidates: Candidate[] = [...this.generateCandidates(this.getCandidateElements(), [])]
    public readonly minimalUnitTests: UnitTest[] = [...this.generateMinimalUnitTests()]
    public readonly subsetsOfMinimalUnitTests: UnitTest[][] = [...this.generateSubsets(this.minimalUnitTests)]
    public readonly perfectCandidates: Candidate[] = this.findPerfectCandidates()
    public readonly hints: UnitTest[] = [...this.generateHints()]

    public constructor(locale: Locale, levelNumber: number) {
        this.locale = locale
        this.levelNumber = levelNumber
        this.isLevelFinished = new Completed(`level-${this.identifier()}-finished`)
        this.exampleStrings = [...this.exampleStringGenerator()]
        this.isExample = this.exampleStrings.length > 0
        this.perfectCandidate = this.getRandomElementFrom(this.perfectCandidates)
    }

    private getRandomElementFrom<T>(elements: readonly T[]): T {
        if (this.isExample)
            return elements[0]!
        return Random.elementFrom(elements)
    }

    private* generateCandidates(listOfListOfLines: string[][], lines: string[]): Generator<Candidate> {
        if (listOfListOfLines.length > 0) {
            const [firstListOfLines, ...remainingListOfListOfLines] = listOfListOfLines
            if (firstListOfLines)
                for (const line of firstListOfLines)
                    yield* this.generateCandidates(remainingListOfListOfLines, [...lines, line])
        }
        else
            yield this.createCandidate(lines)
    }

    private createCandidate(lines: readonly string[]): Candidate {
        const parameterList = this.parameters.map(parameter => parameter.name).join(', ')
        const indentedLines = [
            `function ${this.unit.name}(${parameterList}) {`,
                ...lines.map(line => line ? '  ' + line : ''),
            '}',
        ]
        return new Candidate(indentedLines)
    }

    private* generateMinimalUnitTests(): Generator<UnitTest> {
        for (const [argumentList, expected] of this.minimalUnitTestGenerator()) {
            yield new UnitTest(this.parameters, argumentList, this.unit, expected)
        }
    }

    private* generateSubsets(unitTests: UnitTest[]): Generator<UnitTest[]> {
        const n = unitTests.length
        const total = 1 << n
        for (let size = 0; size <= n; size++) {
            for (let mask = 0; mask < total; mask++) {
                const subset = unitTests.filter((_, i) => mask & (1 << i))
                if (subset.length === size)
                    yield subset
            }
        }
    }

    private* generateHints(): Generator<UnitTest> {
        const perfectCandidate = this.perfectCandidates[0]!
        for (const argumentList of this.hintGenerator())
            yield new UnitTest(this.parameters, argumentList, this.unit, perfectCandidate.execute(argumentList))
    }

    private findPerfectCandidates(): Candidate[] {
        return this.candidates.filter(candidate => candidate.passes(this.minimalUnitTests))
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
        return this.locale.level(this.levelNumber, this.name())
    }

    public isFinished(): number {
        return this.isLevelFinished.get()
    }

    private initialize(): void {
        this.humanUnitTests = []
        this.currentCandidate = this.findSimplestPassingCandidate(this.candidates, this.perfectCandidates, this.humanUnitTests)
        this.previousCurrentCandidate = undefined
        this.failingTestResult = this.findFailingTestResult(this.currentCandidate, this.hints, this.minimalUnitTests)
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
        this.showSpecificationPanel(this.specification())
        this.showCurrentFunctionPanel(this.currentCandidate, this.previousCurrentCandidate)
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
        const variables = [...this.parameters, this.unit]
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
        const argumentList = this.parameters.map(parameter => parameter.getInput(formData.get(parameter.name)!))
        const expected = this.unit.getInput(formData.get(this.unit.name)!)
        const unitTest = new UnitTest(this.parameters, argumentList, this.unit, expected)
        new HumanMessage([new Code().appendChild(unitTest.toHtml().addClass('new'))]).add()
        new CheckingMessage(this.locale.checkingTheNewUnitTest(), this.locale.iCheckedTheNewUnitTest(), () => this.addUnitTest(unitTest), 500 + this.humanUnitTests.length * 250).add()
    }

    private addUnitTest(unitTest: UnitTest): void {
        const unitTestIsCorrect = new TestResult(this.perfectCandidate, unitTest).passes
        if (unitTestIsCorrect) {
            this.lastUnitTest = unitTest
            this.humanUnitTests.push(unitTest)
            this.previousCurrentCandidate = this.currentCandidate
            if (new TestResult(this.currentCandidate, unitTest).passes)
                this.showUselessUnitTestMessage()
            else {
                this.showUsefulUnitTestMessage()
                this.currentCandidate = this.findSimplestPassingCandidate(this.candidates, this.perfectCandidates, this.humanUnitTests)
                this.failingTestResult = this.findFailingTestResult(this.currentCandidate, this.hints, this.minimalUnitTests)
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
            const numberOfUnitTestsStillNeeded = this.findNumberOfUnitTestsStillNeeded(this.humanUnitTests, this.subsetsOfMinimalUnitTests, this.candidates, this.perfectCandidates.length)
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
        this.showPanels()
        this.showEndMessage()
        this.showMessageIfExample()
        this.callback!()
    }

    protected showWelcomeMessage(): void {
        new ComputerMessage([this.locale.step1TDD()]).add()
        new ComputerMessage([this.locale.step2TDD()]).add()
        new ComputerMessage([this.locale.step3TDD()]).add()
    }

    protected showSpecificationPanel(specification: string): void {
        new Panel('specification', this.locale.specification(), [specification]).show()
    }

    private getDifferenceCurrentHtml(currentCandidate: Candidate, previousCurrentCandidate: Candidate|undefined): Paragraph {
        if (previousCurrentCandidate)
            return currentCandidate.toHtmlWithPreviousCurrent(previousCurrentCandidate)
        return new Paragraph().appendText(this.locale.noPreviousCurrentFunction())
    }

    protected showCurrentFunctionPanel(currentCandidate: Candidate, previousCurrentCandidate: Candidate|undefined): void {
        new Panel('current-function', this.locale.currentFunction(), [
            currentCandidate.toHtml()
        ]).show()
        new Panel('difference-current-function', this.locale.differenceFromThePreviousCurrentFunction(), [
            this.getDifferenceCurrentHtml(currentCandidate, previousCurrentCandidate)
        ]).show()
    }

    protected showIncorrectUnitTestMessage(): void {
        new ComputerMessage([this.locale.iDidNotAddTheUnitTest()]).add()
    }

    protected showUselessUnitTestMessage(): void {
        new ComputerMessage([this.locale.iAddedTheUnitTestButTheCurrentFunctionAlreadyPassedThisUnitTest()]).add()
        new ComputerMessage([this.locale.tryToWriteUnitTestsThatDoNotPass()]).add()
    }

    protected showUsefulUnitTestMessage(): void {
        new ComputerMessage([this.locale.iAddedTheUnitTestAndImprovedTheCurrentFunction()]).add()
    }

    protected showBugFoundMessage(_currentCandidate: Candidate, failingTestResult: TestResult, numberOfUnitTestsStillNeeded: number): void {
        new ComputerMessage([this.locale.theCurrentFunctionIsNotAccordingToTheSpecification()]).add()
        new ComputerMessage([this.locale.itProducesTheFollowingIncorrectResult(), new Code().appendChild(failingTestResult.toHtml().addClass('new'))]).add()
        new ComputerMessage([this.locale.writeAUnitTestThatIsAccordingToTheSpecification(numberOfUnitTestsStillNeeded)]).add()
    }

    protected showEndMessage(): void {
        new ComputerMessage([this.locale.theCurrentFunctionIsIndeedAccordingToTheSpecification()]).add()
        new ComputerMessage([this.locale.wellDone()]).add()
    }

    protected compareComplexity(candidate: Candidate, otherCandidate: Candidate): number {
        return candidate.compareComplexity(otherCandidate)
    }
}

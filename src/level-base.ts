import { Candidate } from './candidate.js'
import { Store } from './store.js'
import { ComputerMessage, HumanMessage, Panel } from './frame.js'
import { Button, CodeBlock, Div, Form, ListItem, OrderedList, Submit } from './html.js'
import { ConversationLanguage, ConversationText } from './conversation-language-base.js'
import { Picker } from './picker.js'
import { TestResult } from './test-result.js'
import { UnitTest } from './unit-test.js'
import { BooleanVariable, IntegerVariable, RadioVariable, TextVariable, Value, Variable } from './variable.js'
import { ProgrammingLanguage } from './programming-language-base.js'

export type AnyLevel = Level<readonly Value[], Value>

export abstract class Level<Parameters extends readonly Value[], Result extends Value> {
    protected readonly conversationLanguage: ConversationLanguage
    protected readonly programmingLanguage: ProgrammingLanguage
    public readonly levelNumber: number
    protected readonly picker: Picker

    private readonly store: Store
    // the following attributes should all be private, but some are public because they are used in tests
    public readonly parameters: Variable[]
    public readonly unit: Variable
    public readonly candidates: Candidate<Parameters, Result>[]
    public readonly minimalUnitTests: UnitTest<Parameters, Result>[]
    public readonly subsetsOfMinimalUnitTests: UnitTest<Parameters, Result>[][]
    public readonly perfectCandidates: Candidate<Parameters, Result>[]
    private readonly perfectCandidate: Candidate<Parameters, Result>
    private readonly humanUnitTests: UnitTest<Parameters, Result>[] = []
    public readonly hints: UnitTest<Parameters, Result>[]

    private callback?: () => void
    private currentCandidate: Candidate<Parameters, Result>
    private previousCandidate: Candidate<Parameters, Result>|undefined = undefined
    private failingTestResult: TestResult<Parameters, Result>|undefined = undefined
    private lastUnitTest: UnitTest<Parameters, Result>|undefined = undefined
    private numberOfSubmissions: number = 0

    public constructor(conversationLanguage: ConversationLanguage, programmingLanguage: ProgrammingLanguage, picker: Picker, store: Store, levelNumber: number) {
        this.conversationLanguage = conversationLanguage
        this.programmingLanguage = programmingLanguage
        this.picker = picker
        this.store = store
        this.levelNumber = levelNumber
        const candidateElements = this.getCandidateElements()
        this.parameters = this.getParameters(candidateElements)
        this.unit = this.getUnit(candidateElements)
        this.candidates = [...this.generateCandidates(candidateElements, [])]
        this.minimalUnitTests = [...this.generateMinimalUnitTests()]
        this.subsetsOfMinimalUnitTests = [...this.generateAllSubsetsOrderedBySize(this.minimalUnitTests)]
        this.perfectCandidates = this.findPerfectCandidates()
        this.perfectCandidate = this.picker.elementFrom(this.perfectCandidates)
        this.hints = [...this.generateHints()]
        this.currentCandidate = this.findSimplestPassingCandidate(this.candidates, this.perfectCandidates, this.humanUnitTests)
        this.failingTestResult = this.findFailingTestResult(this.currentCandidate, this.hints, this.minimalUnitTests)
    }

    protected abstract identifier(): string
    protected abstract name(): string
    protected abstract specification(): ConversationText
    protected abstract getCandidateElements(): string[][]
    protected abstract minimalUnitTestGenerator(): Generator<[Parameters, Result]>
    protected abstract hintGenerator(): Generator<Parameters>

    private getParameters(candidateElements: readonly string[][]): Variable[] {
        const functionDefinition = candidateElements[0]![0]!
        const parameterList = functionDefinition.match(/\((.*)\)/)![1]!
        return parameterList.split(', ').map(parameter => {
            const [name, type] = parameter.split(': ')
            const label = this.conversationLanguage.parameterLabel(name!)
            if (type === 'number')
                return new IntegerVariable(label, name!)
            return new TextVariable(label, name!)
        })
    }

    private getUnit(candidateElements: readonly string[][]): Variable {
        const functionDefinition = candidateElements[0]![0]!
        const name = functionDefinition.match(/^function (\w+)/)![1]!
        const returnType = functionDefinition.match(/\):\s*(\w+)/)![1]!
        const parameterList = functionDefinition.match(/\((.*)\)/)![1]!
        const parameterNames = parameterList.split(', ').map(parameter => parameter.split(': ')[0])
        const label = this.conversationLanguage.returnValueLabel(`${name}(${parameterNames.join(', ')})`)
        if (returnType === 'boolean')
            return new BooleanVariable(label, name)
        const returnValues = candidateElements.flat()
            .map(line => line.match(/return (.+)$/)?.[1])
            .filter((value): value is string => value !== undefined)
        if (returnValues.some(value => !/^"[^"]*"$/.test(value)))
            return new TextVariable(label, name)
        const texts = [...new Set(returnValues)]
            .filter(value => value !== '""')
            .map(value => ConversationLanguage.bless(value.slice(1, -1)))
        return new RadioVariable(label, name, texts)
    }

    private* generateCandidates(listOfListOfLines: string[][], lines: string[]): Generator<Candidate<Parameters, Result>> {
        if (listOfListOfLines.length > 0) {
            const [firstListOfLines, ...remainingListOfListOfLines] = listOfListOfLines
            if (firstListOfLines)
                for (const line of firstListOfLines)
                    yield* this.generateCandidates(remainingListOfListOfLines, [...lines, line])
        }
        else
            yield new Candidate<Parameters, Result>(lines)
    }

    private* generateMinimalUnitTests(): Generator<UnitTest<Parameters, Result>> {
        for (const [argumentList, expected] of this.minimalUnitTestGenerator()) {
            yield new UnitTest(this.parameters, argumentList, this.unit, expected)
        }
    }

    private* generateSubsetsOfGivenSize(unitTests: UnitTest<Parameters, Result>[], size: number, current: UnitTest<Parameters, Result>[]): Generator<UnitTest<Parameters, Result>[]> {
        if (current.length === size)
            yield current
        else
            for (let index = 0; index < unitTests.length; index++)
                yield* this.generateSubsetsOfGivenSize(unitTests.slice(index + 1), size, [...current, unitTests[index]!])
    }

    private* generateAllSubsetsOrderedBySize(unitTests: UnitTest<Parameters, Result>[]): Generator<UnitTest<Parameters, Result>[]> {
        for (let size = 0; size <= unitTests.length; size++)
            yield* this.generateSubsetsOfGivenSize(unitTests, size, [])
    }

    private* generateHints(): Generator<UnitTest<Parameters, Result>> {
        const perfectCandidate = this.perfectCandidates[0]!
        for (const argumentList of this.hintGenerator())
            yield new UnitTest(this.parameters, argumentList, this.unit, perfectCandidate.execute(argumentList)!)
    }

    private findPerfectCandidates(): Candidate<Parameters, Result>[] {
        return this.candidates.filter(candidate => candidate.passes(this.minimalUnitTests))
    }

    private findSimplestCandidate(candidates: readonly Candidate<Parameters, Result>[]): Candidate<Parameters, Result> {
        const simplestCandidates = candidates.reduce((simplestCandidatesSoFar: Candidate<Parameters, Result>[], candidate) => {
            if (simplestCandidatesSoFar.length === 0)
                return [candidate]
            const sign = candidate.compareComplexity(simplestCandidatesSoFar[0]!)
            if (sign < 0)
                return [candidate]
            if (sign > 0)
                return simplestCandidatesSoFar
            return [...simplestCandidatesSoFar, candidate]
        }, [])
        return this.picker.elementFrom(simplestCandidates)
    }

    public findSimplestPassingCandidate(candidates: readonly Candidate<Parameters, Result>[], perfectCandidates: readonly Candidate<Parameters, Result>[], unitTests: readonly UnitTest<Parameters, Result>[]): Candidate<Parameters, Result> {
        const passingCandidates = candidates.filter(candidate => candidate.passes(unitTests))
        const passingImperfectCandidates = passingCandidates.filter(candidate => !perfectCandidates.includes(candidate))
        if (passingImperfectCandidates.length === 0)
            return this.picker.elementFrom(perfectCandidates)
        return this.findSimplestCandidate(passingImperfectCandidates)
    }

    private findFailingTestResult(candidate: Candidate<Parameters, Result>, hints: readonly UnitTest<Parameters, Result>[], minimalUnitTestsList: readonly UnitTest<Parameters, Result>[]): TestResult<Parameters, Result>|undefined {
        for (const unitTests of [hints, minimalUnitTestsList]) {
            const failingUnitTests = candidate.failingTestResults(unitTests)
            if (failingUnitTests.length > 0)
                return this.picker.elementFrom(failingUnitTests)
        }
        return undefined
    }

    public findNumberOfUnitTestsStillNeeded(unitTests: readonly UnitTest<Parameters, Result>[], subsetsOfMinimalUnitTests: readonly UnitTest<Parameters, Result>[][], candidates: readonly Candidate<Parameters, Result>[], numberOfPerfectCandidates: number): number {
        const realSubsetsOfMinimalUnitTests = subsetsOfMinimalUnitTests.slice(0, -1)
        for (const subsetOfMinimalUnitTests of realSubsetsOfMinimalUnitTests) {
            const extendedUnitTests = [...unitTests, ...subsetOfMinimalUnitTests]
            const passingCandidates = candidates.filter(candidate => candidate.passes(extendedUnitTests))
            if (passingCandidates.length === numberOfPerfectCandidates)
                return subsetOfMinimalUnitTests.length
        }
        const fullSetOfMinimalUnitTests = subsetsOfMinimalUnitTests[subsetsOfMinimalUnitTests.length - 1]!
        return fullSetOfMinimalUnitTests.length
    }

    protected isFormDataOk(_formData: FormData): boolean {
        return true
    }

    public emoji(nextLevel: AnyLevel|undefined): string {
        return this === nextLevel ? '▶️' : this.finishedEmoji()
    }

    protected finishedEmoji(): string {
        return ['🔒', '🥇', '🥈', '🥉'].at(this.isFinished()) ?? '💩'
    }

    public description(): string {
        return this.conversationLanguage.level(this.levelNumber, this.name())
    }

    public isFinished(): number {
        return this.store.get(`level-${this.identifier()}-finished`)
    }

    public play(callback: () => void): void {
        this.callback = callback
        this.showInstructionsMessage()
        this.showSidebarMessage()
        this.showStepMessages()
        this.menu()
    }

    private menu(): void {
        this.showPanels()
        this.showMenuMessage()
    }

    private showPanels(): void {
        this.showSpecificationPanel()
        this.showCurrentFunctionPanel()
        this.showDifferencePanel()
        this.showUnitTestsPanel()
    }

    protected showMenuMessage(): void {
        this.showBeforeMenuMessage()
        const addButton = new Submit(this.conversationLanguage.addUnitTestButton())
        const submitButton = new Button(this.conversationLanguage.submitUnitTestsButton(), () => this.submitUnitTests())
        const variables = [...this.parameters, this.unit].map(variable => variable.toHtml())
        const form = new Form(formData => this.addUnitTest(formData)).appendChildren([...variables, addButton])
        const divider = new Div().appendText(this.conversationLanguage.or()).addClass('or')
        new HumanMessage([form, divider, submitButton]).show()
    }

    private addUnitTest(formData: FormData): void {
        // the casts are safe because each Variable validates and converts its own form input
        const argumentList = this.parameters.map(parameter => parameter.getInput(formData.get(parameter.name)! as string)) as unknown as Parameters
        const expected = this.unit.getInput(formData.get(this.unit.name)! as string) as Result
        const unitTest = new UnitTest(this.parameters, argumentList, this.unit, expected)
        ComputerMessage.addToLast([new CodeBlock().appendChild(unitTest.toHtml(this.programmingLanguage).addClass('new'))])
        if (!this.isFormDataOk(formData))
            return
        if (!new TestResult(this.perfectCandidate, unitTest).passes)
            this.handleIncorrectUnitTest()
        else if (new TestResult(this.currentCandidate, unitTest).passes)
            this.handleUselessUnitTest(unitTest)
        else
            this.handleUsefulUnitTest(unitTest)
        this.menu()
    }

    private handleIncorrectUnitTest(): void {
        this.showIncorrectUnitTestMessage()
    }

    private handleUselessUnitTest(unitTest: UnitTest<Parameters, Result>): void {
        this.acceptUnitTest(unitTest)
        this.showUselessUnitTestMessage()
    }

    private handleUsefulUnitTest(unitTest: UnitTest<Parameters, Result>): void {
        this.acceptUnitTest(unitTest)
        this.showUsefulUnitTestMessage()
        this.currentCandidate = this.findSimplestPassingCandidate(this.candidates, this.perfectCandidates, this.humanUnitTests)
        this.failingTestResult = this.findFailingTestResult(this.currentCandidate, this.hints, this.minimalUnitTests)
    }

    private acceptUnitTest(unitTest: UnitTest<Parameters, Result>): void {
        this.lastUnitTest = unitTest
        this.humanUnitTests.push(unitTest)
        this.previousCandidate = this.currentCandidate
    }

    private submitUnitTests(): void {
        if (!this.isFormDataOk(new FormData()))
            return
        this.numberOfSubmissions += 1
        if (this.failingTestResult) {
            this.showInvalidUnitTestMessage()
            this.menu()
        }
        else
            this.end()
    }

    private end(): void {
        this.store.set(`level-${this.identifier()}-finished`, this.numberOfSubmissions)
        this.showPanels()
        this.showEndMessage()
        this.callback!()
    }

    protected showInstructionsMessage(): void {
        //nothing
    }

    protected showSidebarMessage(): void {
        //nothing
    }

    private showStepMessages(): void {
        new ComputerMessage([this.conversationLanguage.readSpecification()]).show()
        new ComputerMessage([this.conversationLanguage.improveCurrentFunction()]).show()
        new ComputerMessage([this.conversationLanguage.submitUnitTests()]).show()
    }

    protected showBeforeMenuMessage(): void {
        //nothing
    }

    private showIncorrectUnitTestMessage(): void {
        new ComputerMessage([this.conversationLanguage.unitTestNotAdded()]).show()
    }

    private showUselessUnitTestMessage(): void {
        new ComputerMessage([this.conversationLanguage.currentFunctionNotImproved()]).show()
        new ComputerMessage([this.conversationLanguage.hint()]).show()
    }

    private showUsefulUnitTestMessage(): void {
        new ComputerMessage([this.conversationLanguage.currentFunctionImproved(this.humanUnitTests.length)]).show()
    }

    private showInvalidUnitTestMessage(): void {
        const numberOfUnitTestsStillNeeded = this.findNumberOfUnitTestsStillNeeded(this.humanUnitTests, this.subsetsOfMinimalUnitTests, this.candidates, this.perfectCandidates.length)
        new ComputerMessage([this.conversationLanguage.invalidUnitTest(), new CodeBlock().appendChild(this.failingTestResult!.toHtml(this.programmingLanguage).addClass('new'))]).show()
        new ComputerMessage([this.conversationLanguage.moreUnitTests(numberOfUnitTestsStillNeeded)]).show()
    }

    private findRedundantUnitTests(): UnitTest[] {
        return this.humanUnitTests.filter(unitTest => {
            const reducedTests = this.humanUnitTests.filter(humanUnitTest => humanUnitTest !== unitTest)
            return this.candidates.filter(candidate => candidate.passes(reducedTests)).every(candidate => this.perfectCandidates.includes(candidate))
        })
    }

    private showEndMessage(): void {
        new ComputerMessage([this.conversationLanguage.currentFunctionCorrect()]).show()
        const numberOfUnneccessaryUnitTests = this.humanUnitTests.length - this.minimalUnitTests.length
        if (numberOfUnneccessaryUnitTests > 0) {
            const redundantUnitTests = this.findRedundantUnitTests()
            const listItems = redundantUnitTests.map(unitTest => new ListItem().appendChild(new CodeBlock().appendChild(unitTest.toHtml(this.programmingLanguage))))
            const orderedList = new OrderedList().appendChildren(listItems)
            new ComputerMessage([this.conversationLanguage.tooManyUnitTests(numberOfUnneccessaryUnitTests, redundantUnitTests.length), orderedList]).show()
        }
    }

    private showSpecificationPanel(): void {
        new Panel('specification', this.conversationLanguage.specificationTitle(this.description()), [this.specification()]).show()
    }

    private showCurrentFunctionPanel(): void {
        new Panel('current-function', this.conversationLanguage.currentFunctionTitle(), [this.currentCandidate.toHtml(this.programmingLanguage)]).show()
    }

    private showDifferencePanel(): void {
        if (!this.previousCandidate)
            return
        const difference = this.currentCandidate.toHtmlWithPrevious(this.previousCandidate, this.programmingLanguage)
        new Panel('difference-current-function', this.conversationLanguage.differenceTitle(), [difference]).show()
    }

    private showUnitTestsPanel(): void {
        if (this.humanUnitTests.length === 0)
            return
        const listItems = this.humanUnitTests.map(unitTest => {
            const className = unitTest === this.lastUnitTest ? 'new' : 'old'
            return new ListItem().appendChild(new CodeBlock().appendChild(unitTest.toHtml(this.programmingLanguage).addClass(className)))
        })
        const orderedList = new OrderedList().appendChildren(listItems)
        new Panel('unit-tests', this.conversationLanguage.unitTestsTitle(), [orderedList]).show()
    }
}

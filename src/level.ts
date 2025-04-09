import { Candidate } from './candidate.js'
import { HumanMessage, ProcessingMessage, ComputerMessage, Panel } from './frame.js'
import { Methodology } from './methodology.js'
import { Button, Div, Form, Input, Paragraph, Span } from './html.js'
import { Random } from './random.js'
import { TestResult } from './test_result.js'
import { UnitTest } from './unit_test.js'
import { UseCase } from './use_case.js'
import { StoredValue } from './stored_value.js'

export class Level {
    private readonly methodology: Methodology
    private readonly useCase: UseCase
    private readonly storedScore: StoredValue

    private callback?: () => void
    private userdefinedUnitTests: UnitTest[] = []
    private coveredCandidates: Candidate[] = []
    private currentCandidate: Candidate = new Candidate([])
    private failingTestResult?: TestResult = undefined
    private score: number = 0
    private previousScore: number = 0
    private subscoreNumberOfUnitTests: number = 0
    private subscoreNumberOfUsefulUnitTests: number = 0
    private subscoreOnlyCorrectUnitTests: number = 200
    private subscoreNoHint: number = 200
    private subscoreNoSubmitWithBug: number = 400
    private subscoreOnlyUsefulUnitTests: number = 200
    private newUnitTest?: UnitTest = undefined
    private previousCandidate?: Candidate = undefined

    public constructor(methodology: Methodology, useCase: UseCase) {
        this.methodology = methodology
        this.useCase = useCase
        this.storedScore = new StoredValue(this.description())
    }

    public description(): string {
        return `${this.methodology.name()} - ${this.useCase.name()}`
    }

    public methodologyName(): string {
        return this.methodology.name()
    }

    public getExampleSeen(storage: Storage): string {
        return this.methodology.getExampleSeen(storage)
    }

    public setExampleSeen(storage: Storage): void {
        this.methodology.setExampleSeen(storage)
    }

    public showExample(callback: () => void): void {
        this.methodology.showExample(callback)
    }

    public getScore(storage: Storage): string {
        return this.storedScore.get(storage)
    }

    public play(callback: () => void): void {
        this.callback = callback
        this.userdefinedUnitTests = []
        this.coveredCandidates = []
        this.currentCandidate = this.findSimplestPassingCandidate()
        this.failingTestResult = this.findFailingTestResult()
        this.score = 0
        this.previousScore = 0
        this.subscoreNumberOfUnitTests = 0
        this.subscoreNumberOfUsefulUnitTests = 0
        this.subscoreOnlyCorrectUnitTests = 200
        this.subscoreNoHint = 200
        this.subscoreNoSubmitWithBug = 400
        this.subscoreOnlyUsefulUnitTests = 200
        this.newUnitTest = undefined
        this.previousCandidate = undefined
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

    public showLevelPanel(): void {
        new Panel('Level', [
            new Paragraph()
                .appendText(`${this.description()}: `)
                .appendChild(new Span().appendText(`${this.score}`).addClass('new', this.score !== this.previousScore))
        ]).show()
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
        this.previousScore = this.score
        this.score = this.calculateScoreDuringPlay()
        this.showPanels()
        this.showMenuMessage()
    }

    private showPanels(): void {
        this.methodology.showPanelsOnMenu(this.useCase.specification(), this.currentCandidate, this.previousCandidate, this.useCase.perfectCandidate, this.coveredCandidates)
        this.previousCandidate = undefined
        this.showUnitTestsPanel()
        this.showLevelPanel()
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
            .setTitle('I don\'t want to add a unit test now')
            .onClick(() => this.cancelAddUnitTestFlow())
            .appendText('Cancel')
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
            this.subscoreNumberOfUnitTests += 100
            this.coveredCandidates.push(this.findCoveredCandidate(unitTest))
            this.previousCandidate = this.currentCandidate
            if (new TestResult(this.currentCandidate, unitTest).passes) {
                this.methodology.showUselessUnitTestMessage()
                this.subscoreOnlyUsefulUnitTests = 0
            }
            else {
                this.methodology.showUsefulUnitTestMessage()
                this.subscoreNumberOfUsefulUnitTests += 100
                this.currentCandidate = this.findSimplestPassingCandidate()
                this.failingTestResult = this.findFailingTestResult()
            }
        }
        else {
            this.methodology.showIncorrectUnitTestMessage()
            this.subscoreOnlyCorrectUnitTests = 0
        }
        this.menu()
    }

    private showHint(): void {
        if (this.failingTestResult)
            this.methodology.showHintMessage(this.currentCandidate, this.failingTestResult)
        else
            this.methodology.showNoHintMessage()
        this.subscoreNoHint = 0
        this.menu()
    }

    private prepareSubmitUnitTests(): void {
        new ProcessingMessage('Checking...', () => this.submitUnitTests(), 1000 + this.userdefinedUnitTests.length * 500).add()
    }

    private submitUnitTests(): void {
        if (this.failingTestResult) {
            this.methodology.showBugFoundMessage(this.currentCandidate, this.failingTestResult)
            this.subscoreNoSubmitWithBug = 0
            this.menu()
        }
        else
            this.end()
    }

    private end(): void {
        this.previousScore = this.score
        this.score = this.calculateScoreAtEnd()
        this.showPanels()
        this.storedScore.set(localStorage, this.score.toString())
        this.methodology.showEndMessage()
        this.callback!()
    }

    private calculateScoreDuringPlay(): number {
        return Math.min(400, this.subscoreNumberOfUnitTests) +
            Math.min(400, this.subscoreNumberOfUsefulUnitTests)
    }

    private calculateScoreAtEnd(): number {
        return this.calculateScoreDuringPlay() +
            this.subscoreOnlyCorrectUnitTests +
            this.subscoreNoHint +
            this.subscoreNoSubmitWithBug +
            this.subscoreOnlyUsefulUnitTests
    }
}

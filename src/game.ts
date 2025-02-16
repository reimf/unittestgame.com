import { Main } from './main.js'
import { Button, Form, Paragraph, UnorderedList, Div, Code, Panel, HumanMessage, HumanMenuMessage, ComputerMessage } from './html.js'
import { HighScore } from './high_score.js'
import { Candidate } from './candidate.js'
import { UnitTest } from './unit_test.js'
import { TestResult } from './test_result.js'
import { Variable } from './variable.js'

export abstract class Game {
    private readonly INITIALSCORE = 100
    private readonly PENALTYHINT = 10
    private readonly PENALTYBUG = 20
    private readonly PENALTYEND = 100

    public readonly abstract description: string
    private parameters: Variable[] = this.getParameters()
    private unit: Variable = this.getUnit()
    private candidates: Candidate[] = [...this.generateCandidates(this.getCandidateElements())]
    private minimalUnitTests: UnitTest[] = this.getMinimalUnitTests()
    private perfectCandidates: Candidate[] = this.findPerfectCandidates(this.candidates, this.minimalUnitTests)
    private perfectCandidate: Candidate = this.randomElementFrom(this.perfectCandidates)
    private hints: UnitTest[] = [...this.hintGenerator()].map(argumentList => new UnitTest(argumentList, this.perfectCandidate.execute(argumentList)))
    private userdefinedUnitTests: UnitTest[] = []
    private score: number = this.INITIALSCORE
    private failingTestResult: TestResult | undefined = undefined

    protected abstract getParameters(): Variable[]
    protected abstract getUnit(): Variable
    protected abstract getCandidateElements(): string[][]
    protected abstract getMinimalUnitTests(): UnitTest[]
    protected abstract hintGenerator(): Generator<any[]>
    protected abstract specificationPanel(): Panel

    protected constructor() {
        this.checkUnitTestsAreNeeded(this.candidates, this.minimalUnitTests)
    }

    public highScore(): HighScore | null {
        return HighScore.fromStorage(localStorage, this.constructor.name)
    }

    protected randomElementFrom(list: any[]): any {
        return list[this.randomInt(list.length)]
    }

    protected randomInt(x: number): number {
        return Math.floor(Math.random() * x)
    }

    private *generateCandidates(listOfListOfLines: string[][], lines: string[] = []): Generator<Candidate> {
        if (listOfListOfLines.length > 0) {
            const [firstListOfLines, ...remainingListOfListOfLines] = listOfListOfLines
            for (const line of firstListOfLines)
                yield* this.generateCandidates(remainingListOfListOfLines, [...lines, line])
        }
        else
            yield this.createCandidate(lines)
    }

    private createCandidate(lines: string[]): Candidate {
        const parameterList = this.parameters.map((parameter) => parameter.name).join(', ')
        const code = [
            `function ${this.unit.name}(${parameterList}) {`,
            ...lines.filter((line) => line !== '').map((line) => '  ' + line),
            '}',
        ].join('\n')
        return new Candidate(code)
    }

    private findPassingCandidates(candidates: Candidate[], unitTests: UnitTest[]): Candidate[] {
        return candidates.filter(candidate => candidate.failCount(unitTests) == 0)
    }

    private findPerfectCandidates(candidates: Candidate[], unitTests: UnitTest[]): Candidate[] {
        const perfectCandidates = this.findPassingCandidates(candidates, unitTests)
        if (perfectCandidates.length === 0)
            throw new Error(`There is no perfect function for game ${this.constructor.name}.`)
        return perfectCandidates
    }

    private checkUnitTestsAreNeeded(candidates: Candidate[], unitTests: UnitTest[]): void {
        for (const unitTest of unitTests) {
            const allMinusOneUnitTests = unitTests.filter(otherUnitTest => otherUnitTest !== unitTest)
            const almostPerfectCandidates = this.findPassingCandidates(candidates, allMinusOneUnitTests)
            if (almostPerfectCandidates.length === 1)
                throw new Error(`Unit test ${unitTest} is not needed.\n${almostPerfectCandidates[0]}`)
        }
    }

    private findSimplestPassingCandidate(candidates: Candidate[], userDefinedUnitTests: UnitTest[], perfectCandidates: Candidate[]): Candidate {
        const nonPerfectCandidates = candidates.filter(candidate => !perfectCandidates.includes(candidate))
        const nonPerfectPassingCandidates = this.findPassingCandidates(nonPerfectCandidates, userDefinedUnitTests)
        if (nonPerfectPassingCandidates.length === 0)
            return this.randomElementFrom(perfectCandidates)
        const minimumComplexity = Math.min(...nonPerfectPassingCandidates.map(candidate => candidate.complexity))
        const candidatesWithMinimumComplexity = nonPerfectPassingCandidates.filter(candidate => candidate.complexity === minimumComplexity)
        return this.randomElementFrom(candidatesWithMinimumComplexity)
    }

    private showScorePanel(): void {
        new Panel('Score', [
            new Paragraph(`${this.score}%`),
        ]).show('score')
    }

    private showContractMessage(): void {
        new ComputerMessage([
            new Paragraph(
                'In the sidebar you see the specification, ' +
                'the unit tests you have written and ' +
                'the current function that passes all the unit tests. ' +
                'Keep adding unit tests until the function is according to the specification.'
            ),
        ]).show()
    }

    private showUnitTestsPanel(): void {
        new Panel('Unit Tests', [
            new UnorderedList(
                this.userdefinedUnitTests.map(unitTest => new Div().appendText(unitTest.toString()))
            ).ifEmpty('You have not written any unit tests yet.'),
        ]).show('unit-tests')
    }

    private showCurrentCandidatePanel(candidate: Candidate): void {
        new Panel('Current Function', [
            new Code(candidate.toString()),
        ]).show('current-candidate')
    }

    private showMenuMessage(): void {
        new HumanMenuMessage([
            new Button('I want to add a unit test', () => this.showFormUnitTestMessage()),
            new Button(`I want to see a hint for a unit test (-${this.PENALTYHINT}%)`, () => this.showHint()),
            new Button(`I want to submit the unit tests (-${this.PENALTYBUG}%?)`, () => this.submit()),
            new Button(`I want to end the game (-${this.PENALTYEND}%?)`, () => this.end()),
        ]).show()
    }

    public play(): void {
        this.specificationPanel().show('specification')
        this.showContractMessage()
        this.menu()
    }

    private menu(): void {
        this.showUnitTestsPanel()

        const simplestPassingCandidate = this.findSimplestPassingCandidate(this.candidates, this.userdefinedUnitTests, this.perfectCandidates)
        this.showCurrentCandidatePanel(simplestPassingCandidate)

        const failingTestResultsHints = simplestPassingCandidate.failingTestResults(this.hints)
        const failingTestResultsUnitTests = simplestPassingCandidate.failingTestResults(this.minimalUnitTests)
        const failingTestResultsToChooseFrom = failingTestResultsHints ? failingTestResultsHints : failingTestResultsUnitTests
        this.failingTestResult = failingTestResultsToChooseFrom
            ? this.randomElementFrom(failingTestResultsToChooseFrom)
            : undefined

        this.showScorePanel()
        this.showMenuMessage()
    }

    private showFormUnitTestMessage(): void {
        new HumanMessage([
            new Paragraph('I want to add a unit test.'),
            new Form(
                [...this.parameters, this.unit].map(variable => variable.toHtml()),
                'I want to add this unit test',
                () => this.addUnitTest(),
                'I don\'t want to add a unit test now',
                () => this.menu()
            )
        ]).replace()
    }

    private showAddUnitTestMessage(unitTest: UnitTest): void {
        new HumanMessage([
            new Paragraph('I want to add the following unit test:'),
            new Paragraph(unitTest.toString()),
        ]).replace()
    }

    private showGeneralUselessUnitTestMessage(): void {
        new ComputerMessage([
            new Paragraph(
                'I added the unit test, but it looks a lot like another unit test, so I didn\'t have to improve the function.'
            ),
        ]).show()
    }

    private showCurrentlyUselessUnitTestMessage(): void {
        new ComputerMessage([
            new Paragraph(
                'I added the unit test, but my function already passed this unit test, so I didn\'t improve the function.'
            ),
        ]).show()
    }

    private showUsefulUnitTestMessage(): void {
        new ComputerMessage([
            new Paragraph(
                'I added the unit test and I improved the function.'
            ),
        ]).show()
    }

    private showIncorrectUnitTestMessage(): void {
        new ComputerMessage([
            new Paragraph(
                'I did NOT add the unit test, because it is NOT according to the specification.'
            ),
        ]).show()
    }

    private addUnitTest(): void {
        const argumentList = this.parameters.map(parameter => parameter.value())
        const expected = this.unit.value()
        const unitTest = new UnitTest(argumentList, expected)
        this.showAddUnitTestMessage(unitTest)
        const testResult = new TestResult(this.perfectCandidate, unitTest)
        if (testResult.passes) {
            const passingCandidatesBefore = this.findPassingCandidates(this.candidates, this.userdefinedUnitTests)
            const simplestPassingCandidateBefore = this.findSimplestPassingCandidate(this.candidates, this.userdefinedUnitTests, this.perfectCandidates)
            this.userdefinedUnitTests.push(unitTest)
            const passingCandidatesAfter = this.findPassingCandidates(this.candidates, this.userdefinedUnitTests)
            const simplestPassingCandidateAfter = this.findSimplestPassingCandidate(this.candidates, this.userdefinedUnitTests, this.perfectCandidates)
            if (passingCandidatesAfter.length === passingCandidatesBefore.length)
                this.showGeneralUselessUnitTestMessage()
            else if (simplestPassingCandidateAfter === simplestPassingCandidateBefore)
                this.showCurrentlyUselessUnitTestMessage()
            else
                this.showUsefulUnitTestMessage()
        }
        else
            this.showIncorrectUnitTestMessage()
        this.menu()
    }

    private showHintMessage(unitTest: UnitTest): void {
        new ComputerMessage([
            new Paragraph('A unit test that would fail for the function is the following.'),
            new Paragraph(unitTest.toString()),
            new Paragraph(`The cost for this hint is ${this.PENALTYHINT}%.`),
        ]).show()
    }

    private showNoHintMessage(): void {
        new ComputerMessage([
            new Paragraph('I can\'t come up with a failing unit test. '),
            new Paragraph(`The cost for this \'hint\' is ${this.PENALTYHINT}%.`),
        ]).show()
    }

    private showHint(): void {
        if (this.failingTestResult)
            this.showHintMessage(this.failingTestResult.unitTest)
        else
            this.showNoHintMessage()
        this.score -= this.PENALTYHINT
        this.menu()
    }

    private showBugFoundMessage(testResult: TestResult): void {
        new ComputerMessage([
            new Paragraph(
                'The function is NOT according to the specification. ' +
                'The function produces the following incorrect output:'
            ),
            new Paragraph(testResult.toString()),
            new Paragraph(`The cost for this submission is ${this.PENALTYBUG}%.`),
        ]).show()
    }

    private submit(): void {
        if (this.failingTestResult) {
            this.showBugFoundMessage(this.failingTestResult)
            this.score -= this.PENALTYBUG
            this.menu()
        }
        else
            this.end()
    }

    private showUnsuccessfulEndMessage(): void {
        new ComputerMessage([
            new Paragraph(
                'The function is NOT according to the specification. ' +
                `Your final score is ${this.score}%.`
            ),
        ]).show()
    }

    private showPerfectEndMessage(): void {
        new ComputerMessage([
            new Paragraph(
                'The function is according to the specification. ' +
                `You achieved the maximum score of ${this.score}%.`
            ),
        ]).show()
    }

    private showSuccessfulEndMessage(): void {
        new ComputerMessage([
            new Paragraph(
                'The function is according to the specification. ' +
                `Your final score is ${this.score}%.`
            ),
        ]).show()
    }

    private end(): void {
        if (this.failingTestResult) {
            this.score = 0
            this.showScorePanel()
            this.showUnsuccessfulEndMessage()
        }
        else if (this.score == 100)
            this.showPerfectEndMessage()
        else
            this.showSuccessfulEndMessage()
        new HighScore(
            this.constructor.name,
            this.score,
        ).save(localStorage)
        Main.instance.restart()
    }
}

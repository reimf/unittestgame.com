import { UnitTest } from './unit_test.js'
import { Variable } from './variable.js'
import { Random } from './random.js'
import { Button, Code, Form, Input, Paragraph } from './html.js'
import { Panel, HumanMessage, ComputerMessage } from './frame.js'
import { Candidate } from './candidate.js'
import { TestResult } from './test_result.js'

export abstract class Level {
    protected abstract getParameters(): Variable[]
    protected abstract getUnit(): Variable
    protected abstract getCandidateElements(): string[][]
    protected abstract getMinimalUnitTests(parameters: Variable[], unit: Variable): UnitTest[]
    protected abstract hintGenerator(): Generator<any[]>
    protected abstract showSpecificationPanel(): void

    private readonly PERFECTSCORE = 100
    private readonly PENALTYINCORRECTUNITTEST = 5
    private readonly PENALTYHINT = 10
    private readonly PENALTYBUG = 20
    private readonly MINIMUMSCORE = 0

    private readonly name: string = this.constructor.name
    private readonly parameters: Variable[] = this.getParameters()
    private readonly unit: Variable = this.getUnit()
    private readonly candidates: Candidate[] = [...this.generateCandidates(this.getCandidateElements())]
    private readonly minimalUnitTests: UnitTest[] = this.getMinimalUnitTests(this.parameters, this.unit)
    private readonly perfectCandidates: Candidate[] = this.findPerfectCandidates(this.candidates, this.minimalUnitTests)
    private readonly perfectCandidate: Candidate = Random.elementFrom(this.perfectCandidates)
    private readonly hints: UnitTest[] = [...this.hintGenerator()].map(argumentList => new UnitTest(this.parameters, argumentList, this.unit, this.perfectCandidate.execute(argumentList)))

    // the following attributes are assigned a dummy value; the starting values are assigned in the play method
    private userdefinedUnitTests: UnitTest[] = []
    private currentCandidate: Candidate = this.candidates[0]
    private failingTestResult?: TestResult = undefined
    private score: number = NaN
    private callback: () => void = () => undefined

    public constructor(private readonly index: number) {
        this.checkUnitTestsAreNeeded(this.candidates, this.minimalUnitTests)
    }

    public get description(): string {
        return `Level ${this.index} - ${this.name}`
    }

    public getHighScore(storage: Storage): number {
        return Number(storage.getItem(`${this.name}.score`))
    }

    private saveScore(storage: Storage): void {
        if (this.score > this.getHighScore(storage))
            storage.setItem(`${this.name}.score`, `${this.score}`)
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
            throw new Error(`There is no perfect function for level ${this.name}.`)
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

    private findSimplestPassingCandidate(candidates: Candidate[], unitTests: UnitTest[]): Candidate {
        const passingCandidates = this.findPassingCandidates(candidates, unitTests)
        const minimumComplexity = Math.min(...passingCandidates.map(candidate => candidate.complexity))
        const simplestCandidates = passingCandidates.filter(candidate => candidate.complexity === minimumComplexity)
        return Random.elementFrom(simplestCandidates)
    }

    private findFailingTestResult(candidate: Candidate, hints: UnitTest[], minimalUnitTests: UnitTest[]): TestResult | undefined {
        const failingHints = candidate.failingTestResults(hints)
        if (failingHints.length > 0)
            return Random.elementFrom(failingHints)
        const failingMinimalUnitTests = candidate.failingTestResults(minimalUnitTests)
        if (failingMinimalUnitTests.length > 0)
            return Random.elementFrom(failingMinimalUnitTests)
        return undefined
    }

    private showScorePanel(): void {
        new Panel('Score', [
            new Paragraph().appendText(`${this.description}: ${this.score}%`),
        ]).show()
    }

    private showContractMessage(): void {
        new ComputerMessage([
            new Paragraph().appendLines([
                'In the sidebar you see the specification,',
                'the unit tests you have written (none yet) and',
                'my take at the function.',
                'Add failing unit tests and I will improve the function such that it passes.',
                'Submit the unit tests if the function is according to the specification.',
            ]),
        ]).show()
    }

    private showUnitTestsPanel(): void {
        new Panel('Unit Tests',
            this.userdefinedUnitTests.length === 0
            ? [new Paragraph().appendText('You have not written any unit tests yet.')]
            : this.userdefinedUnitTests.map(unitTest => new Paragraph().appendText(unitTest.toString())),
        ).show()
    }

    private showCurrentCandidatePanel(): void {
        new Panel('Current Function', [
            new Code().appendText(this.currentCandidate.toString()),
        ]).show()
    }

    private showMenuMessage(): void {
        new HumanMessage([
            new Button().onClick(() => this.startAddUnitTestFlow()).appendText(`I want to add a unit test (-${this.PENALTYINCORRECTUNITTEST}% on error)`),
            new Button().onClick(() => this.showHint()).appendText(`I want to see a hint for a unit test (-${this.PENALTYHINT}%)`),
            new Button().onClick(() => this.submit()).appendText(`I want to submit the unit tests (-${this.PENALTYBUG}% on error)`),
            new Button().onClick(() => this.end()).appendText(`I want to exit this level (${this.MINIMUMSCORE}% on error)`),
        ]).show()
    }

    private showScoreZeroMessage(): void {
        new ComputerMessage([
            new Paragraph().appendLines([
                'You have to retry this level,',
                'because your score dropped to 0%.'
            ])
        ]).show()
    }

    public play(callback: () => void): void {
        this.callback = callback
        this.score = this.PERFECTSCORE
        this.userdefinedUnitTests = []
        this.improveCurrentCandidate()
        this.showSpecificationPanel()
        this.showContractMessage()
        this.menu()
    }

    private improveCurrentCandidate(): void {
        this.currentCandidate = this.findSimplestPassingCandidate(this.candidates, this.userdefinedUnitTests)
        this.failingTestResult = this.findFailingTestResult(this.currentCandidate, this.hints, this.minimalUnitTests)    
    }
    
    private menu(): void {
        this.showUnitTestsPanel()
        this.showCurrentCandidatePanel()
        if (this.score <= this.MINIMUMSCORE) {
            this.showScoreZeroMessage()
            this.score = this.MINIMUMSCORE
            this.showScorePanel()
            this.callback!()
        }
        else {
            this.showScorePanel()
            this.showMenuMessage()
        }
    }

    private startAddUnitTestFlow(): void {
        this.showConfirmStartUnitTestFlowMessage()
        this.showFormUnitTestMessage()
    }

    private showConfirmStartUnitTestFlowMessage(): void {
        new ComputerMessage([
            new Paragraph().appendText('Which unit test do you want to add?'),
        ]).show()
    }

    private showFormUnitTestMessage(): void {
        const submitButton = new Input().type('submit').value('I want to add this unit test')
        const cancelButton = new Button().onClick(() => this.cancelAddUnitTestFlow()).appendText('I don\'t want to add a unit test now')
        const buttonBlock = new Paragraph().appendChild(submitButton).appendChild(cancelButton)
        new HumanMessage([
            new Form()
            .onSubmit(() => this.addUnitTest())
            .appendChildren([...this.parameters, this.unit].map(variable => variable.toHtml()))
            .appendChild(buttonBlock)                
        ]).show()
    }

    private showAddUnitTestMessage(unitTest: UnitTest): void {
        new HumanMessage([
            new Paragraph().appendText('I want to add the following unit test:'),
            new Paragraph().appendText(unitTest.toString()),
        ]).replace()
    }

    private showConfirmCancelAddUnitTestFlowMessage(): void {
        new ComputerMessage([
            new Paragraph().appendText('Ok.'),
        ]).show()
    }

    private cancelAddUnitTestFlow(): void {
        this.showConfirmCancelAddUnitTestFlowMessage()
        this.menu()
    }

    private showUselessUnitTestMessage(): void {
        new ComputerMessage([
            new Paragraph().appendLines([
                'I added the unit test,',
                'but the current function already passed this unit test,',
                'so I didn\'t improve the function.'
            ]),
        ]).show()
    }

    private showUsefulUnitTestMessage(): void {
        new ComputerMessage([
            new Paragraph().appendText('I added the unit test and I improved the function.'),
        ]).show()
    }

    private showIncorrectUnitTestMessage(): void {
        new ComputerMessage([
            new Paragraph().appendText('I did NOT add the unit test, because it is NOT according to the specification.'),
            new Paragraph().appendText(`The cost for trying to add an incorrect unit test is ${this.PENALTYINCORRECTUNITTEST}%.`),
        ]).show()
        this.score -= this.PENALTYINCORRECTUNITTEST
    }

    private addUnitTest(): void {
        const argumentList = this.parameters.map(parameter => parameter.value())
        const expected = this.unit.value()
        const unitTest = new UnitTest(this.parameters, argumentList, this.unit, expected)
        this.showAddUnitTestMessage(unitTest)
        const unitTestIsCorrect = new TestResult(this.perfectCandidate, unitTest).passes
        if (unitTestIsCorrect) {
            this.userdefinedUnitTests.push(unitTest)
            const currentCandidateAlreadyPasses = new TestResult(this.currentCandidate, unitTest).passes
            if (currentCandidateAlreadyPasses)
                this.showUselessUnitTestMessage()
            else {
                this.showUsefulUnitTestMessage()
                this.improveCurrentCandidate()
            }
        }
        else
            this.showIncorrectUnitTestMessage()
        this.menu()
    }

    private showHintMessage(unitTest: UnitTest): void {
        new ComputerMessage([
            new Paragraph().appendText('A unit test that would fail for the current function is the following.'),
            new Paragraph().appendText(unitTest.toString()),
            new Paragraph().appendText(`The cost for this hint is ${this.PENALTYHINT}%.`),
        ]).show()
        this.score -= this.PENALTYHINT
    }

    private showNoHintMessage(): void {
        new ComputerMessage([
            new Paragraph().appendText('I can\'t think of a failing unit test for the current function.'),
            new Paragraph().appendText(`The cost for this hint is ${this.PENALTYHINT}%.`),
        ]).show()
        this.score -= this.PENALTYHINT
    }

    private showHint(): void {
        if (this.failingTestResult)
            this.showHintMessage(this.failingTestResult.unitTest)
        else
            this.showNoHintMessage()
        this.menu()
    }

    private showBugFoundMessage(testResult: TestResult): void {
        new ComputerMessage([
            new Paragraph().appendLines([
                'The current function is NOT according to the specification.',
                'It produces the following incorrect output:'
            ]),
            new Paragraph().appendText(testResult.toString()),
            new Paragraph().appendText(`The cost for submitting when there is still an error is ${this.PENALTYBUG}%.`),
        ]).show()
        this.score -= this.PENALTYBUG
    }

    private submit(): void {
        if (this.failingTestResult) {
            this.showBugFoundMessage(this.failingTestResult)
            this.menu()
        }
        else
            this.end()
    }

    private showUnsuccessfulEndMessage(): void {
        new ComputerMessage([
            new Paragraph().appendLines([
                'The current function is NOT according to the specification.',
                `Your score is ${this.score}%.`
            ]),
        ]).show()
    }

    private showSuccessfulEndMessage(): void {
        new ComputerMessage([
            new Paragraph().appendLines([
                'The current function is according to the specification.',
                `Your score is ${this.score}%.`
            ]),
        ]).show()
    }

    private end(): void {
        if (this.failingTestResult) {
            this.score = this.MINIMUMSCORE
            this.showScorePanel()
            this.showUnsuccessfulEndMessage()
        }
        else
            this.showSuccessfulEndMessage()
        this.saveScore(localStorage)
        this.callback!()
    }
}

import { Candidate } from './candidate.js'
import { Panel, ComputerMessage, ButtonMessage } from './frame.js'
import { Methodology } from './methodology.js'
import { TestResult } from './test_result.js'

export class TestDrivenDevelopment extends Methodology {
    public name(): string {
        return 'Test-Driven Development'
    }

    public showBasicDefinition(): void {
        new Panel('Test-Driven Development', [
            'Write a failing unit test for a function, then write just enough code to make the unit test pass; repeat. ' +
            '[Read more](https://en.wikipedia.org/wiki/Test-driven_development)',
        ]).show()
    }

    public showExample(callback: () => void): void {
        new ComputerMessage(['Can you give me a unit test to start with?']).add()
        new ButtonMessage('divide(4, 2) === 2', () => this.showExampleStep2(callback)).add()
    }

    private showExampleStep2(callback: () => void): void {
        new ComputerMessage([
            'I wrote just enough code to pass the unit test.',
            'function divide(a, b) {\n  return 2\n}'
        ]).add()
        new ComputerMessage(['This function does NOT implement division yet, so add another unit test.']).add()
        new ButtonMessage('divide(9, 3) === 3', () => this.showExampleStep3(callback)).add()
    }

    private showExampleStep3(callback: () => void): void {
        new ComputerMessage([
            'I rewrote the function with just enough code such that it passes both unit tests.',
            'function divide(a, b) {\n  return b\n}'
        ]).add()
        new ComputerMessage(['This function still does NOT implement division, so add another unit test.']).add()
        new ButtonMessage('divide(6, 3) === 2', () => this.showExampleStep4(callback)).add()
    }

    private showExampleStep4(callback: () => void): void {
        new ComputerMessage([
            'I rewrote the function again with just enough code such that it passes all 3 unit tests.',
            'function divide(a, b) {\n  return a / b\n}'
        ]).add()
        new ComputerMessage(['This function implements division, so submit the unit tests.']).add()
        new ButtonMessage('Submit unit tests', () => this.showExampleStep5(callback)).add()
    }

    private showExampleStep5(callback: () => void): void {
        new ComputerMessage(['Well done, now you understand the basics of Test-Driven Development!']).add()
        callback()
    }

    public showWelcomeMessage(): void {
        new ComputerMessage(['You read the *Specification* and write *Unit Tests* that fail the *Current Function*.']).add()
        new ComputerMessage(['After adding a unit test I (the AI bot) rewrite the *Current Function* such that it passes the *Unit Tests*.']).add()
        new ComputerMessage(['When you think the *Current Function* is according to the *Specification*, you submit the *Unit Tests*.']).add()
    }

    public showPanelsOnMenu(specification: string, currentCandidate: Candidate, previousCandidate: Candidate|undefined, _perfectCandidate: Candidate, _coveredCandidates: Candidate[]): void {
        this.showSpecificationPanel(specification)
        this.showCurrentFunctionPanel(currentCandidate, previousCandidate)
    }

    private showSpecificationPanel(specification: string): void {
        new Panel('Specification', [specification]).show()
    }

    public showCurrentFunctionPanel(currentCandidate: Candidate, previousCandidate: Candidate|undefined): void {
        new Panel('Current Function', [currentCandidate.toHtmlWithPrevious(previousCandidate)]).show()
    }

    public showUselessUnitTestMessage(): void {
        new ComputerMessage([
            'I added the unit test to the *Unit Tests*, ' +
            'but the *Current Function* already passed this unit test, ' +
            'so I did NOT improve the *Current Function*.',
        ]).add()
    }

    public showUsefulUnitTestMessage(): void {
        new ComputerMessage([
            'I added the unit test to the *Unit Tests* and ' +
            'I improved the *Current Function* such that it now also passes the new unit test.',
        ]).add()
    }

    public showHintMessage(_currentCandidate: Candidate, failingTestResult: TestResult, penaltyHint: number): void {
        new ComputerMessage(['A failing unit test for the *Current Function* is the following.', failingTestResult.unitTest.toString()]).add()
        new ComputerMessage([`The cost for this hint is ${penaltyHint}%.`]).add()
    }

    public showNoHintMessage(penaltyHint: number): void {
        new ComputerMessage(['I can\'t think of a failing unit test for the *Current Function*.']).add()
        new ComputerMessage([`The cost for this hint is ${penaltyHint}%.`]).add()
    }

    public showBugFoundMessage(_currentCandidate: Candidate, failingTestResult: TestResult, penaltySubmitWithBug: number): void {
        new ComputerMessage(['I checked the *Current Function*, but it is NOT according to the *Specification*.']).add()
        new ComputerMessage(['It produces the following incorrect output.', failingTestResult.toString()]).add()
        new ComputerMessage([`The cost for submitting when there is still an error is ${penaltySubmitWithBug}%.`]).add()
    }

    public showUnsuccessfulEndMessage(score: number): void {
        new ComputerMessage(['I checked the *Current Function*, but it is NOT according to the *Specification*.']).add()
        new ComputerMessage([`Your final *Score* is ${score}%.`]).add()
    }

    public showSuccessfulEndMessage(score: number): void {
        new ComputerMessage(['I checked the *Current Function* and it is indeed according to the *Specification*.']).add()
        new ComputerMessage([`Your final *Score* is ${score}%.`]).add()
    }
}

import { Candidate } from './candidate.js'
import { Panel, ComputerMessage } from './frame.js'
import { Methodology } from './methodology.js'
import { TestResult } from './test_result.js'

export class TestDrivenDevelopment extends Methodology {
    public name(): string {
        return 'Test-Driven Development'
    }

    public showBasicDefinition(): void {
        new Panel('Test-Driven Development', [
            'Write a failing unit test for a function, then write just enough code to make the unit test pass; repeat. ' +
            '[more](https://en.wikipedia.org/wiki/Test-driven_development)',
        ]).show()
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

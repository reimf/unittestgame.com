import { Candidate } from './candidate.js'
import { Panel, ComputerMessage } from './frame.js'
import { Methodology } from './methodology.js'
import { TestResult } from './test_result.js'

export class MutationTesting extends Methodology {
    public name(): string {
        return 'Mutation Testing'
    }

    public showBasicDefinition(): void {
        new Panel('Mutation Testing', [
            'After writing unit tests for a function, each mutation of the function should make at least one unit test fail. ' +
            '[more](https://en.wikipedia.org/wiki/Mutation_testing)',
        ]).show()
    }

    public showWelcomeMessage(): void {
        new ComputerMessage(['You read *The Function* and write *Unit Tests* that pass.']).add()
        new ComputerMessage(['After adding a unit test, I show the line coverage of *The Function*.']).add()
        new ComputerMessage(['When you think *The Function* is fully tested, you submit the *Unit Tests*.']).add()
    }

    public showPanelsOnMenu(_specification: string, _currentCandidate: Candidate, perfectCandidate: Candidate, coveredCandidates: Candidate[]): void {
        this.showCodeCoveragePanel(perfectCandidate, coveredCandidates)
    }

    private showCodeCoveragePanel(perfectCandidate: Candidate, coveredCandidates: Candidate[]): void {
        new Panel('The Function', [perfectCandidate.toHtmlWithCoverage(coveredCandidates)]).show()
    }

    public showUselessUnitTestMessage(): void {
        new ComputerMessage([
            'I added the unit test to the *Unit Tests*, ' +
            'but the line coverage of *The Function* did NOT increase.',
        ]).add()
    }

    public showUsefulUnitTestMessage(): void {
        new ComputerMessage([
            'I added the unit test to the *Unit Tests* and ' +
            'I showed the increased line coverage in *The Function*.'
        ]).add()
    }

    public showHintMessage(currentCandidate: Candidate, _failingTestResult: TestResult, penaltyHint: number): void {
        new ComputerMessage(['A mutation of *The Function* that is NOT correct, but still passes the *Unit Tests* is the following.', currentCandidate.toHtml()]).add()
        new ComputerMessage([`The cost for this hint is ${penaltyHint}%.`]).add()
    }

    public showNoHintMessage(penaltyHint: number): void {
        new ComputerMessage(['I can\'t think of a mutation of *The Function* that passes all the *Unit Tests*.']).add()
        new ComputerMessage([`The cost for this hint is ${penaltyHint}%.`]).add()
    }

    public showBugFoundMessage(currentCandidate: Candidate, _failingTestResult: TestResult, penaltySubmitWithBug: number): void {
        new ComputerMessage(['I checked *The Function*, but it is NOT fully tested.']).add()
        new ComputerMessage(['A mutation of *The Function* that is NOT correct, but still passes your unit tests is the following.', currentCandidate.toHtml()]).add()
        new ComputerMessage([`The cost for submitting when there is still an error is ${penaltySubmitWithBug}%.`]).add()
    }

    public showUnsuccessfulEndMessage(score: number): void {
        new ComputerMessage(['I checked *The Function*, but it is NOT fully tested.']).add()
        new ComputerMessage([`Your final *Score* is ${score}%.`]).add()
    }

    public showSuccessfulEndMessage(score: number): void {
        new ComputerMessage(['I checked *The Function* and it is indeed fully tested.']).add()
        new ComputerMessage([`Your final *Score* is ${score}%.`]).add()
    }
}

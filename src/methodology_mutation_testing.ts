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
            'After writing unit tests for a function, each mutation of the function should make at least one unit test fail.',
            'Read more about [Mutation Testing on Wikipedia](https://en.wikipedia.org/wiki/Mutation_testing).',
        ]).show()
    }

    public showWelcomeMessage(): void {
        new ComputerMessage(['You write *Unit Tests* that pass *The Function*.']).show()
        new ComputerMessage(['After adding a unit test, I highlight the lines of *The Function* that are covered by the *Unit Tests*.']).show()
        new ComputerMessage(['When you think *The Function* is fully tested, you submit the *Unit Tests*.']).show()
    }

    public showPanelsOnMenu(_specification: string, _currentCandidate: Candidate, perfectCandidate: Candidate, coveredCandidates: Candidate[]): void {
        this.showCodeCoveragePanel(perfectCandidate, coveredCandidates)
    }

    private showCodeCoveragePanel(perfectCandidate: Candidate, coveredCandidates: Candidate[]): void {
        new Panel('The Function', [perfectCandidate.toHtmlWithCoverage(coveredCandidates)]).show()
    }

    public showUselessUnitTestMessage(): void {
        new ComputerMessage(['I added the unit test to the *Unit Tests*.']).replace()
    }

    public showUsefulUnitTestMessage(): void {
        new ComputerMessage(['I added the unit test to the *Unit Tests*.']).replace()
    }

    public showHintMessage(currentCandidate: Candidate, _failingTestResult: TestResult, penaltyHint: number): void {
        new ComputerMessage(['A mutation of *The Function* that is NOT correct, but still passes the *Unit Tests* is the following.', currentCandidate.toHtml()]).show()
        new ComputerMessage([`The cost for this hint is ${penaltyHint}%.`]).show()
    }

    public showNoHintMessage(penaltyHint: number): void {
        new ComputerMessage(['I can\'t think of a mutation of *The Function* that passes all the *Unit Tests*.']).show()
        new ComputerMessage([`The cost for this hint is ${penaltyHint}%.`]).show()
    }

    public showBugFoundMessage(currentCandidate: Candidate, _failingTestResult: TestResult, penaltySubmitWithBug: number): void {
        new ComputerMessage(['I checked *The Function*, but it is NOT fully tested.']).show()
        new ComputerMessage(['A mutation of *The Function* that is NOT correct, but still passes your unit tests is the following.', currentCandidate.toHtml()]).show()
        new ComputerMessage([`The cost for submitting when there is still an error is ${penaltySubmitWithBug}%.`]).show()
    }

    public showUnsuccessfulEndMessage(score: number): void {
        new ComputerMessage(['I checked *The Function*, but it is NOT fully tested.']).show()
        new ComputerMessage([`Your final *Score* is ${score}%.`]).show()
    }

    public showSuccessfulEndMessage(score: number): void {
        new ComputerMessage(['I checked *The Function* and it is indeed fully tested.']).show()
        new ComputerMessage([`Your final *Score* is ${score}%.`]).show()
    }
}

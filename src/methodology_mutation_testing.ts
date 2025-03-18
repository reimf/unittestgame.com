import { Candidate } from './candidate.js'
import { Panel, ComputerMessage } from './frame.js'
import { Methodology } from './methodology.js'
import { TestResult } from './test_result.js'

export class MutationTesting extends Methodology {
    public name(): string {
        return 'Mutation Testing'
    }
    
    public showWelcomeMessage(): void {
        new ComputerMessage([
            'You write *Unit Tests* that pass *The Function*. ' +
            'After adding a unit test, I highlight the lines covered. ' +
            'Submit the unit tests when you think the function is fully tested. ' +
            'If you are wrong, I show a mutation of the function that is NOT correct, ' +
            'but passes your unit tests.',
        ]).show()
    }

    public showPanelsOnMenu(_specification: string, _currentCandidate: Candidate, perfectCandidate: Candidate, coveredCandidates: Candidate[]): void {
        this.showCodeCoveragePanel(perfectCandidate, coveredCandidates)
    }

    private showCodeCoveragePanel(perfectCandidate: Candidate, coveredCandidates: Candidate[]): void {
        new Panel('The Function', [
            perfectCandidate.toHtmlWithCoverage(coveredCandidates),
        ]).show()
    }

    public showUselessUnitTestMessage(): void {
        new ComputerMessage([
            'I added the unit test.',
        ]).show()
    }

    public showUsefulUnitTestMessage(): void {
        new ComputerMessage([
            'I added the unit test.',
        ]).show()
    }

    public showHintMessage(currentCandidate: Candidate, _failingTestResult: TestResult, penaltyHint: number): void {
        new ComputerMessage([
            'A mutation that is NOT correct, but still passes your unit tests is the following.',
            currentCandidate.toHtml(),
            `The cost for this hint is ${penaltyHint}%.`,
        ]).show()
    }

    public showNoHintMessage(penaltyHint: number): void {
        new ComputerMessage([
            'I can\'t think of a mutation that passes all your unit tests.',
            `The cost for this hint is ${penaltyHint}%.`,
        ]).show()
    }

    public showBugFoundMessage(currentCandidate: Candidate, _failingTestResult: TestResult, penaltySubmitWithBug: number): void {
        new ComputerMessage([
            'I checked the function, but it is NOT fully tested.',
            'A mutation that is NOT correct, but still passes your unit tests is the following.',
            currentCandidate.toHtml(),
            `The cost for submitting when there is still an error is ${penaltySubmitWithBug}%.`,
        ]).show()
    }

    public showUnsuccessfulEndMessage(score: number): void {
        new ComputerMessage([
            'I checked the function, but it is NOT fully tested.',
            `Your final score is ${score}%.`,
        ]).show()
    }

    public showRedundantUnitTestsEndMessage(score: number, numberOfRedundantUnitTests: number, penaltyRedundantUnitTest: number): void {
        new ComputerMessage([
            'I checked the function and it is indeed fully tested.',
            `You needed ${numberOfRedundantUnitTests} more unit tests than needed.`,
            `The cost for an extra unit test is ${penaltyRedundantUnitTest}%.`,
            `Your final score is ${score}%.`,
        ]).show()
    }

    public showSuccessfulEndMessage(score: number): void {
        new ComputerMessage([
            'I checked the function and it is indeed fully tested.',
            `Your final score is ${score}%.`,
        ]).show()
    }
}

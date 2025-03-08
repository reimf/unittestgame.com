import { Candidate } from './candidate.js'
import { Panel, ComputerMessage } from './frame.js'
import { Game } from './game.js'
import { Em, Paragraph } from './html.js'
import { TestResult } from './test_result.js'

export class MutationTesting extends Game {
    public showWelcomeMessage(): void {
        new ComputerMessage([
            new Paragraph()
            .appendText('You study ')
            .appendChild(new Em().appendText('The Function'))
            .appendText(' and write ')
            .appendChild(new Em().appendText('Unit Tests'))
            .appendText(' that pass the function. ')
            .appendText('After adding a unit test, I highlight the lines covered. ')
            .appendText('Submit the unit tests when you think the function is fully covered. ')
            .appendText('If you are wrong, I show a mutation of the function that is NOT correct, but passes your unit tests.')
        ]).show()
    }

    public showPanelsOnPlay(perfectCandidate: Candidate, coveredCandidates: Candidate[], showSpecificationPanel: () => void): void {
        this.showCodeCoveragePanel(perfectCandidate, coveredCandidates)
    }

    public showCodeCoveragePanel(perfectCandidate: Candidate, coveredCandidates: Candidate[]): void {
        new Panel('The Function', [
            perfectCandidate.toHtmlWithCoverage(coveredCandidates),
        ]).show()
    }

    public showPanelsOnMenu(currentCandidate: Candidate, perfectCandidate: Candidate, coveredCandidates: Candidate[]): void {
        this.showCodeCoveragePanel(perfectCandidate, coveredCandidates)
    }

    public showUselessUnitTestMessage(): void {
        new ComputerMessage([
            new Paragraph().appendText('I added the unit test.'),
        ]).show()
    }

    public showUsefulUnitTestMessage(): void {
        new ComputerMessage([
            new Paragraph().appendText('I added the unit test.'),
        ]).show()
    }

    public showIncorrectUnitTestMessage(penaltyIncorrectUnitTest: number): void {
        new ComputerMessage([
            new Paragraph().appendText('I did NOT add the unit test, because it is NOT correct.'),
            new Paragraph().appendText(`The cost for trying to add an incorrect unit test is ${penaltyIncorrectUnitTest}%.`),
        ]).show()
    }

    public showHintMessage(currentCandidate: Candidate, failingTestResult: TestResult, penaltyHint: number): void {
        new ComputerMessage([
            new Paragraph().appendText('A mutation that is NOT correct, but still passes your unit tests is the following.'),
            currentCandidate.toHtml(),
            new Paragraph().appendText(`The cost for this hint is ${penaltyHint}%.`),
        ]).show()
    }

    public showNoHintMessage(penaltyHint: number): void {
        new ComputerMessage([
            new Paragraph().appendText('I can only find mutations that fail at least one of your unit tests.'),
            new Paragraph().appendText(`The cost for this hint is ${penaltyHint}%.`),
        ]).show()
    }

    public showBugFoundMessage(currentCandidate: Candidate, failingTestResult: TestResult, penaltySubmitWithBug: number): void {
        new ComputerMessage([
            new Paragraph().appendLines([
                'The function is NOT fully tested.',
                'A mutation that is NOT correct, but still passes your unit tests is the following.',
            ]),
            currentCandidate.toHtml(),
            new Paragraph().appendText(`The cost for submitting when there is still an error is ${penaltySubmitWithBug}%.`),
        ]).show()
    }

    public showMinimumScoreEndMessage(score: number): void {
        new ComputerMessage([
            new Paragraph().appendLines([
                'You have to retry this level,',
                `because your score dropped to ${score}%.`
            ])
        ]).show()
    }

    public showUnsuccessfulEndMessage(score: number): void {
        new ComputerMessage([
            new Paragraph().appendText('The function is NOT fully tested.'),
            new Paragraph().appendText(`Your final score is ${score}%.`),
        ]).show()
    }

    public showRedundantUnitTestsEndMessage(score: number, numberOfRedundantUnitTests: number, penaltyRedundantUnitTest: number): void {
        new ComputerMessage([
            new Paragraph().appendText('The function is fully tested.'),
            new Paragraph().appendText(`You needed ${numberOfRedundantUnitTests} more unit tests than needed.`),
            new Paragraph().appendText(`The cost for an extra unit test is ${penaltyRedundantUnitTest}%.`),
            new Paragraph().appendText(`Your final score is ${score}%.`),
        ]).show()
    }

    public showSuccessfulEndMessage(score: number): void {
        new ComputerMessage([
            new Paragraph().appendText('The function is fully tested.'),
            new Paragraph().appendText(`Your final score is ${score}%.`),
        ]).show()
    }
}

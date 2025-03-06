import { Paragraph } from './html.js'
import { Panel, ComputerMessage } from './frame.js'
import { Game } from './game.js'
import { TestResult } from './test_result.js'
import { Candidate } from './candidate.js'

export class MutationTesting extends Game {
    public showWelcomeMessage(): void {
        new ComputerMessage([
            new Paragraph().appendLines([
                'You write passing unit tests for a function and I highlight the lines covered.',
                'After submitting I check to see if the function is fully tested.',
                'If not, I find a mutation of the function that is NOT correct, but passes your unit tests.',
                'Let\'s go next level!',
            ]),
        ]).show()
    }

    public showPanelsOnPlay(perfectCandidate: Candidate, coveredCandidates: Candidate[],showSpecificationPanel: () => void): void {
        this.showCodeCoveragePanel(perfectCandidate, coveredCandidates)
    }

    public showContractMessage(): void {
        new ComputerMessage([
            new Paragraph().appendLines([
                'In the sidebar you see a function and',
                'the unit tests you have written (none yet).',
                'Add passing unit tests until you think the function is fully tested.',
                'Submit the unit tests and I will do some mutation testing to see if you were right.',
            ]),
        ]).show()
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
            new Paragraph().appendLines([
                'The function is NOT fully tested.',
                `Your final score is ${score}%.`
            ]),
        ]).show()
    }

    public showSuccessfulEndMessage(score: number): void {
        new ComputerMessage([
            new Paragraph().appendLines([
                'The function is fully tested.',
                `Your final score is ${score}%.`
            ]),
        ]).show()
    }
}

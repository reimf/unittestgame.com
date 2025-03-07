import { Panel, ComputerMessage } from './frame.js';
import { Game } from './game.js';
import { Paragraph } from './html.js';
export class MutationTesting extends Game {
    showWelcomeMessage() {
        new ComputerMessage([
            new Paragraph().appendLines([
                'You write passing unit tests for a function and I highlight the lines covered.',
                'After submitting I check to see if the function is fully tested.',
                'If not, I find a mutation of the function that is NOT correct, but passes your unit tests.',
                'Let\'s go next level!',
            ]),
        ]).show();
    }
    showPanelsOnPlay(perfectCandidate, coveredCandidates, showSpecificationPanel) {
        this.showCodeCoveragePanel(perfectCandidate, coveredCandidates);
    }
    showContractMessage() {
        new ComputerMessage([
            new Paragraph().appendLines([
                'In the sidebar you see a function and',
                'the unit tests you have written (none yet).',
                'Add passing unit tests until you think the function is fully tested.',
                'Submit the unit tests and I will do some mutation testing to see if you were right.',
            ]),
        ]).show();
    }
    showCodeCoveragePanel(perfectCandidate, coveredCandidates) {
        new Panel('The Function', [
            perfectCandidate.toHtmlWithCoverage(coveredCandidates),
        ]).show();
    }
    showPanelsOnMenu(currentCandidate, perfectCandidate, coveredCandidates) {
        this.showCodeCoveragePanel(perfectCandidate, coveredCandidates);
    }
    showUselessUnitTestMessage() {
        new ComputerMessage([
            new Paragraph().appendText('I added the unit test.'),
        ]).show();
    }
    showUsefulUnitTestMessage() {
        new ComputerMessage([
            new Paragraph().appendText('I added the unit test.'),
        ]).show();
    }
    showIncorrectUnitTestMessage(penaltyIncorrectUnitTest) {
        new ComputerMessage([
            new Paragraph().appendText('I did NOT add the unit test, because it is NOT correct.'),
            new Paragraph().appendText(`The cost for trying to add an incorrect unit test is ${penaltyIncorrectUnitTest}%.`),
        ]).show();
    }
    showHintMessage(currentCandidate, failingTestResult, penaltyHint) {
        new ComputerMessage([
            new Paragraph().appendText('A mutation that is NOT correct, but still passes your unit tests is the following.'),
            currentCandidate.toHtml(),
            new Paragraph().appendText(`The cost for this hint is ${penaltyHint}%.`),
        ]).show();
    }
    showNoHintMessage(penaltyHint) {
        new ComputerMessage([
            new Paragraph().appendText('I can only find mutations that fail at least one of your unit tests.'),
            new Paragraph().appendText(`The cost for this hint is ${penaltyHint}%.`),
        ]).show();
    }
    showBugFoundMessage(currentCandidate, failingTestResult, penaltySubmitWithBug) {
        new ComputerMessage([
            new Paragraph().appendLines([
                'The function is NOT fully tested.',
                'A mutation that is NOT correct, but still passes your unit tests is the following.',
            ]),
            currentCandidate.toHtml(),
            new Paragraph().appendText(`The cost for submitting when there is still an error is ${penaltySubmitWithBug}%.`),
        ]).show();
    }
    showMinimumScoreEndMessage(score) {
        new ComputerMessage([
            new Paragraph().appendLines([
                'You have to retry this level,',
                `because your score dropped to ${score}%.`
            ])
        ]).show();
    }
    showUnsuccessfulEndMessage(score) {
        new ComputerMessage([
            new Paragraph().appendText('The function is NOT fully tested.'),
            new Paragraph().appendText(`Your final score is ${score}%.`),
        ]).show();
    }
    showSuccessfulEndMessage(score) {
        new ComputerMessage([
            new Paragraph().appendText('The function is fully tested.'),
            new Paragraph().appendText(`Your final score is ${score}%.`),
        ]).show();
    }
}

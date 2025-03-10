import { Panel, ComputerMessage } from './frame.js';
import { Game } from './game.js';
import { Em, Paragraph } from './html.js';
export class TestDrivenDevelopment extends Game {
    showWelcomeMessage() {
        new ComputerMessage([
            new Paragraph()
                .appendText('You read the ')
                .appendChild(new Em().appendText('Specification'))
                .appendText(' and write ')
                .appendChild(new Em().appendText('Unit Tests'))
                .appendText(' that fail the ')
                .appendChild(new Em().appendText('Current Function'))
                .appendText('. ')
                .appendText('After adding a unit test, I rewrite the function such that it passes. ')
                .appendText('Submit the unit tests when you think the function is according to the specification. ')
                .appendText('If you are wrong, I show a unit test that is correct, but does NOT pass the function.')
        ]).show();
    }
    showPanelsOnPlay(perfectCandidate, coveredCandidates, showSpecificationPanel) {
        showSpecificationPanel();
    }
    showCurrentCandidatePanel(currentCandidate) {
        new Panel('Current Function', [
            currentCandidate.toHtml(),
        ]).show();
    }
    showPanelsOnMenu(currentCandidate, perfectCandidate, coveredCandidates) {
        this.showCurrentCandidatePanel(currentCandidate);
    }
    showUselessUnitTestMessage() {
        new ComputerMessage([
            new Paragraph().appendLines([
                'I added the unit test,',
                'but the current function already passed this unit test,',
                'so I didn\'t improve the function.'
            ]),
        ]).show();
    }
    showUsefulUnitTestMessage() {
        new ComputerMessage([
            new Paragraph().appendText('I added the unit test and I improved the function.'),
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
            new Paragraph().appendText('A failing unit test for the current function is the following.'),
            new Paragraph().appendText(failingTestResult.unitTest.toString()),
            new Paragraph().appendText(`The cost for this hint is ${penaltyHint}%.`),
        ]).show();
    }
    showNoHintMessage(penaltyHint) {
        new ComputerMessage([
            new Paragraph().appendText('I can\'t think of a failing unit test for the current function.'),
            new Paragraph().appendText(`The cost for this hint is ${penaltyHint}%.`),
        ]).show();
    }
    showBugFoundMessage(currentCandidate, failingTestResult, penaltySubmitWithBug) {
        new ComputerMessage([
            new Paragraph().appendLines([
                'The current function is NOT according to the specification.',
                'It produces the following incorrect output:'
            ]),
            new Paragraph().appendText(failingTestResult.toString()),
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
            new Paragraph().appendText('I checked the current function, but it is NOT according to the specification.'),
            new Paragraph().appendText(`Your final score is ${score}%.`),
        ]).show();
    }
    showRedundantUnitTestsEndMessage(score, numberOfRedundantUnitTests, penaltyRedundantUnitTest) {
        new ComputerMessage([
            new Paragraph().appendText('I checked the current function and it is according to the specification.'),
            new Paragraph().appendText(`You needed ${numberOfRedundantUnitTests} more unit tests than needed.`),
            new Paragraph().appendText(`The cost for an extra unit test is ${penaltyRedundantUnitTest}%.`),
            new Paragraph().appendText(`Your final score is ${score}%.`),
        ]).show();
    }
    showSuccessfulEndMessage(score) {
        new ComputerMessage([
            new Paragraph().appendText('I checked the current function and it is according to the specification.'),
            new Paragraph().appendText(`Your final score is ${score}%.`),
        ]).show();
    }
}

import { Panel, ComputerMessage } from './frame.js';
import { Game } from './game.js';
import { Paragraph } from './html.js';
export class TestDrivenDevelopment extends Game {
    showWelcomeMessage() {
        new ComputerMessage([
            new Paragraph().appendLines([
                'You write failing unit tests.',
                'After adding each unit test I write a function that passes.',
                'Let\'s go next level!',
            ]),
        ]).show();
    }
    showPanelsOnPlay(perfectCandidate, coveredCandidates, showSpecificationPanel) {
        showSpecificationPanel();
    }
    showContractMessage() {
        new ComputerMessage([
            new Paragraph().appendLines([
                'In the sidebar you see the specification,',
                'the unit tests you have written (none yet) and',
                'my take at the function.',
                'Add failing unit tests and I will improve the function such that it passes.',
                'Submit the unit tests if the function is according to the specification.',
            ]),
        ]).show();
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
            new Paragraph().appendLines([
                'The current function is NOT according to the specification.',
                `Your final score is ${score}%.`
            ]),
        ]).show();
    }
    showSuccessfulEndMessage(score) {
        new ComputerMessage([
            new Paragraph().appendLines([
                'The current function is according to the specification.',
                `Your final score is ${score}%.`
            ]),
        ]).show();
    }
}

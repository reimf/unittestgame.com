import { Code, Paragraph } from './html.js';
import { Panel, ComputerMessage } from './frame.js';
import { Round } from './round.js';
export class MtRound extends Round {
    showPanelsOnPlay() {
        this.showPerfectCandidatePanel();
    }
    showContractMessage() {
        new ComputerMessage([
            new Paragraph().appendLines([
                'In the sidebar you see the function to test and',
                'the unit tests you have written (none yet).',
                'Add passing unit tests until you think the function is fully tested.',
                'Submit the unit tests and I will do some mutation testing to see if you were right.',
            ]),
        ]).show();
    }
    showPerfectCandidatePanel() {
        new Panel('The Function', [
            new Code().appendText(this.level.perfectCandidate.toString()),
        ]).show();
    }
    showPanelsOnMenu() {
        // nothing
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
    showIncorrectUnitTestMessage() {
        new ComputerMessage([
            new Paragraph().appendText('I did NOT add the unit test, because it is NOT correct.'),
            new Paragraph().appendText(`The cost for trying to add an incorrect unit test is ${this.PENALTYINCORRECTUNITTEST}%.`),
        ]).show();
        this.subtractPenalty(this.PENALTYINCORRECTUNITTEST);
    }
    showHintMessage() {
        new ComputerMessage([
            new Paragraph().appendText('A mutation that still passes all your unit tests is the following.'),
            new Code().appendText(this.currentCandidate.toString()),
            new Paragraph().appendText('The function is NOT correct, because the following unit test fails.'),
            new Code().appendText(this.failingTestResult.unitTest.toString()),
            new Paragraph().appendText(`The cost for this hint is ${this.PENALTYHINT}%.`),
        ]).show();
        this.subtractPenalty(this.PENALTYHINT);
    }
    showNoHintMessage() {
        new ComputerMessage([
            new Paragraph().appendText('I can\'t find a mutation that passes all your unit tests.'),
            new Paragraph().appendText(`The cost for this hint is ${this.PENALTYHINT}%.`),
        ]).show();
        this.subtractPenalty(this.PENALTYHINT);
    }
    showBugFoundMessage() {
        new ComputerMessage([
            new Paragraph().appendLines([
                'The function is NOT fully unit tested.',
                'A mutation that still passes all your unit tests is the following.',
            ]),
            new Code().appendText(this.currentCandidate.toString()),
            new Paragraph().appendText('The function is NOT correct, because the following unit test fails.'),
            new Code().appendText(this.failingTestResult.unitTest.toString()),
            new Paragraph().appendText(`The cost for submitting when there is still an error is ${this.PENALTYSUBMITWITHBUG}%.`),
        ]).show();
        this.subtractPenalty(this.PENALTYSUBMITWITHBUG);
    }
    showMinimumScoreEndMessage() {
        new ComputerMessage([
            new Paragraph().appendLines([
                'You have to retry this level,',
                'because your score dropped to 0%.'
            ])
        ]).show();
    }
    showUnsuccessfulEndMessage() {
        new ComputerMessage([
            new Paragraph().appendLines([
                'The function is NOT fully tested.',
                `Your score is ${this.score}%.`
            ]),
        ]).show();
    }
    showSuccessfulEndMessage() {
        new ComputerMessage([
            new Paragraph().appendLines([
                'The function is fully tested.',
                `Your score is ${this.score}%.`
            ]),
        ]).show();
    }
}

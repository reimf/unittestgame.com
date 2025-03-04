import { Paragraph } from './html.js';
import { Panel, ComputerMessage } from './frame.js';
import { Round } from './round.js';
import { Random } from './random.js';
export class MtRound extends Round {
    static showWelcomeMessage() {
        new ComputerMessage([
            new Paragraph().appendLines([
                'Welcome to UnitTestGame.com!',
                'I am an AI-bot that does Mutation Testing.',
                'You write passing unit tests for a function and I highlight the lines covered.',
                'After submitting I check to see if the function is fully tested.',
                'If not, I find a mutation of the function that is NOT correct, but passes your unit tests.',
                'Let\'s go next level!',
            ]),
        ]).show();
    }
    showPanelsOnPlay() {
        this.showCodeCoveragePanel();
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
    showCodeCoveragePanel() {
        const candidates = this.userdefinedUnitTests.map(unitTest => {
            const passingCandidates = this.level.descendantsOfPerfectCandidate
                .filter(candidate => candidate.failCount([unitTest]) == 0);
            const simplestPassingCandidate = this.findSimplestCandidates(passingCandidates);
            return Random.elementFrom(simplestPassingCandidate);
        });
        new Panel('The Function', [
            this.level.perfectCandidate.toHtmlWithCoverage(candidates),
        ]).show();
    }
    showPanelsOnMenu() {
        this.showCodeCoveragePanel();
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
            new Paragraph().appendText('A mutation that is NOT correct, but still passes your unit tests is the following.'),
            this.currentCandidate.toHtml(),
            new Paragraph().appendText('The function is NOT correct, because the following unit test fails.'),
            new Paragraph().appendText(this.failingTestResult.unitTest.toString()),
            new Paragraph().appendText(`The cost for this hint is ${this.PENALTYHINT}%.`),
        ]).show();
        this.subtractPenalty(this.PENALTYHINT);
    }
    showNoHintMessage() {
        new ComputerMessage([
            new Paragraph().appendText('I can only find mutations that fail at least one of your unit tests.'),
            new Paragraph().appendText(`The cost for this hint is ${this.PENALTYHINT}%.`),
        ]).show();
        this.subtractPenalty(this.PENALTYHINT);
    }
    showBugFoundMessage() {
        new ComputerMessage([
            new Paragraph().appendLines([
                'The function is NOT fully tested.',
                'A mutation that is NOT correct, but still passes your unit tests is the following.',
            ]),
            this.currentCandidate.toHtml(),
            new Paragraph().appendText('The function is NOT correct, because the following unit test fails.'),
            new Paragraph().appendText(this.failingTestResult.unitTest.toString()),
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
                `Your final score is ${this.score}%.`
            ]),
        ]).show();
    }
    showSuccessfulEndMessage() {
        new ComputerMessage([
            new Paragraph().appendLines([
                'The function is fully tested.',
                `Your final score is ${this.score}%.`
            ]),
        ]).show();
    }
}

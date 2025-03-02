import { Code, Paragraph } from './html.js'
import { Panel, ComputerMessage } from './frame.js'
import { Round } from './round.js'

export class MtRound extends Round {
    protected showPanelsOnPlay(): void {
        this.showPerfectCandidatePanel()
    }

    protected showContractMessage(): void {
        new ComputerMessage([
            new Paragraph().appendLines([
                'In the sidebar you see the function to test and',
                'the unit tests you have written (none yet).',
                'Add passing unit tests until you think the function is fully tested.',
                'Submit the unit tests and I will do some mutation testing to see if you were right.',
            ]),
        ]).show()
    }

    protected showPerfectCandidatePanel(): void {
        new Panel('The Function', [
            new Code().appendText(this.level.perfectCandidate.toString()),
        ]).show()
    }

    protected showPanelsOnMenu(): void {
        // nothing
    }

    protected showUselessUnitTestMessage(): void {
        new ComputerMessage([
            new Paragraph().appendText('I added the unit test.'),
        ]).show()
    }

    protected showUsefulUnitTestMessage(): void {
        new ComputerMessage([
            new Paragraph().appendText('I added the unit test.'),
        ]).show()
    }

    protected showIncorrectUnitTestMessage(): void {
        new ComputerMessage([
            new Paragraph().appendText('I did NOT add the unit test, because it is NOT correct.'),
            new Paragraph().appendText(`The cost for trying to add an incorrect unit test is ${this.PENALTYINCORRECTUNITTEST}%.`),
        ]).show()
        this.subtractPenalty(this.PENALTYINCORRECTUNITTEST)
    }

    protected showHintMessage(): void {
        new ComputerMessage([
            new Paragraph().appendText('A mutation that still passes all your unit tests is the following.'),
            new Code().appendText(this.currentCandidate.toString()),
            new Paragraph().appendText('The function is NOT correct, because the following unit test fails.'),
            new Code().appendText(this.failingTestResult!.unitTest.toString()),
            new Paragraph().appendText(`The cost for this hint is ${this.PENALTYHINT}%.`),
        ]).show()
        this.subtractPenalty(this.PENALTYHINT)
    }

    protected showNoHintMessage(): void {
        new ComputerMessage([
            new Paragraph().appendText('I can\'t find a mutation that passes all your unit tests.'),
            new Paragraph().appendText(`The cost for this hint is ${this.PENALTYHINT}%.`),
        ]).show()
        this.subtractPenalty(this.PENALTYHINT)
    }

    protected showBugFoundMessage(): void {
        new ComputerMessage([
            new Paragraph().appendLines([
                'The function is NOT fully unit tested.',
                'A mutation that still passes all your unit tests is the following.',
            ]),
            new Code().appendText(this.currentCandidate.toString()),
            new Paragraph().appendText('The function is NOT correct, because the following unit test fails.'),
            new Code().appendText(this.failingTestResult!.unitTest.toString()),
            new Paragraph().appendText(`The cost for submitting when there is still an error is ${this.PENALTYSUBMITWITHBUG}%.`),
        ]).show()
        this.subtractPenalty(this.PENALTYSUBMITWITHBUG)
    }

    protected showMinimumScoreEndMessage(): void {
        new ComputerMessage([
            new Paragraph().appendLines([
                'You have to retry this level,',
                'because your score dropped to 0%.'
            ])
        ]).show()
    }

    protected showUnsuccessfulEndMessage(): void {
        new ComputerMessage([
            new Paragraph().appendLines([
                'The function is NOT fully tested.',
                `Your score is ${this.score}%.`
            ]),
        ]).show()
    }

    protected showSuccessfulEndMessage(): void {
        new ComputerMessage([
            new Paragraph().appendLines([
                'The function is fully tested.',
                `Your score is ${this.score}%.`
            ]),
        ]).show()
    }
}

import { Paragraph } from './html.js'
import { Panel, ComputerMessage } from './frame.js'
import { Round } from './round.js'

export class TddRound extends Round {
    public static showWelcomeMessage(): void {
        new ComputerMessage([
            new Paragraph().appendLines([
                'Welcome to UnitTestGame.com!',
                'I am an AI-bot that does Test Driven Development.',
                'You write failing unit tests.',
                'And adding a unit test I write a function that passes.',
                'Let\'s go next level!',
            ]),
        ]).show()
    }

    protected showPanelsOnPlay(): void {
        this.level.showSpecificationPanel()
    }

    protected showContractMessage(): void {
        new ComputerMessage([
            new Paragraph().appendLines([
                'In the sidebar you see the specification,',
                'the unit tests you have written (none yet) and',
                'my take at the function.',
                'Add failing unit tests and I will improve the function such that it passes.',
                'Submit the unit tests if the function is according to the specification.',
            ]),
        ]).show()
    }

    protected showCurrentCandidatePanel(): void {
        new Panel('Current Function', [
            this.currentCandidate.toHtml(),
        ]).show()
    }

    protected showPanelsOnMenu(): void {
        this.showCurrentCandidatePanel()
    }

    protected showUselessUnitTestMessage(): void {
        new ComputerMessage([
            new Paragraph().appendLines([
                'I added the unit test,',
                'but the current function already passed this unit test,',
                'so I didn\'t improve the function.'
            ]),
        ]).show()
    }

    protected showUsefulUnitTestMessage(): void {
        new ComputerMessage([
            new Paragraph().appendText('I added the unit test and I improved the function.'),
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
            new Paragraph().appendText('A failing unit test for the current function is the following.'),
            new Paragraph().appendText(this.failingTestResult!.unitTest.toString()),
            new Paragraph().appendText(`The cost for this hint is ${this.PENALTYHINT}%.`),
        ]).show()
        this.subtractPenalty(this.PENALTYHINT)
    }

    protected showNoHintMessage(): void {
        new ComputerMessage([
            new Paragraph().appendText('I can\'t think of a failing unit test for the current function.'),
            new Paragraph().appendText(`The cost for this hint is ${this.PENALTYHINT}%.`),
        ]).show()
        this.subtractPenalty(this.PENALTYHINT)
    }

    protected showBugFoundMessage(): void {
        new ComputerMessage([
            new Paragraph().appendLines([
                'The current function is NOT according to the specification.',
                'It produces the following incorrect output:'
            ]),
            new Paragraph().appendText(this.failingTestResult!.toString()),
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
                'The current function is NOT according to the specification.',
                `Your final score is ${this.score}%.`
            ]),
        ]).show()
    }

    protected showSuccessfulEndMessage(): void {
        new ComputerMessage([
            new Paragraph().appendLines([
                'The current function is according to the specification.',
                `Your final score is ${this.score}%.`
            ]),
        ]).show()
    }
}

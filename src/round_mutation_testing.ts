import { Paragraph } from './html.js'
import { Panel, ComputerMessage } from './frame.js'
import { Round } from './round.js'
import { Random } from './random.js'

export class MutationTesting extends Round {
    public static showWelcomeMessage(): void {
        new ComputerMessage([
            new Paragraph().appendLines([
                'Welcome to UnitTestGame.com!',
                'I am an AI-bot that does Mutation Testing.',
                'You write passing unit tests for a function and I highlight the lines covered.',
                'After submitting I check to see if the function is fully tested.',
                'If not, I find a mutation of the function that is NOT correct, but passes your unit tests.',
                'Let\'s go next level!',
            ]),
        ]).show()
    }

    protected showPanelsOnPlay(): void {
        this.showCodeCoveragePanel()
    }

    protected showContractMessage(): void {
        new ComputerMessage([
            new Paragraph().appendLines([
                'In the sidebar you see a function and',
                'the unit tests you have written (none yet).',
                'Add passing unit tests until you think the function is fully tested.',
                'Submit the unit tests and I will do some mutation testing to see if you were right.',
            ]),
        ]).show()
    }

    protected showCodeCoveragePanel(): void {
        const candidates = this.userdefinedUnitTests.map(unitTest => {
            const passingCandidates = this.level.descendantsOfPerfectCandidate
                .filter(candidate => candidate.failCount([unitTest]) == 0)
            const simplestPassingCandidates = this.findSimplestCandidates(passingCandidates)
            const simplestPassingCandidate = Random.elementFrom(simplestPassingCandidates)
            return simplestPassingCandidate
        })
        new Panel('The Function', [
            this.level.perfectCandidate.toHtmlWithCoverage(candidates),
        ]).show()
    }

    protected showPanelsOnMenu(): void {
        this.showCodeCoveragePanel()
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
            new Paragraph().appendText('A mutation that is NOT correct, but still passes your unit tests is the following.'),
            this.currentCandidate.toHtml(),
            new Paragraph().appendText(`The cost for this hint is ${this.PENALTYHINT}%.`),
        ]).show()
        this.subtractPenalty(this.PENALTYHINT)
    }

    protected showNoHintMessage(): void {
        new ComputerMessage([
            new Paragraph().appendText('I can only find mutations that fail at least one of your unit tests.'),
            new Paragraph().appendText(`The cost for this hint is ${this.PENALTYHINT}%.`),
        ]).show()
        this.subtractPenalty(this.PENALTYHINT)
    }

    protected showBugFoundMessage(): void {
        new ComputerMessage([
            new Paragraph().appendLines([
                'The function is NOT fully tested.',
                'A mutation that is NOT correct, but still passes your unit tests is the following.',
            ]),
            this.currentCandidate.toHtml(),
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
                `Your final score is ${this.score}%.`
            ]),
        ]).show()
    }

    protected showSuccessfulEndMessage(): void {
        new ComputerMessage([
            new Paragraph().appendLines([
                'The function is fully tested.',
                `Your final score is ${this.score}%.`
            ]),
        ]).show()
    }
}

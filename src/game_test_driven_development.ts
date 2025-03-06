import { Paragraph } from './html.js'
import { Panel, ComputerMessage } from './frame.js'
import { Game } from './game.js'
import { TestResult } from './test_result.js'
import { Candidate } from './candidate.js'

export class TestDrivenDevelopment extends Game {
    public showWelcomeMessage(): void {
        new ComputerMessage([
            new Paragraph().appendLines([
                'You write failing unit tests.',
                'After adding each unit test I write a function that passes.',
                'Let\'s go next level!',
            ]),
        ]).show()
    }

    public showPanelsOnPlay(perfectCandidate: Candidate, coveredCandidates: Candidate[],showSpecificationPanel: () => void): void {
        showSpecificationPanel()
    }

    public showContractMessage(): void {
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

    public showCurrentCandidatePanel(currentCandidate: Candidate): void {
        new Panel('Current Function', [
            currentCandidate.toHtml(),
        ]).show()
    }

    public showPanelsOnMenu(currentCandidate: Candidate, perfectCandidate: Candidate, coveredCandidates: Candidate[]): void {
        this.showCurrentCandidatePanel(currentCandidate)
    }

    public showUselessUnitTestMessage(): void {
        new ComputerMessage([
            new Paragraph().appendLines([
                'I added the unit test,',
                'but the current function already passed this unit test,',
                'so I didn\'t improve the function.'
            ]),
        ]).show()
    }

    public showUsefulUnitTestMessage(): void {
        new ComputerMessage([
            new Paragraph().appendText('I added the unit test and I improved the function.'),
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
            new Paragraph().appendText('A failing unit test for the current function is the following.'),
            new Paragraph().appendText(failingTestResult.unitTest.toString()),
            new Paragraph().appendText(`The cost for this hint is ${penaltyHint}%.`),
        ]).show()
    }

    public showNoHintMessage(penaltyHint: number): void {
        new ComputerMessage([
            new Paragraph().appendText('I can\'t think of a failing unit test for the current function.'),
            new Paragraph().appendText(`The cost for this hint is ${penaltyHint}%.`),
        ]).show()
    }

    public showBugFoundMessage(currentCandidate: Candidate, failingTestResult: TestResult, penaltySubmitWithBug: number): void {
        new ComputerMessage([
            new Paragraph().appendLines([
                'The current function is NOT according to the specification.',
                'It produces the following incorrect output:'
            ]),
            new Paragraph().appendText(failingTestResult.toString()),
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
                'The current function is NOT according to the specification.',
                `Your final score is ${score}%.`
            ]),
        ]).show()
    }

    public showSuccessfulEndMessage(score: number): void {
        new ComputerMessage([
            new Paragraph().appendLines([
                'The current function is according to the specification.',
                `Your final score is ${score}%.`
            ]),
        ]).show()
    }
}

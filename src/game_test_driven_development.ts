import { Candidate } from './candidate.js'
import { Panel, ComputerMessage } from './frame.js'
import { Game } from './game.js'
import { Em, Paragraph } from './html.js'
import { TestResult } from './test_result.js'

export class TestDrivenDevelopment extends Game {
    public showWelcomeMessage(): void {
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
        ]).show()
    }

    public showPanelsOnPlay(perfectCandidate: Candidate, coveredCandidates: Candidate[], showSpecificationPanel: () => void): void {
        showSpecificationPanel()
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
            new Paragraph().appendText('The current function is NOT according to the specification.'),
            new Paragraph().appendText(`Your final score is ${score}%.`),
        ]).show()
    }

    public showRedundantUnitTestsEndMessage(score: number, numberOfRedundantUnitTests: number, penaltyRedundantUnitTest: number): void {
        new ComputerMessage([
            new Paragraph().appendText('The current function is according to the specification.'),
            new Paragraph().appendText(`You needed ${numberOfRedundantUnitTests} more unit tests than needed.`),
            new Paragraph().appendText(`The cost for an extra unit test is ${penaltyRedundantUnitTest}%.`),
            new Paragraph().appendText(`Your final score is ${score}%.`),
        ]).show()
    }

    public showSuccessfulEndMessage(score: number): void {
        new ComputerMessage([
            new Paragraph().appendText('The current function is according to the specification.'),
            new Paragraph().appendText(`Your final score is ${score}%.`),
        ]).show()
    }
}

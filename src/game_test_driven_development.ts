import { Candidate } from './candidate.js'
import { Panel, ComputerMessage } from './frame.js'
import { Game } from './game.js'
import { Paragraph } from './html.js'
import { TestResult } from './test_result.js'

export class TestDrivenDevelopment extends Game {
    public showWelcomeMessage(): void {
        new ComputerMessage([
            new Paragraph()
                .markdown('You read the *Specification* and write *Unit Tests* that fail the *Current Function*. ')
                .text('After adding a unit test, I rewrite the function such that it passes. ')
                .text('Submit the unit tests when you think the function is according to the specification. ')
                .text('If you are wrong, I show a unit test that is correct, but does NOT pass the function.'),
        ]).show()
    }

    public showPanelsOnMenu(specification: string, currentCandidate: Candidate, _perfectCandidate: Candidate, _coveredCandidates: Candidate[]): void {
        this.showSpecificationPanel(specification)
        this.showCurrentCandidatePanel(currentCandidate)
    }

    private showSpecificationPanel(specification: string): void {
        new Panel('Specification', [
            new Paragraph().text(specification),
        ]).show()
    }
    
    public showCurrentCandidatePanel(currentCandidate: Candidate): void {
        new Panel('Current Function', [
            currentCandidate.toHtml(),
        ]).show()
    }

    public showUselessUnitTestMessage(): void {
        new ComputerMessage([
            new Paragraph().text(
                    'I added the unit test, ' +
                    'but the current function already passed this unit test, ' +
                    'so I didn\'t improve the function.'
            ),
        ]).show()
    }

    public showUsefulUnitTestMessage(): void {
        new ComputerMessage([new Paragraph().text('I added the unit test and I improved the function.')]).show()
    }

    public showHintMessage(currentCandidate: Candidate, failingTestResult: TestResult, penaltyHint: number): void {
        new ComputerMessage([
            new Paragraph().text('A failing unit test for the current function is the following.'),
            new Paragraph().text(failingTestResult.unitTest.toString()),
            new Paragraph().text(`The cost for this hint is ${penaltyHint}%.`),
        ]).show()
    }

    public showNoHintMessage(penaltyHint: number): void {
        new ComputerMessage([
            new Paragraph().text('I can\'t think of a failing unit test for the current function.'),
            new Paragraph().text(`The cost for this hint is ${penaltyHint}%.`),
        ]).show()
    }

    public showBugFoundMessage(currentCandidate: Candidate,
        failingTestResult: TestResult,
        penaltySubmitWithBug: number): void {
        new ComputerMessage([
            new Paragraph().text('I checked the current function, but it is NOT according to the specification.'),
            new Paragraph().text('It produces the following incorrect output.'),
            new Paragraph().text(failingTestResult.toString()),
            new Paragraph().text(`The cost for submitting when there is still an error is ${penaltySubmitWithBug}%.`),
        ]).show()
    }

    public showUnsuccessfulEndMessage(score: number): void {
        new ComputerMessage([
            new Paragraph().text('I checked the current function, but it is NOT according to the specification.'),
            new Paragraph().text(`Your final score is ${score}%.`),
        ]).show()
    }

    public showRedundantUnitTestsEndMessage(score: number,
        numberOfRedundantUnitTests: number,
        penaltyRedundantUnitTest: number): void {
        new ComputerMessage([
            new Paragraph().text('I checked the current function and it is indeed according to the specification.'),
            new Paragraph().text(`You needed ${numberOfRedundantUnitTests} more unit tests than needed.`),
            new Paragraph().text(`The cost for an extra unit test is ${penaltyRedundantUnitTest}%.`),
            new Paragraph().text(`Your final score is ${score}%.`),
        ]).show()
    }

    public showSuccessfulEndMessage(score: number): void {
        new ComputerMessage([
            new Paragraph().text('I checked the current function and it is indeed according to the specification.'),
            new Paragraph().text(`Your final score is ${score}%.`),
        ]).show()
    }
}

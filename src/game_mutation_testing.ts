import { Candidate } from './candidate.js'
import { Panel, ComputerMessage } from './frame.js'
import { Game } from './game.js'
import { Paragraph } from './html.js'
import { TestResult } from './test_result.js'

export class MutationTesting extends Game {
    public showWelcomeMessage(): void {
        new ComputerMessage([
            new Paragraph()
            .markdown('You study *The Function* and write *Unit Tests* that pass the function. ')
            .text('After adding a unit test, I highlight the lines covered. ')
            .text('Submit the unit tests when you think the function is fully tested. ')
            .text('If you are wrong, I show a mutation of the function that is NOT correct, but passes your unit tests.')
        ]).show()
    }

    public showPanelsOnMenu(specification: string[], currentCandidate: Candidate, perfectCandidate: Candidate, coveredCandidates: Candidate[]): void {
        this.showCodeCoveragePanel(perfectCandidate, coveredCandidates)
    }

    private showCodeCoveragePanel(perfectCandidate: Candidate, coveredCandidates: Candidate[]): void {
        new Panel('The Function', [
            perfectCandidate.toHtmlWithCoverage(coveredCandidates),
        ]).show()
    }

    public showUselessUnitTestMessage(): void {
        new ComputerMessage([
            new Paragraph().text('I added the unit test.'),
        ]).show()
    }

    public showUsefulUnitTestMessage(): void {
        new ComputerMessage([
            new Paragraph().text('I added the unit test.'),
        ]).show()
    }

    public showHintMessage(currentCandidate: Candidate, failingTestResult: TestResult, penaltyHint: number): void {
        new ComputerMessage([
            new Paragraph().text('A mutation that is NOT correct, but still passes your unit tests is the following.'),
            currentCandidate.toHtml(),
            new Paragraph().text(`The cost for this hint is ${penaltyHint}%.`),
        ]).show()
    }

    public showNoHintMessage(penaltyHint: number): void {
        new ComputerMessage([
            new Paragraph().text('I can\'t think of a mutation that passes all your unit tests.'),
            new Paragraph().text(`The cost for this hint is ${penaltyHint}%.`),
        ]).show()
    }

    public showBugFoundMessage(currentCandidate: Candidate, failingTestResult: TestResult, penaltySubmitWithBug: number): void {
        new ComputerMessage([
            new Paragraph().text('I checked the function, but it is NOT fully tested.'),
            new Paragraph().text('A mutation that is NOT correct, but still passes your unit tests is the following.'),
            currentCandidate.toHtml(),
            new Paragraph().text(`The cost for submitting when there is still an error is ${penaltySubmitWithBug}%.`),
        ]).show()
    }

    public showUnsuccessfulEndMessage(score: number): void {
        new ComputerMessage([
            new Paragraph().text('I checked the function, but it is NOT fully tested.'),
            new Paragraph().text(`Your final score is ${score}%.`),
        ]).show()
    }

    public showRedundantUnitTestsEndMessage(score: number, numberOfRedundantUnitTests: number, penaltyRedundantUnitTest: number): void {
        new ComputerMessage([
            new Paragraph().text('I checked the function and it is indeed fully tested.'),
            new Paragraph().text(`You needed ${numberOfRedundantUnitTests} more unit tests than needed.`),
            new Paragraph().text(`The cost for an extra unit test is ${penaltyRedundantUnitTest}%.`),
            new Paragraph().text(`Your final score is ${score}%.`),
        ]).show()
    }

    public showSuccessfulEndMessage(score: number): void {
        new ComputerMessage([
            new Paragraph().text('I checked the function and it is indeed fully tested.'),
            new Paragraph().text(`Your final score is ${score}%.`),
        ]).show()
    }
}

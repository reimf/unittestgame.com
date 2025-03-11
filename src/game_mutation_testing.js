import { Panel, ComputerMessage } from './frame.js';
import { Game } from './game.js';
import { Paragraph } from './html.js';
export class MutationTesting extends Game {
    showWelcomeMessage() {
        new ComputerMessage([
            new Paragraph()
                .markdown('You study *The Function* and write *Unit Tests* that pass the function. ')
                .text('After adding a unit test, I highlight the lines covered. ')
                .text('Submit the unit tests when you think the function is fully tested. ')
                .text('If you are wrong, I show a mutation of the function that is NOT correct, but passes your unit tests.')
        ]).show();
    }
    showPanelsOnMenu(specification, currentCandidate, perfectCandidate, coveredCandidates) {
        this.showCodeCoveragePanel(perfectCandidate, coveredCandidates);
    }
    showCodeCoveragePanel(perfectCandidate, coveredCandidates) {
        new Panel('The Function', [
            perfectCandidate.toHtmlWithCoverage(coveredCandidates),
        ]).show();
    }
    showUselessUnitTestMessage() {
        new ComputerMessage([
            new Paragraph().text('I added the unit test.'),
        ]).show();
    }
    showUsefulUnitTestMessage() {
        new ComputerMessage([
            new Paragraph().text('I added the unit test.'),
        ]).show();
    }
    showHintMessage(currentCandidate, failingTestResult, penaltyHint) {
        new ComputerMessage([
            new Paragraph().text('A mutation that is NOT correct, but still passes your unit tests is the following.'),
            currentCandidate.toHtml(),
            new Paragraph().text(`The cost for this hint is ${penaltyHint}%.`),
        ]).show();
    }
    showNoHintMessage(penaltyHint) {
        new ComputerMessage([
            new Paragraph().text('I can\'t think of a mutation that passes all your unit tests.'),
            new Paragraph().text(`The cost for this hint is ${penaltyHint}%.`),
        ]).show();
    }
    showBugFoundMessage(currentCandidate, failingTestResult, penaltySubmitWithBug) {
        new ComputerMessage([
            new Paragraph().text('I checked the function, but it is NOT fully tested.'),
            new Paragraph().text('A mutation that is NOT correct, but still passes your unit tests is the following.'),
            currentCandidate.toHtml(),
            new Paragraph().text(`The cost for submitting when there is still an error is ${penaltySubmitWithBug}%.`),
        ]).show();
    }
    showUnsuccessfulEndMessage(score) {
        new ComputerMessage([
            new Paragraph().text('I checked the function, but it is NOT fully tested.'),
            new Paragraph().text(`Your final score is ${score}%.`),
        ]).show();
    }
    showRedundantUnitTestsEndMessage(score, numberOfRedundantUnitTests, penaltyRedundantUnitTest) {
        new ComputerMessage([
            new Paragraph().text('I checked the function and it is indeed fully tested.'),
            new Paragraph().text(`You needed ${numberOfRedundantUnitTests} more unit tests than needed.`),
            new Paragraph().text(`The cost for an extra unit test is ${penaltyRedundantUnitTest}%.`),
            new Paragraph().text(`Your final score is ${score}%.`),
        ]).show();
    }
    showSuccessfulEndMessage(score) {
        new ComputerMessage([
            new Paragraph().text('I checked the function and it is indeed fully tested.'),
            new Paragraph().text(`Your final score is ${score}%.`),
        ]).show();
    }
}

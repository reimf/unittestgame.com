import { Panel, ComputerMessage } from './frame.js';
import { Methodology } from './methodology.js';
import { Paragraph } from './html.js';
export class TestDrivenDevelopment extends Methodology {
    showWelcomeMessage() {
        new ComputerMessage([
            new Paragraph().text('You write *Unit Tests* according to the *Specification* and that fail the *Current Function*. ' +
                'After adding a unit test, I rewrite the function such that it passes. ' +
                'Submit the unit tests when you think the function is according to the specification. ' +
                'If you are wrong, I show a unit test that is correct, but does NOT pass the function.'),
        ]).show();
    }
    showPanelsOnMenu(specification, currentCandidate, _perfectCandidate, _coveredCandidates) {
        this.showSpecificationPanel(specification);
        this.showCurrentCandidatePanel(currentCandidate);
    }
    showSpecificationPanel(specification) {
        new Panel('Specification', [
            new Paragraph().text(specification),
        ]).show();
    }
    showCurrentCandidatePanel(currentCandidate) {
        new Panel('Current Function', [
            currentCandidate.toHtml(),
        ]).show();
    }
    showUselessUnitTestMessage() {
        new ComputerMessage([
            new Paragraph().text('I added the unit test, ' +
                'but the current function already passed this unit test, ' +
                'so I didn\'t improve the function.'),
        ]).show();
    }
    showUsefulUnitTestMessage() {
        new ComputerMessage([
            new Paragraph().text('I added the unit test and ' +
                'I improved the function.')
        ]).show();
    }
    showHintMessage(_currentCandidate, failingTestResult, penaltyHint) {
        new ComputerMessage([
            new Paragraph().text('A failing unit test for the current function is the following.'),
            new Paragraph().text(failingTestResult.unitTest.toString()),
            new Paragraph().text(`The cost for this hint is ${penaltyHint}%.`),
        ]).show();
    }
    showNoHintMessage(penaltyHint) {
        new ComputerMessage([
            new Paragraph().text('I can\'t think of a failing unit test for the current function.'),
            new Paragraph().text(`The cost for this hint is ${penaltyHint}%.`),
        ]).show();
    }
    showBugFoundMessage(_currentCandidate, failingTestResult, penaltySubmitWithBug) {
        new ComputerMessage([
            new Paragraph().text('I checked the current function, but it is NOT according to the specification.'),
            new Paragraph().text('It produces the following incorrect output.'),
            new Paragraph().text(failingTestResult.toString()),
            new Paragraph().text(`The cost for submitting when there is still an error is ${penaltySubmitWithBug}%.`),
        ]).show();
    }
    showUnsuccessfulEndMessage(score) {
        new ComputerMessage([
            new Paragraph().text('I checked the current function, but it is NOT according to the specification.'),
            new Paragraph().text(`Your final score is ${score}%.`),
        ]).show();
    }
    showRedundantUnitTestsEndMessage(score, numberOfRedundantUnitTests, penaltyRedundantUnitTest) {
        new ComputerMessage([
            new Paragraph().text('I checked the current function and it is indeed according to the specification.'),
            new Paragraph().text(`You needed ${numberOfRedundantUnitTests} more unit tests than needed.`),
            new Paragraph().text(`The cost for an extra unit test is ${penaltyRedundantUnitTest}%.`),
            new Paragraph().text(`Your final score is ${score}%.`),
        ]).show();
    }
    showSuccessfulEndMessage(score) {
        new ComputerMessage([
            new Paragraph().text('I checked the current function and it is indeed according to the specification.'),
            new Paragraph().text(`Your final score is ${score}%.`),
        ]).show();
    }
}

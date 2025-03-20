import { Panel, ComputerMessage } from './frame.js';
import { Methodology } from './methodology.js';
export class TestDrivenDevelopment extends Methodology {
    name() {
        return 'Test-Driven Development';
    }
    showBasicDefinition() {
        new Panel('Test-Driven Development', [
            'Write a failing unit test for a function, then write just enough code to make the unit test pass; repeat.',
            'Read more about [Test-Driven Development on Wikipedia](https://en.wikipedia.org/wiki/Test-driven_development).',
        ]).show();
    }
    showWelcomeMessage() {
        new ComputerMessage([
            'You write *Unit Tests* according to the *Specification* and that fail the *Current Function*. ' +
                'After adding a unit test, I rewrite the function such that it passes. ' +
                'Submit the unit tests when you think the function is according to the specification. ' +
                'If you are wrong, I show a unit test that is correct, but does NOT pass the function.',
        ]).show();
    }
    showPanelsOnMenu(specification, currentCandidate, _perfectCandidate, _coveredCandidates) {
        this.showSpecificationPanel(specification);
        this.showCurrentFunctionPanel(currentCandidate);
    }
    showSpecificationPanel(specification) {
        new Panel('Specification', [specification]).show();
    }
    showCurrentFunctionPanel(currentCandidate) {
        new Panel('Current Function', [currentCandidate.toHtml()]).show();
    }
    showUselessUnitTestMessage() {
        new ComputerMessage([
            'I added the unit test, ' +
                'but the current function already passed this unit test, ' +
                'so I didn\'t improve the function.',
        ]).show();
    }
    showUsefulUnitTestMessage() {
        new ComputerMessage([
            'I added the unit test and ' +
                'I improved the function.',
        ]).show();
    }
    showHintMessage(_currentCandidate, failingTestResult, penaltyHint) {
        new ComputerMessage([
            'A failing unit test for the current function is the following.',
            failingTestResult.unitTest.toString(),
            `The cost for this hint is ${penaltyHint}%.`,
        ]).show();
    }
    showNoHintMessage(penaltyHint) {
        new ComputerMessage([
            'I can\'t think of a failing unit test for the current function.',
            `The cost for this hint is ${penaltyHint}%.`,
        ]).show();
    }
    showBugFoundMessage(_currentCandidate, failingTestResult, penaltySubmitWithBug) {
        new ComputerMessage([
            'I checked the current function, but it is NOT according to the specification.',
            'It produces the following incorrect output.',
            failingTestResult.toString(),
            `The cost for submitting when there is still an error is ${penaltySubmitWithBug}%.`,
        ]).show();
    }
    showUnsuccessfulEndMessage(score) {
        new ComputerMessage([
            'I checked the current function, but it is NOT according to the specification.',
            `Your final score is ${score}%.`,
        ]).show();
    }
    showRedundantUnitTestsEndMessage(score, numberOfRedundantUnitTests, penaltyRedundantUnitTest) {
        new ComputerMessage([
            'I checked the current function and it is indeed according to the specification.',
            `You needed ${numberOfRedundantUnitTests} more unit tests than needed.`,
            `The cost for an extra unit test is ${penaltyRedundantUnitTest}%.`,
            `Your final score is ${score}%.`,
        ]).show();
    }
    showSuccessfulEndMessage(score) {
        new ComputerMessage([
            'I checked the current function and it is indeed according to the specification.',
            `Your final score is ${score}%.`,
        ]).show();
    }
}

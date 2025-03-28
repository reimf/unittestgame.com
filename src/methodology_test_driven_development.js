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
        new ComputerMessage(['You read the *Specification* and write *Unit Tests* that fail the *Current Function*.']).add();
        new ComputerMessage(['After adding a unit test I (the AI bot) rewrite the *Current Function* such that it passes the *Unit Tests*.']).add();
        new ComputerMessage(['When you think the *Current Function* is according to the *Specification*, you submit the *Unit Tests*.']).add();
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
                'but the *Current Function* already passed this unit test, ' +
                'so I did NOT improve the *Current Function*.',
        ]).add();
    }
    showUsefulUnitTestMessage() {
        new ComputerMessage([
            'I added the unit test and ' +
                'I improved the *Current Function* to pass the *Unit Tests*.',
        ]).add();
    }
    showHintMessage(_currentCandidate, failingTestResult, penaltyHint) {
        new ComputerMessage(['A failing unit test for the *Current Function* is the following.', failingTestResult.unitTest.toString()]).add();
        new ComputerMessage([`The cost for this hint is ${penaltyHint}%.`]).add();
    }
    showNoHintMessage(penaltyHint) {
        new ComputerMessage(['I can\'t think of a failing unit test for the *Current Function*.']).add();
        new ComputerMessage([`The cost for this hint is ${penaltyHint}%.`]).add();
    }
    showBugFoundMessage(_currentCandidate, failingTestResult, penaltySubmitWithBug) {
        new ComputerMessage(['I checked the *Current Function*, but it is NOT according to the *Specification*.']).add();
        new ComputerMessage(['It produces the following incorrect output.', failingTestResult.toString()]).add();
        new ComputerMessage([`The cost for submitting when there is still an error is ${penaltySubmitWithBug}%.`]).add();
    }
    showUnsuccessfulEndMessage(score) {
        new ComputerMessage(['I checked the *Current Function*, but it is NOT according to the *Specification*.']).add();
        new ComputerMessage([`Your final *Score* is ${score}%.`]).add();
    }
    showSuccessfulEndMessage(score) {
        new ComputerMessage(['I checked the *Current Function* and it is indeed according to the *Specification*.']).add();
        new ComputerMessage([`Your final *Score* is ${score}%.`]).add();
    }
}

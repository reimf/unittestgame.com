import { Panel, ComputerMessage } from './frame.js';
import { Methodology } from './methodology.js';
export class TestDrivenDevelopment extends Methodology {
    name() {
        return 'Test-Driven Development';
    }
    showBasicDefinition() {
        new Panel('Test-Driven Development', [
            'Write a unit test that initially fails, then write just enough code to make the unit test pass; repeat until the code is according to the specification. ' +
                '[Read more](https://en.wikipedia.org/wiki/Test-driven_development)',
        ]).show();
    }
    showWelcomeMessage() {
        new ComputerMessage(['You read the *Specification* and write *Unit Tests* that fail the *Current Function*.']).add();
        new ComputerMessage(['After adding a unit test I (the AI bot) rewrite the *Current Function* such that it passes the *Unit Tests*.']).add();
        new ComputerMessage(['When you think the *Current Function* is according to the *Specification*, you submit the *Unit Tests*.']).add();
    }
    showPanelsOnMenu(specification, currentCandidate, previousCandidate, _perfectCandidate, _coveredCandidates) {
        this.showSpecificationPanel(specification);
        this.showCurrentFunctionPanel(currentCandidate, previousCandidate);
    }
    showSpecificationPanel(specification) {
        new Panel('Specification', [specification]).show();
    }
    showCurrentFunctionPanel(currentCandidate, previousCandidate) {
        new Panel('Current Function', [currentCandidate.toHtmlWithPrevious(previousCandidate)]).show();
    }
    showIncorrectUnitTestMessage() {
        new ComputerMessage(['I did NOT add the unit test, because it is NOT correct.']).add();
    }
    showUselessUnitTestMessage() {
        new ComputerMessage(['I added the unit test to the *Unit Tests*, but the *Current Function* already passed this unit test, so I did NOT improve the *Current Function*.']).add();
        new ComputerMessage(['Try to write unit tests that fail for the *Current Function*.']).add();
    }
    showUsefulUnitTestMessage() {
        new ComputerMessage(['I added the unit test to the *Unit Tests* and I improved the *Current Function* such that it passes the new unit test.']).add();
    }
    showBugFoundMessage(_currentCandidate, failingTestResult) {
        new ComputerMessage(['I checked the *Current Function*, but it is NOT according to the *Specification*.']).add();
        new ComputerMessage(['It produces the following incorrect result.', failingTestResult.toString()]).add();
    }
    showEndMessage() {
        new ComputerMessage(['I checked the *Current Function* and it is indeed according to the *Specification*.']).add();
    }
    *exampleMessageGenerator() {
        yield new ComputerMessage(['The *Specification* contains the number 20. That is a good starting point for a unit test. When the battery level is 20%, the smartphone operates in Normal Mode.']);
        yield new ComputerMessage(['The *Current Function* always returns Normal Mode. The *Specification* says that when the battery level is less than 20%, the smartphone operates in Low Power Mode. So, add a unit test for battery level 19%.']);
        yield new ComputerMessage(['The *Current Function* now sometimes returns Normal Mode and sometimes Low Power Mode. Submit the unit tests to see if the *Current Function* is according to the *Specification*.']);
        yield new ComputerMessage(['Add a unit test for battery level 21%, because the *Current Function* now returns the wrong mode.']);
        yield new ComputerMessage(['Submit the unit tests again to see if the *Current Function* is correct now.']);
        yield new ComputerMessage(['Add a unit test for battery level 18%, because the *Current Function* now returns the wrong mode.']);
        yield new ComputerMessage(['Submit the unit tests again to see if the *Current Function* is finally correct.']);
    }
}

import { Panel, ComputerMessage, ButtonMessage, ProcessingMessage } from './frame.js';
import { Methodology } from './methodology.js';
export class TestDrivenDevelopment extends Methodology {
    constructor() {
        super(...arguments);
        this.callback = () => { };
    }
    name() {
        return 'Test-Driven Development';
    }
    showBasicDefinition() {
        new Panel('Test-Driven Development', [
            'Write a unit test that initially fails, then write just enough code to make the unit test pass; repeat until the code is according to the specification. ' +
                '[Read more](https://en.wikipedia.org/wiki/Test-driven_development)',
        ]).show();
    }
    showExample(callback) {
        this.callback = callback;
        new ProcessingMessage('Creating an example of Test-Driven Development...', () => this.showExampleStep1(), 2000).add();
    }
    showExampleStep1() {
        new ComputerMessage(['Read the following function that will eventually implement division.', 'function divide(a, b) {\n  return undefined\n}']).add();
        new ComputerMessage(['This function does NOT implement division yet, so add a unit test that fails.']).add();
        new ButtonMessage('divide(4, 2) === 2', () => this.showExampleStep2()).add();
    }
    showExampleStep2() {
        new ProcessingMessage('Writing just enough code to make the unit test pass...', () => this.showExampleStep3(), 2000).add();
    }
    showExampleStep3() {
        new ComputerMessage(['I wrote just enough code to make the unit test pass.', 'function divide(a, b) {\n  return 2\n}']).add();
        new ComputerMessage(['This function does NOT implement division yet, so add another unit test that fails.']).add();
        new ButtonMessage('divide(9, 3) === 3', () => this.showExampleStep4()).add();
    }
    showExampleStep4() {
        new ProcessingMessage('Writing just enough code to make both unit tests pass...', () => this.showExampleStep5(), 2000).add();
    }
    showExampleStep5() {
        new ComputerMessage(['I rewrote the function with just enough code to make both unit tests pass.', 'function divide(a, b) {\n  return b\n}']).add();
        new ComputerMessage(['This function still does NOT implement division, so add another unit test that fails.']).add();
        new ButtonMessage('divide(6, 3) === 2', () => this.showExampleStep6()).add();
    }
    showExampleStep6() {
        new ProcessingMessage('Writing just enough code to make all 3 unit tests pass...', () => this.showExampleStep7(), 2000).add();
    }
    showExampleStep7() {
        new ComputerMessage(['I rewrote the function again with just enough code to make all 3 unit tests pass.', 'function divide(a, b) {\n  return a / b\n}']).add();
        new ComputerMessage(['Now the function implements division, so you can submit the unit tests.']).add();
        new ButtonMessage('Submit unit tests', () => this.showExampleStep8()).add();
    }
    showExampleStep8() {
        new ProcessingMessage('Checking if the function implements division...', () => this.showExampleStep9(), 2000).add();
    }
    showExampleStep9() {
        new ComputerMessage(['Congratulations, you understand the basics of Test-Driven Development!']).add();
        this.callback();
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
    showUselessUnitTestMessage() {
        new ComputerMessage([
            'I added the unit test to the *Unit Tests*, ' +
                'but the *Current Function* already passed this unit test, ' +
                'so I did NOT improve the *Current Function*.',
        ]).add();
        new ComputerMessage(['Try to write unit tests that fail for the *Current Function*.']).add();
    }
    showUsefulUnitTestMessage() {
        new ComputerMessage([
            'I added the unit test to the *Unit Tests* and ' +
                'I improved the *Current Function* such that it now also passes the new unit test.',
        ]).add();
    }
    showHintMessage(_currentCandidate, failingTestResult) {
        new ComputerMessage(['A unit test that fails for the *Current Function* is the following.', failingTestResult.unitTest.toString()]).add();
    }
    showNoHintMessage() {
        new ComputerMessage(['I can\'t think of a unit test that fails for the *Current Function*.']).add();
    }
    showBugFoundMessage(_currentCandidate, failingTestResult) {
        new ComputerMessage(['I checked the *Current Function*, but it is NOT according to the *Specification*.']).add();
        new ComputerMessage(['It produces the following incorrect output.', failingTestResult.toString()]).add();
    }
    showEndMessage() {
        new ComputerMessage(['I checked the *Current Function* and it is indeed according to the *Specification*.']).add();
    }
}

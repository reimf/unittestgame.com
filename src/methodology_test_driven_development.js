import { Panel, ComputerMessage, ButtonMessage } from './frame.js';
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
            'Write a failing unit test for a function, then write just enough code to make the unit test pass; repeat. ' +
                '[Read more](https://en.wikipedia.org/wiki/Test-driven_development)',
        ]).show();
    }
    showExample(callback) {
        this.callback = callback;
        new ComputerMessage([
            'Let\'s start with the following function.',
            'function divide(a, b) {\n  return undefined\n}',
            'Can you give me a unit test to start with?'
        ]).add();
        new ButtonMessage('divide(4, 2) === 2', () => this.showExampleStep2()).add();
    }
    showExampleStep2() {
        new ComputerMessage([
            'I wrote just enough code to pass the unit test.',
            'function divide(a, b) {\n  return 2\n}'
        ]).add();
        new ComputerMessage(['This function does NOT implement division yet, so add another unit test.']).add();
        new ButtonMessage('divide(9, 3) === 3', () => this.showExampleStep3()).add();
    }
    showExampleStep3() {
        new ComputerMessage([
            'I rewrote the function with just enough code such that it passes both unit tests.',
            'function divide(a, b) {\n  return b\n}'
        ]).add();
        new ComputerMessage(['This function still does NOT implement division, so add another unit test.']).add();
        new ButtonMessage('divide(6, 3) === 2', () => this.showExampleStep4()).add();
    }
    showExampleStep4() {
        new ComputerMessage([
            'I rewrote the function again with just enough code such that it passes all 3 unit tests.',
            'function divide(a, b) {\n  return a / b\n}'
        ]).add();
        new ComputerMessage(['This function implements division, so submit the unit tests.']).add();
        new ButtonMessage('Submit unit tests', () => this.showExampleStep5()).add();
    }
    showExampleStep5() {
        new ComputerMessage(['Well done, now you understand the basics of Test-Driven Development!']).add();
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
    }
    showUsefulUnitTestMessage() {
        new ComputerMessage([
            'I added the unit test to the *Unit Tests* and ' +
                'I improved the *Current Function* such that it now also passes the new unit test.',
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

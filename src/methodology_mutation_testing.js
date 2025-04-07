import { Panel, ComputerMessage } from './frame.js';
import { Methodology } from './methodology.js';
export class MutationTesting extends Methodology {
    constructor() {
        super(...arguments);
        this.callback = () => { };
    }
    name() {
        return 'Mutation Testing';
    }
    showBasicDefinition() {
        new Panel('Mutation Testing', [
            'Each mutation of a fully tested function should make at least one unit test fail. ' +
                'Mutations are created by mutating code, e.g. replacing "n % 4 === 0" with "n === 4". ' +
                '[Read more](https://en.wikipedia.org/wiki/Mutation_testing)',
        ]).show();
    }
    showExample(callback) {
        this.callback = callback;
        new ComputerMessage([
            'Suppose you have a function that implements a special version of division.',
            'function divide(a, b) {\n  if (b === 0) return 0\n  return a / b\n}',
        ]).add();
        new ComputerMessage(['Can you give me a unit test?']).add();
        this.showFormUnitTestMessage('4', '2', '2', () => this.showExampleStep2());
    }
    showExampleStep2() {
        new ComputerMessage(['And another unit test?']).add();
        this.showFormUnitTestMessage('9', '3', '3', () => this.showExampleStep3());
    }
    showExampleStep3() {
        new ComputerMessage(['To check if the function is fully tested now, I checked many mutations.']).add();
        new ComputerMessage([
            'I found the following mutation that is NOT correct, but still passes both unit tests.',
            'function divide(a, b) {\n  return b\n}',
        ]).add();
        new ComputerMessage(['Add a unit test that fails this mutation, but passes the function under test.']).add();
        this.showFormUnitTestMessage('6', '3', '2', () => this.showExampleStep4());
    }
    showExampleStep4() {
        new ComputerMessage([
            'I checked again, and I found the following mutation that is NOT correct, but passes all 3 unit tests.',
            'function divide(a, b) {\n  return a / b\n}'
        ]).add();
        new ComputerMessage(['Again, add a unit test that fails this mutation, but passes the function under test.']).add();
        this.showFormUnitTestMessage('5', '0', '0', () => this.showExampleStep5());
    }
    showExampleStep5() {
        new ComputerMessage(['I checked again, and I could NOT find a mutation that passes all 4 unit tests, so the function is fully tested.']).add();
        new ComputerMessage(['Well done, now you understand the basics of Mutation Testing!']).add();
        this.callback();
    }
    showWelcomeMessage() {
        new ComputerMessage(['You read *The Function* and write *Unit Tests* that pass.']).add();
        new ComputerMessage(['After adding a unit test, I show the line coverage of *The Function*.']).add();
        new ComputerMessage(['When you think *The Function* is fully tested, you submit the *Unit Tests*.']).add();
    }
    showPanelsOnMenu(_specification, _currentCandidate, _previousCandidate, perfectCandidate, coveredCandidates) {
        this.showCodeCoveragePanel(perfectCandidate, coveredCandidates);
    }
    showCodeCoveragePanel(perfectCandidate, coveredCandidates) {
        new Panel('The Function', [perfectCandidate.toHtmlWithCoverage(coveredCandidates)]).show();
    }
    showUselessUnitTestMessage() {
        new ComputerMessage([
            'I added the unit test to the *Unit Tests*, ' +
                'but the line coverage of *The Function* did NOT increase.',
        ]).add();
    }
    showUsefulUnitTestMessage() {
        new ComputerMessage([
            'I added the unit test to the *Unit Tests* and ' +
                'I showed the increased line coverage in *The Function*.'
        ]).add();
    }
    showHintMessage(currentCandidate, _failingTestResult, penaltyHint) {
        new ComputerMessage(['A mutation of *The Function* that is NOT correct, but still passes the *Unit Tests* is the following.', currentCandidate.toHtml()]).add();
        new ComputerMessage([`The cost for this hint is ${penaltyHint}%.`]).add();
    }
    showNoHintMessage(penaltyHint) {
        new ComputerMessage(['I can\'t think of a mutation of *The Function* that passes all the *Unit Tests*.']).add();
        new ComputerMessage([`The cost for this hint is ${penaltyHint}%.`]).add();
    }
    showBugFoundMessage(currentCandidate, _failingTestResult, penaltySubmitWithBug) {
        new ComputerMessage(['I checked *The Function*, but it is NOT fully tested.']).add();
        new ComputerMessage(['A mutation of *The Function* that is NOT correct, but still passes your unit tests is the following.', currentCandidate.toHtml()]).add();
        new ComputerMessage([`The cost for submitting when there is still an error is ${penaltySubmitWithBug}%.`]).add();
    }
    showUnsuccessfulEndMessage(score) {
        new ComputerMessage(['I checked *The Function*, but it is NOT fully tested.']).add();
        new ComputerMessage([`Your final *Score* is ${score}%.`]).add();
    }
    showSuccessfulEndMessage(score) {
        new ComputerMessage(['I checked *The Function* and it is indeed fully tested.']).add();
        new ComputerMessage([`Your final *Score* is ${score}%.`]).add();
    }
}

import { Panel, ComputerMessage, ButtonMessage, ProcessingMessage } from './frame.js';
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
                'Mutations are simplifications of the code, e.g. by replacing "n % 4 === 0" with "n === 4". ' +
                '[Read more](https://en.wikipedia.org/wiki/Mutation_testing)',
        ]).show();
    }
    showExample(callback) {
        this.callback = callback;
        new ProcessingMessage('Creating an example of Mutation Testing...', () => this.showExampleStep1(), 2000).add();
    }
    showExampleStep1() {
        new ComputerMessage([
            'Suppose you have a function that implements a special version of division.',
            'function divide(a, b) {\n  if (b === 0) return 0\n  return a / b\n}',
        ]).add();
        new ComputerMessage(['Can you give me a unit test that passes?']).add();
        new ButtonMessage('divide(4, 2) === 2', () => this.showExampleStep2()).add();
    }
    showExampleStep2() {
        new ComputerMessage(['And another unit test that passes?']).add();
        new ButtonMessage('divide(9, 3) === 3', () => this.showExampleStep3()).add();
    }
    showExampleStep3() {
        new ProcessingMessage('Checking if the function is fully tested...', () => this.showExampleStep4(), 2000).add();
    }
    showExampleStep4() {
        new ComputerMessage([
            'I checked if the function is fully tested and I found the following mutation that is NOT correct, but still passes both unit tests.',
            'function divide(a, b) {\n  return b\n}',
        ]).add();
        new ComputerMessage(['Add a unit test that fails this mutation, but passes the function under test.']).add();
        new ButtonMessage('divide(6, 3) === 2', () => this.showExampleStep5()).add();
    }
    showExampleStep5() {
        new ProcessingMessage('Checking if the function is fully tested now...', () => this.showExampleStep6(), 2000).add();
    }
    showExampleStep6() {
        new ComputerMessage([
            'I checked again if the function is fully tested and I found the following mutation that is NOT correct, but passes all 3 unit tests.',
            'function divide(a, b) {\n  return a / b\n}'
        ]).add();
        new ComputerMessage(['Again, add a unit test that fails this mutation, but passes the function under test.']).add();
        new ButtonMessage('divide(5, 0) === 0', () => this.showExampleStep7()).add();
    }
    showExampleStep7() {
        new ProcessingMessage('Checking if the function is fully tested now...', () => this.showExampleStep8(), 2000).add();
    }
    showExampleStep8() {
        new ComputerMessage(['I checked again if the function is fully tested and I could NOT find a mutation that passes all 4 unit tests, so the function is fully tested.']).add();
        new ComputerMessage(['Congratulations, you understand the basics of Mutation Testing!']).add();
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
        new ComputerMessage(['Try to write unit tests that cover some code that is not yet covered by other unit tests.']).add();
    }
    showUsefulUnitTestMessage() {
        new ComputerMessage([
            'I added the unit test to the *Unit Tests* and ' +
                'I showed the increased line coverage in *The Function*.'
        ]).add();
    }
    showHintMessage(currentCandidate, _failingTestResult) {
        new ComputerMessage(['A mutation of *The Function* that is NOT correct, but still passes the *Unit Tests* is the following.', currentCandidate.toHtml()]).add();
    }
    showNoHintMessage() {
        new ComputerMessage(['I can\'t think of a mutation of *The Function* that passes all the *Unit Tests*.']).add();
    }
    showBugFoundMessage(currentCandidate, _failingTestResult) {
        new ComputerMessage(['I checked *The Function*, but it is NOT fully tested.']).add();
        new ComputerMessage(['A mutation of *The Function* that is NOT correct, but still passes your unit tests is the following.', currentCandidate.toHtml()]).add();
    }
    showEndMessage() {
        new ComputerMessage(['I checked *The Function* and it is indeed fully tested.']).add();
    }
}

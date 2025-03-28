import { Panel, ComputerMessage } from './frame.js';
import { Methodology } from './methodology.js';
export class MutationTesting extends Methodology {
    name() {
        return 'Mutation Testing';
    }
    showBasicDefinition() {
        new Panel('Mutation Testing', [
            'After writing unit tests for a function, each mutation of the function should make at least one unit test fail. ' +
                '[more](https://en.wikipedia.org/wiki/Mutation_testing)',
        ]).show();
    }
    showWelcomeMessage() {
        new ComputerMessage(['You write *Unit Tests* that pass *The Function*.']).add();
        new ComputerMessage(['After adding a unit test, I show the line coverage of *The Function*.']).add();
        new ComputerMessage(['When you think *The Function* is fully tested, you submit the *Unit Tests*.']).add();
    }
    showPanelsOnMenu(_specification, _currentCandidate, perfectCandidate, coveredCandidates) {
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
        new ComputerMessage([`🎉 Your final *Score* is ${score}%.`]).add();
    }
}

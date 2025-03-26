import { Panel, ComputerMessage } from './frame.js';
import { Methodology } from './methodology.js';
export class MutationTesting extends Methodology {
    name() {
        return 'Mutation Testing';
    }
    showBasicDefinition() {
        new Panel('Mutation Testing', [
            'After writing unit tests for a function, each mutation of the function should make at least one unit test fail.',
            'Read more about [Mutation Testing on Wikipedia](https://en.wikipedia.org/wiki/Mutation_testing).',
        ]).show();
    }
    showWelcomeMessage() {
        new ComputerMessage(['You write *Unit Tests* that pass *The Function*.']).show();
        new ComputerMessage(['After adding a unit test, I highlight the lines covered in *The Function*.']).show();
        new ComputerMessage(['When you think the function is fully tested, you submit the unit tests.']).show();
    }
    showPanelsOnMenu(_specification, _currentCandidate, perfectCandidate, coveredCandidates) {
        this.showCodeCoveragePanel(perfectCandidate, coveredCandidates);
    }
    showCodeCoveragePanel(perfectCandidate, coveredCandidates) {
        new Panel('The Function', [perfectCandidate.toHtmlWithCoverage(coveredCandidates)]).show();
    }
    showUselessUnitTestMessage() {
        new ComputerMessage(['I added the unit test to the *Unit Tests*.']).show();
    }
    showUsefulUnitTestMessage() {
        new ComputerMessage(['I added the unit test to the *Unit Tests*.']).show();
    }
    showHintMessage(currentCandidate, _failingTestResult, penaltyHint) {
        new ComputerMessage(['A mutation of *The Function* that is NOT correct, but still passes the *Unit Tests* is the following.', currentCandidate.toHtml()]).show();
        new ComputerMessage([`The cost for this hint is ${penaltyHint}%.`]).show();
    }
    showNoHintMessage(penaltyHint) {
        new ComputerMessage(['I can\'t think of a mutation of *The Function* that passes all the *Unit Tests*.']).show();
        new ComputerMessage([`The cost for this hint is ${penaltyHint}%.`]).show();
    }
    showBugFoundMessage(currentCandidate, _failingTestResult, penaltySubmitWithBug) {
        new ComputerMessage(['I checked *The Function*, but it is NOT fully tested.']).show();
        new ComputerMessage(['A mutation of *The Function* that is NOT correct, but still passes your unit tests is the following.', currentCandidate.toHtml()]).show();
        new ComputerMessage([`The cost for submitting when there is still an error is ${penaltySubmitWithBug}%.`]).show();
    }
    showUnsuccessfulEndMessage(score) {
        new ComputerMessage(['I checked the function, but it is NOT fully tested.']).show();
        new ComputerMessage([`Your final score is ${score}%.`]).show();
    }
    showSuccessfulEndMessage(score) {
        new ComputerMessage(['I checked the function and it is indeed fully tested.']).show();
        new ComputerMessage([`Your final score is ${score}%.`]).show();
    }
}

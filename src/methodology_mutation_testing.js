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
        new ComputerMessage([
            'You write *Unit Tests* that pass *The Function*. ' +
                'After adding a unit test, I highlight the lines covered. ' +
                'Submit the unit tests when you think the function is fully tested. ' +
                'If you are wrong, I show a mutation of the function that is NOT correct, ' +
                'but passes your unit tests.',
        ]).show();
    }
    showPanelsOnMenu(_specification, _currentCandidate, perfectCandidate, coveredCandidates) {
        this.showCodeCoveragePanel(perfectCandidate, coveredCandidates);
    }
    showCodeCoveragePanel(perfectCandidate, coveredCandidates) {
        new Panel('The Function', [
            perfectCandidate.toHtmlWithCoverage(coveredCandidates),
        ]).show();
    }
    showUselessUnitTestMessage() {
        new ComputerMessage([
            'I added the unit test.',
        ]).show();
    }
    showUsefulUnitTestMessage() {
        new ComputerMessage([
            'I added the unit test.',
        ]).show();
    }
    showHintMessage(currentCandidate, _failingTestResult, penaltyHint) {
        new ComputerMessage([
            'A mutation that is NOT correct, but still passes your unit tests is the following.',
            currentCandidate.toHtml(),
            `The cost for this hint is ${penaltyHint}%.`,
        ]).show();
    }
    showNoHintMessage(penaltyHint) {
        new ComputerMessage([
            'I can\'t think of a mutation that passes all your unit tests.',
            `The cost for this hint is ${penaltyHint}%.`,
        ]).show();
    }
    showBugFoundMessage(currentCandidate, _failingTestResult, penaltySubmitWithBug) {
        new ComputerMessage([
            'I checked the function, but it is NOT fully tested.',
            'A mutation that is NOT correct, but still passes your unit tests is the following.',
            currentCandidate.toHtml(),
            `The cost for submitting when there is still an error is ${penaltySubmitWithBug}%.`,
        ]).show();
    }
    showUnsuccessfulEndMessage(score) {
        new ComputerMessage([
            'I checked the function, but it is NOT fully tested.',
            `Your final score is ${score}%.`,
        ]).show();
    }
    showRedundantUnitTestsEndMessage(score, numberOfRedundantUnitTests, penaltyRedundantUnitTest) {
        new ComputerMessage([
            'I checked the function and it is indeed fully tested.',
            `You needed ${numberOfRedundantUnitTests} more unit tests than needed.`,
            `The cost for an extra unit test is ${penaltyRedundantUnitTest}%.`,
            `Your final score is ${score}%.`,
        ]).show();
    }
    showSuccessfulEndMessage(score) {
        new ComputerMessage([
            'I checked the function and it is indeed fully tested.',
            `Your final score is ${score}%.`,
        ]).show();
    }
}

import { Panel, ComputerMessage } from './frame.js';
import { Level } from './level-base.js';
export class MutationTesting extends Level {
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
    showWelcomeMessage() {
        new ComputerMessage(['You read *The Function* and write *Unit Tests* that pass.']).add();
        new ComputerMessage(['After adding a unit test, I show the line coverage of *The Function*.']).add();
        new ComputerMessage(['When you think *The Function* is fully tested, you submit the *Unit Tests*.']).add();
    }
    showSpecificationPanel(_specification) {
        // nothing
    }
    showCurrentFunctionPanel(_currentCandidate, _previousCandidate) {
        // nothing
    }
    showCodeCoveragePanel(perfectCandidate, coveredCandidate) {
        new Panel('The Function', [
            coveredCandidate ? perfectCandidate.toHtmlWithCoverage(coveredCandidate) : perfectCandidate.toHtml()
        ]).show();
    }
    showIncorrectUnitTestMessage() {
        new ComputerMessage(['I did NOT add the unit test, because it is NOT correct.']).add();
    }
    showUselessUnitTestMessage() {
        new ComputerMessage(['I added the unit test to the *Unit Tests*, but the line coverage of *The Function* did NOT increase.']).add();
        new ComputerMessage(['Try to write unit tests that cover some code that is not yet covered by other unit tests.']).add();
    }
    showUsefulUnitTestMessage() {
        new ComputerMessage(['I added the unit test to the *Unit Tests* and I showed the line coverage in *The Function*.']).add();
    }
    showBugFoundMessage(currentCandidate, _failingTestResult, numberOfUnitTestsStillNeeded) {
        new ComputerMessage(['*The Function* is NOT fully tested.']).add();
        new ComputerMessage(['A mutation of *The Function* that is NOT correct, but still passes your unit tests is the following.', currentCandidate.toMutationHtml()]).add();
        new ComputerMessage([`Try to write a unit test that passes *The Function* and fails for this mutation. I think you need at least ${numberOfUnitTestsStillNeeded} more ${numberOfUnitTestsStillNeeded === 1 ? 'unit test' : 'unit tests'} to fully test *The Function*.`]).add();
    }
    showEndMessage() {
        new ComputerMessage(['*The Function* is indeed fully tested.']).add();
        new ComputerMessage(['Well done!']).add();
    }
    *exampleGuidanceGenerator(useCase) {
        yield* useCase.exampleGuidanceGeneratorMutationTesting();
    }
    compareComplexity(candidate, otherCandidate) {
        return candidate.compareComplexityMutationTesting(otherCandidate);
    }
}

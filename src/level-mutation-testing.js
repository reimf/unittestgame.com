import { Panel, ComputerMessage } from './frame.js';
import { Level } from './level-base.js';
export class MutationTesting extends Level {
    identifier() {
        return 'mutation-testing';
    }
    name() {
        return this.locale.mutationTesting();
    }
    showBasicDefinition() {
        new Panel('mutation-testing', this.locale.mutationTesting(), [this.locale.definitionMT()]).show();
    }
    showWelcomeMessage() {
        new ComputerMessage([this.locale.step1MT()]).add();
        new ComputerMessage([this.locale.step2MT()]).add();
        new ComputerMessage([this.locale.step3MT()]).add();
    }
    showSpecificationPanel(_specification) {
        // nothing
    }
    showCurrentFunctionPanel(_currentCandidate, _previousCandidate) {
        // nothing
    }
    showCodeCoveragePanel(perfectCandidate, coveredCandidate) {
        new Panel('the-function', this.locale.theFunction(), [
            coveredCandidate ? perfectCandidate.toHtmlWithCoverage(coveredCandidate) : perfectCandidate.toHtml()
        ]).show();
    }
    showIncorrectUnitTestMessage() {
        new ComputerMessage([this.locale.iDidNotAddTheUnitTest()]).add();
    }
    showUselessUnitTestMessage() {
        new ComputerMessage([this.locale.iAddedTheUnitTestButTheLineCoverageDidNotIncrease()]).add();
        new ComputerMessage([this.locale.tryToWriteUnitTestsThatFail()]).add();
    }
    showUsefulUnitTestMessage() {
        new ComputerMessage([this.locale.iAddedTheUnitTestAnd()]).add();
    }
    showBugFoundMessage(currentCandidate, _failingTestResult, numberOfUnitTestsStillNeeded) {
        new ComputerMessage([this.locale.theFunctionIsNotFullyTested()]).add();
        new ComputerMessage([this.locale.aMutationOfTheFunction(), currentCandidate.toMutationHtml()]).add();
        new ComputerMessage([this.locale.tryToWriteAUnitTestThatPasses(numberOfUnitTestsStillNeeded)]).add();
    }
    showEndMessage() {
        new ComputerMessage([this.locale.theFunctionIsIndeedFullyTested()]).add();
        new ComputerMessage([this.locale.wellDone()]).add();
    }
    *exampleStringGenerator(useCase) {
        yield* useCase.exampleStringGeneratorMutationTesting();
    }
    compareComplexity(candidate, otherCandidate) {
        return candidate.compareComplexityMutationTesting(otherCandidate);
    }
}

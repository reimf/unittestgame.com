import { Panel, ComputerMessage } from './frame.js';
import { Level } from './level-base.js';
export class TestDrivenDevelopment extends Level {
    identifier() {
        return 'test-driven-development';
    }
    name() {
        return this.locale.testDrivenDevelopment();
    }
    showBasicDefinition() {
        new Panel('test-driven-development', this.locale.testDrivenDevelopment(), [this.locale.definitionTDD()]).show();
    }
    showWelcomeMessage() {
        new ComputerMessage([this.locale.step1TDD()]).add();
        new ComputerMessage([this.locale.step2TDD()]).add();
        new ComputerMessage([this.locale.step3TDD()]).add();
    }
    showSpecificationPanel(specification) {
        new Panel('specification', this.locale.specification(), [specification]).show();
    }
    showCurrentFunctionPanel(currentCandidate, previousCandidate) {
        new Panel('current-function', this.locale.currentFunction(), [
            previousCandidate ? currentCandidate.toHtmlWithPrevious(previousCandidate) : currentCandidate.toHtml()
        ]).show();
    }
    showCodeCoveragePanel(_perfectCandidate, _coveredCandidate) {
        // nothing
    }
    showIncorrectUnitTestMessage() {
        new ComputerMessage([this.locale.iDidNotAddTheUnitTest()]).add();
    }
    showUselessUnitTestMessage() {
        new ComputerMessage([this.locale.iAddedTheUnitTestButTheCurrentFunctionAlreadyPassedThisUnitTest()]).add();
        new ComputerMessage([this.locale.tryToWriteUnitTestsThatFail()]).add();
    }
    showUsefulUnitTestMessage() {
        new ComputerMessage([this.locale.iAddedTheUnitTestAnd()]).add();
    }
    showBugFoundMessage(_currentCandidate, failingTestResult, numberOfUnitTestsStillNeeded) {
        new ComputerMessage([this.locale.theCurrentFunctionIsNotAccordingToTheSpecification()]).add();
        new ComputerMessage([this.locale.itProducesTheFollowingIncorrectResult(), failingTestResult.toString()]).add();
        new ComputerMessage([this.locale.tryToWriteAUnitTestThatIsAccordingToTheSpecification(numberOfUnitTestsStillNeeded)]).add();
    }
    showEndMessage() {
        new ComputerMessage([this.locale.theCurrentFunctionIsIndeedAccordingToTheSpecification()]).add();
        new ComputerMessage([this.locale.wellDone()]).add();
    }
    *exampleStringGenerator(useCase) {
        yield* useCase.exampleStringGeneratorTestDrivenDevelopment();
    }
    compareComplexity(candidate, otherCandidate) {
        return candidate.compareComplexityTestDrivenDevelopment(otherCandidate);
    }
}

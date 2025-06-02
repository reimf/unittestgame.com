import { Panel, ComputerMessage } from './frame.js';
import { Level } from './level-base.js';
export class TestDrivenDevelopment extends Level {
    name() {
        return 'Test-Driven Development';
    }
    showBasicDefinition() {
        new Panel('Test-Driven Development', [
            'Write a unit test that initially fails, then write just enough code to make the unit test pass. ' +
                'Repeat until the code is according to the specification. ' +
                '[Read more](https://en.wikipedia.org/wiki/Test-driven_development)',
        ]).show();
    }
    showWelcomeMessage() {
        new ComputerMessage(['You read the *Specification* and write *Unit Tests* that fail the *Current Function*.']).add();
        new ComputerMessage(['After adding a unit test I (the AI bot) rewrite the *Current Function* such that it passes the *Unit Tests*.']).add();
        new ComputerMessage(['When you think the *Current Function* is according to the *Specification*, you submit the *Unit Tests*.']).add();
    }
    showSpecificationPanel(specification) {
        new Panel('Specification', [specification]).show();
    }
    showCurrentFunctionPanel(currentCandidate, previousCandidate) {
        new Panel('Current Function', [
            previousCandidate ? currentCandidate.toHtmlWithPrevious(previousCandidate) : currentCandidate.toHtml()
        ]).show();
    }
    showCodeCoveragePanel(_perfectCandidate, _coveredCandidate) {
        // nothing
    }
    showIncorrectUnitTestMessage() {
        new ComputerMessage(['I did NOT add the unit test, because it is NOT correct.']).add();
    }
    showUselessUnitTestMessage() {
        new ComputerMessage(['I added the unit test to the *Unit Tests*, but the *Current Function* already passed this unit test, so I did NOT improve the *Current Function*.']).add();
        new ComputerMessage(['Try to write unit tests that fail for the *Current Function*.']).add();
    }
    showUsefulUnitTestMessage() {
        new ComputerMessage(['I added the unit test to the *Unit Tests* and I improved the *Current Function* such that it passes the new unit test.']).add();
    }
    showBugFoundMessage(_currentCandidate, failingTestResult, numberOfUnitTestsStillNeeded) {
        new ComputerMessage(['The *Current Function* is NOT according to the *Specification*.']).add();
        new ComputerMessage(['It produces the following incorrect result.', failingTestResult.toString()]).add();
        new ComputerMessage([`Try to write a unit test that is according to the *Specification* and fails for the *Current Function*. I think you need at least ${numberOfUnitTestsStillNeeded} more ${numberOfUnitTestsStillNeeded === 1 ? 'unit test' : 'unit tests'} to make the *Current Function* according to the *Specification*.`]).add();
    }
    showEndMessage() {
        new ComputerMessage(['The *Current Function* is indeed according to the *Specification*.']).add();
        new ComputerMessage(['Well done!']).add();
    }
    *exampleGuidanceGenerator(useCase) {
        yield* useCase.exampleGuidanceGeneratorTestDrivenDevelopment();
    }
    compareComplexity(candidate, otherCandidate) {
        return candidate.compareComplexityTestDrivenDevelopment(otherCandidate);
    }
}

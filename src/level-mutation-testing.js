import { Panel, ComputerMessage } from './frame.js';
import { Paragraph } from './html.js';
import { Level } from './level-base.js';
export class MutationTesting extends Level {
    identifier() {
        return 'mutation-testing';
    }
    name() {
        return this.locale.mutationTesting();
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
    getLastCoveredHtml(perfectCandidate, previousCoveredCandidate, lastCoveredCandidate) {
        if (previousCoveredCandidate && lastCoveredCandidate)
            return perfectCandidate.toHtmlWithLastAndPreviousCovered(lastCoveredCandidate, previousCoveredCandidate);
        if (lastCoveredCandidate)
            return perfectCandidate.toHtmlWithLastCovered(lastCoveredCandidate);
        return new Paragraph().appendText(this.locale.noLastCoveredFunction());
    }
    showTheFunctionPanel(perfectCandidate, coveredCandidate, previousCoveredCandidate, lastCoveredCandidate) {
        new Panel('the-function', this.locale.theFunction(), [
            coveredCandidate ? perfectCandidate.toHtmlWithCovered(coveredCandidate) : perfectCandidate.toHtml()
        ]).show();
        new Panel('last-covered-function', this.locale.differenceFromThePreviousCoveredFunction(), [
            this.getLastCoveredHtml(perfectCandidate, previousCoveredCandidate, lastCoveredCandidate)
        ]).show();
    }
    showIncorrectUnitTestMessage() {
        new ComputerMessage([this.locale.iDidNotAddTheUnitTest()]).add();
    }
    showUselessUnitTestMessage() {
        new ComputerMessage([this.locale.iAddedTheUnitTestButNoExtraLinesOfTheFunctionAreTested()]).add();
        new ComputerMessage([this.locale.tryToWriteUnitTestsThatDoNotPass()]).add();
    }
    showUsefulUnitTestMessage() {
        new ComputerMessage([this.locale.iAddedTheUnitTestAndIShowedWhichLinesOfTheFunctionAreTested()]).add();
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

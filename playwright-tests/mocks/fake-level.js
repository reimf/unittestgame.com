import { Level } from '../../src/level.js';
export class FakeLevel extends Level {
    name() { return 'Fake Level'; }
    showBasicDefinition() { }
    compareComplexity(_candidate, _otherCandidate) { return 0; }
    showWelcomeMessage() { }
    showSpecificationPanel(_specification) { }
    showCurrentFunctionPanel(_currentCandidate, _previousCandidate) { }
    showCodeCoveragePanel(_perfectCandidate, _coveredCandidate) { }
    showIncorrectUnitTestMessage() { }
    showUselessUnitTestMessage() { }
    showUsefulUnitTestMessage() { }
    showBugFoundMessage(_currentCandidate, _failingTestResult, _numberOfUnitTestsStillNeeded) { }
    showEndMessage() { }
    *exampleGuidanceGenerator(_useCase) { }
}

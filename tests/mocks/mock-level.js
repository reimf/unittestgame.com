import { Level } from '../../src/level-base.js';
export class MockLevel extends Level {
    identifier() { return 'mock-level'; }
    name() { return 'Mock Level'; }
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
    *exampleStringGenerator(_useCase) { }
}

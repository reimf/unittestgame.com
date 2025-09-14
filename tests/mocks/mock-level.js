import { Level } from '../../src/level-base.js';
import { Translation } from '../../src/translation.js';
export class MockLevel extends Level {
    identifier() { return 'mock-level'; }
    name() { return new Translation('Mock Level'); }
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
    *exampleTranslationGenerator() { }
    *exampleValuesGenerator() { }
}

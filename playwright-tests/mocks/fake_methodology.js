import { Methodology } from '../../src/methodology.js';
export class FakeMethodology extends Methodology {
    name() { return 'Fake Methodology'; }
    showBasicDefinition() { }
    compareComplexity(_candidate, _otherCandidate) { return 0; }
    showExample(_callback) { }
    showWelcomeMessage() { }
    showPanelsOnMenu(_specification, _currentCandidate, _previousCandidate, _perfectCandidate, _coveredCandidate) { }
    showIncorrectUnitTestMessage() { }
    showUselessUnitTestMessage() { }
    showUsefulUnitTestMessage() { }
    showBugFoundMessage(_currentCandidate, _failingTestResult) { }
    showEndMessage() { }
    *exampleGuidanceGenerator(_useCase) { }
}

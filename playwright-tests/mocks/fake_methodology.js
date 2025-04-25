import { Methodology } from '../../src/methodology.js';
export class FakeMethodology extends Methodology {
    name() { return 'Fake Methodology'; }
    showBasicDefinition() { }
    showExample(_callback) { }
    showWelcomeMessage() { }
    showPanelsOnMenu(_specification, _currentCandidate, _previousCandidates, _perfectCandidate, _coveredCandidates) { }
    showIncorrectUnitTestMessage() { }
    showUselessUnitTestMessage() { }
    showUsefulUnitTestMessage() { }
    showBugFoundMessage(_currentCandidate, _failingTestResult) { }
    showEndMessage() { }
    *exampleGuidanceGenerator(_useCase) { }
}

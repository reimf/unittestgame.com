import { Methodology } from '../../src/methodology.js';
export class FakeMethodology extends Methodology {
    name() { return 'Fake Methodology'; }
    showBasicDefinition() { }
    showExample(_callback) { }
    showWelcomeMessage() { }
    showPanelsOnMenu(_specification, _currentCandidate, _previousCandidate, _perfectCandidate, _coveredCandidates) { }
    showIncorrectUnitTestMessage() { }
    showUselessUnitTestMessage() { }
    showUsefulUnitTestMessage() { }
    showHintMessage(_currentCandidate, _failingTestResult) { }
    showNoHintMessage() { }
    showBugFoundMessage(_currentCandidate, _failingTestResult) { }
    showEndMessage() { }
}

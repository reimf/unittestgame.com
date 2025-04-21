import { Methodology } from '../../src/methodology.js';
export class FakeMethodology extends Methodology {
    name() { return 'Fake Methodology'; }
    showBasicDefinition() { }
    showExample(_callback) { }
    showWelcomeMessage() { }
    showPanelsOnMenu(_specification, _currentCandidate, _previousCandidate, _perfectCandidate, _coveredCandidate) { }
    showIncorrectUnitTestMessage() { }
    showUselessUnitTestMessage() { }
    showUsefulUnitTestMessage() { }
    showBugFoundMessage(_currentCandidate, _failingTestResult) { }
    showEndMessage() { }
    *exampleMessageGenerator() { }
}

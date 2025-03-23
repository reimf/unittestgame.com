import { Methodology } from '../../src/methodology.js';
export class FakeMethodology extends Methodology {
    name() { return 'Fake Methodology'; }
    showBasicDefinition() { }
    showWelcomeMessage() { }
    showPanelsOnMenu(_specification, _currentCandidate, _perfectCandidate, _coveredCandidates) { }
    showUselessUnitTestMessage() { }
    showUsefulUnitTestMessage() { }
    showHintMessage(_currentCandidate, _failingTestResult, _penaltyHint) { }
    showNoHintMessage(_penaltyHint) { }
    showBugFoundMessage(_currentCandidate, _failingTestResult, _penaltySubmitWithBug) { }
    showUnsuccessfulEndMessage(_score) { }
    showSuccessfulEndMessage(_score) { }
}

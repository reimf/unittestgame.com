import { Candidate } from '../../src/candidate.js'
import { Methodology } from '../../src/methodology.js'
import { TestResult } from '../../src/test_result.js'

export class FakeMethodology extends Methodology {
    public name(): string { return 'Fake Methodology' }
    public showBasicDefinition(): void { }
    public showWelcomeMessage(): void { }
    public showPanelsOnMenu(_specification: string, _currentCandidate: Candidate, _previousCandidate: Candidate|undefined, _perfectCandidate: Candidate, _coveredCandidates: Candidate[]): void { }
    public showUselessUnitTestMessage(): void { }
    public showUsefulUnitTestMessage(): void { }
    public showHintMessage(_currentCandidate: Candidate, _failingTestResult: TestResult, _penaltyHint: number): void { }
    public showNoHintMessage(_penaltyHint: number): void { }
    public showBugFoundMessage(_currentCandidate: Candidate, _failingTestResult: TestResult, _penaltySubmitWithBug: number): void { }
    public showUnsuccessfulEndMessage(_score: number): void { }
    public showSuccessfulEndMessage(_score: number): void { }
}

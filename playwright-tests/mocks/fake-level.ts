import { Candidate } from '../../src/candidate.js'
import { Level } from '../../src/level.js'
import { TestResult } from '../../src/test-result.js'

export class FakeLevel extends Level {
    public name(): string { return 'Fake Level' }
    public showBasicDefinition(): void { }
    public compareComplexity(_candidate: Candidate, _otherCandidate: Candidate): number { return 0 }
    public showExample(_callback: () => void): void { }
    public showWelcomeMessage(): void { }
    public showPanelsOnMenu(_specification: string, _currentCandidate: Candidate, _previousCandidate: Candidate|undefined, _perfectCandidate: Candidate, _coveredCandidate: Candidate|undefined): void { }
    public showIncorrectUnitTestMessage(): void { }
    public showUselessUnitTestMessage(): void { }
    public showUsefulUnitTestMessage(): void { }
    public showBugFoundMessage(_currentCandidate: Candidate, _failingTestResult: TestResult, _numberOfUnitTestsStillNeeded: number): void { }
    public showEndMessage(): void { }
    public* exampleGuidanceGenerator(_useCase: any): Generator<string> { }
}

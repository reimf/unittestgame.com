import { Candidate } from '../../src/candidate.js'
import { Level } from '../../src/level.js'
import { TestResult } from '../../src/test-result.js'

export class FakeLevel extends Level {
    public name(): string { return 'Fake Level' }
    public showBasicDefinition(): void { }
    protected compareComplexity(_candidate: Candidate, _otherCandidate: Candidate): number { return 0 }
    protected showWelcomeMessage(): void { }
    protected showSpecificationPanel(_specification: string): void { }
    protected showCurrentFunctionPanel(_currentCandidate: Candidate, _previousCandidate: Candidate|undefined): void {}
    protected showCodeCoveragePanel(_perfectCandidate: Candidate, _coveredCandidate: Candidate|undefined): void { }

    protected showIncorrectUnitTestMessage(): void { }
    protected showUselessUnitTestMessage(): void { }
    protected showUsefulUnitTestMessage(): void { }
    protected showBugFoundMessage(_currentCandidate: Candidate, _failingTestResult: TestResult, _numberOfUnitTestsStillNeeded: number): void { }
    protected showEndMessage(): void { }
    protected* exampleGuidanceGenerator(_useCase: any): Generator<string> { }
}

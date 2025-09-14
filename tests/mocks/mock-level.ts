import { Candidate } from '../../src/candidate.js'
import { Level } from '../../src/level-base.js'
import { TestResult } from '../../src/test-result.js'
import { Translation } from '../../src/translation.js'

export class MockLevel extends Level {
    public identifier(): string { return 'mock-level' }
    public name(): Translation { return new Translation('Mock Level') }
    public showBasicDefinition(): void { }
    protected compareComplexity(_candidate: Candidate, _otherCandidate: Candidate): number { return 0 }
    protected showWelcomeMessage(): void { }
    protected showSpecificationPanel(_specification: Translation): void { }
    protected showCurrentFunctionPanel(_currentCandidate: Candidate, _previousCandidate: Candidate|undefined): void {}
    protected showCodeCoveragePanel(_perfectCandidate: Candidate, _coveredCandidate: Candidate|undefined): void { }

    protected showIncorrectUnitTestMessage(): void { }
    protected showUselessUnitTestMessage(): void { }
    protected showUsefulUnitTestMessage(): void { }
    protected showBugFoundMessage(_currentCandidate: Candidate, _failingTestResult: TestResult, _numberOfUnitTestsStillNeeded: number): void { }
    protected showEndMessage(): void { }
    
    public* exampleTranslationGenerator(): Generator<Translation> { }
    public* exampleValuesGenerator(): Generator<string> { }
}

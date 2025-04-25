import { Candidate } from './candidate.js'
import { TestResult } from './test_result.js'
import { UseCase } from './use_case.js'

export abstract class Methodology {
    public abstract name(): string
    public abstract showBasicDefinition(): void
    public abstract showWelcomeMessage(): void
    public abstract showPanelsOnMenu(specification: string, currentCandidate: Candidate, previousCandidates: Candidate[], perfectCandidate: Candidate, coveredCandidates: Candidate[]): void
    public abstract showBugFoundMessage(currentCandidate: Candidate, failingTestResult: TestResult): void
    public abstract showEndMessage(): void
    public abstract showIncorrectUnitTestMessage(): void
    public abstract showUselessUnitTestMessage(): void
    public abstract showUsefulUnitTestMessage(): void
    public abstract exampleGuidanceGenerator(useCase: UseCase): Generator<string>
}

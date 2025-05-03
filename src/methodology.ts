import { Candidate } from './candidate.js'
import { ComputerMessage } from './frame.js'
import { TestResult } from './test_result.js'
import { UseCase } from './use_case.js'

export abstract class Methodology {
    public abstract name(): string
    public abstract showBasicDefinition(): void
    public abstract compareComplexity(candidate: Candidate, otherCandidate: Candidate): number
    public abstract showWelcomeMessage(): void
    public abstract showPanelsOnMenu(specification: string, currentCandidate: Candidate, previousCandidate: Candidate|undefined, perfectCandidate: Candidate, coveredCandidates: Candidate|undefined): void
    public abstract showBugFoundMessage(currentCandidate: Candidate, failingTestResult: TestResult, numberOfUnitTestsStillNeeded: number): void
    public abstract showEndMessage(): void
    public abstract showIncorrectUnitTestMessage(): void
    public abstract showUselessUnitTestMessage(): void
    public abstract showUsefulUnitTestMessage(): void
    public abstract exampleGuidanceGenerator(useCase: UseCase): Generator<string>
}

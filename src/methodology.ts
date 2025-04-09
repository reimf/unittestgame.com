import { Candidate } from './candidate.js'
import { ButtonMessage, ComputerMessage } from './frame.js'
import { TestResult } from './test_result.js'
import { StoredValue } from './stored_value.js'

export abstract class Methodology {
    public abstract name(): string
    public abstract showBasicDefinition(): void
    public abstract showExample(callback: () => void): void
    public abstract showWelcomeMessage(): void
    public abstract showPanelsOnMenu(specification: string, currentCandidate: Candidate, previousCandidate: Candidate|undefined, perfectCandidate: Candidate, coveredCandidates: Candidate[]): void
    public abstract showHintMessage(currentCandidate: Candidate, failingTestResult: TestResult): void
    public abstract showNoHintMessage(): void
    public abstract showBugFoundMessage(currentCandidate: Candidate, failingTestResult: TestResult): void
    public abstract showEndMessage(): void
    public abstract showUselessUnitTestMessage(): void
    public abstract showUsefulUnitTestMessage(): void

    public readonly exampleSeen: StoredValue = new StoredValue(`${this.name()} - Example Seen`)

    public getExampleSeen(storage: Storage): string {
        return this.exampleSeen.get(storage)
    }

    public setExampleSeen(storage: Storage): void {
        this.exampleSeen.set(storage)
    }

    public showIncorrectUnitTestMessage(): void {
        new ComputerMessage(['I did NOT add the unit test, because it is NOT correct.']).add()
    }
}

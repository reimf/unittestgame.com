import { Candidate } from './candidate.js'
import { ButtonMessage, ComputerMessage } from './frame.js'
import { TestResult } from './test_result.js'
import { Completed } from './completed.js'

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

    public readonly isExampleSeen: Completed = new Completed(`${this.name()} - Example Seen`)

    public getExampleSeen(): boolean {
        return this.isExampleSeen.get()
    }

    public setExampleSeen(): void {
        this.isExampleSeen.set()
    }

    public showIncorrectUnitTestMessage(): void {
        new ComputerMessage(['I did NOT add the unit test, because it is NOT correct.']).add()
    }
}

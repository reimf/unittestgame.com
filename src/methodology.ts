import { Candidate } from './candidate.js'
import { ComputerMessage } from './frame.js'
import { TestResult } from './test_result.js'

export abstract class Methodology {
    public abstract name(): string
    public abstract showBasicDefinition(): void
    public abstract showExample(callback: () => void): void
    public abstract showWelcomeMessage(): void
    public abstract showPanelsOnMenu(specification: string, currentCandidate: Candidate, previousCandidate: Candidate|undefined, perfectCandidate: Candidate, coveredCandidates: Candidate[]): void
    public abstract showHintMessage(currentCandidate: Candidate, failingTestResult: TestResult, penaltyHint: number): void
    public abstract showNoHintMessage(penaltyHint: number): void
    public abstract showBugFoundMessage(currentCandidate: Candidate, failingTestResult: TestResult, penaltySubmitWithBug: number): void
    public abstract showUnsuccessfulEndMessage(score: number): void
    public abstract showSuccessfulEndMessage(score: number): void
    public abstract showUselessUnitTestMessage(): void
    public abstract showUsefulUnitTestMessage(): void

    public getExampleSeen(storage: Storage): boolean {
        return storage.getItem(this.name()) === 'true'
    }

    public setExampleSeen(storage: Storage): void {
        storage.setItem(this.name(), 'true')
    }

    public showIncorrectUnitTestMessage(penaltyIncorrectUnitTest: number): void {
        new ComputerMessage(['I did NOT add the unit test, because it is NOT correct.']).add()
        new ComputerMessage([`The cost for trying to add an incorrect unit test is ${penaltyIncorrectUnitTest}%.`]).add()
    }

    public showMinimumScoreEndMessage(score: number): void {
        new ComputerMessage([
            'You have to retry this level, ' +
            `because your score dropped to ${score}%.`,
        ]).add()
    }
}

import { Candidate } from './candidate.js'
import { Panel } from './frame.js'
import { Paragraph } from './html.js'
import { TestResult } from './test_result.js'
import { UnitTest } from './unit_test.js'

export abstract class Game {
    public readonly name: string = this.constructor.name.replace(/(?=[A-Z])/g, ' ').trim()

    public abstract showWelcomeMessage(): void
    public abstract showPanelsOnPlay(perfectCandidate: Candidate, coveredCandidates: Candidate[],showSpecificationPanel: () => void): void
    public abstract showContractMessage(): void
    public abstract showPanelsOnMenu(currentCandidate: Candidate, perfectCandidate: Candidate, coveredCandidates: Candidate[]): void
    public abstract showHintMessage(currentCandidate: Candidate, failingTestResult: TestResult, penaltyHint: number): void
    public abstract showNoHintMessage(penaltyHint: number): void
    public abstract showBugFoundMessage(currentCandidate: Candidate, failingTestResult: TestResult, penaltySubmitWithBug: number): void
    public abstract showMinimumScoreEndMessage(score: number): void
    public abstract showUnsuccessfulEndMessage(score: number): void
    public abstract showSuccessfulEndMessage(score: number): void
    public abstract showUselessUnitTestMessage(): void
    public abstract showUsefulUnitTestMessage(): void
    public abstract showIncorrectUnitTestMessage(penaltyIncorrectUnitTest: number): void

    public showUnitTestsPanel(unitTests: UnitTest[]): void {
        new Panel('Unit Tests',
            unitTests.length === 0
            ? [new Paragraph().appendText('You have not written any unit tests yet.')]
            : unitTests.map(unitTest => new Paragraph().appendText(unitTest.toString())),
        ).show()
    }

    public showScorePanel(description: string, score: number): void {
        new Panel('Score', [
            new Paragraph().appendText(`${description}: ${score}%`),
        ]).show()
    }
}

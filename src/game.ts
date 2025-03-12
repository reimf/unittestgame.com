import { Candidate } from './candidate.js'
import { Panel, ComputerMessage } from './frame.js'
import { Paragraph } from './html.js'
import { TestResult } from './test_result.js'
import { UnitTest } from './unit_test.js'

export abstract class Game {
    public readonly name: string = this.constructor.name.replace(/(?<=[a-z])(?=[A-Z])/g, ' ')

    public abstract showWelcomeMessage(): void
    public abstract showPanelsOnMenu(specification: string, currentCandidate: Candidate, perfectCandidate: Candidate, coveredCandidates: Candidate[]): void
    public abstract showHintMessage(currentCandidate: Candidate, failingTestResult: TestResult, penaltyHint: number): void
    public abstract showNoHintMessage(penaltyHint: number): void
    public abstract showBugFoundMessage(currentCandidate: Candidate, failingTestResult: TestResult, penaltySubmitWithBug: number): void
    public abstract showUnsuccessfulEndMessage(score: number): void
    public abstract showRedundantUnitTestsEndMessage(score: number, numberOfRedundantUnitTests: number, penaltyRedundantUnitTest: number): void
    public abstract showSuccessfulEndMessage(score: number): void
    public abstract showUselessUnitTestMessage(): void
    public abstract showUsefulUnitTestMessage(): void

    public showUnitTestsPanel(unitTests: UnitTest[]): void {
        new Panel('Unit Tests',
            unitTests.length === 0
                ? [new Paragraph().text('You have not written any unit tests yet.')]
                : unitTests.map(unitTest => new Paragraph().text(unitTest.toString()))).show()
    }

    public showIncorrectUnitTestMessage(penaltyIncorrectUnitTest: number): void {
        new ComputerMessage([
            new Paragraph().text('I did NOT add the unit test, because it is NOT correct.'),
            new Paragraph().text(`The cost for trying to add an incorrect unit test is ${penaltyIncorrectUnitTest}%.`),
        ]).show()
    }

    public showScorePanel(description: string, score: number): void {
        new Panel('Score', [new Paragraph().text(`${description}: ${score}%`)]).show()
    }

    public showMinimumScoreEndMessage(score: number): void {
        new ComputerMessage([
            new Paragraph().text(
                'You have to retry this level, ' + 
                `because your score dropped to ${score}%.`
            ),
        ]).show()
    }
}

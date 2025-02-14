import UnitTest from './unit_test.js'
import Candidate from './candidate.js'
import { Form, Panel, HumanMessage, ComputerMessage } from './html.js'
import TestResult from './test_result.js'

export default abstract class Theme {
    public abstract readonly description: string
    public abstract addUnitTestFormButtonText(): string
    public abstract cancelUnitTestFormButtonText(): string
    public abstract contractMessage(initialScore: number, penaltyHint: number, penaltyBug: number): ComputerMessage
    public abstract formUnitTestButtonText(): string
    public abstract showHintButtonText(penaltyHint: number): string
    public abstract submitButtonText(penaltyBug: number): string
    public abstract endButtonText(penaltyEnd: number): string
    public abstract unitTestsPanel(unitTests: UnitTest[]): Panel
    public abstract currentCandidatePanel(candidate: Candidate): Panel
    public abstract scorePanel(score: number): Panel
    public abstract addUnitTestFormMessage(form: Form): HumanMessage
    public abstract cancelUnitTestFormMessage(): HumanMessage
    public abstract addUnitTestTextMessage(unitTest: UnitTest): HumanMessage
    public abstract hintUnitTestMessage(unitTest: UnitTest, penaltyHint: number): ComputerMessage
    public abstract noHintUnitTestMessage(penaltyHint: number): ComputerMessage
    public abstract bugFoundMessage(testResult: TestResult, penaltyBug: number): ComputerMessage
    public abstract endWithBugMessage(): ComputerMessage
    public abstract endPerfectMessage(score: number): ComputerMessage
    public abstract endPositiveMessage(score: number): ComputerMessage
    public abstract endNegativeMessage(score: number): ComputerMessage
    public abstract overallUselessUnitTestMessage(): ComputerMessage
    public abstract currentlyUselessUnitTestMessage(): ComputerMessage
    public abstract usefulUnitTestMessage(): ComputerMessage
    public abstract incorrectUnitTestMessage(): ComputerMessage
    public abstract formatScore(score: number): string
}

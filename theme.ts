abstract class Theme {
    public abstract readonly description: string
    public abstract addUnitTestFormButton(): string
    public abstract cancelUnitTestFormButton(): string
    public abstract contractMessage(initialScore: number, penaltyHint: number, penaltyBug: number): Message
    public abstract formUnitTestButton(): string
    public abstract showHintButton(penaltyHint: number): string
    public abstract submitButton(penaltyBug: number): string
    public abstract endButton(penaltyEnd: number): string
    public abstract unitTestsPanel(unitTests: UnitTest[]): Panel
    public abstract currentCandidatePanel(candidate: Candidate): Panel
    public abstract scorePanel(score: number): Panel
    public abstract addUnitTestFormMessage(form: Form): Message
    public abstract cancelUnitTestFormMessage(): Message
    public abstract addUnitTestTextMessage(unitTest: UnitTest): Message
    public abstract hintUnitTestMessage(unitTest: UnitTest, penaltyHint: number): Message
    public abstract bugFoundMessage(testResult: TestResult, penaltyBug: number): Message
    public abstract endWithBugMessage(): Message
    public abstract endPerfectMessage(score: number): Message
    public abstract endPositiveMessage(score: number): Message
    public abstract endNegativeMessage(score: number): Message
    public abstract overallUselessUnitTestMessage(): Message
    public abstract currentlyUselessUnitTestMessage(): Message
    public abstract usefulUnitTestMessage(): Message
    public abstract incorrectUnitTestMessage(): Message
    public abstract formatScore(score: number): string
}

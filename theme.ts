abstract class Theme {
    public abstract readonly description: string
    public abstract addUnitTestFormButton(): string
    public abstract cancelUnitTestFormButton(): string
    public abstract contractMessage(initialScore: number, penaltyHint: number, penaltyBug: number): Section
    public abstract formUnitTestButton(): string
    public abstract showHintButton(penaltyHint: number): string
    public abstract submitButton(penaltyBug: number): string
    public abstract endButton(penaltyEnd: number): string
    public abstract showHintMessage(): Section
    public abstract submitMessage(): Section
    public abstract endMessage(): Section
    public abstract unitTestsPanel(unitTests: UnitTest[]): Section
    public abstract currentCandidatePanel(candidate: Candidate): Section
    public abstract scorePanel(score: number): Section
    public abstract addUnitTestFormMessage(form: Form): Section
    public abstract cancelUnitTestFormMessage(): Section
    public abstract addUnitTestTextMessage(unitTest: UnitTest): Section
    public abstract hintUnitTestMessage(unitTest: UnitTest, penaltyHint: number): Section
    public abstract bugFoundMessage(testResult: TestResult, penaltyBug: number): Section
    public abstract endWithBugMessage(): Section
    public abstract endPerfectMessage(score: number): Section
    public abstract endPositiveMessage(score: number): Section
    public abstract endNegativeMessage(score: number): Section
    public abstract overallUselessUnitTestMessage(): Section
    public abstract currentlyUselessUnitTestMessage(): Section
    public abstract usefulUnitTestMessage(): Section
    public abstract incorrectUnitTestMessage(): Section
    public abstract formatScore(score: number): string
}

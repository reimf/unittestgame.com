class AIBot extends Theme {
    static #instance: AIBot

    private constructor() {
        super()
    }

    public static instance(): AIBot {
        if (!AIBot.#instance)
            AIBot.#instance = new AIBot()
        return AIBot.#instance
    }

    public description(): string {
        return 'I want to ensure an AI-bot functions correctly by testing it.'
    }

    public choiceLabel(): string {
        return 'Choice'
    }

    public buttonText(): string {
        return 'Execute!'
    }

    public contractMessage(initialScore: number, penaltyHint: number, penaltyBug: number): Section {
        return new Section([
            new Paragraph(
                `If you write enough unit tests, you will earn ${this.formatScore(initialScore)}. ` +
                `However, a hint costs ${this.formatScore(penaltyHint)}. ` +
                'And if the AI-bot produces an error that passes all submitted unit tests, ' +
                `you will incur a penalty of ${this.formatScore(penaltyBug)}.`
            ),
        ])
    }

    public addUnitTestButton(): string {
        return 'I want to add a unit test.'
    }

    public seeHintButton(penaltyHint: number): string {
        return `I want to see a hint for a unit test (-${this.formatScore(penaltyHint)}).`
    }

    public submitButton(penaltyBug: number): string {
        return `I want to submit the unit tests (-${this.formatScore(penaltyBug)} if incorrect).`
    }

    public endButton(penaltyEnd: number): string {
        return `I want to finalize testing (-${this.formatScore(penaltyEnd)} if incorrect).`
    }

    public seeHintMessage(): Section {
        return new Section([
            new Paragraph('I want to see a hint for a unit test.'),
        ])
    }

    public submitMessage(): Section {
        return new Section([
            new Paragraph('I want to submit the unit tests.'),
        ])
    }

    public endMessage(): Section {
        return new Section([
            new Paragraph('I want to finalize testing.'),
        ])
    }

    public unitTestsPanel(unitTests: UnitTest[]): Section {
        const list = unitTests.length === 0
            ? [new Paragraph('You have not written any unit tests yet.')] 
            : unitTests.map(unitTest => unitTest.toHtml())
        return new Section([
            new Header('Unit Tests'),
            ...list,
        ])
    }

    public currentCandidatePanel(candidate: Candidate): Section {
        return new Section([
            new Header('Current AI Functionality'),
            candidate.toHtml(),
        ])
    }

    public scorePanel(score: number): Section {
        return new Section([
            new Header('Performance Score'),
            new Paragraph(`${this.formatScore(score)}`),
        ])
    }

    public addUnitTestFormMessage(form: Form): Section {
        return new Section([
            new Paragraph('I want to add a unit test.'),
            form,
        ])
    }

    public addUnitTestTextMessage(unitTest: UnitTest): Section {
        return new Section([
            new Paragraph('I want to add the following unit test:'),
            unitTest.toHtml(),
        ])
    }

    public hintUnitTestMessage(unitTest: UnitTest, penaltyHint: number): Section {
        return new Section([
            new Paragraph('A unit test that currently fails is the following.'),
            unitTest.toHtml(),
            new Paragraph(`The cost for this hint is ${this.formatScore(penaltyHint)}.`),
        ])
    }

    public bugFoundMessage(testResult: TestResult, penaltyBug: number): Section {
        return new Section([
            new Paragraph(
                'Warning! ' +
                'The AI-bot has encountered an unexpected issue in production. ' +
                'The following incorrect output was generated:'
            ),
            testResult.toHtml(),
            new Paragraph(`Your penalty for missing this issue is ${this.formatScore(penaltyBug)}.`),
        ])
    }

    public endWithBugMessage(): Section {
        return new Section([
            new Paragraph(
                'There are still critical issues in the AI-bot, ' +
                'so you receive no reward. ' +
                'Better luck next time! ' +
                'Thanks for testing!'
            ),
        ])
    }

    public endPerfectMessage(score: number): Section {
        return new Section([
            new Paragraph(
                'Fantastic! ' +
                'Thanks to your thorough testing, the AI-bot is fully functional. ' +
                `You achieved the maximum score of ${this.formatScore(score)}. ` +
                'Well done! ' +
                'Thanks for testing!'
            ),
        ])
    }

    public endPositiveMessage(score: number): Section {
        return new Section([
            new Paragraph(
                'Great job! ' +
                'Your testing has ensured the AI-bot runs smoothly. ' +
                `Your final score is ${this.formatScore(score)}. ` +
                'Keep up the good work! ' +
                'Thanks for testing!'
            ),
        ])
    }

    public endNegativeMessage(score: number): Section {
        return new Section([
            new Paragraph(
                'Unfortunately, your testing did not fully validate the AI-bot. ' +
                `Your final score is ${this.formatScore(score)}. ` +
                'Try again next time! ' +
                'Thanks for testing!'
            ),
        ])
    }

    public uselessUnitTestMessage(): Section {
        return new Section([
            new Paragraph(
                'The unit test was added, but the AI-bot already passed it. ' +
                'This test may not provide much additional value.'
            ),
        ])
    }

    public usefulUnitTestMessage(): Section {
        return new Section([
            new Paragraph(
                'The unit test has been successfully added.'
            ),
        ])
    }

    public incorrectUnitTestMessage(): Section {
        return new Section([
            new Paragraph(
                'We checked your unit test against the expected behavior. ' +
                'Your test appears to be incorrect, so it has not been included in the evaluation.'
            ),
        ])
    }

    public formatScore(score: number): string {
        return `${score}%`
    }
}

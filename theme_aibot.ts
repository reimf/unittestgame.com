class AIBot extends Theme {
    public static readonly instance = new AIBot()
    public readonly description = 'I want to ensure an AI-bot functions correctly'

    public addUnitTestFormButton(): string {
        return 'I want to add this unit test'
    }

    public cancelUnitTestFormButton(): string {
        return 'I don\'t want to add a unit test now'
    }

    public contractMessage(initialScore: number, penaltyHint: number, penaltyBug: number): Message {
        return new Message([
            new Paragraph(
                'Your boss wants you to work with an AI-bot as co-developer. ' +
                'The AI-bot writes a function and you will write unit tests for it to prevent the AI-bot from hallucinating. ' +
                `If you write enough unit tests, you will earn ${this.formatScore(initialScore)}. ` +
                `However, a hint costs ${this.formatScore(penaltyHint)}. ` +
                'And if the AI-bot produces a function that passes all submitted unit tests but is incorrect, ' +
                `it will cost you ${this.formatScore(penaltyBug)}.`
            ),
        ])
    }

    public formUnitTestButton(): string {
        return 'I want to add a unit test'
    }

    public showHintButton(penaltyHint: number): string {
        return `I want to see a hint for a unit test (-${this.formatScore(penaltyHint)})`
    }

    public submitButton(penaltyBug: number): string {
        return `I want to submit the unit tests (-${this.formatScore(penaltyBug)} if incorrect)`
    }

    public endButton(penaltyEnd: number): string {
        return `I want to finalize testing (-${this.formatScore(penaltyEnd)} if incorrect)`
    }

    public unitTestsPanel(unitTests: UnitTest[]): Panel {
        return new Panel('Unit Tests', [
            unitTests.length === 0
            ? new Paragraph('You have not written any unit tests yet.')
            : new UnorderedList(unitTests.map(unitTest => new ListItem(unitTest.toHtml()))),
        ])
    }

    public currentCandidatePanel(candidate: Candidate): Panel {
        return new Panel('Current AI Functionality', [
            candidate.toHtml(),
        ])
    }

    public scorePanel(score: number): Panel {
        return new Panel('Your Performance Score', [
            new Paragraph(`${this.formatScore(score)}`),
        ])
    }

    public addUnitTestFormMessage(form: Form): Message {
        return new Message([
            new Paragraph('I want to add a unit test.'),
            form,
        ])
    }

    public cancelUnitTestFormMessage(): Message {
        return new Message([
            new Paragraph('I don\'t want to add a unit test now.'),
        ])
    }

    public addUnitTestTextMessage(unitTest: UnitTest): Message {
        return new Message([
            new Paragraph('I want to add the following unit test:'),
            unitTest.toHtml(),
        ])
    }

    public hintUnitTestMessage(unitTest: UnitTest, penaltyHint: number): Message {
        return new Message([
            new Paragraph('A unit test that currently would fail is the following.'),
            unitTest.toHtml(),
            new Paragraph(`The cost for this hint is ${this.formatScore(penaltyHint)}.`),
        ])
    }

    public bugFoundMessage(testResult: TestResult, penaltyBug: number): Message {
        return new Message([
            new Paragraph(
                'Warning! ' +
                'The AI-bot has encountered an unexpected issue in production. ' +
                'The following incorrect output was generated:'
            ),
            testResult.toHtml(),
            new Paragraph(`Your penalty for missing this issue is ${this.formatScore(penaltyBug)}.`),
        ])
    }

    public endWithBugMessage(): Message {
        return new Message([
            new Paragraph(
                'There are still critical issues in the AI-bot, ' +
                'so you receive no reward. ' +
                'Better luck next time! ' +
                'Thanks for testing!'
            ),
        ])
    }

    public endPerfectMessage(score: number): Message {
        return new Message([
            new Paragraph(
                'Fantastic! ' +
                'Thanks to your thorough testing, the AI-bot is fully functional. ' +
                `You achieved the maximum score of ${this.formatScore(score)}. ` +
                'Well done! ' +
                'Thanks for testing!'
            ),
        ])
    }

    public endPositiveMessage(score: number): Message {
        return new Message([
            new Paragraph(
                'Great job! ' +
                'Your testing has ensured the AI-bot runs smoothly. ' +
                `Your final score is ${this.formatScore(score)}. ` +
                'Keep up the good work! ' +
                'Thanks for testing!'
            ),
        ])
    }

    public endNegativeMessage(score: number): Message {
        return new Message([
            new Paragraph(
                'Unfortunately, your testing did not fully validate the AI-bot. ' +
                `Your final score is ${this.formatScore(score)}. ` +
                'Try again next time! ' +
                'Thanks for testing!'
            ),
        ])
    }

    public overallUselessUnitTestMessage(): Message {
        return new Message([
            new Paragraph(
                'The unit test was added, but it looks like another unit test. ' +
                'This test may not provide much additional value.'
            ),
        ])
    }

    public currentlyUselessUnitTestMessage(): Message {
        return new Message([
            new Paragraph(
                'The unit test was added, but the AI-bot already passed it. ' +
                'This test may not provide much additional value at the moment.'
            ),
        ])
    }


    public usefulUnitTestMessage(): Message {
        return new Message([
            new Paragraph(
                'The unit test has been successfully added.'
            ),
        ])
    }

    public incorrectUnitTestMessage(): Message {
        return new Message([
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

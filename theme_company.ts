class Company extends Theme {
    public constructor() {
        super()
    }

    public description(): string {
        return 'I want to review the work of an external software company.'
    }

    public choiceLabel(): string {
        return 'Choice'
    }

    public buttonText(): string {
        return 'Go!'
    }

    public contractMessage(initialScore: number, penaltyHint: number, penaltyBug: number): Section {
        return new Section([
            new Paragraph(
                `If you write enough unit tests, you will earn ${this.formatScore(initialScore)}. ` +
                `However, a hint costs ${this.formatScore(penaltyHint)}. ` +
                'And if a user, for example, finds a bug in a function that passes all submitted unit tests, ' +
                `you will have to pay a penalty of ${this.formatScore(penaltyBug)}.`
            ),
        ])
    }

    public addUnitTestOption(): string {
        return 'I want to add a unit test.'
    }

    public seeHintOption(penaltyHint: number): string {
        return `I want to see a hint for a unit test (-${this.formatScore(penaltyHint)}).`
    }

    public submitOption(penaltyBug: number): string {
        return `I want to submit the unit tests (-${this.formatScore(penaltyBug)} if incorrect).`
    }

    public endOption(penaltyEnd: number): string {
        return `I want to end the game (-${this.formatScore(penaltyEnd)} if incorrect).`
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

    public optionEndMessage(): Section {
        return new Section([
            new Paragraph('I want to end the game.'),
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
            new Header('Current Function'),
            candidate.toHtml(),
        ])
    }

    public scorePanel(score: number): Section {
        return new Section([
            new Header('Earnings'),
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
                'Thank you! ' +
                'We have deployed the latest version of the function into production. ' +
                'A customer has reported a bug in the function. ' +
                'The function produced the following incorrect result.'
            ),
            testResult.toHtml(),
            new Paragraph(`Your share of the cost to fix this is ${this.formatScore(penaltyBug)}.`),
        ])
    }

    public endWithBugMessage(): Section {
        return new Section([
            new Paragraph(
                'There are still bugs in the function, ' +
                'so we are not paying you anything. ' +
                'Too bad! ' +
                'We hope you do better next time. ' +
                'Thanks for playing!'
            ),
        ])
    }

    public endPerfectMessage(score: number): Section {
        return new Section([
            new Paragraph(
                'Congratulations! ' +
                'Thanks to your unit tests, the function is completely bug-free. ' +
                `In total, you earned the maximum of ${this.formatScore(score)}. ` +
                'Awesome! ' +
                'Thanks for playing!'
            ),
        ])
    }

    public endPositiveMessage(score: number): Section {
        return new Section([
            new Paragraph(
                'Congratulations! ' +
                'Thanks to your unit tests, the function is completely bug-free. ' +
                `In total, you earned ${this.formatScore(score)}. ` +
                'Well done! ' +
                'We think you’ll do even better next time. ' +
                'Thanks for playing!'
            ),
        ])
    }

    public endNegativeMessage(score: number): Section {
        return new Section([
            new Paragraph(
                'Congratulations! ' +
                'Thanks to your unit tests, the function is completely bug-free. ' +
                `In total, you lost ${this.formatScore(score)}. ` +
                'Too bad! ' +
                'We hope you do better next time. ' +
                'Thanks for playing!'
            ),
        ])
    }

    public uselessUnitTestMessage(): Section {
        return new Section([
            new Paragraph(
                'We have added the unit test. ' +
                'The current function already passed the unit test. ' +
                'Therefore, we think the unit test is not very useful.'
            ),
        ])
    }

    public usefulUnitTestMessage(): Section {
        return new Section([
            new Paragraph(
                'Done.'
            ),
        ])
    }

    public incorrectUnitTestMessage(): Section {
        return new Section([
            new Paragraph(
                'We have checked your unit test against the specification. ' +
                'Your unit test appears to be incorrect. ' +
                'Therefore, we have not added the unit test to our code.'
            ),
        ])
    }

    public formatScore(score: number): string {
        return `${score < 0 ? '-' : ''}€${Math.round(Math.abs(score) * 10)}`
    }
}

class Intro extends Theme {
    public static instance = new Intro()

    private constructor() {
        super()
    }

    public description(): string {
        return 'I want to have a nice introduction into this game.'
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
                'The game has started. ' +
                'It is your task to write unit tests for a function that determines whether you are allowed to vote or not. ' +
                'Unit tests consist of an age and a boolean result (true if you are allowed to vote, false otherwise). ' +
                'After adding a unit test, check the current function to see if it is correct. ' +
                'Keep adding unit tests until the function works as specified.'
            ),
        ])
    }

    public addUnitTestButton(): string {
        return 'I want to add a unit test.'
    }

    public seeHintButton(penaltyHint: number): string {
        return `I want to see a hint for a unit test.`
    }

    public submitButton(penaltyBug: number): string {
        return `I want to submit the unit tests.`
    }

    public endButton(penaltyEnd: number): string {
        return `I want to end the game.`
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
        ])
    }

    public bugFoundMessage(testResult: TestResult, penaltyBug: number): Section {
        return new Section([
            new Paragraph(
                'There are still bugs in the function.'
            ),
            testResult.toHtml(),
        ])
    }

    public endWithBugMessage(): Section {
        return new Section([
            new Paragraph(
                'There are still bugs in the function. ' +                
                'Thanks for playing!'
            ),
        ])
    }

    public endPerfectMessage(score: number): Section {
        return new Section([
            new Paragraph(
                'Congratulations! ' +
                'Thanks to your unit tests, the function is completely bug-free. ' +
                'Thanks for playing!'
            ),
        ])
    }

    public endPositiveMessage(score: number): Section {
        return this.endPerfectMessage(score)
    }

    public endNegativeMessage(score: number): Section {
        return this.endPerfectMessage(score)
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
        return ''
    }
}

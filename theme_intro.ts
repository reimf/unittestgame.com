class Intro extends Theme {
    public static readonly instance = new Intro()
    public readonly description = 'I want to have a nice introduction into this game'

    public addUnitTestFormButton(): string {
        return 'I want to add this unit test'
    }

    public cancelUnitTestFormButton(): string {
        return 'I don\'t want to add a unit test now'
    }

    public contractMessage(initialScore: number, penaltyHint: number, penaltyBug: number): Message {
        return new Message([
            new Paragraph(
                'It is your task to write unit tests for this function. ' +
                'A unit test consists of a content of arguments for the function and the expected result. ' +
                'After adding a unit test, check the current function to see if the function is correct. ' +
                'Keep adding unit tests until the function works as specified, ' +
                'then submit your unit tests.'
            ),
        ])
    }

    public formUnitTestButton(): string {
        return 'I want to add a unit test'
    }

    public showHintButton(penaltyHint: number): string {
        return `I want to see a hint for a unit test`
    }

    public submitButton(penaltyBug: number): string {
        return `I want to submit the unit tests`
    }

    public endButton(penaltyEnd: number): string {
        return `I want to end the game`
    }

    public unitTestsPanel(unitTests: UnitTest[]): Panel {
        return new Panel('Unit Tests', [
            unitTests.length === 0
            ? new Paragraph('You have not written any unit tests yet.')
            : new UnorderedList(unitTests.map(unitTest => new ListItem(unitTest.toHtml()))),
        ])
    }

    public currentCandidatePanel(candidate: Candidate): Panel {
        return new Panel('Current Function', [
            candidate.toHtml(),
        ])
    }

    public scorePanel(score: number): Panel {
        return new Panel('Score', [
            new Paragraph('This intro game is not scored.'),
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
            new Paragraph('A unit test that currently fails is the following.'),
            unitTest.toHtml(),
        ])
    }

    public bugFoundMessage(testResult: TestResult, penaltyBug: number): Message {
        return new Message([
            new Paragraph(
                'There are still bugs in the function.'
            ),
            testResult.toHtml(),
        ])
    }

    public endWithBugMessage(): Message {
        return new Message([
            new Paragraph(
                'There are still bugs in the function. ' +
                'Thanks for playing!'
            ),
        ])
    }

    public endPerfectMessage(score: number): Message {
        return new Message([
            new Paragraph(
                'Congratulations! ' +
                'Thanks to your unit tests, the function is completely bug-free. ' +
                'Thanks for playing!'
            ),
        ])
    }

    public endPositiveMessage(score: number): Message {
        return this.endPerfectMessage(score)
    }

    public endNegativeMessage(score: number): Message {
        return this.endPerfectMessage(score)
    }

    public overallUselessUnitTestMessage(): Message {
        return new Message([
            new Paragraph(
                'We have added the unit test. ' +
                'The unit test looks like another unit test. ' +
                'Therefore, we think the unit test is not very useful.'
            ),
        ])
    }

    public currentlyUselessUnitTestMessage(): Message {
        return new Message([
            new Paragraph(
                'We have added the unit test. ' +
                'The current function already passed the unit test. ' +
                'Therefore, we think the unit test is not very useful at the moment.'
            ),
        ])
    }

    public usefulUnitTestMessage(): Message {
        return new Message([
            new Paragraph(
                'Done.'
            ),
        ])
    }

    public incorrectUnitTestMessage(): Message {
        return new Message([
            new Paragraph(
                'We have checked your unit test against the specification. ' +
                'Your unit test appears to be incorrect. ' +
                'Therefore, we have NOT added the unit test to our code.'
            ),
        ])
    }

    public formatScore(score: number): string {
        return ''
    }
}

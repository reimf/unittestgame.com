class Intro extends Theme {
    public static readonly instance = new Intro()
    public readonly description = 'I want to have a nice introduction into this game'

    public addUnitTestFormButtonText(): string {
        return 'I want to add this unit test'
    }

    public cancelUnitTestFormButtonText(): string {
        return 'I don\'t want to add a unit test now'
    }

    public contractMessage(initialScore: number, penaltyHint: number, penaltyBug: number): ComputerMessage {
        return new ComputerMessage([
            new Paragraph(
                'It is your task to write unit tests for this function. ' +
                'A unit test consists of the argument for the function and the expected result. ' +
                'After adding a unit test, check the current function to see if the function has improved. ' +
                'Keep adding unit tests until the function works as specified, ' +
                'then submit your unit tests.'
            ),
        ])
    }

    public formUnitTestButtonText(): string {
        return 'I want to add a unit test'
    }

    public showHintButtonText(penaltyHint: number): string {
        return `I want to see a hint for a unit test`
    }

    public submitButtonText(penaltyBug: number): string {
        return `I want to submit the unit tests`
    }

    public endButtonText(penaltyEnd: number): string {
        return `I want to end the game`
    }

    public unitTestsPanel(unitTests: UnitTest[]): Panel {
        return new Panel('Unit Tests', [
            unitTests.length === 0
            ? new Paragraph('You have not written any unit tests yet.')
            : new UnorderedList(unitTests.map(unitTest => new ListItem(new Span(unitTest.toString())))),
        ])
    }

    public currentCandidatePanel(candidate: Candidate): Panel {
        return new Panel('Current Function', [
            new Code(candidate.toString()),
        ])
    }

    public scorePanel(score: number): Panel {
        return new Panel('Score', [
            new Paragraph(`${this.formatScore(score)}`),
        ])
    }

    public addUnitTestFormMessage(form: Form): HumanMessage {
        return new HumanMessage([
            new Paragraph('I want to add a unit test.'),
            form,
        ])
    }

    public cancelUnitTestFormMessage(): HumanMessage {
        return new HumanMessage([
            new Paragraph('I don\'t want to add a unit test now.'),
        ])
    }

    public addUnitTestTextMessage(unitTest: UnitTest): HumanMessage {
        return new HumanMessage([
            new Paragraph('I want to add the following unit test:'),
            new Paragraph(unitTest.toString()),
        ])
    }

    public hintUnitTestMessage(unitTest: UnitTest, penaltyHint: number): ComputerMessage {
        return new ComputerMessage([
            new Paragraph('A unit test that currently would fail is the following.'),
            new Paragraph(unitTest.toString()),
        ])
    }

    public noHintUnitTestMessage(penaltyHint: number): ComputerMessage {
        return new ComputerMessage([
            new Paragraph('The function is completely bug-free now!'),
            new Paragraph(`The cost for this \'hint\' is ${this.formatScore(penaltyHint)}.`),
        ])
    }

    public bugFoundMessage(testResult: TestResult, penaltyBug: number): ComputerMessage {
        return new ComputerMessage([
            new Paragraph(
                'There are still bugs in the function.'
            ),
            new Paragraph(testResult.toString()),
        ])
    }

    public endWithBugMessage(): ComputerMessage {
        return new ComputerMessage([
            new Paragraph(
                'There are still bugs in the function. ' +
                'Thanks for playing!'
            ),
        ])
    }

    public endPerfectMessage(score: number): ComputerMessage {
        return new ComputerMessage([
            new Paragraph(
                'Congratulations! ' +
                'Thanks to your unit tests, the function is completely bug-free. ' +
                'Thanks for playing!'
            ),
        ])
    }

    public endPositiveMessage(score: number): ComputerMessage {
        return this.endPerfectMessage(score)
    }

    public endNegativeMessage(score: number): ComputerMessage {
        return this.endPerfectMessage(score)
    }

    public overallUselessUnitTestMessage(): ComputerMessage {
        return new ComputerMessage([
            new Paragraph(
                'We have added the unit test. ' +
                'Try to write a unit test that fails for the current function.'
            ),
        ])
    }

    public currentlyUselessUnitTestMessage(): ComputerMessage {
        return new ComputerMessage([
            new Paragraph(
                'We have added the unit test. ' +
                'Try to write a unit test that fails for the current function.'
            ),
        ])
    }

    public usefulUnitTestMessage(): ComputerMessage {
        return new ComputerMessage([
            new Paragraph(
                'We have added the unit test.'
            ),
        ])
    }

    public incorrectUnitTestMessage(): ComputerMessage {
        return new ComputerMessage([
            new Paragraph(
                'We have checked your unit test against the specification. ' +
                'Your unit test appears to be incorrect. ' +
                'Therefore, we have NOT added the unit test to our code.'
            ),
        ])
    }

    public formatScore(score: number): string {
        return 'No score available'
    }
}

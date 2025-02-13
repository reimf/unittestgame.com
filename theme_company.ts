class Company extends Theme {
    public static readonly instance = new Company()
    public readonly description = 'I want to review the work of an external software company'

    public addUnitTestFormButtonText(): string {
        return 'Add Unit Test'
    }

    public cancelUnitTestFormButtonText(): string {
        return 'I don\'t want to add a unit test now'
    }

    public contractMessage(initialScore: number, penaltyHint: number, penaltyBug: number): ComputerMessage {
        return new ComputerMessage([
            new Paragraph(
                'You are hired to check the work of an external software company. ' +
                'They write the function and it is your task to make sure the function follows the specification. ' +
                'So you write sufficient unit tests, ' +
                'such that the function always gives a correct result. ' +
                `If you have written enough unit tests, you will earn ${this.formatScore(initialScore)}. ` +
                `However, a hint costs ${this.formatScore(penaltyHint)}. ` +
                'And if a user finds a bug in a function that passes all your unit tests, ' +
                `you will have to pay a penalty of ${this.formatScore(penaltyBug)}.`
            ),
        ])
    }

    public formUnitTestButtonText(): string {
        return 'I want to add a unit test'
    }

    public showHintButtonText(penaltyHint: number): string {
        return `I want to see a hint for a unit test (-${this.formatScore(penaltyHint)})`
    }

    public submitButtonText(penaltyBug: number): string {
        return `I want to submit the unit tests (-${this.formatScore(penaltyBug)} if incorrect)`
    }

    public endButtonText(penaltyEnd: number): string {
        return `I want to end the game (-${this.formatScore(penaltyEnd)} if incorrect)`
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
        return new Panel('Earnings', [
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
            new Paragraph(`The cost for this hint is ${this.formatScore(penaltyHint)}.`),
        ])
    }

    public noHintUnitTestMessage(penaltyHint: number): ComputerMessage {
        return new ComputerMessage([
            new Paragraph('We can\'t come up with a failing unit test.'),
            new Paragraph(`The cost for this \'hint\' is ${this.formatScore(penaltyHint)}.`),
        ])
    }

    public bugFoundMessage(testResult: TestResult, penaltyBug: number): ComputerMessage {
        return new ComputerMessage([
            new Paragraph(
                'Thank you! ' +
                'We have deployed the latest version of the function into production. ' +
                'A customer has reported a bug in the function. ' +
                'The function produced the following incorrect result.'
            ),
            new Paragraph(testResult.toString()),
            new Paragraph(`Your share of the cost to fix this is ${this.formatScore(penaltyBug)}.`),
        ])
    }

    public endWithBugMessage(): ComputerMessage {
        return new ComputerMessage([
            new Paragraph(
                'There are still bugs in the function, ' +
                'so we are not paying you anything. ' +
                'Too bad! ' +
                'We hope you do better next time. ' +
                'Thanks for playing!'
            ),
        ])
    }

    public endPerfectMessage(score: number): ComputerMessage {
        return new ComputerMessage([
            new Paragraph(
                'Congratulations! ' +
                'Thanks to your unit tests, the function is completely bug-free. ' +
                `In total, you earned the maximum of ${this.formatScore(score)}. ` +
                'Awesome! ' +
                'Thanks for playing!'
            ),
        ])
    }

    public endPositiveMessage(score: number): ComputerMessage {
        return new ComputerMessage([
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

    public endNegativeMessage(score: number): ComputerMessage {
        return new ComputerMessage([
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

    public overallUselessUnitTestMessage(): ComputerMessage {
        return new ComputerMessage([
            new Paragraph(
                'We have added the unit test. ' +
                'The unit test looks like another unit test. ' +
                'Therefore, we think the unit test is not very useful.'
            ),
        ])
    }

    public currentlyUselessUnitTestMessage(): ComputerMessage {
        return new ComputerMessage([
            new Paragraph(
                'We have added the unit test. ' +
                'The current function already passed the unit test. ' +
                'Therefore, we think the unit test is not very useful at the moment.'
            ),
        ])
    }

    public usefulUnitTestMessage(): ComputerMessage {
        return new ComputerMessage([
            new Paragraph(
                'Done.'
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
        return `${score < 0 ? '-' : ''}€${Math.abs(score) * 10}`
    }
}

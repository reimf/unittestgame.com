import Theme from './theme.js'
import { Form, Paragraph, UnorderedList, ListItem, Code, Span, Panel, ComputerMessage, HumanMessage } from './html.js'
import UnitTest from './unit_test.js'
import TestResult from './test_result.js'
import Candidate from './candidate.js'

export default class School extends Theme {
    public static readonly instance = new School()
    public readonly description = 'I want to write better unit tests for student assignments'

    public addUnitTestFormButtonText(): string {
        return 'I want to add this unit test'
    }

    public cancelUnitTestFormButtonText(): string {
        return 'I don\'t want to add a unit test now'
    }

    public contractMessage(initialScore: number, penaltyHint: number, penaltyBug: number): ComputerMessage {
        return new ComputerMessage([
            new Paragraph(
                'You must write enough unit tests for this function, ' +
                'so that students get the right feedback. ' +
                `If you have written enough unit tests, you will get ${this.formatScore(initialScore)}. ` +
                `But if you need a hint, your grade will decrease by ${this.formatScore(penaltyHint)}. ` +
                'And if a student finds an error in a function that passes all your submitted unit tests, ' +
                `your grade will decrease by ${this.formatScore(penaltyBug)}.`
            )
        ])
    }

    public unitTestsPanel(unitTests: UnitTest[]): Panel {
        return new Panel('Unit Tests', [
            unitTests.length === 0
            ? new Paragraph('You have not written any unit test yet.')
            : new UnorderedList(unitTests.map(unitTest => new ListItem(new Span(unitTest.toString())))),
        ])
    }

    public currentCandidatePanel(candidate: Candidate): Panel {
        return new Panel('Current Function', [
            new Code(candidate.toString()),
        ])
    }

    public scorePanel(score: number): Panel {
        return new Panel('Grade', [
            new Paragraph(`${this.formatScore(score)}`),
        ])
    }

    public formUnitTestButtonText(): string {
        return 'I want to add a unit test'
    }

    public showHintButtonText(penaltyHint: number): string {
        return `I want to see a hint for a unit test (-${this.formatScore(penaltyHint)})`
    }

    public submitButtonText(penaltyBug: number): string {
        return `I want to submit the unit tests (-${this.formatScore(penaltyBug)} on error)`
    }

    public endButtonText(penaltyend: number): string {
        return `I want to end the game (-${this.formatScore(penaltyend)} on error)`
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
            new Paragraph(`Your grade will decrease by ${this.formatScore(penaltyHint)}.`),
        ])
    }

    public noHintUnitTestMessage(penaltyHint: number): ComputerMessage {
        return new ComputerMessage([
            new Paragraph('Students could not find a failing unit test.'),
            new Paragraph(`The cost for this \'hint\' is ${this.formatScore(penaltyHint)}.`),
        ])
    }

    public bugFoundMessage(testResult: TestResult, penaltyBug: number): ComputerMessage {
        return new ComputerMessage([
            new Paragraph(
                'Thank you! ' +
                'We have deployed the latest version of the function to production. ' +
                'A student has reported an error in the grading of their assignment. ' +
                'Their function passed all unit tests, but it produced the following incorrect result.'
            ),
            new Paragraph(testResult.toString()),
            new Paragraph(`Your grade will decrease by ${this.formatScore(penaltyBug)} point.`),
        ])
    }

    public endWithBugMessage(): ComputerMessage {
        return new ComputerMessage([
            new Paragraph(
                'There are still clearly wrong functions that pass all your unit tests, ' +
                'so we will give you the minimum grade. ' +
                'Too bad! ' +
                'We think you will do better next time! ' +
                'Thanks for playing!'
            ),
        ])
    }

    public endPerfectMessage(score: number): ComputerMessage {
        return new ComputerMessage([
            new Paragraph(
                'Congratulations! ' +
                'The grading of the assignments is completely error-free thanks to your unit tests. ' +
                `Your final grade is a perfect ${this.formatScore(score)}. ` +
                'Amazing! ' +
                'Thanks for playing!'
            ),
        ])
    }

    public endPositiveMessage(score: number): ComputerMessage {
        return new ComputerMessage([
            new Paragraph(
                'Congratulations! ' +
                'The grading of the assignments is completely error-free thanks to your unit tests. ' +
                `Your final grade is ${this.formatScore(score)}. ` +
                'Well done! ' +
                'We think you will do even better next time. ' +
                'Thanks for playing!'
            )
        ])
    }

    public endNegativeMessage(score: number): ComputerMessage {
        return new ComputerMessage([
            new Paragraph(
                'Congratulations! ' +
                'The grading of the assignments is completely error-free thanks to your unit tests. ' +
                `Your final grade is ${this.formatScore(score)}. ` +
                'Too bad! ' +
                'We think you will do better next time! ' +
                'Thanks for playing!'
            )
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
                'Unit test added successfully.'
            ),
        ])
    }

    public incorrectUnitTestMessage(): ComputerMessage {
        return new ComputerMessage([
            new Paragraph(
                'We compared your unit test with the specification. ' +
                'Your unit test turns out to be incorrect. ' +
                'So we did not add the unit test to our code.'
            ),
        ])
    }

    public formatScore(score: number): string {
        return `${Math.round(score / 10)} points`
    }
}

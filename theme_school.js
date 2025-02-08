"use strict";
class School extends Theme {
    constructor() {
        super(...arguments);
        this.description = 'I want to write better unit tests for student assignments';
    }
    addUnitTestFormButton() {
        return 'I want to add this unit test';
    }
    cancelUnitTestFormButton() {
        return 'I don\'t want to add a unit test now';
    }
    contractMessage(initialScore, penaltyHint, penaltyBug) {
        return new Message([
            new Paragraph('You must write enough unit tests for this function, ' +
                'so that students get the right feedback. ' +
                `If you have written enough unit tests, you will get ${this.formatScore(initialScore)}. ` +
                `But if you need a hint, your grade will decrease by ${this.formatScore(penaltyHint)}. ` +
                'And if a student finds an error in a function that passes all your submitted unit tests, ' +
                `your grade will decrease by ${this.formatScore(penaltyBug)}.`)
        ]);
    }
    unitTestsPanel(unitTests) {
        return new Panel('Unit Tests', [
            unitTests.length === 0
                ? new Paragraph('You have not written any unit test yet.')
                : new UnorderedList(unitTests.map(unitTest => new ListItem(unitTest.toHtml()))),
        ]);
    }
    currentCandidatePanel(candidate) {
        return new Panel('Current Function', [
            candidate.toHtml(),
        ]);
    }
    scorePanel(score) {
        return new Panel('Grade', [
            new Paragraph(`${this.formatScore(score)}`),
        ]);
    }
    formUnitTestButton() {
        return 'I want to add a unit test';
    }
    showHintButton(penaltyHint) {
        return `I want to see a hint for a unit test (-${this.formatScore(penaltyHint)})`;
    }
    submitButton(penaltyBug) {
        return `I want to submit the unit tests (-${this.formatScore(penaltyBug)} on error)`;
    }
    endButton(penaltyend) {
        return `I want to end the game (-${this.formatScore(penaltyend)} on error)`;
    }
    addUnitTestFormMessage(form) {
        return new Message([
            new Paragraph('I want to add a unit test.'),
            form,
        ]);
    }
    cancelUnitTestFormMessage() {
        return new Message([
            new Paragraph('I don\'t want to add a unit test now.'),
        ]);
    }
    addUnitTestTextMessage(unitTest) {
        return new Message([
            new Paragraph('I want to add the following unit test:'),
            unitTest.toHtml(),
        ]);
    }
    hintUnitTestMessage(unitTest, penaltyHint) {
        return new Message([
            new Paragraph('A unit test that currently would fail is the following.'),
            unitTest.toHtml(),
            new Paragraph(`Your grade will decrease by ${this.formatScore(penaltyHint)}.`),
        ]);
    }
    bugFoundMessage(testResult, penaltyBug) {
        return new Message([
            new Paragraph('Thank you! ' +
                'We have deployed the latest version of the function to production. ' +
                'A student has reported an error in the grading of their assignment. ' +
                'Their function passed all unit tests, but it produced the following incorrect result.'),
            testResult.toHtml(),
            new Paragraph(`Your grade will decrease by ${this.formatScore(penaltyBug)} point.`),
        ]);
    }
    endWithBugMessage() {
        return new Message([
            new Paragraph('There are still clearly wrong functions that pass all your unit tests, ' +
                'so we will give you the minimum grade. ' +
                'Too bad! ' +
                'We think you will do better next time! ' +
                'Thanks for playing!'),
        ]);
    }
    endPerfectMessage(score) {
        return new Message([
            new Paragraph('Congratulations! ' +
                'The grading of the assignments is completely error-free thanks to your unit tests. ' +
                `Your final grade is a perfect ${this.formatScore(score)}. ` +
                'Amazing! ' +
                'Thanks for playing!'),
        ]);
    }
    endPositiveMessage(score) {
        return new Message([
            new Paragraph('Congratulations! ' +
                'The grading of the assignments is completely error-free thanks to your unit tests. ' +
                `Your final grade is ${this.formatScore(score)}. ` +
                'Well done! ' +
                'We think you will do even better next time. ' +
                'Thanks for playing!')
        ]);
    }
    endNegativeMessage(score) {
        return new Message([
            new Paragraph('Congratulations! ' +
                'The grading of the assignments is completely error-free thanks to your unit tests. ' +
                `Your final grade is ${this.formatScore(score)}. ` +
                'Too bad! ' +
                'We think you will do better next time! ' +
                'Thanks for playing!')
        ]);
    }
    overallUselessUnitTestMessage() {
        return new Message([
            new Paragraph('We have added the unit test. ' +
                'The unit test looks like another unit test. ' +
                'Therefore, we think the unit test is not very useful.'),
        ]);
    }
    currentlyUselessUnitTestMessage() {
        return new Message([
            new Paragraph('We have added the unit test. ' +
                'The current function already passed the unit test. ' +
                'Therefore, we think the unit test is not very useful at the moment.'),
        ]);
    }
    usefulUnitTestMessage() {
        return new Message([
            new Paragraph('Unit test added successfully.'),
        ]);
    }
    incorrectUnitTestMessage() {
        return new Message([
            new Paragraph('We compared your unit test with the specification. ' +
                'Your unit test turns out to be incorrect. ' +
                'So we did not add the unit test to our code.'),
        ]);
    }
    formatScore(score) {
        return `${Math.round(score / 10)} points`;
    }
}
School.instance = new School();

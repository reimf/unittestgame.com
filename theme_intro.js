"use strict";
class Intro extends Theme {
    constructor() {
        super(...arguments);
        this.description = 'I want to have a nice introduction into this game';
    }
    addUnitTestFormButton() {
        return 'I want to add this unit test';
    }
    cancelUnitTestFormButton() {
        return 'I don\'t want to add a unit test now';
    }
    contractMessage(initialScore, penaltyHint, penaltyBug) {
        return new Message([
            new Paragraph('It is your task to write unit tests for this function. ' +
                'A unit test consists of the argument for the function and the expected result. ' +
                'After adding a unit test, check the current function to see if the function has improved. ' +
                'Keep adding unit tests until the function works as specified, ' +
                'then submit your unit tests.'),
        ]);
    }
    formUnitTestButton() {
        return 'I want to add a unit test';
    }
    showHintButton(penaltyHint) {
        return `I want to see a hint for a unit test`;
    }
    submitButton(penaltyBug) {
        return `I want to submit the unit tests`;
    }
    endButton(penaltyEnd) {
        return `I want to end the game`;
    }
    unitTestsPanel(unitTests) {
        return new Panel('Unit Tests', [
            unitTests.length === 0
                ? new Paragraph('You have not written any unit tests yet.')
                : new UnorderedList(unitTests.map(unitTest => new ListItem(unitTest.toHtml()))),
        ]);
    }
    currentCandidatePanel(candidate) {
        return new Panel('Current Function', [
            candidate.toHtml(),
        ]);
    }
    scorePanel(score) {
        return new Panel('Score', [
            new Paragraph(`${this.formatScore(score)}`),
        ]);
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
        ]);
    }
    bugFoundMessage(testResult, penaltyBug) {
        return new Message([
            new Paragraph('There are still bugs in the function.'),
            testResult.toHtml(),
        ]);
    }
    endWithBugMessage() {
        return new Message([
            new Paragraph('There are still bugs in the function. ' +
                'Thanks for playing!'),
        ]);
    }
    endPerfectMessage(score) {
        return new Message([
            new Paragraph('Congratulations! ' +
                'Thanks to your unit tests, the function is completely bug-free. ' +
                'Thanks for playing!'),
        ]);
    }
    endPositiveMessage(score) {
        return this.endPerfectMessage(score);
    }
    endNegativeMessage(score) {
        return this.endPerfectMessage(score);
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
            new Paragraph('Done.'),
        ]);
    }
    incorrectUnitTestMessage() {
        return new Message([
            new Paragraph('We have checked your unit test against the specification. ' +
                'Your unit test appears to be incorrect. ' +
                'Therefore, we have NOT added the unit test to our code.'),
        ]);
    }
    formatScore(score) {
        return 'No score available';
    }
}
Intro.instance = new Intro();

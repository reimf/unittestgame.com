"use strict";
class Intro extends Theme {
    constructor() {
        super(...arguments);
        this.description = 'I want to have a nice introduction into this game.';
    }
    addUnitTestFormButton() {
        return 'Add unit test';
    }
    cancelUnitTestFormButton() {
        return 'Cancel';
    }
    contractMessage(initialScore, penaltyHint, penaltyBug) {
        return new Section([
            new Paragraph('It is your task to write unit tests for this function. ' +
                'A unit test consists of a list of arguments for the function and the expected result. ' +
                'After adding a unit test, check the current function to see if the function is correct. ' +
                'Keep adding unit tests until the function works as specified, ' +
                'then submit your unit tests.'),
        ]);
    }
    formUnitTestButton() {
        return 'I want to add a unit test.';
    }
    showHintButton(penaltyHint) {
        return `I want to see a hint for a unit test.`;
    }
    submitButton(penaltyBug) {
        return `I want to submit the unit tests.`;
    }
    endButton(penaltyEnd) {
        return `I want to end the game.`;
    }
    showHintMessage() {
        return new Section([
            new Paragraph('I want to see a hint for a unit test.'),
        ]);
    }
    submitMessage() {
        return new Section([
            new Paragraph('I want to submit the unit tests.'),
        ]);
    }
    endMessage() {
        return new Section([
            new Paragraph('I want to end the game.'),
        ]);
    }
    unitTestsPanel(unitTests) {
        const list = unitTests.length === 0
            ? [new Paragraph('You have not written any unit tests yet.')]
            : unitTests.map(unitTest => unitTest.toHtml());
        return new Section([
            new Header('Unit Tests'),
            ...list,
        ]);
    }
    currentCandidatePanel(candidate) {
        return new Section([
            new Header('Current Function'),
            candidate.toHtml(),
        ]);
    }
    scorePanel(score) {
        return new Section([]);
    }
    addUnitTestFormMessage(form) {
        return new Section([
            new Paragraph('I want to add a unit test.'),
            form,
        ]);
    }
    cancelUnitTestFormMessage() {
        return new Section([
            new Paragraph('I don\'t want to add a unit test now.'),
        ]);
    }
    addUnitTestTextMessage(unitTest) {
        return new Section([
            new Paragraph('I want to add the following unit test:'),
            unitTest.toHtml(),
        ]);
    }
    hintUnitTestMessage(unitTest, penaltyHint) {
        return new Section([
            new Paragraph('A unit test that currently fails is the following.'),
            unitTest.toHtml(),
        ]);
    }
    bugFoundMessage(testResult, penaltyBug) {
        return new Section([
            new Paragraph('There are still bugs in the function.'),
            testResult.toHtml(),
        ]);
    }
    endWithBugMessage() {
        return new Section([
            new Paragraph('There are still bugs in the function. ' +
                'Thanks for playing!'),
        ]);
    }
    endPerfectMessage(score) {
        return new Section([
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
        return new Section([
            new Paragraph('We have added the unit test. ' +
                'The unit test looks like another unit test. ' +
                'Therefore, we think the unit test is not very useful.'),
        ]);
    }
    currentlyUselessUnitTestMessage() {
        return new Section([
            new Paragraph('We have added the unit test. ' +
                'The current function already passed the unit test. ' +
                'Therefore, we think the unit test is not very useful at the moment.'),
        ]);
    }
    usefulUnitTestMessage() {
        return new Section([
            new Paragraph('Done.'),
        ]);
    }
    incorrectUnitTestMessage() {
        return new Section([
            new Paragraph('We have checked your unit test against the specification. ' +
                'Your unit test appears to be incorrect. ' +
                'Therefore, we have not added the unit test to our code.'),
        ]);
    }
    formatScore(score) {
        return '';
    }
}
Intro.instance = new Intro();

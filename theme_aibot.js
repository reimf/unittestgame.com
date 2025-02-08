"use strict";
class AIBot extends Theme {
    constructor() {
        super(...arguments);
        this.description = 'I want to ensure an AI-bot functions correctly';
    }
    addUnitTestFormButton() {
        return 'I want to add this unit test';
    }
    cancelUnitTestFormButton() {
        return 'I don\'t want to add a unit test now';
    }
    contractMessage(initialScore, penaltyHint, penaltyBug) {
        return new Message([
            new Paragraph('Your boss wants you to work with an AI-bot as co-developer. ' +
                'The AI-bot writes a function and you will write unit tests for it to prevent the AI-bot from hallucinating. ' +
                `If you write enough unit tests, you will earn ${this.formatScore(initialScore)}. ` +
                `However, a hint costs ${this.formatScore(penaltyHint)}. ` +
                'And if the AI-bot produces a function that passes all submitted unit tests but is incorrect, ' +
                `it will cost you ${this.formatScore(penaltyBug)}.`),
        ]);
    }
    formUnitTestButton() {
        return 'I want to add a unit test';
    }
    showHintButton(penaltyHint) {
        return `I want to see a hint for a unit test (-${this.formatScore(penaltyHint)})`;
    }
    submitButton(penaltyBug) {
        return `I want to submit the unit tests (-${this.formatScore(penaltyBug)} if incorrect)`;
    }
    endButton(penaltyEnd) {
        return `I want to finalize testing (-${this.formatScore(penaltyEnd)} if incorrect)`;
    }
    unitTestsPanel(unitTests) {
        return new Panel('Unit Tests', [
            unitTests.length === 0
                ? new Paragraph('You have not written any unit tests yet.')
                : new UnorderedList(unitTests.map(unitTest => new ListItem(unitTest.toHtml()))),
        ]);
    }
    currentCandidatePanel(candidate) {
        return new Panel('Current AI Functionality', [
            candidate.toHtml(),
        ]);
    }
    scorePanel(score) {
        return new Panel('Your Performance Score', [
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
            new Paragraph(`The cost for this hint is ${this.formatScore(penaltyHint)}.`),
        ]);
    }
    bugFoundMessage(testResult, penaltyBug) {
        return new Message([
            new Paragraph('Warning! ' +
                'The AI-bot has encountered an unexpected issue in production. ' +
                'The following incorrect output was generated:'),
            testResult.toHtml(),
            new Paragraph(`Your penalty for missing this issue is ${this.formatScore(penaltyBug)}.`),
        ]);
    }
    endWithBugMessage() {
        return new Message([
            new Paragraph('There are still critical issues in the AI-bot, ' +
                'so you receive no reward. ' +
                'Better luck next time! ' +
                'Thanks for testing!'),
        ]);
    }
    endPerfectMessage(score) {
        return new Message([
            new Paragraph('Fantastic! ' +
                'Thanks to your thorough testing, the AI-bot is fully functional. ' +
                `You achieved the maximum score of ${this.formatScore(score)}. ` +
                'Well done! ' +
                'Thanks for testing!'),
        ]);
    }
    endPositiveMessage(score) {
        return new Message([
            new Paragraph('Great job! ' +
                'Your testing has ensured the AI-bot runs smoothly. ' +
                `Your final score is ${this.formatScore(score)}. ` +
                'Keep up the good work! ' +
                'Thanks for testing!'),
        ]);
    }
    endNegativeMessage(score) {
        return new Message([
            new Paragraph('Unfortunately, your testing did not fully validate the AI-bot. ' +
                `Your final score is ${this.formatScore(score)}. ` +
                'Try again next time! ' +
                'Thanks for testing!'),
        ]);
    }
    overallUselessUnitTestMessage() {
        return new Message([
            new Paragraph('The unit test was added, but it looks like another unit test. ' +
                'This test may not provide much additional value.'),
        ]);
    }
    currentlyUselessUnitTestMessage() {
        return new Message([
            new Paragraph('The unit test was added, but the AI-bot already passed it. ' +
                'This test may not provide much additional value at the moment.'),
        ]);
    }
    usefulUnitTestMessage() {
        return new Message([
            new Paragraph('The unit test has been successfully added.'),
        ]);
    }
    incorrectUnitTestMessage() {
        return new Message([
            new Paragraph('We checked your unit test against the expected behavior. ' +
                'Your test appears to be incorrect, so it has not been included in the evaluation.'),
        ]);
    }
    formatScore(score) {
        return `${score}%`;
    }
}
AIBot.instance = new AIBot();

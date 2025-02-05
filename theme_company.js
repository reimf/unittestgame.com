"use strict";
class Company extends Theme {
    constructor() {
        super(...arguments);
        this.description = 'I want to review the work of an external software company.';
    }
    addUnitTestFormButton() {
        return 'Add Unit Test';
    }
    cancelUnitTestFormButton() {
        return 'Cancel';
    }
    contractMessage(initialScore, penaltyHint, penaltyBug) {
        return new Section([
            new Paragraph('You are hired to check the work of an external software company. ' +
                'They write the function and it is your task to make sure the function follows the specification. ' +
                'So you write sufficient unit tests, ' +
                'such that the function always gives a correct result. ' +
                `If you have written enough unit tests, you will earn ${this.formatScore(initialScore)}. ` +
                `However, a hint costs ${this.formatScore(penaltyHint)}. ` +
                'And if a user finds a bug in a function that passes all your unit tests, ' +
                `you will have to pay a penalty of ${this.formatScore(penaltyBug)}.`),
        ]);
    }
    formUnitTestButton() {
        return 'I want to add a unit test.';
    }
    showHintButton(penaltyHint) {
        return `I want to see a hint for a unit test (-${this.formatScore(penaltyHint)}).`;
    }
    submitButton(penaltyBug) {
        return `I want to submit the unit tests (-${this.formatScore(penaltyBug)} if incorrect).`;
    }
    endButton(penaltyEnd) {
        return `I want to end the game (-${this.formatScore(penaltyEnd)} if incorrect).`;
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
        return new Section([
            new Header('Earnings'),
            new Paragraph(`${this.formatScore(score)}`),
        ]);
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
            new Paragraph(`The cost for this hint is ${this.formatScore(penaltyHint)}.`),
        ]);
    }
    bugFoundMessage(testResult, penaltyBug) {
        return new Section([
            new Paragraph('Thank you! ' +
                'We have deployed the latest version of the function into production. ' +
                'A customer has reported a bug in the function. ' +
                'The function produced the following incorrect result.'),
            testResult.toHtml(),
            new Paragraph(`Your share of the cost to fix this is ${this.formatScore(penaltyBug)}.`),
        ]);
    }
    endWithBugMessage() {
        return new Section([
            new Paragraph('There are still bugs in the function, ' +
                'so we are not paying you anything. ' +
                'Too bad! ' +
                'We hope you do better next time. ' +
                'Thanks for playing!'),
        ]);
    }
    endPerfectMessage(score) {
        return new Section([
            new Paragraph('Congratulations! ' +
                'Thanks to your unit tests, the function is completely bug-free. ' +
                `In total, you earned the maximum of ${this.formatScore(score)}. ` +
                'Awesome! ' +
                'Thanks for playing!'),
        ]);
    }
    endPositiveMessage(score) {
        return new Section([
            new Paragraph('Congratulations! ' +
                'Thanks to your unit tests, the function is completely bug-free. ' +
                `In total, you earned ${this.formatScore(score)}. ` +
                'Well done! ' +
                'We think you’ll do even better next time. ' +
                'Thanks for playing!'),
        ]);
    }
    endNegativeMessage(score) {
        return new Section([
            new Paragraph('Congratulations! ' +
                'Thanks to your unit tests, the function is completely bug-free. ' +
                `In total, you lost ${this.formatScore(score)}. ` +
                'Too bad! ' +
                'We hope you do better next time. ' +
                'Thanks for playing!'),
        ]);
    }
    uselessUnitTestMessage() {
        return new Section([
            new Paragraph('We have added the unit test. ' +
                'The current function already passed the unit test. ' +
                'Therefore, we think the unit test is not very useful.'),
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
        return `${score < 0 ? '-' : ''}€${Math.abs(score) * 10}`;
    }
}
Company.instance = new Company();

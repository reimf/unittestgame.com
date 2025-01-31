"use strict";
class Basecamp extends Game {
    constructor() {
        super();
    }
    theme() {
        return 'Write better autotests for CodeGrade';
    }
    choiceLabel() {
        return 'Choice';
    }
    buttonText() {
        return 'Go!';
    }
    unitTestsPanel(unitTests) {
        const list = unitTests.length === 0
            ? [new Paragraph('You have not written any autotest yet.')]
            : unitTests.map(unitTest => unitTest.toHtml());
        return new Section([
            new Header('Autotests'),
            ...list,
        ]);
    }
    currentCandidatePanel(candidate) {
        return new Section([
            new Header('Current function'),
            candidate.toHtml(),
        ]);
    }
    scorePanel(score) {
        return new Section([
            new Header('Grade so far'),
            new Paragraph(`${this.formatScore(score)}`),
        ]);
    }
    addUnitTestOption() {
        return 'I want to add an autotest';
    }
    seeHintOption(penaltyHint) {
        return `I want to see a hint for an autotest (-${this.formatScore(penaltyHint)})`;
    }
    submitOption(penaltyBug) {
        return `I want to submit the autotests (-${this.formatScore(penaltyBug)} on error)`;
    }
    endOption(penaltyend) {
        return `I want to end the game (-${this.formatScore(penaltyend)} on error)`;
    }
    menuMessage(form) {
        return new Section([
            form.toHtml(),
        ]);
    }
    addUnitTestFormMessage(form) {
        return new Section([
            new Paragraph('I want to add an autotest.'),
            form.toHtml(),
        ]);
    }
    addUnitTestTextMessage(unitTest) {
        return new Section([
            new Paragraph('I want to add the following autotest:'),
            unitTest.toHtml(),
        ]);
    }
    seeHintMessage() {
        return new Section([
            new Paragraph('I want to see a hint for an autotest.'),
        ]);
    }
    submitMessage() {
        return new Section([
            new Paragraph('I want to submit the autotests.'),
        ]);
    }
    optionEndMessage() {
        return new Section([
            new Paragraph('I want to end the game.'),
        ]);
    }
    hintUnitTestMessage(unitTest, penaltyHint) {
        return new Section([
            new Paragraph('An autotest that currently fails could be the following.'),
            unitTest.toHtml(),
            new Paragraph(`Your grade will decrease by ${this.formatScore(penaltyHint)}.`),
        ]);
    }
    bugFoundMessage(testResult, penaltyBug) {
        return new Section([
            new Paragraph('Thank you! ' +
                'We have deployed the latest version of the function to production. ' +
                'A student has reported an error in CodeGrade. ' +
                'Their function passed all autotests, but it produced the following incorrect result.'),
            testResult.toHtml(),
            new Paragraph(`Your grade will decrease by ${this.formatScore(penaltyBug)} point.`),
        ]);
    }
    endWithBugMessage() {
        return new Section([
            new Paragraph('There are still clearly wrong functions that pass all your autotests, ' +
                'so we will give you the minimum grade. ' +
                'Too bad! ' +
                'We think you will do better next time! ' +
                'Thanks for playing!'),
        ]);
    }
    endPerfectMessage(score) {
        return new Section([
            new Paragraph('Congratulations! ' +
                'CodeGrade is completely error-free thanks to your autotests. ' +
                `Your final grade is a perfect ${this.formatScore(score)}. ` +
                'Amazing! ' +
                'Thanks for playing!'),
        ]);
    }
    endPositiveMessage(score) {
        return new Section([
            new Paragraph('Congratulations! ' +
                'CodeGrade is completely error-free thanks to your autotests. ' +
                `Your final grade is ${this.formatScore(score)}. ` +
                'Well done! ' +
                'We think you will do even better next time. ' +
                'Thanks for playing!')
        ]);
    }
    endNegativeMessage(score) {
        return new Section([
            new Paragraph('Congratulations! ' +
                'CodeGrade is completely error-free thanks to your autotests. ' +
                `Your final grade is ${this.formatScore(score)}. ` +
                'Too bad! ' +
                'We think you will do better next time! ' +
                'Thanks for playing!')
        ]);
    }
    uselessUnitTestMessage() {
        return new Section([
            new Paragraph('We have added this autotest. ' +
                'The current function already passed this autotest. ' +
                'Therefore, we think this autotest is not very useful.'),
        ]);
    }
    usefulUnitTestMessage() {
        return new Section([
            new Paragraph('Autotest added successfully.'),
        ]);
    }
    incorrectUnitTestMessage() {
        return new Section([
            new Paragraph('We compared your autotest with the specification. ' +
                'Your autotest turns out to be incorrect. ' +
                'So we did not add the autotest to our code.'),
        ]);
    }
    formatScore(score) {
        return `${Math.round(score / 10)} points`;
    }
}

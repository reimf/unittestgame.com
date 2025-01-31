"use strict";
class Basecamp extends Game {
    constructor() {
        super();
    }
    language() {
        return 'Basecamp';
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
    menuMessage(penaltyhint, penaltybug, penaltyend, form) {
        return new Section([
            new Paragraph('I want to…'),
            new Paragraph('[1] …see the contract'),
            new Paragraph('[2] …see the problem description'),
            new Paragraph('[3] …add an autotest'),
            new Paragraph(`[4] …see a hint for an autotest (-${this.formatScore(penaltyhint)})`),
            new Paragraph(`[5] …submit the autotests (-${this.formatScore(penaltybug)} if student reports an error)`),
            new Paragraph(`[0] …end the game (-${this.formatScore(penaltyend)} if student reports an error)`),
            form.toHtml(),
        ]);
    }
    optionSeeContractMessage() {
        return new Section([
            new Paragraph('I want to see the contract.'),
        ]);
    }
    contractMessage(initialscore, penaltybug) {
        return new Section([
            new Paragraph('We have to make sure students write functions that are correct. ' +
                'Your task is to write enough autotests for these functions, ' +
                'so that students get the right feedback. ' +
                'You will receive a grade when you are done writing autotests. ' +
                `If you have written enough autotests, you will get ${this.formatScore(initialscore)}. ` +
                'The menu specifies for some actions how much your grade will decrease. ' +
                'For example, if a student finds an error in a function that passes all your autotests, ' +
                `your grade will decrease by ${this.formatScore(penaltybug)}.`)
        ]);
    }
    optionSeeProblemDescriptionMessage() {
        return new Section([
            new Paragraph('I want to see the problem description.'),
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
    optionSeeHintMessage() {
        return new Section([
            new Paragraph('I want to see a hint for an autotest.'),
        ]);
    }
    optionSubmitMessage() {
        return new Section([
            new Paragraph('I want to submit the autotests.'),
        ]);
    }
    optionEndMessage() {
        return new Section([
            new Paragraph('I want to end the game.'),
        ]);
    }
    hintUnitTestMessage(unitTest, penaltyhint) {
        return new Section([
            new Paragraph('An autotest that currently fails could be the following.'),
            unitTest.toHtml(),
            new Paragraph(`Your grade will decrease by ${this.formatScore(penaltyhint)}.`),
        ]);
    }
    bugFoundMessage(testResult, penaltybug) {
        return new Section([
            new Paragraph('Thank you! ' +
                'We have deployed the latest version of the function to production. ' +
                'A student has reported an error in CodeGrade. ' +
                'Their function passed all autotests, but it produced the following incorrect result.'),
            testResult.toHtml(),
            new Paragraph(`Your grade will decrease by ${this.formatScore(penaltybug)} point.`),
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

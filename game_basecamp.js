"use strict";
class Basecamp extends Game {
    constructor() {
        super();
    }
    language() {
        return 'Basecamp';
    }
    menuTemplate(penaltyhint, penaltybug, penaltyend, form) {
        return new Template([
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
    option1Template() {
        return new Template([
            new Paragraph('I want to see the contract.'),
        ]);
    }
    option2Template() {
        return new Template([
            new Paragraph('I want to see the problem description.'),
        ]);
    }
    option4Template() {
        return new Template([
            new Paragraph('I want to see a hint for an autotest.'),
        ]);
    }
    option5Template() {
        return new Template([
            new Paragraph('I want to submit the autotests.'),
        ]);
    }
    option0Template() {
        return new Template([
            new Paragraph('I want to end the game.'),
        ]);
    }
    choiceLabel() {
        return 'Choice';
    }
    noUnitTestsTemplate() {
        return new Template([
            new Header('Autotests'),
            new Paragraph('You have not written any autotest yet.'),
        ]);
    }
    unitTestsTemplate(unitTests) {
        return new Template([
            new Header('Autotests'),
            ...unitTests.map(unitTest => unitTest.toHtml()),
        ]);
    }
    currentCandidateTemplate(candidate) {
        return new Template([
            new Header('Current function'),
            candidate.toHtml(),
        ]);
    }
    scoreTemplate(score) {
        return new Template([
            new Header('Grade so far'),
            new Paragraph(`${this.formatScore(score)}`),
        ]);
    }
    contractTemplate(initialscore, penaltybug) {
        return new Template([
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
    addUnitTestFormTemplate(form) {
        return new Template([
            new Paragraph('I want to add an autotest.'),
            form.toHtml(),
        ]);
    }
    addUnitTestTextTemplate(unitTest) {
        return new Template([
            new Paragraph('I want to add the following autotest:'),
            unitTest.toHtml(),
        ]);
    }
    hintUnitTestTemplate(unitTest, penaltyhint) {
        return new Template([
            new Paragraph('An autotest that currently fails could be the following.'),
            unitTest.toHtml(),
            new Paragraph(`Your grade will decrease by ${this.formatScore(penaltyhint)}.`),
        ]);
    }
    bugFoundTemplate(testResult, penaltybug) {
        return new Template([
            new Paragraph('Thank you! ' +
                'We have deployed the latest version of the function to production. ' +
                'A student has reported an error in CodeGrade. ' +
                'Their function passed all autotests, but it produced the following incorrect result.'),
            testResult.toHtml(),
            new Paragraph(`Your grade will decrease by ${this.formatScore(penaltybug)} point.`),
        ]);
    }
    endWithBugTemplate() {
        return new Template([
            new Paragraph('There are still clearly wrong functions that pass all your autotests, ' +
                'so we will give you the minimum grade. ' +
                'Too bad! ' +
                'We think you will do better next time! ' +
                'Thanks for playing!'),
        ]);
    }
    endPerfectTemplate(score) {
        return new Template([
            new Paragraph('Congratulations! ' +
                'CodeGrade is completely error-free thanks to your autotests. ' +
                `Your final grade is a perfect ${this.formatScore(score)}. ` +
                'Amazing! ' +
                'Thanks for playing!'),
        ]);
    }
    endPositiveTemplate(score) {
        return new Template([
            new Paragraph('Congratulations! ' +
                'CodeGrade is completely error-free thanks to your autotests. ' +
                `Your final grade is ${this.formatScore(score)}. ` +
                'Well done! ' +
                'We think you will do even better next time. ' +
                'Thanks for playing!')
        ]);
    }
    endNegativeTemplate(score) {
        return new Template([
            new Paragraph('Congratulations! ' +
                'CodeGrade is completely error-free thanks to your autotests. ' +
                `Your final grade is ${this.formatScore(score)}. ` +
                'Too bad! ' +
                'We think you will do better next time! ' +
                'Thanks for playing!')
        ]);
    }
    uselessUnitTestTemplate() {
        return new Template([
            new Paragraph('We have added this autotest. ' +
                'Your autotest seems very similar to a previous autotest. ' +
                'Therefore, we think this autotest is not very useful.'),
        ]);
    }
    usefulUnitTestTemplate() {
        return new Template([
            new Paragraph('We have added this autotest. ' +
                'There were students who\'s function did not follow the specification. ' +
                'They improved the function, and it should now be better.'),
        ]);
    }
    incorrectUnitTestTemplate() {
        return new Template([
            new Paragraph('We compared your autotest with the specification. ' +
                'Your autotest turns out to be incorrect. ' +
                'So we did not add the autotest to our code.'),
        ]);
    }
    formatScore(score) {
        return `${Math.round(score / 10)} points`;
    }
}

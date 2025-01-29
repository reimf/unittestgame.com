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
            'Menu\n',
            '[1] I want to see the contract\n' +
                '[2] I want to see the problem description\n' +
                '[3] I want to add an autotest\n' +
                `[4] I want to see a hint for an autotest (-${this.formatScore(penaltyhint)})\n` +
                `[5] I want to submit the autotests (-${this.formatScore(penaltybug)} if student reports an error)\n` +
                `[0] I want to end the game (-${this.formatScore(penaltyend)} if student reports an error)\n`,
            form,
        ]);
    }
    option1Template() {
        return new Template([
            'Option 1\n',
            'I want to see the contract.'
        ]);
    }
    option2Template() {
        return new Template([
            'Option 2\n',
            'I want to see the problem description.'
        ]);
    }
    option4Template() {
        return new Template([
            'Option 4\n',
            'I want to see a hint for an autotest.'
        ]);
    }
    option5Template() {
        return new Template([
            'Option 5\n',
            'I want to submit the autotests.'
        ]);
    }
    option0Template() {
        return new Template([
            'Option 0\n',
            'I want to end the game.'
        ]);
    }
    choiceLabel() {
        return 'Choice';
    }
    noUnitTestsTemplate() {
        return new Template([
            'Autotests\n',
            'You have not written any autotest yet.',
        ]);
    }
    unitTestsTemplate(unitTests) {
        return new Template([
            'Autotests\n',
            ...unitTests
        ]);
    }
    currentCandidateTemplate(candidate) {
        return new Template([
            'Current function\n',
            candidate,
        ]);
    }
    scoreTemplate(score) {
        return new Template([
            'Grade so far\n',
            `${this.formatScore(score)}`,
        ]);
    }
    contractTemplate(initialscore, penaltybug) {
        return new Template([
            'Contract\n',
            'We have to make sure students write functions that are correct.',
            'Your task is to write enough autotests for these functions,',
            'so that students get the right feedback.',
            'You will receive a grade when you are done writing autotests.',
            `If you have written enough autotests, you will get ${this.formatScore(initialscore)}.`,
            'The menu specifies for some actions how much your grade will decrease.',
            'For example, if a student finds an error in a function that passes all your autotests,',
            `your grade will decrease by ${this.formatScore(penaltybug)}.`,
        ]);
    }
    addUnitTestTemplate(form) {
        return new Template([
            'Add autotest\n',
            'I want to add an autotest.',
            form
        ]);
    }
    hintUnitTestTemplate(unitTest, penaltyhint) {
        return new Template([
            'Hint for autotest\n',
            'An autotest that currently fails could be the following.',
            unitTest,
            `Your grade will decrease by ${this.formatScore(penaltyhint)}.`,
        ]);
    }
    bugFoundTemplate(testResult, penaltybug) {
        return new Template([
            'Submit autotests\n',
            'Thank you!',
            'We have deployed the latest version of the function to production.',
            'A student has reported an error in CodeGrade.',
            'Their function passed all autotests, but it produced the following incorrect result.',
            testResult,
            `Your grade will decrease by ${this.formatScore(penaltybug)} point.`,
        ]);
    }
    endWithBugTemplate() {
        return new Template([
            'End\n',
            'There are still clearly wrong functions that pass all your autotests,',
            'so we will give you the minimum grade.',
            'Too bad!',
            'We think you will do better next time!',
            'Thanks for playing!',
        ]);
    }
    endPerfectTemplate(score) {
        return new Template([
            'End\n',
            'Congratulations!',
            'CodeGrade is completely error-free thanks to your autotests.',
            `Your final grade is a perfect ${this.formatScore(score)}.`,
            'Amazing!',
            'Thanks for playing!',
        ]);
    }
    endPositiveTemplate(score) {
        return new Template([
            'End\n',
            'Congratulations!',
            'CodeGrade is completely error-free thanks to your autotests.',
            `Your final grade is ${this.formatScore(score)}.`,
            'Well done!',
            'We think you will do even better next time.',
            'Thanks for playing!',
        ]);
    }
    endNegativeTemplate(score) {
        return new Template([
            'End\n',
            'Congratulations!',
            'CodeGrade is completely error-free thanks to your autotests.',
            `Your final grade is ${this.formatScore(score)}.`,
            'Too bad!',
            'We think you will do better next time!',
            'Thanks for playing!',
        ]);
    }
    uselessUnitTestTemplate() {
        return new Template([
            'Autotest added\n',
            'We have added this autotest.',
            'Your autotest seems very similar to a previous autotest.',
            'Therefore, we think this autotest is not very useful.',
        ]);
    }
    usefulUnitTestTemplate() {
        return new Template([
            'Autotest added\n',
            'We have added this autotest.',
            'There were students who\'s function did not follow the specification.',
            'They improved the function, and it should now be better.',
        ]);
    }
    incorrectUnitTestTemplate() {
        return new Template([
            'Autotest NOT added\n',
            'We compared your autotest with the specification.',
            'Your autotest turns out to be incorrect.',
            'So we did not add the autotest to our code.',
        ]);
    }
    formatScore(score) {
        return `${Math.round(score / 10)} points`;
    }
}

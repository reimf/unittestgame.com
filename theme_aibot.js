"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _a, _AIBot_instance;
class AIBot extends Theme {
    constructor() {
        super();
    }
    static instance() {
        if (!__classPrivateFieldGet(_a, _a, "f", _AIBot_instance))
            __classPrivateFieldSet(_a, _a, new _a(), "f", _AIBot_instance);
        return __classPrivateFieldGet(_a, _a, "f", _AIBot_instance);
    }
    description() {
        return 'I want to ensure an AI-bot functions correctly by testing it.';
    }
    choiceLabel() {
        return 'Choice';
    }
    buttonText() {
        return 'Execute!';
    }
    contractMessage(initialScore, penaltyHint, penaltyBug) {
        return new Section([
            new Paragraph(`If you write enough unit tests, you will earn ${this.formatScore(initialScore)}. ` +
                `However, a hint costs ${this.formatScore(penaltyHint)}. ` +
                'And if the AI-bot produces an error that passes all submitted unit tests, ' +
                `you will incur a penalty of ${this.formatScore(penaltyBug)}.`),
        ]);
    }
    addUnitTestButton() {
        return 'I want to add a unit test.';
    }
    seeHintButton(penaltyHint) {
        return `I want to see a hint for a unit test (-${this.formatScore(penaltyHint)}).`;
    }
    submitButton(penaltyBug) {
        return `I want to submit the unit tests (-${this.formatScore(penaltyBug)} if incorrect).`;
    }
    endButton(penaltyEnd) {
        return `I want to finalize testing (-${this.formatScore(penaltyEnd)} if incorrect).`;
    }
    seeHintMessage() {
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
            new Paragraph('I want to finalize testing.'),
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
            new Header('Current AI Functionality'),
            candidate.toHtml(),
        ]);
    }
    scorePanel(score) {
        return new Section([
            new Header('Performance Score'),
            new Paragraph(`${this.formatScore(score)}`),
        ]);
    }
    addUnitTestFormMessage(form) {
        return new Section([
            new Paragraph('I want to add a unit test.'),
            form,
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
            new Paragraph('Warning! ' +
                'The AI-bot has encountered an unexpected issue in production. ' +
                'The following incorrect output was generated:'),
            testResult.toHtml(),
            new Paragraph(`Your penalty for missing this issue is ${this.formatScore(penaltyBug)}.`),
        ]);
    }
    endWithBugMessage() {
        return new Section([
            new Paragraph('There are still critical issues in the AI-bot, ' +
                'so you receive no reward. ' +
                'Better luck next time! ' +
                'Thanks for testing!'),
        ]);
    }
    endPerfectMessage(score) {
        return new Section([
            new Paragraph('Fantastic! ' +
                'Thanks to your thorough testing, the AI-bot is fully functional. ' +
                `You achieved the maximum score of ${this.formatScore(score)}. ` +
                'Well done! ' +
                'Thanks for testing!'),
        ]);
    }
    endPositiveMessage(score) {
        return new Section([
            new Paragraph('Great job! ' +
                'Your testing has ensured the AI-bot runs smoothly. ' +
                `Your final score is ${this.formatScore(score)}. ` +
                'Keep up the good work! ' +
                'Thanks for testing!'),
        ]);
    }
    endNegativeMessage(score) {
        return new Section([
            new Paragraph('Unfortunately, your testing did not fully validate the AI-bot. ' +
                `Your final score is ${this.formatScore(score)}. ` +
                'Try again next time! ' +
                'Thanks for testing!'),
        ]);
    }
    uselessUnitTestMessage() {
        return new Section([
            new Paragraph('The unit test was added, but the AI-bot already passed it. ' +
                'This test may not provide much additional value.'),
        ]);
    }
    usefulUnitTestMessage() {
        return new Section([
            new Paragraph('The unit test has been successfully added.'),
        ]);
    }
    incorrectUnitTestMessage() {
        return new Section([
            new Paragraph('We checked your unit test against the expected behavior. ' +
                'Your test appears to be incorrect, so it has not been included in the evaluation.'),
        ]);
    }
    formatScore(score) {
        return `${score}%`;
    }
}
_a = AIBot;
_AIBot_instance = { value: void 0 };

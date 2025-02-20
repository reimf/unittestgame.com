import { UnitTest } from './unit_test.js';
import { Random } from './random.js';
import { Button, Form, Paragraph, UnorderedList, Div, Code, Panel, HumanMessage, HumanMenuMessage, ComputerMessage } from './html.js';
import { Candidate } from './candidate.js';
import { TestResult } from './test_result.js';
export class Level {
    constructor(index) {
        this.index = index;
        this.PERFECTSCORE = 100;
        this.SUFFICIENTSCORE = 60;
        this.PENALTYHINT = 10;
        this.PENALTYBUG = 20;
        this.PENALTYEND = 100;
        this.name = this.constructor.name;
        /* The following attributes are public for testing; otherwise they can be private */
        this.parameters = this.getParameters();
        this.unit = this.getUnit();
        this.candidates = [...this.generateCandidates(this.getCandidateElements())];
        this.minimalUnitTests = this.getMinimalUnitTests();
        this.perfectCandidates = this.findPerfectCandidates(this.candidates, this.minimalUnitTests);
        this.perfectCandidate = Random.elementFrom(this.perfectCandidates);
        this.hints = [...this.hintGenerator()].map(argumentList => new UnitTest(argumentList, this.perfectCandidate.execute(argumentList)));
        this.userdefinedUnitTests = [];
        this.score = this.PERFECTSCORE;
        this.checkUnitTestsAreNeeded(this.candidates, this.minimalUnitTests);
    }
    buttonText(storage, highestPlayableLevelIndex) {
        if (this.index > highestPlayableLevelIndex)
            return `🔒 Level ${this.index} - ${this.name} is locked`;
        if (this.index === highestPlayableLevelIndex)
            return `👉 I want to play Level ${this.index} - ${this.name}`;
        const highScore = this.getHighScore(storage);
        if (highScore === this.PERFECTSCORE)
            return `🥇 I want to play Level ${this.index} - ${this.name} again (${highScore}%)`;
        if (highScore >= this.SUFFICIENTSCORE)
            return `🥈 I want to improve Level ${this.index} - ${this.name} (${highScore}%)`;
        return `🥉 I want to improve Level ${this.index} - ${this.name} (${highScore}%)`;
    }
    getHighScore(storage) {
        return Number(storage.getItem(`${this.name}.score`));
    }
    hasHighScore(storage) {
        return this.getHighScore(storage) > 0;
    }
    saveScore(storage) {
        if (this.score <= this.getHighScore(storage))
            return;
        storage.setItem(`${this.name}.score`, `${this.score}`);
    }
    *generateCandidates(listOfListOfLines, lines = []) {
        if (listOfListOfLines.length > 0) {
            const [firstListOfLines, ...remainingListOfListOfLines] = listOfListOfLines;
            for (const line of firstListOfLines)
                yield* this.generateCandidates(remainingListOfListOfLines, [...lines, line]);
        }
        else
            yield this.createCandidate(lines);
    }
    createCandidate(lines) {
        const parameterList = this.parameters.map((parameter) => parameter.name).join(', ');
        const code = [
            `function ${this.unit.name}(${parameterList}) {`,
            ...lines.filter((line) => line !== '').map((line) => '  ' + line),
            '}',
        ].join('\n');
        return new Candidate(code);
    }
    findPassingCandidates(candidates, unitTests) {
        return candidates.filter(candidate => candidate.failCount(unitTests) == 0);
    }
    findPerfectCandidates(candidates, unitTests) {
        const perfectCandidates = this.findPassingCandidates(candidates, unitTests);
        if (perfectCandidates.length === 0)
            throw new Error(`There is no perfect function for level ${this.constructor.name}.`);
        return perfectCandidates;
    }
    checkUnitTestsAreNeeded(candidates, unitTests) {
        for (const unitTest of unitTests) {
            const allMinusOneUnitTests = unitTests.filter(otherUnitTest => otherUnitTest !== unitTest);
            const almostPerfectCandidates = this.findPassingCandidates(candidates, allMinusOneUnitTests);
            if (almostPerfectCandidates.length === 1)
                throw new Error(`Unit test ${unitTest} is not needed.\n${almostPerfectCandidates[0]}`);
        }
    }
    findSimplestPassingCandidate(candidates, userDefinedUnitTests, perfectCandidates) {
        const nonPerfectCandidates = candidates.filter(candidate => !perfectCandidates.includes(candidate));
        const nonPerfectPassingCandidates = this.findPassingCandidates(nonPerfectCandidates, userDefinedUnitTests);
        if (nonPerfectPassingCandidates.length === 0)
            return Random.elementFrom(perfectCandidates);
        const minimumComplexity = Math.min(...nonPerfectPassingCandidates.map(candidate => candidate.complexity));
        const candidatesWithMinimumComplexity = nonPerfectPassingCandidates.filter(candidate => candidate.complexity === minimumComplexity);
        return Random.elementFrom(candidatesWithMinimumComplexity);
    }
    showScorePanel() {
        new Panel('Score', [
            new Paragraph(`${this.score}%`),
        ]).show('score');
    }
    showContractMessage() {
        new ComputerMessage([
            new Paragraph('In the sidebar you see the specification, ' +
                'the unit tests you have written and ' +
                'the current function that passes all the unit tests. ' +
                'Keep adding unit tests until the function is according to the specification.'),
        ]).show();
    }
    showUnitTestsPanel() {
        new Panel('Unit Tests', [
            new UnorderedList(this.userdefinedUnitTests.map(unitTest => new Div().appendText(unitTest.toString()))).ifEmpty('You have not written any unit tests yet.'),
        ]).show('unit-tests');
    }
    showCurrentCandidatePanel(candidate) {
        new Panel('Current Function', [
            new Code(candidate.toString()),
        ]).show('current-candidate');
    }
    showMenuMessage() {
        new HumanMenuMessage([
            new Button('I want to add a unit test', () => this.showFormUnitTestMessage()),
            new Button(`I want to see a hint for a unit test (-${this.PENALTYHINT}%)`, () => this.showHint()),
            new Button(`I want to submit the unit tests (-${this.PENALTYBUG}%?)`, () => this.submit()),
            new Button(`I want to exit this level (-${this.PENALTYEND}%?)`, () => this.end()),
        ]).show().focusFirst();
    }
    play(callback) {
        this.callback = callback;
        this.showSpecificationPanel();
        this.showContractMessage();
        this.menu();
    }
    menu() {
        this.showUnitTestsPanel();
        const simplestPassingCandidate = this.findSimplestPassingCandidate(this.candidates, this.userdefinedUnitTests, this.perfectCandidates);
        this.showCurrentCandidatePanel(simplestPassingCandidate);
        const failingTestResultsHints = simplestPassingCandidate.failingTestResults(this.hints);
        const failingTestResultsUnitTests = simplestPassingCandidate.failingTestResults(this.minimalUnitTests);
        const failingTestResultsToChooseFrom = failingTestResultsHints ? failingTestResultsHints : failingTestResultsUnitTests;
        this.failingTestResult = failingTestResultsToChooseFrom
            ? Random.elementFrom(failingTestResultsToChooseFrom)
            : undefined;
        this.showScorePanel();
        this.showMenuMessage();
    }
    showFormUnitTestMessage() {
        new HumanMessage([
            new Form([...this.parameters, this.unit].map(variable => variable.toHtml()), 'I want to add this unit test', () => this.addUnitTest(), 'I don\'t want to add a unit test now', () => this.menu())
        ]).replace().focusFirst();
    }
    showAddUnitTestMessage(unitTest) {
        new HumanMessage([
            new Paragraph('I want to add the following unit test:'),
            new Paragraph(unitTest.toString()),
        ]).replace();
    }
    showGeneralUselessUnitTestMessage() {
        new ComputerMessage([
            new Paragraph('I added the unit test, but it looks a lot like another unit test, so I didn\'t have to improve the function.'),
        ]).show();
    }
    showCurrentlyUselessUnitTestMessage() {
        new ComputerMessage([
            new Paragraph('I added the unit test, but my function already passed this unit test, so I didn\'t improve the function.'),
        ]).show();
    }
    showUsefulUnitTestMessage() {
        new ComputerMessage([
            new Paragraph('I added the unit test and I improved the function.'),
        ]).show();
    }
    showIncorrectUnitTestMessage() {
        new ComputerMessage([
            new Paragraph('I did NOT add the unit test, because it is NOT according to the specification.'),
        ]).show();
    }
    addUnitTest() {
        const argumentList = this.parameters.map(parameter => parameter.value());
        const expected = this.unit.value();
        const unitTest = new UnitTest(argumentList, expected);
        this.showAddUnitTestMessage(unitTest);
        const testResult = new TestResult(this.perfectCandidate, unitTest);
        if (testResult.passes) {
            const passingCandidatesBefore = this.findPassingCandidates(this.candidates, this.userdefinedUnitTests);
            const simplestPassingCandidateBefore = this.findSimplestPassingCandidate(this.candidates, this.userdefinedUnitTests, this.perfectCandidates);
            this.userdefinedUnitTests.push(unitTest);
            const passingCandidatesAfter = this.findPassingCandidates(this.candidates, this.userdefinedUnitTests);
            const simplestPassingCandidateAfter = this.findSimplestPassingCandidate(this.candidates, this.userdefinedUnitTests, this.perfectCandidates);
            if (passingCandidatesAfter.length === passingCandidatesBefore.length)
                this.showGeneralUselessUnitTestMessage();
            else if (simplestPassingCandidateAfter === simplestPassingCandidateBefore)
                this.showCurrentlyUselessUnitTestMessage();
            else
                this.showUsefulUnitTestMessage();
        }
        else
            this.showIncorrectUnitTestMessage();
        this.menu();
    }
    showHintMessage(unitTest) {
        new ComputerMessage([
            new Paragraph('A unit test that would fail for the function is the following.'),
            new Paragraph(unitTest.toString()),
            new Paragraph(`The cost for this hint is ${this.PENALTYHINT}%.`),
        ]).show();
    }
    showNoHintMessage() {
        new ComputerMessage([
            new Paragraph('I can\'t come up with a failing unit test. '),
            new Paragraph(`The cost for this \'hint\' is ${this.PENALTYHINT}%.`),
        ]).show();
    }
    showHint() {
        if (this.failingTestResult)
            this.showHintMessage(this.failingTestResult.unitTest);
        else
            this.showNoHintMessage();
        this.score -= this.PENALTYHINT;
        this.menu();
    }
    showBugFoundMessage(testResult) {
        new ComputerMessage([
            new Paragraph('The function is NOT according to the specification. ' +
                'The function produces the following incorrect output:'),
            new Paragraph(testResult.toString()),
            new Paragraph(`The cost for this submission is ${this.PENALTYBUG}%.`),
        ]).show();
    }
    submit() {
        if (this.failingTestResult) {
            this.showBugFoundMessage(this.failingTestResult);
            this.score -= this.PENALTYBUG;
            this.menu();
        }
        else
            this.end();
    }
    showUnsuccessfulEndMessage() {
        new ComputerMessage([
            new Paragraph('The function is NOT according to the specification. ' +
                `Your final score is ${this.score}%.`),
        ]).show();
    }
    showPerfectEndMessage() {
        new ComputerMessage([
            new Paragraph('The function is according to the specification. ' +
                `You achieved the maximum score of ${this.score}%.`),
        ]).show();
    }
    showSuccessfulEndMessage() {
        new ComputerMessage([
            new Paragraph('The function is according to the specification. ' +
                `Your final score is ${this.score}%.`),
        ]).show();
    }
    end() {
        if (this.failingTestResult) {
            this.score = 0;
            this.showScorePanel();
            this.showUnsuccessfulEndMessage();
        }
        else if (this.score == this.PERFECTSCORE)
            this.showPerfectEndMessage();
        else
            this.showSuccessfulEndMessage();
        this.saveScore(localStorage);
        this.callback();
    }
}

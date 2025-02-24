import { UnitTest } from './unit_test.js';
import { Random } from './random.js';
import { Button, Form, Paragraph, UnorderedList, Div, Code, Panel, HumanMessage, ComputerMessage } from './html.js';
import { Candidate } from './candidate.js';
import { TestResult } from './test_result.js';
export class Level {
    constructor(index) {
        this.index = index;
        this.PERFECTSCORE = 100;
        this.PENALTYINCORRECTUNITTEST = 10;
        this.PENALTYHINT = 20;
        this.PENALTYBUG = 30;
        this.MINIMUMSCORE = 0;
        this.name = this.constructor.name;
        this.parameters = this.getParameters();
        this.unit = this.getUnit();
        this.candidates = [...this.generateCandidates(this.getCandidateElements())];
        this.minimalUnitTests = this.getMinimalUnitTests(this.parameters, this.unit);
        this.perfectCandidates = this.findPerfectCandidates(this.candidates, this.minimalUnitTests);
        this.perfectCandidate = Random.elementFrom(this.perfectCandidates);
        this.hints = [...this.hintGenerator()].map(argumentList => new UnitTest(this.parameters, argumentList, this.unit, this.perfectCandidate.execute(argumentList)));
        // the following attributes are assigned a dummy value; the starting values are assigned in the play method
        this.userdefinedUnitTests = [];
        this.currentCandidate = this.candidates[0];
        this.failingTestResult = undefined;
        this.score = this.MINIMUMSCORE;
        this.callback = () => undefined;
        this.checkUnitTestsAreNeeded(this.candidates, this.minimalUnitTests);
    }
    get description() {
        return `Level ${this.index} - ${this.name}`;
    }
    getHighScore(storage) {
        return Number(storage.getItem(`${this.name}.score`));
    }
    saveScore(storage) {
        if (this.score > this.getHighScore(storage))
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
            throw new Error(`There is no perfect function for level ${this.name}.`);
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
    findSimplestPassingCandidate(candidates, unitTests) {
        const passingCandidates = this.findPassingCandidates(candidates, unitTests);
        const minimumComplexity = Math.min(...passingCandidates.map(candidate => candidate.complexity));
        const simplestCandidates = passingCandidates.filter(candidate => candidate.complexity === minimumComplexity);
        return Random.elementFrom(simplestCandidates);
    }
    findFailingTestResult(candidate, hints, minimalUnitTests) {
        return Random.elementFrom(candidate.failingTestResults(hints)) || Random.elementFrom(candidate.failingTestResults(minimalUnitTests));
    }
    showScorePanel() {
        new Panel('Score', [
            new Paragraph(`${this.description}: ${this.score}%`),
        ]).show('score');
    }
    showContractMessage() {
        new ComputerMessage([
            new Paragraph('In the sidebar you see the specification, ' +
                'the unit tests you have written (none yet) and ' +
                'my take at the function. ' +
                'Add failing unit tests and I will improve the function such that it passes. ' +
                'Submit the unit tests if the function is according to the specification.'),
        ]).show();
    }
    showUnitTestsPanel() {
        new Panel('Unit Tests', [
            new UnorderedList(this.userdefinedUnitTests.map(unitTest => new Div().appendText(unitTest.toString()))).ifEmpty('You have not written any unit tests yet.'),
        ]).show('unit-tests');
    }
    showCurrentCandidatePanel() {
        new Panel('Current Function', [
            new Code(this.currentCandidate.toString()),
        ]).show('current-candidate');
    }
    showMenuMessage() {
        new HumanMessage([
            new Button(`I want to add a unit test (-${this.PENALTYINCORRECTUNITTEST}% on error)`, () => this.showFormUnitTestMessage()),
            new Button(`I want to see a hint for a unit test (-${this.PENALTYHINT}%)`, () => this.showHint()),
            new Button(`I want to submit the unit tests (-${this.PENALTYBUG}% on error)`, () => this.submit()),
            new Button(`I want to exit this level (${this.MINIMUMSCORE}% on error)`, () => this.end()),
        ]).show();
    }
    showScoreZeroMessage() {
        new ComputerMessage([
            new Paragraph('You have to retry this level, ' +
                'because your score dropped to 0%.')
        ]).show();
    }
    play(callback) {
        this.callback = callback;
        this.score = this.PERFECTSCORE;
        this.userdefinedUnitTests = [];
        this.improveCurrentCandidate();
        this.showSpecificationPanel();
        this.showContractMessage();
        this.menu();
    }
    improveCurrentCandidate() {
        this.currentCandidate = this.findSimplestPassingCandidate(this.candidates, this.userdefinedUnitTests);
        this.failingTestResult = this.findFailingTestResult(this.currentCandidate, this.hints, this.minimalUnitTests);
    }
    menu() {
        this.showUnitTestsPanel();
        this.showCurrentCandidatePanel();
        if (this.score <= this.MINIMUMSCORE) {
            this.showScoreZeroMessage();
            this.score = this.MINIMUMSCORE;
            this.showScorePanel();
            this.callback();
        }
        else {
            this.showScorePanel();
            this.showMenuMessage();
        }
    }
    showFormUnitTestMessage() {
        new HumanMessage([
            new Form([...this.parameters, this.unit].map(variable => variable.toHtml()), 'I want to add this unit test', () => this.addUnitTest(), 'I don\'t want to add a unit test now', () => this.menu())
        ]).replace();
    }
    showAddUnitTestMessage(unitTest) {
        new HumanMessage([
            new Paragraph('I want to add the following unit test:'),
            new Paragraph(unitTest.toString()),
        ]).replace();
    }
    showUselessUnitTestMessage() {
        new ComputerMessage([
            new Paragraph('I added the unit test, but the current function already passes this unit test, so I didn\'t improve the function.'),
        ]).show();
    }
    showUsefulUnitTestMessage() {
        new ComputerMessage([
            new Paragraph('I added the unit test and I improved the function.'),
        ]).show();
    }
    showIncorrectUnitTestMessage() {
        new ComputerMessage([
            new Paragraph('I did NOT add the unit test, because it is NOT according to the specification. ' +
                `The cost for trying to add an incorrect unit test is ${this.PENALTYINCORRECTUNITTEST}%.`),
        ]).show();
        this.score -= this.PENALTYINCORRECTUNITTEST;
    }
    addUnitTest() {
        const argumentList = this.parameters.map(parameter => parameter.value());
        const expected = this.unit.value();
        const unitTest = new UnitTest(this.parameters, argumentList, this.unit, expected);
        this.showAddUnitTestMessage(unitTest);
        const unitTestIsCorrect = new TestResult(this.perfectCandidate, unitTest).passes;
        if (unitTestIsCorrect) {
            this.userdefinedUnitTests.push(unitTest);
            const currentCandidateAlreadyPasses = new TestResult(this.currentCandidate, unitTest).passes;
            if (currentCandidateAlreadyPasses)
                this.showUselessUnitTestMessage();
            else {
                this.showUsefulUnitTestMessage();
                this.improveCurrentCandidate();
            }
        }
        else
            this.showIncorrectUnitTestMessage();
        this.menu();
    }
    showHintMessage(unitTest) {
        new ComputerMessage([
            new Paragraph('A unit test that would fail for the current function is the following.'),
            new Paragraph(unitTest.toString()),
            new Paragraph(`The cost for this hint is ${this.PENALTYHINT}%.`),
        ]).show();
        this.score -= this.PENALTYHINT;
    }
    showNoHintMessage() {
        new ComputerMessage([
            new Paragraph('I can\'t think of a failing unit test for the current function. '),
            new Paragraph(`The cost for this hint is ${this.PENALTYHINT}%.`),
        ]).show();
        this.score -= this.PENALTYHINT;
    }
    showHint() {
        if (this.failingTestResult)
            this.showHintMessage(this.failingTestResult.unitTest);
        else
            this.showNoHintMessage();
        this.menu();
    }
    showBugFoundMessage(testResult) {
        new ComputerMessage([
            new Paragraph('The current function is NOT according to the specification. ' +
                'It produces the following incorrect output:'),
            new Paragraph(testResult.toString()),
            new Paragraph(`The cost for submitting when there is still an error is ${this.PENALTYBUG}%.`),
        ]).show();
        this.score -= this.PENALTYBUG;
    }
    submit() {
        if (this.failingTestResult) {
            this.showBugFoundMessage(this.failingTestResult);
            this.menu();
        }
        else
            this.end();
    }
    showUnsuccessfulEndMessage() {
        new ComputerMessage([
            new Paragraph('The current function is NOT according to the specification. ' +
                `Your score is ${this.score}%.`),
        ]).show();
    }
    showSuccessfulEndMessage() {
        new ComputerMessage([
            new Paragraph('The current function is according to the specification. ' +
                `Your score is ${this.score}%.`),
        ]).show();
    }
    end() {
        if (this.failingTestResult) {
            this.score = this.MINIMUMSCORE;
            this.showScorePanel();
            this.showUnsuccessfulEndMessage();
        }
        else
            this.showSuccessfulEndMessage();
        this.saveScore(localStorage);
        this.callback();
    }
}

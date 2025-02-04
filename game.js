"use strict";
class Game {
    constructor() {
        this.INITIALSCORE = 100;
        this.PENALTYHINT = 10;
        this.PENALTYBUG = 20;
        this.PENALTYEND = 100;
        this.parameters = this.getParameters();
        this.unit = this.getUnit();
        this.candidates = [...this.generateFunctions(this.getCandidateElements())];
        this.minimalUnitTests = this.getMinimalUnitTests();
        this.perfectCandidates = this.findPerfectCandidates(this.candidates, this.minimalUnitTests);
        this.perfectCandidate = this.perfectCandidates.random();
        this.checkUnitTestsAreNeeded(this.candidates, this.minimalUnitTests);
        this.hints = [...this.hintGenerator()].map(argumentList => new UnitTest(argumentList, this.perfectCandidate.callFunction(argumentList)));
        this.candidates.forEach(candidate => candidate.setComplexity(this.hints));
        this.userdefinedUnitTests = [];
        this.score = this.INITIALSCORE;
        this.failingTestResult = undefined;
    }
    *generateFunctions(listOfListOfLines, lines = []) {
        if (listOfListOfLines.length > 0) {
            const [firstListOfLines, ...remainingListOfListOfLines] = listOfListOfLines;
            for (const line of firstListOfLines)
                yield* this.generateFunctions(remainingListOfListOfLines, [...lines, line]);
        }
        else
            yield this.createCandidate(lines);
    }
    createCandidate(lines) {
        const parameterList = this.parameters.map((parameter) => parameter.name).join(", ");
        const code = [
            `function ${this.unit.name}(${parameterList}) {`,
            ...lines.filter((line) => line !== "").map((line) => "  " + line),
            "}",
        ].join("\n");
        return new Candidate(code);
    }
    findPassingCandidates(candidates, unitTests) {
        return candidates.filter(candidate => candidate.failCount(unitTests) == 0);
    }
    findPerfectCandidates(candidates, unitTests) {
        const perfectCandidates = this.findPassingCandidates(candidates, unitTests);
        if (perfectCandidates.length === 0)
            throw new Error(`There is no perfect function for game ${this.constructor.name}.`);
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
        const passingCandidates = this.findPassingCandidates(candidates, userDefinedUnitTests);
        const nonPerfectPassingCandidates = passingCandidates.filter(candidate => !perfectCandidates.includes(candidate));
        if (nonPerfectPassingCandidates.length == 0)
            return passingCandidates.random();
        return nonPerfectPassingCandidates.reduce((simplestSoFar, current) => simplestSoFar.simplest(current));
    }
    play() {
        this.specificationPanel().show('specification');
        this.introductionMessage().addAsComputer();
        this.theme.contractMessage(this.INITIALSCORE, this.PENALTYHINT, this.PENALTYBUG).addAsComputer();
        this.menu();
    }
    menuMessage(buttons) {
        return new Section([
            ...buttons,
        ]);
    }
    menu() {
        this.theme.unitTestsPanel(this.userdefinedUnitTests).show('unit-tests');
        const simplestPassingCandidate = this.findSimplestPassingCandidate(this.candidates, this.userdefinedUnitTests, this.perfectCandidates);
        this.theme.currentCandidatePanel(simplestPassingCandidate).show('current-candidate');
        const failingTestResultsHints = simplestPassingCandidate.failingTestResults(this.hints);
        const failingTestResultsUnitTests = simplestPassingCandidate.failingTestResults(this.minimalUnitTests);
        const failingTestResultsToChooseFrom = failingTestResultsHints ? failingTestResultsHints : failingTestResultsUnitTests;
        this.failingTestResult = failingTestResultsToChooseFrom
            ? failingTestResultsToChooseFrom.random()
            : undefined;
        this.theme.scorePanel(this.score).show('score');
        this.menuMessage([
            new Button(this.theme.formUnitTestButton()).on('click', () => this.showFormUnitTest()),
            new Button(this.theme.showHintButton(this.PENALTYHINT)).on('click', () => this.showHint()),
            new Button(this.theme.submitButton(this.PENALTYBUG)).on('click', () => this.submit()),
            new Button(this.theme.endButton(this.PENALTYEND)).on('click', () => this.end()),
        ]).addAsHuman();
    }
    showFormUnitTest() {
        const form = new Form([...this.parameters, this.unit], this.theme.addUnitTestFormButton(), (event) => this.addUnitTest(event), this.theme.cancelUnitTestFormButton(), (event) => this.cancelUnitTest(event));
        this.theme.addUnitTestFormMessage(form).replaceLastHuman();
    }
    cancelUnitTest(event) {
        this.theme.cancelUnitTestFormMessage().replaceLastHuman();
        this.menu();
    }
    addUnitTest(event) {
        event.preventDefault();
        const argumentList = this.parameters.map(parameter => parameter.value());
        const expected = this.unit.value();
        const unitTest = new UnitTest(argumentList, expected);
        this.theme.addUnitTestTextMessage(unitTest).replaceLastHuman();
        const testResult = new TestResult(this.perfectCandidate, unitTest);
        if (testResult.passes) {
            const passingCandidatesBefore = this.findPassingCandidates(this.candidates, this.userdefinedUnitTests);
            this.userdefinedUnitTests.push(unitTest);
            const passingCandidatesAfter = this.findPassingCandidates(this.candidates, this.userdefinedUnitTests);
            if (passingCandidatesAfter.length === passingCandidatesBefore.length)
                this.theme.uselessUnitTestMessage().addAsComputer();
            else
                this.theme.usefulUnitTestMessage().addAsComputer();
        }
        else
            this.theme.incorrectUnitTestMessage().addAsComputer();
        this.menu();
    }
    showHint() {
        if (this.failingTestResult) {
            this.theme.showHintMessage().replaceLastHuman();
            this.theme.hintUnitTestMessage(this.failingTestResult.unitTest, this.PENALTYHINT).addAsComputer();
            this.score -= this.PENALTYHINT;
        }
        this.menu();
    }
    submit() {
        this.theme.submitMessage().replaceLastHuman();
        if (this.failingTestResult) {
            this.theme.bugFoundMessage(this.failingTestResult, this.PENALTYBUG).addAsComputer();
            this.score -= this.PENALTYBUG;
            this.menu();
        }
        else
            this.end();
    }
    end() {
        this.theme.endMessage().replaceLastHuman();
        if (this.failingTestResult) {
            this.score = 0;
            this.theme.scorePanel(this.score).show('score');
            this.theme.endWithBugMessage().addAsComputer();
        }
        else if (this.score == 100)
            this.theme.endPerfectMessage(this.score).addAsComputer();
        else if (this.score > 50)
            this.theme.endPositiveMessage(this.score).addAsComputer();
        else
            this.theme.endNegativeMessage(this.score).addAsComputer();
    }
}

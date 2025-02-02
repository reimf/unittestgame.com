"use strict";
class Game {
    constructor(theme) {
        this.theme = theme;
        this.INITIALSCORE = 100;
        this.PENALTYHINT = 10;
        this.PENALTYBUG = 20;
        this.PENALTYEND = 100;
        this.parameters = this.getParameters();
        this.unit = this.getUnit();
        this.candidates = [...this.generateFunctions(this.getCandidateElements())];
        this.specialUnitTests = this.getSpecialUnitTests();
        this.perfectCandidates = this.findPerfectCandidates(this.candidates, this.specialUnitTests);
        this.perfectCandidate = this.perfectCandidates.random();
        this.checkUnitTestsAreNeeded(this.candidates, this.specialUnitTests);
        this.generalUnitTests = [...this.generalArgumentsGenerator()].map(argumentList => new UnitTest(argumentList, this.perfectCandidate.callFunction(argumentList)));
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
        //else if (perfectCandidates.length > 1)
        //    console.log(
        //        `There are ${perfectCandidates.length} perfect functions for game ${this.constructor.name}.` +
        //        perfectCandidates.map(candidate => candidate.toString()).join("\n")
        //    )
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
        return nonPerfectPassingCandidates.reduce((simplestSoFar, current) => current.complexity() < simplestSoFar.complexity() ? current : simplestSoFar);
    }
    play() {
        this.specificationPanel().show('specification');
        this.introductionMessage();
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
        const failingGeneralTestResults = simplestPassingCandidate.failingTestResults(this.generalUnitTests);
        const failingSpecialTestResults = simplestPassingCandidate.failingTestResults(this.specialUnitTests);
        const failingTestResultsToChooseFrom = failingGeneralTestResults ? failingGeneralTestResults : failingSpecialTestResults;
        this.failingTestResult = failingTestResultsToChooseFrom
            ? failingTestResultsToChooseFrom.random()
            : undefined;
        this.theme.scorePanel(this.score).show('score');
        this.menuMessage([
            new Button(this.theme.addUnitTestOption()).on('click', () => this.showUnitTestForm()),
            new Button(this.theme.seeHintOption(this.PENALTYHINT)).on('click', () => this.showHint()),
            new Button(this.theme.submitOption(this.PENALTYBUG)).on('click', () => this.submit()),
            new Button(this.theme.endOption(this.PENALTYEND)).on('click', () => this.end()),
        ]).addAsHuman();
    }
    showUnitTestForm() {
        this.theme.addUnitTestFormMessage(new Form([...this.parameters, this.unit], this.theme.buttonText(), this.addUnitTest.bind(this))).replaceLastHuman();
    }
    showHint() {
        if (this.failingTestResult) {
            this.theme.seeHintMessage().replaceLastHuman();
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
    addUnitTest(...values) {
        const argumentList = values.slice(0, -1);
        const expected = values.slice(-1).pop();
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
}

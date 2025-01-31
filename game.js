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
        this.specialUnitTests = this.getSpecialUnitTests();
        this.perfectCandidate = this.findOnePerfectCandidate(this.candidates, this.specialUnitTests);
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
    findOnePerfectCandidate(candidates, unitTests) {
        const perfectFunctions = this.findPassingCandidates(candidates, unitTests);
        if (perfectFunctions.length === 0)
            throw new Error(`There is no perfect function for game ${this.constructor.name}.`);
        return perfectFunctions.random();
    }
    checkUnitTestsAreNeeded(candidates, unitTests) {
        for (const unitTest of unitTests) {
            const allMinusOneUnitTests = unitTests.filter(otherUnitTest => otherUnitTest !== unitTest);
            const almostPerfectFunctions = this.findPassingCandidates(candidates, allMinusOneUnitTests);
            if (almostPerfectFunctions.length === 1)
                throw new Error(`Unit test ${unitTest} is not needed.\n${almostPerfectFunctions[0]}`);
        }
    }
    findShortestPassingCandidate(candidates, userDefinedUnitTests) {
        const passingCandidates = this.findPassingCandidates(candidates, userDefinedUnitTests);
        return passingCandidates.reduce((shortestSoFar, current) => current.length() < shortestSoFar.length() ? current : shortestSoFar);
    }
    play() {
        this.introductionMessage().addComputerMessage();
        this.menu();
    }
    menu() {
        this.unitTestsPanel(this.userdefinedUnitTests).showPanel('unit-tests');
        const shortestPassingCandidate = this.findShortestPassingCandidate(this.candidates, this.userdefinedUnitTests);
        this.currentCandidatePanel(shortestPassingCandidate).showPanel('current-candidate');
        const failingGeneralTestResults = shortestPassingCandidate.failingTestResults(this.generalUnitTests);
        const failingSpecialTestResults = shortestPassingCandidate.failingTestResults(this.specialUnitTests);
        const failingTestResultsToChooseFrom = failingGeneralTestResults ? failingGeneralTestResults : failingSpecialTestResults;
        this.failingTestResult = failingTestResultsToChooseFrom
            ? failingTestResultsToChooseFrom.random()
            : undefined;
        this.scorePanel(this.score).showPanel('score');
        this.menuMessage(this.PENALTYHINT, this.PENALTYBUG, this.PENALTYEND, new Form([new RadioVariable(this.choiceLabel(), 'choice', ['1', '2', '3', '4', '5', '0'])], this.buttonText(), this.answer.bind(this))).addHumanMessage();
    }
    answer(choice) {
        if (choice === '1') {
            this.optionSeeContractMessage().replaceHumanMessage();
            this.contractMessage(this.INITIALSCORE, this.PENALTYBUG).addComputerMessage();
            this.menu();
        }
        else if (choice === '2') {
            this.optionSeeProblemDescriptionMessage().replaceHumanMessage();
            this.specificationMessage().addComputerMessage();
            this.menu();
        }
        else if (choice === '3') {
            this.addUnitTestFormMessage(new Form([...this.parameters, this.unit], this.buttonText(), this.addUnitTest.bind(this))).replaceHumanMessage();
        }
        else if (choice === '4') {
            if (this.failingTestResult) {
                this.optionSeeHintMessage().replaceHumanMessage();
                this.hintUnitTestMessage(this.failingTestResult.unitTest, this.PENALTYHINT).addComputerMessage();
                this.score -= this.PENALTYHINT;
            }
            this.menu();
        }
        else if (choice === '5') {
            this.optionSubmitMessage().replaceHumanMessage();
            if (this.failingTestResult) {
                this.bugFoundMessage(this.failingTestResult, this.PENALTYBUG).addComputerMessage();
                this.score -= this.PENALTYBUG;
            }
            else
                this.end();
        }
        else if (choice === '0')
            this.end();
        else
            this.menu();
    }
    end() {
        if (this.failingTestResult) {
            this.score = 0;
            this.scorePanel(this.score).showPanel('score');
            this.endWithBugMessage().addComputerMessage();
        }
        else if (this.score == 100)
            this.endPerfectMessage(this.score).addComputerMessage();
        else if (this.score > 50)
            this.endPositiveMessage(this.score).addComputerMessage();
        else
            this.endNegativeMessage(this.score).addComputerMessage();
    }
    addUnitTest(...values) {
        const argumentList = values.slice(0, -1);
        const expected = values.slice(-1).pop();
        const unitTest = new UnitTest(argumentList, expected);
        this.addUnitTestTextMessage(unitTest).replaceHumanMessage();
        const testResult = new TestResult(this.perfectCandidate, unitTest);
        if (testResult.passes) {
            const passingCandidatesBefore = this.findPassingCandidates(this.candidates, this.userdefinedUnitTests);
            this.userdefinedUnitTests.push(unitTest);
            const passingCandidatesAfter = this.findPassingCandidates(this.candidates, this.userdefinedUnitTests);
            if (passingCandidatesAfter.length === passingCandidatesBefore.length)
                this.uselessUnitTestMessage().addComputerMessage();
            else
                this.usefulUnitTestMessage().addComputerMessage();
        }
        else
            this.incorrectUnitTestMessage().addComputerMessage();
        this.menu();
    }
}

import { Candidate } from './candidate.js';
import { HumanMessage, ComputerMessage } from './frame.js';
import { Button, Form, Input, Paragraph } from './html.js';
import { Random } from './random.js';
import { TestResult } from './test_result.js';
import { UnitTest } from './unit_test.js';
export class Level {
    constructor(methodology, useCase) {
        this.PERFECTSCORE = 100;
        this.PENALTYINCORRECTUNITTEST = 5;
        this.PENALTYHINT = 10;
        this.PENALTYSUBMITWITHBUG = 20;
        this.MINIMUMSCORE = 0;
        this.userdefinedUnitTests = [];
        this.coveredCandidates = [];
        this.currentCandidate = new Candidate([], []);
        this.failingTestResult = undefined;
        this.score = this.PERFECTSCORE;
        this.methodology = methodology;
        this.useCase = useCase;
    }
    get description() {
        return `${this.methodology.name()} - ${this.useCase.name()}`;
    }
    getHighScore(storage) {
        return Number(storage.getItem(this.description));
    }
    saveScore(storage, score) {
        if (score > this.getHighScore(storage))
            storage.setItem(this.description, score.toString());
    }
    play(callback) {
        this.callback = callback;
        this.userdefinedUnitTests = [];
        this.coveredCandidates = [];
        this.currentCandidate = this.findSimplestPassingCandidate();
        this.failingTestResult = this.findFailingTestResult();
        this.score = this.PERFECTSCORE;
        this.methodology.showWelcomeMessage();
        this.menu();
    }
    findSimplestCandidates(candidates) {
        return candidates.reduce((simplestCandidatesSoFar, candidate) => {
            if (simplestCandidatesSoFar.length === 0)
                return [candidate];
            const sign = candidate.compareComplexity(simplestCandidatesSoFar[0]);
            if (sign < 0)
                return [candidate];
            if (sign > 0)
                return simplestCandidatesSoFar;
            return [...simplestCandidatesSoFar, candidate];
        }, []);
    }
    findSimplestPassingCandidate() {
        const passingCandidates = this.useCase.candidates.filter(candidate => candidate.failCount(this.userdefinedUnitTests) === 0);
        const passingImperfectCandidates = passingCandidates.filter(candidate => !this.useCase.perfectCandidates.includes(candidate));
        if (passingImperfectCandidates.length === 0)
            return Random.elementFrom(this.useCase.perfectCandidates);
        const simplestPassingCandidates = this.findSimplestCandidates(passingImperfectCandidates);
        return Random.elementFrom(simplestPassingCandidates);
    }
    findCoveredCandidate(unitTest) {
        const passingCandidates = this.useCase.amputeesOfPerfectCandidate
            .filter(candidate => candidate.failCount([unitTest]) === 0);
        const simplestPassingCandidates = this.findSimplestCandidates(passingCandidates);
        return Random.elementFrom(simplestPassingCandidates);
    }
    findFailingTestResult() {
        const failingHints = this.currentCandidate.failingTestResults(this.useCase.hints);
        if (failingHints.length > 0)
            return Random.elementFrom(failingHints);
        const failingMinimalUnitTests = this.currentCandidate.failingTestResults(this.useCase.minimalUnitTests);
        if (failingMinimalUnitTests.length > 0)
            return Random.elementFrom(failingMinimalUnitTests);
        return undefined;
    }
    menu() {
        this.methodology.showPanelsOnMenu(this.useCase.specification(), this.currentCandidate, this.useCase.perfectCandidate, this.coveredCandidates);
        this.methodology.showUnitTestsPanel(this.userdefinedUnitTests);
        this.methodology.showScorePanel(this.score);
        if (this.score === this.MINIMUMSCORE)
            this.end();
        else
            this.showMenuMessage();
    }
    showMenuMessage() {
        new HumanMessage([
            new Button().onClick(() => this.startAddUnitTestFlow()).text('I want to add a unit test'),
            new Button().onClick(() => this.showHint()).text('I want to see a hint'),
            new Button().onClick(() => this.submit()).text('I want to submit the unit tests'),
            new Button().onClick(() => this.end()).text('I want to exit this level'),
        ]).show();
    }
    startAddUnitTestFlow() {
        this.showConfirmStartUnitTestFlowMessage();
        this.showFormUnitTestMessage();
    }
    showConfirmStartUnitTestFlowMessage() {
        new ComputerMessage(['Which unit test do you want to add?']).show();
    }
    showFormUnitTestMessage() {
        const parameterFields = this.useCase.parameters.map(variable => variable.toHtml());
        const unitField = this.useCase.unit.toHtml();
        const submitButton = new Input().type('submit').value('I want to add this unit test');
        const cancelButton = new Button()
            .onClick(() => this.cancelAddUnitTestFlow())
            .text('I don\'t want to add a unit test now')
            .addClass('secondary')
            .addClass('cancel');
        const buttonBlock = new Paragraph().appendChildren([submitButton, cancelButton]).addClass('buttonrow');
        new HumanMessage([
            new Form()
                .onSubmit(() => this.addUnitTest())
                .appendChildren([...parameterFields, unitField, buttonBlock]),
        ]).show();
    }
    showAddUnitTestMessage(unitTest) {
        new HumanMessage([
            'I want to add the following unit test.',
            unitTest.toString(),
        ]).replace();
    }
    showConfirmCancelAddUnitTestFlowMessage() {
        new ComputerMessage(['Ok.']).show();
    }
    cancelAddUnitTestFlow() {
        this.showConfirmCancelAddUnitTestFlowMessage();
        this.menu();
    }
    addUnitTest() {
        const argumentList = this.useCase.parameters.map(parameter => parameter.value());
        const expected = this.useCase.unit.value();
        const unitTest = new UnitTest(this.useCase.parameters, argumentList, this.useCase.unit, expected);
        this.showAddUnitTestMessage(unitTest);
        const unitTestIsCorrect = new TestResult(this.useCase.perfectCandidate, unitTest).passes;
        if (unitTestIsCorrect) {
            this.userdefinedUnitTests.push(unitTest);
            this.coveredCandidates.push(this.findCoveredCandidate(unitTest));
            const currentCandidateAlreadyPasses = new TestResult(this.currentCandidate, unitTest).passes;
            if (currentCandidateAlreadyPasses)
                this.methodology.showUselessUnitTestMessage();
            else {
                this.methodology.showUsefulUnitTestMessage();
                this.currentCandidate = this.findSimplestPassingCandidate();
                this.failingTestResult = this.findFailingTestResult();
            }
        }
        else {
            this.methodology.showIncorrectUnitTestMessage(this.PENALTYINCORRECTUNITTEST);
            this.subtractPenalty(this.PENALTYINCORRECTUNITTEST);
        }
        this.menu();
    }
    showHint() {
        if (this.failingTestResult)
            this.methodology.showHintMessage(this.currentCandidate, this.failingTestResult, this.PENALTYHINT);
        else
            this.methodology.showNoHintMessage(this.PENALTYHINT);
        this.subtractPenalty(this.PENALTYHINT);
        this.menu();
    }
    submit() {
        if (this.failingTestResult) {
            this.methodology.showBugFoundMessage(this.currentCandidate, this.failingTestResult, this.PENALTYSUBMITWITHBUG);
            this.subtractPenalty(this.PENALTYSUBMITWITHBUG);
            this.menu();
        }
        else
            this.end();
    }
    end() {
        if (this.score === this.MINIMUMSCORE)
            this.methodology.showMinimumScoreEndMessage(this.score);
        else if (this.failingTestResult) {
            this.score = this.MINIMUMSCORE;
            this.methodology.showScorePanel(this.score);
            this.methodology.showUnsuccessfulEndMessage(this.score);
        }
        else
            this.methodology.showSuccessfulEndMessage(this.score);
        this.saveScore(localStorage, this.score);
        this.callback();
    }
    subtractPenalty(penalty) {
        this.score = Math.max(this.score - penalty, this.MINIMUMSCORE);
    }
}

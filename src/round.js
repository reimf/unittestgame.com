import { UnitTest } from './unit_test.js';
import { Random } from './random.js';
import { Button, Form, Input, Paragraph } from './html.js';
import { Panel, HumanMessage, ComputerMessage } from './frame.js';
import { TestResult } from './test_result.js';
export class Round {
    constructor(level, callback) {
        this.PERFECTSCORE = 100;
        this.PENALTYINCORRECTUNITTEST = 5;
        this.PENALTYHINT = 10;
        this.PENALTYSUBMITWITHBUG = 20;
        this.MINIMUMSCORE = 0;
        this.name = this.constructor.name;
        this.level = level;
        this.userdefinedUnitTests = [];
        this.currentCandidate = this.findSimplestPassingCandidate();
        this.failingTestResult = this.findFailingTestResult();
        this.score = this.PERFECTSCORE;
        this.callback = callback;
    }
    play() {
        this.showPanelsOnPlay();
        this.showContractMessage();
        this.menu();
    }
    menu() {
        this.showUnitTestsPanel();
        this.showPanelsOnMenu();
        this.showScorePanel();
        if (this.score === this.MINIMUMSCORE)
            this.end();
        else
            this.showMenuMessage();
    }
    findSimplestCandidates(candidates) {
        const attributes = candidates.map(candidate => candidate.complexity);
        const minimum = Math.min(...attributes);
        return candidates.filter(candidate => candidate.complexity === minimum);
    }
    findSimplestPassingCandidate() {
        const passingCandidates = this.level.findPassingCandidates(this.userdefinedUnitTests);
        const simplestCandidates = this.findSimplestCandidates(passingCandidates);
        return Random.elementFrom(simplestCandidates);
    }
    findFailingTestResult() {
        const failingHints = this.currentCandidate.failingTestResults(this.level.hints);
        if (failingHints.length > 0)
            return Random.elementFrom(failingHints);
        const failingMinimalUnitTests = this.currentCandidate.failingTestResults(this.level.minimalUnitTests);
        if (failingMinimalUnitTests.length > 0)
            return Random.elementFrom(failingMinimalUnitTests);
        return undefined;
    }
    showScorePanel() {
        new Panel('Score', [
            new Paragraph().appendText(`${this.level.description}: ${this.score}%`),
        ]).show();
    }
    showUnitTestsPanel() {
        new Panel('Unit Tests', this.userdefinedUnitTests.length === 0
            ? [new Paragraph().appendText('You have not written any unit tests yet.')]
            : this.userdefinedUnitTests.map(unitTest => new Paragraph().appendText(unitTest.toString()))).show();
    }
    showMenuMessage() {
        new HumanMessage([
            new Button().onClick(() => this.startAddUnitTestFlow()).appendText(`I want to add a unit test (-${this.PENALTYINCORRECTUNITTEST}% on error)`),
            new Button().onClick(() => this.showHint()).appendText(`I want to see a hint for a unit test (-${this.PENALTYHINT}%)`),
            new Button().onClick(() => this.submit()).appendText(`I want to submit the unit tests (-${this.PENALTYSUBMITWITHBUG}% on error)`),
            new Button().onClick(() => this.end()).appendText(`I want to exit this level (${this.MINIMUMSCORE}% on error)`),
        ]).show();
    }
    startAddUnitTestFlow() {
        this.showConfirmStartUnitTestFlowMessage();
        this.showFormUnitTestMessage();
    }
    showConfirmStartUnitTestFlowMessage() {
        new ComputerMessage([
            new Paragraph().appendText('Which unit test do you want to add?'),
        ]).show();
    }
    showFormUnitTestMessage() {
        const submitButton = new Input().type('submit').value('I want to add this unit test');
        const cancelButton = new Button().onClick(() => this.cancelAddUnitTestFlow()).appendText('I don\'t want to add a unit test now');
        const buttonBlock = new Paragraph().appendChild(submitButton).appendChild(cancelButton);
        new HumanMessage([
            new Form()
                .onSubmit(() => this.addUnitTest())
                .appendChildren([...this.level.parameters, this.level.unit].map(variable => variable.toHtml()))
                .appendChild(buttonBlock)
        ]).show();
    }
    showAddUnitTestMessage(unitTest) {
        new HumanMessage([
            new Paragraph().appendText('I want to add the following unit test:'),
            new Paragraph().appendText(unitTest.toString()),
        ]).replace();
    }
    showConfirmCancelAddUnitTestFlowMessage() {
        new ComputerMessage([
            new Paragraph().appendText('Ok.'),
        ]).show();
    }
    cancelAddUnitTestFlow() {
        this.showConfirmCancelAddUnitTestFlowMessage();
        this.menu();
    }
    addUnitTest() {
        const argumentList = this.level.parameters.map(parameter => parameter.value());
        const expected = this.level.unit.value();
        const unitTest = new UnitTest(this.level.parameters, argumentList, this.level.unit, expected);
        this.showAddUnitTestMessage(unitTest);
        const unitTestIsCorrect = new TestResult(this.level.perfectCandidate, unitTest).passes;
        if (unitTestIsCorrect) {
            this.userdefinedUnitTests.push(unitTest);
            const currentCandidateAlreadyPasses = new TestResult(this.currentCandidate, unitTest).passes;
            if (currentCandidateAlreadyPasses)
                this.showUselessUnitTestMessage();
            else {
                this.showUsefulUnitTestMessage();
                this.currentCandidate = this.findSimplestPassingCandidate();
                this.failingTestResult = this.findFailingTestResult();
            }
        }
        else
            this.showIncorrectUnitTestMessage();
        this.menu();
    }
    showHint() {
        if (this.failingTestResult)
            this.showHintMessage();
        else
            this.showNoHintMessage();
        this.menu();
    }
    submit() {
        if (this.failingTestResult) {
            this.showBugFoundMessage();
            this.menu();
        }
        else
            this.end();
    }
    end() {
        if (this.score === this.MINIMUMSCORE)
            this.showMinimumScoreEndMessage();
        else if (this.failingTestResult) {
            this.score = this.MINIMUMSCORE;
            this.showScorePanel();
            this.showUnsuccessfulEndMessage();
        }
        else
            this.showSuccessfulEndMessage();
        this.level.saveScore(localStorage, this.score);
        this.callback();
    }
    subtractPenalty(penalty) {
        this.score = Math.max(this.score - penalty, this.MINIMUMSCORE);
    }
}

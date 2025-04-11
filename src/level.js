import { Candidate } from './candidate.js';
import { HumanMessage, ProcessingMessage, ComputerMessage, Panel } from './frame.js';
import { Button, Div, Form, Input, Paragraph } from './html.js';
import { Random } from './random.js';
import { TestResult } from './test_result.js';
import { UnitTest } from './unit_test.js';
import { Completed } from './completed.js';
export class Level {
    constructor(methodology, useCase) {
        this.userdefinedUnitTests = [];
        this.coveredCandidates = [];
        this.currentCandidate = new Candidate([]);
        this.failingTestResult = undefined;
        this.newUnitTest = undefined;
        this.previousCandidate = undefined;
        this.methodology = methodology;
        this.useCase = useCase;
        this.isLevelFinished = new Completed(this.description());
    }
    description() {
        return `${this.methodology.name()} - ${this.useCase.name()}`;
    }
    methodologyName() {
        return this.methodology.name();
    }
    getExampleSeen() {
        return this.methodology.getExampleSeen();
    }
    setExampleSeen() {
        this.methodology.setExampleSeen();
    }
    showExample(callback) {
        this.methodology.showExample(callback);
    }
    isFinished() {
        return this.isLevelFinished.get();
    }
    play(callback) {
        this.callback = callback;
        this.userdefinedUnitTests = [];
        this.coveredCandidates = [];
        this.currentCandidate = this.findSimplestPassingCandidate();
        this.failingTestResult = this.findFailingTestResult();
        this.newUnitTest = undefined;
        this.previousCandidate = undefined;
        this.showCurrentLevelPanel();
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
    showCurrentLevelPanel() {
        new Panel('Current Level', [new Paragraph().appendText(this.description())]).show();
    }
    showUnitTestsPanel() {
        new Panel('Unit Tests', this.userdefinedUnitTests.length === 0
            ? ['You have not written any unit tests yet.']
            : this.userdefinedUnitTests.map(unitTest => new Div().appendText(unitTest.toString()).addClass('new', unitTest === this.newUnitTest))).show();
        this.newUnitTest = undefined;
    }
    menu() {
        this.showPanels();
        this.showMenuMessage();
    }
    showPanels() {
        this.methodology.showPanelsOnMenu(this.useCase.specification(), this.currentCandidate, this.previousCandidate, this.useCase.perfectCandidate, this.coveredCandidates);
        this.previousCandidate = undefined;
        this.showUnitTestsPanel();
    }
    showMenuMessage() {
        new HumanMessage([
            new Paragraph().appendChildren([
                new Button().setTitle('I want to add a unit test').appendText('Add unit test').onClick(() => this.startAddUnitTestFlow()),
                new Button().setTitle('I want to see a hint').appendText('Show hint').onClick(() => this.showHint()),
                new Button().setTitle('I want to submit the unit tests').appendText('Submit unit tests').onClick(() => this.prepareSubmitUnitTests()),
            ]),
        ]).add();
    }
    startAddUnitTestFlow() {
        this.showConfirmStartUnitTestFlowMessage();
        this.showFormUnitTestMessage();
    }
    showConfirmStartUnitTestFlowMessage() {
        new ComputerMessage(['Which unit test do you want to add?']).add();
    }
    showFormUnitTestMessage() {
        const parameterFields = this.useCase.parameters.map(variable => variable.toHtml());
        const unitField = this.useCase.unit.toHtml();
        const submitButton = new Input().setType('submit').setValue('I want to add this unit test');
        const cancelButton = new Button()
            .appendText('Cancel')
            .setTitle('I don\'t want to add a unit test now')
            .onClick(() => this.cancelAddUnitTestFlow())
            .addClass('cancel');
        const buttonBlock = new Paragraph().appendChildren([submitButton, cancelButton]);
        new HumanMessage([
            new Form()
                .onSubmit(() => this.prepareAddUnitTest())
                .appendChildren([...parameterFields, unitField, buttonBlock]),
        ]).add();
    }
    showAddUnitTestMessage(unitTest) {
        new HumanMessage([
            'I want to add the following unit test.',
            unitTest.toString(),
        ]).replace();
    }
    showConfirmCancelAddUnitTestFlowMessage() {
        new ComputerMessage(['Ok.']).add();
    }
    cancelAddUnitTestFlow() {
        this.showConfirmCancelAddUnitTestFlowMessage();
        this.menu();
    }
    prepareAddUnitTest() {
        const argumentList = this.useCase.parameters.map(parameter => parameter.getValue());
        const expected = this.useCase.unit.getValue();
        const unitTest = new UnitTest(this.useCase.parameters, argumentList, this.useCase.unit, expected);
        this.showAddUnitTestMessage(unitTest);
        new ProcessingMessage('Processing this new unit test...', () => this.addUnitTest(unitTest), 1000 + this.userdefinedUnitTests.length * 500).add();
    }
    addUnitTest(unitTest) {
        const unitTestIsCorrect = new TestResult(this.useCase.perfectCandidate, unitTest).passes;
        if (unitTestIsCorrect) {
            this.newUnitTest = unitTest;
            this.userdefinedUnitTests.push(unitTest);
            this.coveredCandidates.push(this.findCoveredCandidate(unitTest));
            this.previousCandidate = this.currentCandidate;
            if (new TestResult(this.currentCandidate, unitTest).passes)
                this.methodology.showUselessUnitTestMessage();
            else {
                this.methodology.showUsefulUnitTestMessage();
                this.currentCandidate = this.findSimplestPassingCandidate();
                this.failingTestResult = this.findFailingTestResult();
            }
        }
        else
            this.methodology.showIncorrectUnitTestMessage();
        this.menu();
    }
    showHint() {
        if (this.failingTestResult)
            this.methodology.showHintMessage(this.currentCandidate, this.failingTestResult);
        else
            this.methodology.showNoHintMessage();
        this.menu();
    }
    prepareSubmitUnitTests() {
        new ProcessingMessage('Checking...', () => this.submitUnitTests(), 1000 + this.userdefinedUnitTests.length * 500).add();
    }
    submitUnitTests() {
        if (this.failingTestResult) {
            this.methodology.showBugFoundMessage(this.currentCandidate, this.failingTestResult);
            this.menu();
        }
        else
            this.end();
    }
    end() {
        this.isLevelFinished.set();
        this.methodology.showEndMessage();
        this.callback();
    }
}

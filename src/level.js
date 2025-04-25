import { Candidate } from './candidate.js';
import { HumanMessage, CheckingMessage, Panel } from './frame.js';
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
        this.previousCandidates = [];
        this.numberOfSubmissions = 0;
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
        this.previousCandidates = [];
        this.numberOfSubmissions = 0;
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
        const passingCandidates = this.useCase.candidates
            .filter(candidate => candidate.failCount(this.userdefinedUnitTests) === 0);
        const passingImperfectCandidates = passingCandidates
            .filter(candidate => !this.useCase.perfectCandidates.includes(candidate));
        if (passingImperfectCandidates.length === 0)
            return Random.elementFrom(this.useCase.perfectCandidates);
        const simplestPassingCandidates = this.findSimplestCandidates(passingImperfectCandidates);
        return Random.elementFrom(simplestPassingCandidates);
    }
    findCoveredCandidate(unitTests) {
        const passingCandidates = this.useCase.amputeesOfPerfectCandidate
            .filter(candidate => candidate.failCount(unitTests) === 0);
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
            : this.userdefinedUnitTests.map(unitTest => new Div().appendText(unitTest.toString()).addClass(unitTest === this.newUnitTest ? 'new' : ''))).show();
        this.newUnitTest = undefined;
    }
    menu() {
        this.showPanels();
        this.showMenuMessage();
    }
    showPanels() {
        this.methodology.showPanelsOnMenu(this.useCase.specification(), this.currentCandidate, this.previousCandidates, this.useCase.perfectCandidate, this.coveredCandidates);
        this.showUnitTestsPanel();
    }
    showMenuMessage() {
        const fields = [...this.useCase.parameters, this.useCase.unit].map(variable => variable.toHtml());
        const submitButton = new Input().setType('submit').setValue('I want to add this unit test');
        new HumanMessage([
            new Form()
                .onSubmit(formData => this.prepareAddUnitTest(formData))
                .appendChildren(fields)
                .appendChild(new Paragraph().appendChild(submitButton)),
            new Div().appendText('OR').addClass('or'),
            new Paragraph().appendChild(new Button().appendText('I want to submit the unit tests').onClick(() => this.prepareSubmitUnitTests())),
        ]).add();
    }
    prepareAddUnitTest(formData) {
        const argumentList = this.useCase.parameters.map(parameter => parameter.getInput(formData.get(parameter.name)));
        const expected = this.useCase.unit.getInput(formData.get(this.useCase.unit.name));
        const unitTest = new UnitTest(this.useCase.parameters, argumentList, this.useCase.unit, expected);
        new HumanMessage([unitTest.toString()]).add();
        new CheckingMessage('Checking the new unit test', 'I checked the new unit test', () => this.addUnitTest(unitTest), 2000 + this.userdefinedUnitTests.length * 500).add();
    }
    addUnitTest(unitTest) {
        const unitTestIsCorrect = new TestResult(this.useCase.perfectCandidate, unitTest).passes;
        if (unitTestIsCorrect) {
            this.newUnitTest = unitTest;
            this.userdefinedUnitTests.push(unitTest);
            this.coveredCandidates.push(this.findCoveredCandidate(this.userdefinedUnitTests));
            this.previousCandidates.push(this.currentCandidate);
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
    prepareSubmitUnitTests() {
        new CheckingMessage('Checking the unit tests', 'I checked the unit tests', () => this.submitUnitTests(), 2000 + this.userdefinedUnitTests.length * 500).add();
    }
    submitUnitTests() {
        this.numberOfSubmissions += 1;
        if (this.failingTestResult) {
            this.methodology.showBugFoundMessage(this.currentCandidate, this.failingTestResult);
            this.menu();
        }
        else
            this.end();
    }
    levelFinishedValue() {
        return this.numberOfSubmissions;
    }
    end() {
        this.isLevelFinished.set(this.levelFinishedValue());
        this.coveredCandidates = [];
        this.previousCandidates = [];
        this.showPanels();
        this.methodology.showEndMessage();
        this.processCallback();
    }
    processCallback() {
        this.callback();
    }
}

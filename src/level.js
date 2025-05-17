import { Candidate } from './candidate.js';
import { HumanMessage, CheckingMessage, Panel, ComputerMessage } from './frame.js';
import { Button, Div, Form, Input, Paragraph } from './html.js';
import { TestResult } from './test-result.js';
import { UnitTest } from './unit-test.js';
import { Completed } from './completed.js';
export class Level {
    constructor(methodology, useCase) {
        this.humanUnitTests = [];
        this.previousCandidate = undefined;
        this.coveredCandidate = undefined;
        this.currentCandidate = new Candidate([]);
        this.failingTestResult = undefined;
        this.newUnitTest = undefined;
        this.numberOfSubmissions = 0;
        this.methodology = methodology;
        this.useCase = useCase;
        this.isLevelFinished = new Completed(this.description());
        this.exampleGuidance = methodology.exampleGuidanceGenerator(useCase);
    }
    nextGuidance() {
        const text = this.exampleGuidance.next();
        return text.done ? '' : text.value;
    }
    description() {
        return `${this.methodology.name()} - ${this.useCase.name()}`;
    }
    isFinished() {
        return this.isLevelFinished.get();
    }
    reset() {
        this.humanUnitTests = [];
        this.previousCandidate = undefined;
        this.coveredCandidate = undefined;
        this.currentCandidate = this.methodology.findSimplestPassingCandidate(this.useCase.candidates, this.useCase.perfectCandidates, this.humanUnitTests);
        this.failingTestResult = this.methodology.findFailingTestResult(this.currentCandidate, this.useCase.hints, this.useCase.minimalUnitTests);
        this.newUnitTest = undefined;
        this.numberOfSubmissions = 0;
    }
    play(callback) {
        this.callback = callback;
        this.reset();
        this.showCurrentLevelPanel();
        const firstMessage = this.nextGuidance();
        if (firstMessage)
            new ComputerMessage([firstMessage]).add();
        const secondMessage = this.nextGuidance();
        if (secondMessage)
            new ComputerMessage([secondMessage]).add();
        this.methodology.showWelcomeMessage();
        this.menu();
    }
    showCurrentLevelPanel() {
        new Panel('Current Level', [new Paragraph().appendText(this.description())]).show();
    }
    showUnitTestsPanel() {
        new Panel('Unit Tests', this.humanUnitTests.length === 0
            ? ['You have not written any unit tests yet.']
            : this.humanUnitTests.map(unitTest => new Div().appendText(unitTest.toString()).addClass(unitTest === this.newUnitTest ? 'new' : ''))).show();
        this.newUnitTest = undefined;
    }
    menu() {
        this.showPanels();
        this.showMenuMessage();
    }
    showPanels() {
        this.methodology.showPanelsOnMenu(this.useCase.specification(), this.currentCandidate, this.previousCandidate, this.useCase.perfectCandidate, this.coveredCandidate);
        this.showUnitTestsPanel();
    }
    showMenuMessage() {
        const message = this.nextGuidance();
        if (message)
            new ComputerMessage([message]).add();
        const buttonToClick = this.nextGuidance();
        const fields = [...this.useCase.parameters, this.useCase.unit].map(variable => variable
            .setValue(buttonToClick === 'I want to add this unit test' ? this.nextGuidance() : '')
            .setDisabled(buttonToClick !== '')
            .toHtml());
        const submitButton = new Input()
            .setType('submit')
            .setValue('I want to add this unit test')
            .setDisabled(buttonToClick === 'I want to submit the unit tests');
        new HumanMessage([
            new Form()
                .onSubmit(formData => this.prepareAddUnitTest(formData))
                .appendChildren(fields)
                .appendChild(new Paragraph().appendChild(submitButton)),
            new Div().appendText('OR').addClass('or'),
            new Paragraph().appendChild(new Button()
                .appendText('I want to submit the unit tests')
                .onClick(() => this.prepareSubmitUnitTests())
                .setDisabled(buttonToClick === 'I want to add this unit test')),
        ]).add();
    }
    prepareAddUnitTest(formData) {
        const argumentList = this.useCase.parameters.map(parameter => parameter.getInput(formData.get(parameter.name)));
        const expected = this.useCase.unit.getInput(formData.get(this.useCase.unit.name));
        const unitTest = new UnitTest(this.useCase.parameters, argumentList, this.useCase.unit, expected);
        new HumanMessage([unitTest.toString()]).add();
        new CheckingMessage('Checking the new unit test', 'I checked the new unit test', () => this.addUnitTest(unitTest), 2000 + this.humanUnitTests.length * 500).add();
    }
    addUnitTest(unitTest) {
        const unitTestIsCorrect = new TestResult(this.useCase.perfectCandidate, unitTest).passes;
        if (unitTestIsCorrect) {
            this.newUnitTest = unitTest;
            this.humanUnitTests.push(unitTest);
            this.previousCandidate = this.currentCandidate;
            this.coveredCandidate = this.methodology.findSimplestCoveredCandidate(this.useCase.amputeesOfPerfectCandidate, this.humanUnitTests);
            if (new TestResult(this.currentCandidate, unitTest).passes)
                this.methodology.showUselessUnitTestMessage();
            else {
                this.methodology.showUsefulUnitTestMessage();
                this.currentCandidate = this.methodology.findSimplestPassingCandidate(this.useCase.candidates, this.useCase.perfectCandidates, this.humanUnitTests);
                this.failingTestResult = this.methodology.findFailingTestResult(this.currentCandidate, this.useCase.hints, this.useCase.minimalUnitTests);
            }
        }
        else
            this.methodology.showIncorrectUnitTestMessage();
        this.menu();
    }
    prepareSubmitUnitTests() {
        new CheckingMessage('Checking the unit tests', 'I checked the unit tests', () => this.submitUnitTests(), 2000 + this.humanUnitTests.length * 500).add();
    }
    submitUnitTests() {
        this.numberOfSubmissions += 1;
        if (this.failingTestResult) {
            const numberOfUnitTestsStillNeeded = this.methodology.findNumberOfUnitTestsStillNeeded(this.humanUnitTests, this.useCase.subsetsOfMinimalUnitTests, this.useCase.candidates, this.useCase.perfectCandidates.length);
            this.methodology.showBugFoundMessage(this.currentCandidate, this.failingTestResult, numberOfUnitTestsStillNeeded);
            this.menu();
        }
        else
            this.end();
    }
    levelFinishedValue() {
        const isExample = this.nextGuidance();
        if (isExample)
            return 1;
        return this.numberOfSubmissions;
    }
    end() {
        this.isLevelFinished.set(this.levelFinishedValue());
        this.previousCandidate = undefined;
        this.coveredCandidate = undefined;
        this.showPanels();
        this.methodology.showEndMessage();
        this.processCallback();
    }
    processCallback() {
        const isExample = this.nextGuidance();
        if (isExample)
            new ComputerMessage([`Congratulations, now you understand the basics of ${this.methodology.name()}.`]).add();
        this.callback();
    }
}

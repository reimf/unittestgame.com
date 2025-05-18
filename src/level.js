import { Candidate } from './candidate.js';
import { HumanMessage, CheckingMessage, Panel, ComputerMessage } from './frame.js';
import { Button, Div, Form, Input, Paragraph } from './html.js';
import { Random } from './random.js';
import { TestResult } from './test-result.js';
import { UnitTest } from './unit-test.js';
import { Completed } from './completed.js';
export class Level {
    constructor(useCase) {
        this.humanUnitTests = [];
        this.previousCandidate = undefined;
        this.coveredCandidate = undefined;
        this.currentCandidate = new Candidate([]);
        this.failingTestResult = undefined;
        this.newUnitTest = undefined;
        this.numberOfSubmissions = 0;
        this.useCase = useCase;
        this.isLevelFinished = new Completed(this.description());
        this.exampleGuidance = this.exampleGuidanceGenerator(useCase);
    }
    findSimplestCandidate(candidates) {
        const simplestCandidates = candidates.reduce((simplestCandidatesSoFar, candidate) => {
            if (simplestCandidatesSoFar.length === 0)
                return [candidate];
            const sign = this.compareComplexity(candidate, simplestCandidatesSoFar[0]);
            if (sign < 0)
                return [candidate];
            if (sign > 0)
                return simplestCandidatesSoFar;
            return [...simplestCandidatesSoFar, candidate];
        }, []);
        return Random.elementFrom(simplestCandidates);
    }
    findSimplestPassingCandidate(candidates, perfectCandidates, unitTests) {
        const passingCandidates = candidates.filter(candidate => candidate.passes(unitTests));
        const passingImperfectCandidates = passingCandidates.filter(candidate => !perfectCandidates.includes(candidate));
        if (passingImperfectCandidates.length === 0)
            return Random.elementFrom(perfectCandidates);
        return this.findSimplestCandidate(passingImperfectCandidates);
    }
    findSimplestCoveredCandidate(amputeesOfPerfectCandidate, unitTests) {
        return unitTests.reduce((simplestCoveredCandidateSoFar, unitTest) => {
            const passingCandidates = amputeesOfPerfectCandidate.filter(candidate => candidate.passes([unitTest]));
            const simplestPassingCandidate = this.findSimplestCandidate(passingCandidates);
            return simplestPassingCandidate.combine(simplestCoveredCandidateSoFar);
        }, this.findSimplestPassingCandidate(amputeesOfPerfectCandidate, [], []));
    }
    findFailingTestResult(candidate, hints, minimalUnitTestsList) {
        for (const unitTests of [hints, minimalUnitTestsList]) {
            const failingUnitTests = candidate.failingTestResults(unitTests);
            if (failingUnitTests.length > 0)
                return Random.elementFrom(failingUnitTests);
        }
        return undefined;
    }
    findNumberOfUnitTestsStillNeeded(unitTests, subsetsOfMinimalUnitTests, candidates, numberOfPerfectCandidates) {
        for (const subsetOfMinimalUnitTests of subsetsOfMinimalUnitTests) {
            const extendedUnitTests = [...unitTests, ...subsetOfMinimalUnitTests];
            const passingCandidates = candidates.filter(candidate => candidate.passes(extendedUnitTests));
            if (passingCandidates.length === numberOfPerfectCandidates)
                return subsetOfMinimalUnitTests.length;
        }
        return Infinity;
    }
    nextGuidance(callback = () => { }) {
        const value = this.exampleGuidance.next();
        const text = value.done ? '' : value.value;
        if (text != '')
            callback(text);
        return text;
    }
    description() {
        return `${this.name()} - ${this.useCase.name()}`;
    }
    isFinished() {
        return this.isLevelFinished.get();
    }
    reset() {
        this.humanUnitTests = [];
        this.previousCandidate = undefined;
        this.coveredCandidate = undefined;
        this.currentCandidate = this.findSimplestPassingCandidate(this.useCase.candidates, this.useCase.perfectCandidates, this.humanUnitTests);
        this.failingTestResult = this.findFailingTestResult(this.currentCandidate, this.useCase.hints, this.useCase.minimalUnitTests);
        this.newUnitTest = undefined;
        this.numberOfSubmissions = 0;
    }
    play(callback) {
        this.callback = callback;
        this.reset();
        this.showCurrentLevelPanel();
        this.nextGuidance(message => new ComputerMessage([message]).add());
        this.nextGuidance(message => new ComputerMessage([message]).add());
        this.showWelcomeMessage();
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
        this.showPanelsOnMenu(this.useCase.specification(), this.currentCandidate, this.previousCandidate, this.useCase.perfectCandidate, this.coveredCandidate);
        this.showUnitTestsPanel();
    }
    showMenuMessage() {
        this.nextGuidance(message => new ComputerMessage([message]).add());
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
            this.coveredCandidate = this.findSimplestCoveredCandidate(this.useCase.amputeesOfPerfectCandidate, this.humanUnitTests);
            if (new TestResult(this.currentCandidate, unitTest).passes)
                this.showUselessUnitTestMessage();
            else {
                this.showUsefulUnitTestMessage();
                this.currentCandidate = this.findSimplestPassingCandidate(this.useCase.candidates, this.useCase.perfectCandidates, this.humanUnitTests);
                this.failingTestResult = this.findFailingTestResult(this.currentCandidate, this.useCase.hints, this.useCase.minimalUnitTests);
            }
        }
        else
            this.showIncorrectUnitTestMessage();
        this.menu();
    }
    prepareSubmitUnitTests() {
        new CheckingMessage('Checking the unit tests', 'I checked the unit tests', () => this.submitUnitTests(), 2000 + this.humanUnitTests.length * 500).add();
    }
    submitUnitTests() {
        this.numberOfSubmissions += 1;
        if (this.failingTestResult) {
            const numberOfUnitTestsStillNeeded = this.findNumberOfUnitTestsStillNeeded(this.humanUnitTests, this.useCase.subsetsOfMinimalUnitTests, this.useCase.candidates, this.useCase.perfectCandidates.length);
            this.showBugFoundMessage(this.currentCandidate, this.failingTestResult, numberOfUnitTestsStillNeeded);
            this.menu();
        }
        else
            this.end();
    }
    levelFinishedValue() {
        this.nextGuidance(text => this.numberOfSubmissions = Number(text));
        return this.numberOfSubmissions;
    }
    end() {
        this.isLevelFinished.set(this.levelFinishedValue());
        this.previousCandidate = undefined;
        this.coveredCandidate = undefined;
        this.showPanels();
        this.showEndMessage();
        this.processCallback();
    }
    processCallback() {
        this.nextGuidance(text => new ComputerMessage([text]).add());
        this.callback();
    }
}

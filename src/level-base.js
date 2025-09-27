import { Candidate } from './candidate.js';
import { Completed } from './completed.js';
import { HumanMessage, CheckingMessage, Panel, ComputerMessage } from './frame.js';
import { Button, Code, Div, Form, Input, Paragraph } from './html.js';
import { Random } from './random.js';
import { TestResult } from './test-result.js';
import { UnitTest } from './unit-test.js';
export class Level {
    locale;
    useCase;
    levelNumber;
    totalNumberOfLevels;
    isLevelFinished;
    exampleStrings;
    callback;
    humanUnitTests = [];
    previousCandidate = undefined;
    coveredCandidate = undefined;
    currentCandidate = new Candidate([]);
    failingTestResult = undefined;
    newUnitTest = undefined;
    numberOfSubmissions = 0;
    constructor(locale, useCase, levelNumber, totalNumberOfLevels) {
        this.locale = locale;
        this.useCase = useCase;
        this.levelNumber = levelNumber;
        this.totalNumberOfLevels = totalNumberOfLevels;
        this.isLevelFinished = new Completed(`level-${this.identifier()}-${useCase.identifier()}-finished`);
        this.exampleStrings = [...this.exampleStringGenerator(useCase)];
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
    nextExampleString() {
        return this.exampleStrings.shift() || '';
    }
    showExampleMessage() {
        const exampleMessage = this.nextExampleString();
        if (exampleMessage)
            new ComputerMessage([exampleMessage]).add();
    }
    description() {
        const emoji = ['🔓', '🥇', '🥈', '🥉'].at(this.isFinished()) || '🥉';
        return this.locale.level(this.levelNumber, this.totalNumberOfLevels, this.name(), this.useCase.name(), emoji);
    }
    isFinished() {
        return this.isLevelFinished.get();
    }
    initialize() {
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
        this.initialize();
        this.showCurrentLevelPanel();
        this.showExampleMessage();
        this.showExampleMessage();
        this.showWelcomeMessage();
        this.menu();
    }
    showCurrentLevelPanel() {
        new Panel('current-level', this.locale.currentLevel(), [this.description()]).show();
    }
    showUnitTestsPanel(unitTests, newUnitTest) {
        new Panel('unit-tests', this.locale.unitTests(), unitTests.length === 0
            ? [new Paragraph().appendText(this.locale.youHaveNotWrittenAnyUnitTestsYet())]
            : [new Code().appendText(unitTests.map(unitTest => unitTest.toString() + '// ' + (unitTest === newUnitTest ? 'new' : 'old')).join('\n'))]).show();
    }
    menu() {
        this.showPanels();
        this.showMenuMessage();
    }
    showPanels() {
        this.showSpecificationPanel(this.useCase.specification());
        this.showCurrentFunctionPanel(this.currentCandidate, this.previousCandidate);
        this.showCodeCoveragePanel(this.useCase.perfectCandidate, this.coveredCandidate);
        this.showUnitTestsPanel(this.humanUnitTests, this.newUnitTest);
        this.newUnitTest = undefined;
    }
    showMenuMessage() {
        this.showExampleMessage();
        const buttonText = this.nextExampleString();
        const elementsToShow = [];
        const disableIWantToAddThisUnitTest = buttonText !== '' && buttonText !== this.locale.iWantToAddThisUnitTest().toString();
        const variables = [...this.useCase.parameters, this.useCase.unit];
        if (buttonText === this.locale.iWantToAddThisUnitTest().toString())
            variables.forEach(variable => variable.setValue(this.nextExampleString()).setDisabled(true));
        else
            variables.forEach(variable => variable.setValue(''));
        const addThisUnitTestButton = new Input()
            .setType('submit')
            .setValue(this.locale.iWantToAddThisUnitTest().toString())
            .setDisabled(disableIWantToAddThisUnitTest);
        const form = new Form()
            .onSubmit(formData => this.prepareAddUnitTest(formData))
            .appendChildren(variables.map(variable => variable.toHtml()))
            .appendChild(addThisUnitTestButton);
        elementsToShow.push(form);
        const divider = new Div().appendText(this.locale.or()).addClass('or');
        elementsToShow.push(divider);
        const disableIWantToSubmitTheUnitTests = buttonText !== '' && buttonText !== this.locale.iWantToSubmitTheUnitTests().toString();
        const submitTheUnitTestsButton = new Button()
            .appendText(this.locale.iWantToSubmitTheUnitTests())
            .onClick(() => this.prepareSubmitUnitTests())
            .setDisabled(disableIWantToSubmitTheUnitTests);
        elementsToShow.push(submitTheUnitTestsButton);
        new HumanMessage(elementsToShow).add();
    }
    prepareAddUnitTest(formData) {
        const argumentList = this.useCase.parameters.map(parameter => parameter.getInput(formData.get(parameter.name)));
        const expected = this.useCase.unit.getInput(formData.get(this.useCase.unit.name));
        const unitTest = new UnitTest(this.useCase.parameters, argumentList, this.useCase.unit, expected);
        new HumanMessage([unitTest.toString()]).add();
        new CheckingMessage(this.locale.checkingTheNewUnitTest(), this.locale.iCheckedTheNewUnitTest(), () => this.addUnitTest(unitTest), 2000 + this.humanUnitTests.length * 500).add();
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
        new CheckingMessage(this.locale.checkingTheUnitTests(), this.locale.iCheckedTheUnitTests(), () => this.submitUnitTests(), 2000 + this.humanUnitTests.length * 500).add();
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
    end() {
        if (this.exampleStrings)
            this.numberOfSubmissions = 1;
        this.isLevelFinished.set(this.numberOfSubmissions);
        this.previousCandidate = undefined;
        this.coveredCandidate = undefined;
        this.showPanels();
        this.showEndMessage();
        this.showExampleMessage();
        this.callback();
    }
}

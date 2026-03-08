import { Candidate } from './candidate.js';
import { Completed } from './completed.js';
import { HumanMessage, CheckingMessage, Panel, ComputerMessage } from './frame.js';
import { Button, Code, Div, Form, Input, ListItem, OrderedList, Paragraph } from './html.js';
import { Random } from './random.js';
import { TestResult } from './test-result.js';
import { UnitTest } from './unit-test.js';
export class Level {
    locale;
    levelNumber;
    isLevelFinished;
    exampleStrings;
    isExample;
    *exampleStringGenerator() { }
    callback;
    humanUnitTests = [];
    perfectCandidate;
    currentCandidate = new Candidate([]);
    previousCurrentCandidate = undefined;
    failingTestResult = undefined;
    lastUnitTest = undefined;
    numberOfSubmissions = 0;
    parameters = this.getParameters();
    unit = this.getUnit();
    candidates = [...this.generateCandidates(this.getCandidateElements(), [])];
    minimalUnitTests = [...this.generateMinimalUnitTests()];
    subsetsOfMinimalUnitTests = [...this.generateSubsets(this.minimalUnitTests)];
    perfectCandidates = this.findPerfectCandidates();
    hints = [...this.generateHints()];
    constructor(locale, levelNumber) {
        this.locale = locale;
        this.levelNumber = levelNumber;
        this.isLevelFinished = new Completed(`level-${this.identifier()}-finished`);
        this.exampleStrings = [...this.exampleStringGenerator()];
        this.isExample = this.exampleStrings.length > 0;
        this.perfectCandidate = this.getRandomElementFrom(this.perfectCandidates);
    }
    getRandomElementFrom(elements) {
        if (this.isExample)
            return elements[0];
        return Random.elementFrom(elements);
    }
    *generateCandidates(listOfListOfLines, lines) {
        if (listOfListOfLines.length > 0) {
            const [firstListOfLines, ...remainingListOfListOfLines] = listOfListOfLines;
            if (firstListOfLines)
                for (const line of firstListOfLines)
                    yield* this.generateCandidates(remainingListOfListOfLines, [...lines, line]);
        }
        else
            yield this.createCandidate(lines);
    }
    createCandidate(lines) {
        const parameterList = this.parameters.map(parameter => parameter.name).join(', ');
        const indentedLines = [
            `function ${this.unit.name}(${parameterList}) {`,
            ...lines.map(line => line ? '  ' + line : ''),
            '}',
        ];
        return new Candidate(indentedLines);
    }
    *generateMinimalUnitTests() {
        for (const [argumentList, expected] of this.minimalUnitTestGenerator()) {
            yield new UnitTest(this.parameters, argumentList, this.unit, expected);
        }
    }
    *generateSubsets(unitTests) {
        const n = unitTests.length;
        const total = 1 << n;
        for (let size = 0; size <= n; size++) {
            for (let mask = 0; mask < total; mask++) {
                const subset = unitTests.filter((_, i) => mask & (1 << i));
                if (subset.length === size)
                    yield subset;
            }
        }
    }
    *generateHints() {
        const perfectCandidate = this.perfectCandidates[0];
        for (const argumentList of this.hintGenerator())
            yield new UnitTest(this.parameters, argumentList, this.unit, perfectCandidate.execute(argumentList));
    }
    findPerfectCandidates() {
        return this.candidates.filter(candidate => candidate.passes(this.minimalUnitTests));
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
        return this.getRandomElementFrom(simplestCandidates);
    }
    findSimplestPassingCandidate(candidates, perfectCandidates, unitTests) {
        const passingCandidates = candidates.filter(candidate => candidate.passes(unitTests));
        const passingImperfectCandidates = passingCandidates.filter(candidate => !perfectCandidates.includes(candidate));
        if (passingImperfectCandidates.length === 0)
            return this.getRandomElementFrom(perfectCandidates);
        return this.findSimplestCandidate(passingImperfectCandidates);
    }
    findFailingTestResult(candidate, hints, minimalUnitTestsList) {
        for (const unitTests of [hints, minimalUnitTestsList]) {
            const failingUnitTests = candidate.failingTestResults(unitTests);
            if (failingUnitTests.length > 0)
                return this.getRandomElementFrom(failingUnitTests);
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
    showMessageIfExample() {
        if (this.isExample)
            new ComputerMessage([this.nextExampleString()]).add();
    }
    emoji(nextLevel) {
        return this === nextLevel ? '▶️' : ['🔒', '🥇', '🥈', '🥉'].at(this.isFinished()) || '🥉';
    }
    description() {
        return this.locale.level(this.levelNumber, this.name());
    }
    isFinished() {
        return this.isLevelFinished.get();
    }
    initialize() {
        this.humanUnitTests = [];
        this.currentCandidate = this.findSimplestPassingCandidate(this.candidates, this.perfectCandidates, this.humanUnitTests);
        this.previousCurrentCandidate = undefined;
        this.failingTestResult = this.findFailingTestResult(this.currentCandidate, this.hints, this.minimalUnitTests);
        this.lastUnitTest = undefined;
        this.numberOfSubmissions = 0;
    }
    play(callback) {
        this.callback = callback;
        this.initialize();
        this.showCurrentLevelPanel();
        this.showMessageIfExample();
        this.showMessageIfExample();
        this.showWelcomeMessage();
        this.menu();
    }
    showCurrentLevelPanel() {
        new Panel('current-level', this.locale.currentLevel(), [this.description()]).show();
    }
    showUnitTestsPanel(unitTests, lastUnitTest) {
        new Panel('unit-tests', this.locale.unitTests(), unitTests.length === 0
            ? [new Paragraph().appendText(this.locale.youHaveNotWrittenAnyUnitTestsYet())]
            : [new OrderedList().appendChildren(unitTests.map(unitTest => new ListItem().appendChild(new Code().appendChild(unitTest.toHtml().addClass(unitTest === lastUnitTest ? 'new' : 'old')))))]).show();
    }
    menu() {
        this.showPanels();
        this.showMenuMessage();
    }
    showPanels() {
        this.showSpecificationPanel(this.specification());
        this.showCurrentFunctionPanel(this.currentCandidate, this.previousCurrentCandidate);
        this.showUnitTestsPanel(this.humanUnitTests, this.lastUnitTest);
    }
    showMenuMessage() {
        this.showMessageIfExample();
        const addThisUnitTestButton = new Input()
            .setType('submit')
            .setValue(this.locale.iWantToAddThisUnitTest());
        const submitTheUnitTestsButton = new Button()
            .appendText(this.locale.iWantToSubmitTheUnitTests())
            .onClick(() => this.prepareSubmitUnitTests());
        const variables = [...this.parameters, this.unit];
        variables.forEach(variable => variable.setDisabled(this.isExample));
        if (this.isExample) {
            const buttonText = this.nextExampleString();
            if (buttonText === this.locale.iWantToAddThisUnitTest()) {
                variables.forEach(variable => variable.setValue(this.nextExampleString()));
                submitTheUnitTestsButton.setDisabled(true);
            }
            if (buttonText === this.locale.iWantToSubmitTheUnitTests()) {
                variables.forEach(variable => variable.setValue(""));
                addThisUnitTestButton.setDisabled(true);
            }
        }
        const form = new Form()
            .onSubmit(formData => this.prepareAddUnitTest(formData))
            .appendChildren(variables.map(variable => variable.toHtml()))
            .appendChild(addThisUnitTestButton);
        const divider = new Div().appendText(this.locale.or()).addClass('or');
        new HumanMessage([form, divider, submitTheUnitTestsButton]).add();
    }
    prepareAddUnitTest(formData) {
        const argumentList = this.parameters.map(parameter => parameter.getInput(formData.get(parameter.name)));
        const expected = this.unit.getInput(formData.get(this.unit.name));
        const unitTest = new UnitTest(this.parameters, argumentList, this.unit, expected);
        new HumanMessage([new Code().appendChild(unitTest.toHtml().addClass('new'))]).add();
        new CheckingMessage(this.locale.checkingTheNewUnitTest(), this.locale.iCheckedTheNewUnitTest(), () => this.addUnitTest(unitTest), 500 + this.humanUnitTests.length * 250).add();
    }
    addUnitTest(unitTest) {
        const unitTestIsCorrect = new TestResult(this.perfectCandidate, unitTest).passes;
        if (unitTestIsCorrect) {
            this.lastUnitTest = unitTest;
            this.humanUnitTests.push(unitTest);
            this.previousCurrentCandidate = this.currentCandidate;
            if (new TestResult(this.currentCandidate, unitTest).passes)
                this.showUselessUnitTestMessage();
            else {
                this.showUsefulUnitTestMessage();
                this.currentCandidate = this.findSimplestPassingCandidate(this.candidates, this.perfectCandidates, this.humanUnitTests);
                this.failingTestResult = this.findFailingTestResult(this.currentCandidate, this.hints, this.minimalUnitTests);
            }
        }
        else
            this.showIncorrectUnitTestMessage();
        this.menu();
    }
    prepareSubmitUnitTests() {
        new CheckingMessage(this.locale.checkingTheUnitTests(), this.locale.iCheckedTheUnitTests(), () => this.submitUnitTests(), 500 + this.humanUnitTests.length * 250).add();
    }
    submitUnitTests() {
        this.numberOfSubmissions += 1;
        if (this.failingTestResult) {
            const numberOfUnitTestsStillNeeded = this.findNumberOfUnitTestsStillNeeded(this.humanUnitTests, this.subsetsOfMinimalUnitTests, this.candidates, this.perfectCandidates.length);
            this.showBugFoundMessage(this.currentCandidate, this.failingTestResult, numberOfUnitTestsStillNeeded);
            this.menu();
        }
        else
            this.end();
    }
    end() {
        if (this.isExample)
            this.numberOfSubmissions = 1;
        this.isLevelFinished.set(this.numberOfSubmissions);
        this.previousCurrentCandidate = undefined;
        this.showPanels();
        this.showEndMessage();
        this.showMessageIfExample();
        this.callback();
    }
    showWelcomeMessage() {
        new ComputerMessage([this.locale.step1TDD()]).add();
        new ComputerMessage([this.locale.step2TDD()]).add();
        new ComputerMessage([this.locale.step3TDD()]).add();
    }
    showSpecificationPanel(specification) {
        new Panel('specification', this.locale.specification(), [specification]).show();
    }
    getDifferenceCurrentHtml(currentCandidate, previousCurrentCandidate) {
        if (previousCurrentCandidate)
            return currentCandidate.toHtmlWithPreviousCurrent(previousCurrentCandidate);
        return new Paragraph().appendText(this.locale.noPreviousCurrentFunction());
    }
    showCurrentFunctionPanel(currentCandidate, previousCurrentCandidate) {
        new Panel('current-function', this.locale.currentFunction(), [
            currentCandidate.toHtml()
        ]).show();
        new Panel('difference-current-function', this.locale.differenceFromThePreviousCurrentFunction(), [
            this.getDifferenceCurrentHtml(currentCandidate, previousCurrentCandidate)
        ]).show();
    }
    showIncorrectUnitTestMessage() {
        new ComputerMessage([this.locale.iDidNotAddTheUnitTest()]).add();
    }
    showUselessUnitTestMessage() {
        new ComputerMessage([this.locale.iAddedTheUnitTestButTheCurrentFunctionAlreadyPassedThisUnitTest()]).add();
        new ComputerMessage([this.locale.tryToWriteUnitTestsThatDoNotPass()]).add();
    }
    showUsefulUnitTestMessage() {
        new ComputerMessage([this.locale.iAddedTheUnitTestAndImprovedTheCurrentFunction()]).add();
    }
    showBugFoundMessage(_currentCandidate, failingTestResult, numberOfUnitTestsStillNeeded) {
        new ComputerMessage([this.locale.theCurrentFunctionIsNotAccordingToTheSpecification()]).add();
        new ComputerMessage([this.locale.itProducesTheFollowingIncorrectResult(), new Code().appendChild(failingTestResult.toHtml().addClass('new'))]).add();
        new ComputerMessage([this.locale.writeAUnitTestThatIsAccordingToTheSpecification(numberOfUnitTestsStillNeeded)]).add();
    }
    showEndMessage() {
        new ComputerMessage([this.locale.theCurrentFunctionIsIndeedAccordingToTheSpecification()]).add();
        new ComputerMessage([this.locale.wellDone()]).add();
    }
    compareComplexity(candidate, otherCandidate) {
        return candidate.compareComplexity(otherCandidate);
    }
}

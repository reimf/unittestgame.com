import { Candidate } from './candidate.js';
import { Completed } from './completed.js';
import { Message, HumanMessage, CheckingMessage, Panel, ComputerMessage } from './frame.js';
import { Button, Code, Div, Form, Input, ListItem, OrderedList, Paragraph } from './html.js';
import { Random } from './random.js';
import { TestResult } from './test-result.js';
import { UnitTest } from './unit-test.js';
export class Level {
    locale;
    levelNumber;
    // the following attributes should all be private, but some are public because they are used in tests
    isLevelFinished;
    parameters;
    unit;
    candidates;
    minimalUnitTests;
    subsetsOfMinimalUnitTests;
    perfectCandidates;
    perfectCandidate;
    hints;
    callback;
    humanUnitTests = [];
    currentCandidate = new Candidate([]);
    previousCandidate = undefined;
    failingTestResult = undefined;
    lastUnitTest = undefined;
    numberOfSubmissions = 0;
    constructor(locale, levelNumber) {
        this.locale = locale;
        this.levelNumber = levelNumber;
        this.isLevelFinished = new Completed(`level-${this.identifier()}-finished`);
        this.parameters = this.getParameters();
        this.unit = this.getUnit();
        this.candidates = [...this.generateCandidates(this.getCandidateElements(), [])];
        this.minimalUnitTests = [...this.generateMinimalUnitTests()];
        this.subsetsOfMinimalUnitTests = [...this.generateSubsets(this.minimalUnitTests)];
        this.perfectCandidates = this.findPerfectCandidates();
        this.perfectCandidate = this.getRandomElementFrom(this.perfectCandidates);
        this.hints = [...this.generateHints()];
    }
    getRandomElementFrom(elements) {
        if (this.isExample())
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
            const sign = candidate.compareComplexity(simplestCandidatesSoFar[0]);
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
    isExample() {
        return false;
    }
    beforeMenuMessage() {
        return '';
    }
    isFormDataOk(_formData) {
        return true;
    }
    showMessageIfExample(message) {
        if (this.isExample())
            new ComputerMessage([message]).add();
    }
    emoji(nextLevel) {
        return this === nextLevel ? '▶️' : ['🔒', '🥇', '🥈', '🥉'].at(this.isFinished()) || '👎';
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
        this.previousCandidate = undefined;
        this.failingTestResult = this.findFailingTestResult(this.currentCandidate, this.hints, this.minimalUnitTests);
        this.lastUnitTest = undefined;
        this.numberOfSubmissions = 0;
    }
    play(callback) {
        this.callback = callback;
        this.initialize();
        this.showMessageIfExample(this.locale.inThisLevelYouOnlyHaveToFollowTheInstructions());
        this.showMessageIfExample(this.locale.meanwhileKeepAnEyeOnTheChangesInTheSidebar());
        this.showStepMessages();
        this.menu();
    }
    showUnitTestsPanel() {
        new Panel('unit-tests', this.locale.unitTests(), this.humanUnitTests.length > 0
            ? [new OrderedList().appendChildren(this.humanUnitTests.map(humanUnitTest => new ListItem().appendChild(new Code().appendChild(humanUnitTest.toHtml().addClass(humanUnitTest === this.lastUnitTest ? 'new' : 'old')))))]
            : [new Paragraph().appendText(this.locale.youHaveNotWrittenAnyUnitTestsYet())]).show();
    }
    menu() {
        this.showPanels();
        this.showMenuMessage();
    }
    showPanels() {
        this.showSpecificationPanel();
        this.showCurrentFunctionPanel();
        this.showUnitTestsPanel();
    }
    showMenuMessage() {
        this.showMessageIfExample(this.beforeMenuMessage());
        const addThisUnitTestButton = new Input()
            .setType('submit')
            .setValue(this.locale.iWantToAddThisUnitTest());
        const submitTheUnitTestsButton = new Button()
            .appendText(this.locale.iWantToSubmitTheUnitTests())
            .onClick(() => this.prepareSubmitUnitTests());
        const variables = [...this.parameters, this.unit];
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
        Message.addToLast([new Code().appendChild(unitTest.toHtml().addClass('new'))]);
        if (this.isFormDataOk(formData))
            new CheckingMessage(this.locale.checkingTheNewUnitTest(), this.locale.iCheckedTheNewUnitTest(), () => this.addUnitTest(unitTest), 500 + this.humanUnitTests.length * 250).add();
    }
    addUnitTest(unitTest) {
        const unitTestIsCorrect = new TestResult(this.perfectCandidate, unitTest).passes;
        if (unitTestIsCorrect) {
            this.lastUnitTest = unitTest;
            this.humanUnitTests.push(unitTest);
            this.previousCandidate = this.currentCandidate;
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
        if (this.isFormDataOk(new Map()))
            new CheckingMessage(this.locale.checkingTheUnitTests(), this.locale.iCheckedTheUnitTests(), () => this.submitUnitTests(), 500 + this.humanUnitTests.length * 250).add();
    }
    submitUnitTests() {
        this.numberOfSubmissions += 1;
        if (this.failingTestResult) {
            this.showBugFoundMessage();
            this.menu();
        }
        else
            this.end();
    }
    end() {
        if (this.isExample())
            this.numberOfSubmissions = 1;
        this.isLevelFinished.set(this.numberOfSubmissions);
        this.previousCandidate = undefined;
        this.showPanels();
        this.showEndMessage();
        this.showMessageIfExample(this.locale.congratulationsNowYouUnderstandTheBasicsOfTestDrivenDevelopment());
        this.callback();
    }
    showStepMessages() {
        new ComputerMessage([this.locale.step1()]).add();
        new ComputerMessage([this.locale.step2()]).add();
        new ComputerMessage([this.locale.step3()]).add();
    }
    showSpecificationPanel() {
        const title = `${this.locale.specification()} (${this.description()})`;
        new Panel('specification', title, [this.specification()]).show();
    }
    showCurrentFunctionPanel() {
        new Panel('current-function', this.locale.currentFunction(), [
            this.currentCandidate.toHtml()
        ]).show();
        new Panel('difference-current-function', this.locale.differenceFromThePreviousFunction(), [
            this.previousCandidate
                ? this.currentCandidate.toHtmlWithPrevious(this.previousCandidate)
                : new Paragraph().appendText(this.locale.noPreviousFunction())
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
    showBugFoundMessage() {
        const numberOfUnitTestsStillNeeded = this.findNumberOfUnitTestsStillNeeded(this.humanUnitTests, this.subsetsOfMinimalUnitTests, this.candidates, this.perfectCandidates.length);
        new ComputerMessage([this.locale.theCurrentFunctionIsNotAccordingToTheSpecification()]).add();
        new ComputerMessage([this.locale.itProducesTheFollowingIncorrectResult(), new Code().appendChild(this.failingTestResult.toHtml().addClass('new'))]).add();
        new ComputerMessage([this.locale.writeAUnitTestThatIsAccordingToTheSpecification()]).add();
        new ComputerMessage([this.locale.iThinkYouNeedAtLeastThisManyMoreUnitTests(numberOfUnitTestsStillNeeded)]).add();
    }
    showEndMessage() {
        new ComputerMessage([this.locale.theCurrentFunctionIsIndeedAccordingToTheSpecification()]).add();
        new ComputerMessage([this.locale.wellDone()]).add();
    }
}

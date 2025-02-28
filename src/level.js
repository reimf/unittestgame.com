import { UnitTest } from './unit_test.js';
import { Random } from './random.js';
import { Button, Code, Form, Input, Paragraph } from './html.js';
import { Panel, HumanMessage, ComputerMessage } from './frame.js';
import { Candidate } from './candidate.js';
import { TestResult } from './test_result.js';
export class Level {
    constructor(index) {
        this.index = index;
        this.PERFECTSCORE = 100;
        this.PENALTYINCORRECTUNITTEST = 5;
        this.PENALTYHINT = 10;
        this.PENALTYBUG = 20;
        this.MINIMUMSCORE = 0;
        this.name = this.constructor.name;
        this.parameters = this.getParameters();
        this.unit = this.getUnit();
        this.candidates = [...this.generateCandidates(this.getCandidateElements())];
        this.minimalUnitTests = this.getMinimalUnitTests(this.parameters, this.unit);
        this.perfectCandidates = this.findPerfectCandidates();
        this.perfectCandidate = Random.elementFrom(this.perfectCandidates);
        this.hints = [...this.generateHints()];
        // the following attributes are assigned a dummy value; the starting values are assigned in the play method
        this.userdefinedUnitTests = [];
        this.currentCandidate = this.findSimplestPassingCandidate();
        this.failingTestResult = this.findFailingTestResult();
        this.score = this.PERFECTSCORE;
        this.callback = () => undefined;
        this.checkAllMinimumUnitTestsAreNeeded();
    }
    get description() {
        return `Level ${this.index} - ${this.name}`;
    }
    getHighScore(storage) {
        return Number(storage.getItem(`${this.name}.score`));
    }
    saveScore(storage) {
        if (this.score > this.getHighScore(storage))
            storage.setItem(`${this.name}.score`, `${this.score}`);
    }
    *generateCandidates(listOfListOfLines, lines = []) {
        if (listOfListOfLines.length > 0) {
            const [firstListOfLines, ...remainingListOfListOfLines] = listOfListOfLines;
            for (const line of firstListOfLines)
                yield* this.generateCandidates(remainingListOfListOfLines, [...lines, line]);
        }
        else
            yield this.createCandidate(lines);
    }
    createCandidate(lines) {
        const parameterList = this.parameters.map((parameter) => parameter.name).join(', ');
        const code = [
            `function ${this.unit.name}(${parameterList}) {`,
            ...lines.filter((line) => line !== '').map((line) => '  ' + line),
            '}',
        ].join('\n');
        return new Candidate(code);
    }
    *generateHints() {
        for (const argumentList of this.hintGenerator())
            yield new UnitTest(this.parameters, argumentList, this.unit, this.perfectCandidate.execute(argumentList));
    }
    findPassingCandidates(unitTests) {
        return this.candidates.filter(candidate => candidate.failCount(unitTests) == 0);
    }
    findPerfectCandidates() {
        const perfectCandidates = this.findPassingCandidates(this.minimalUnitTests);
        if (perfectCandidates.length === 0)
            throw new Error(`There is no perfect function for level ${this.name}.`);
        return perfectCandidates;
    }
    checkAllMinimumUnitTestsAreNeeded() {
        for (const unitTest of this.minimalUnitTests) {
            const allMinusOneUnitTests = this.minimalUnitTests.filter(otherUnitTest => otherUnitTest !== unitTest);
            const almostPerfectCandidates = this.findPassingCandidates(allMinusOneUnitTests);
            if (almostPerfectCandidates.length === this.perfectCandidates.length) {
                throw new Error(`Unit test ${unitTest} is not needed.\n${almostPerfectCandidates[0]}`);
            }
        }
    }
    findSimplestPassingCandidate() {
        const passingCandidates = this.findPassingCandidates(this.userdefinedUnitTests);
        const complexities = passingCandidates.map(candidate => candidate.complexity);
        const minimumComplexity = Math.min(...complexities);
        const simplestCandidates = passingCandidates.filter(candidate => candidate.complexity === minimumComplexity);
        return Random.elementFrom(simplestCandidates);
    }
    findFailingTestResult() {
        const failingHints = this.currentCandidate.failingTestResults(this.hints);
        if (failingHints.length > 0)
            return Random.elementFrom(failingHints);
        const failingMinimalUnitTests = this.currentCandidate.failingTestResults(this.minimalUnitTests);
        if (failingMinimalUnitTests.length > 0)
            return Random.elementFrom(failingMinimalUnitTests);
        return undefined;
    }
    showScorePanel() {
        new Panel('Score', [
            new Paragraph().appendText(`${this.description}: ${this.score}%`),
        ]).show();
    }
    showContractMessage() {
        new ComputerMessage([
            new Paragraph().appendLines([
                'In the sidebar you see the specification,',
                'the unit tests you have written (none yet) and',
                'my take at the function.',
                'Add failing unit tests and I will improve the function such that it passes.',
                'Submit the unit tests if the function is according to the specification.',
            ]),
        ]).show();
    }
    showUnitTestsPanel() {
        new Panel('Unit Tests', this.userdefinedUnitTests.length === 0
            ? [new Paragraph().appendText('You have not written any unit tests yet.')]
            : this.userdefinedUnitTests.map(unitTest => new Paragraph().appendText(unitTest.toString()))).show();
    }
    showCurrentCandidatePanel() {
        new Panel('Current Function', [
            new Code().appendText(this.currentCandidate.toString()),
        ]).show();
    }
    showMenuMessage() {
        new HumanMessage([
            new Button().onClick(() => this.startAddUnitTestFlow()).appendText(`I want to add a unit test (-${this.PENALTYINCORRECTUNITTEST}% on error)`),
            new Button().onClick(() => this.showHint()).appendText(`I want to see a hint for a unit test (-${this.PENALTYHINT}%)`),
            new Button().onClick(() => this.submit()).appendText(`I want to submit the unit tests (-${this.PENALTYBUG}% on error)`),
            new Button().onClick(() => this.end()).appendText(`I want to exit this level (${this.MINIMUMSCORE}% on error)`),
        ]).show();
    }
    showScoreZeroMessage() {
        new ComputerMessage([
            new Paragraph().appendLines([
                'You have to retry this level,',
                'because your score dropped to 0%.'
            ])
        ]).show();
    }
    play(callback) {
        this.callback = callback;
        this.score = this.PERFECTSCORE;
        this.userdefinedUnitTests = [];
        this.improveCurrentCandidate();
        this.showSpecificationPanel();
        this.showContractMessage();
        this.menu();
    }
    improveCurrentCandidate() {
        this.currentCandidate = this.findSimplestPassingCandidate();
        this.failingTestResult = this.findFailingTestResult();
    }
    menu() {
        this.showUnitTestsPanel();
        this.showCurrentCandidatePanel();
        if (this.score <= this.MINIMUMSCORE) {
            this.showScoreZeroMessage();
            this.score = this.MINIMUMSCORE;
            this.showScorePanel();
            this.callback();
        }
        else {
            this.showScorePanel();
            this.showMenuMessage();
        }
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
                .appendChildren([...this.parameters, this.unit].map(variable => variable.toHtml()))
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
    showUselessUnitTestMessage() {
        new ComputerMessage([
            new Paragraph().appendLines([
                'I added the unit test,',
                'but the current function already passed this unit test,',
                'so I didn\'t improve the function.'
            ]),
        ]).show();
    }
    showUsefulUnitTestMessage() {
        new ComputerMessage([
            new Paragraph().appendText('I added the unit test and I improved the function.'),
        ]).show();
    }
    showIncorrectUnitTestMessage() {
        new ComputerMessage([
            new Paragraph().appendText('I did NOT add the unit test, because it is NOT according to the specification.'),
            new Paragraph().appendText(`The cost for trying to add an incorrect unit test is ${this.PENALTYINCORRECTUNITTEST}%.`),
        ]).show();
        this.score -= this.PENALTYINCORRECTUNITTEST;
    }
    addUnitTest() {
        const argumentList = this.parameters.map(parameter => parameter.value());
        const expected = this.unit.value();
        const unitTest = new UnitTest(this.parameters, argumentList, this.unit, expected);
        this.showAddUnitTestMessage(unitTest);
        const unitTestIsCorrect = new TestResult(this.perfectCandidate, unitTest).passes;
        if (unitTestIsCorrect) {
            this.userdefinedUnitTests.push(unitTest);
            const currentCandidateAlreadyPasses = new TestResult(this.currentCandidate, unitTest).passes;
            if (currentCandidateAlreadyPasses)
                this.showUselessUnitTestMessage();
            else {
                this.showUsefulUnitTestMessage();
                this.improveCurrentCandidate();
            }
        }
        else
            this.showIncorrectUnitTestMessage();
        this.menu();
    }
    showHintMessage(unitTest) {
        new ComputerMessage([
            new Paragraph().appendText('A failing unit test for the current function is the following.'),
            new Paragraph().appendText(unitTest.toString()),
            new Paragraph().appendText(`The cost for this hint is ${this.PENALTYHINT}%.`),
        ]).show();
        this.score -= this.PENALTYHINT;
    }
    showNoHintMessage() {
        new ComputerMessage([
            new Paragraph().appendText('I can\'t think of a failing unit test for the current function.'),
            new Paragraph().appendText(`The cost for this hint is ${this.PENALTYHINT}%.`),
        ]).show();
        this.score -= this.PENALTYHINT;
    }
    showHint() {
        if (this.failingTestResult)
            this.showHintMessage(this.failingTestResult.unitTest);
        else
            this.showNoHintMessage();
        this.menu();
    }
    showBugFoundMessage(testResult) {
        new ComputerMessage([
            new Paragraph().appendLines([
                'The current function is NOT according to the specification.',
                'It produces the following incorrect output:'
            ]),
            new Paragraph().appendText(testResult.toString()),
            new Paragraph().appendText(`The cost for submitting when there is still an error is ${this.PENALTYBUG}%.`),
        ]).show();
        this.score -= this.PENALTYBUG;
    }
    submit() {
        if (this.failingTestResult) {
            this.showBugFoundMessage(this.failingTestResult);
            this.menu();
        }
        else
            this.end();
    }
    showUnsuccessfulEndMessage() {
        new ComputerMessage([
            new Paragraph().appendLines([
                'The current function is NOT according to the specification.',
                `Your score is ${this.score}%.`
            ]),
        ]).show();
    }
    showSuccessfulEndMessage() {
        new ComputerMessage([
            new Paragraph().appendLines([
                'The current function is according to the specification.',
                `Your score is ${this.score}%.`
            ]),
        ]).show();
    }
    end() {
        if (this.failingTestResult) {
            this.score = this.MINIMUMSCORE;
            this.showScorePanel();
            this.showUnsuccessfulEndMessage();
        }
        else
            this.showSuccessfulEndMessage();
        this.saveScore(localStorage);
        this.callback();
    }
}

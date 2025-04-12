import { Level } from './level.js';
import { ComputerMessage, HumanMessage } from './frame.js';
import { Button, Form, Input, Paragraph } from './html.js';
export class Example extends Level {
    constructor(methodology, useCase) {
        super(methodology, useCase);
        this.exampleAnswers = this.useCase.exampleAnswerGenerator();
    }
    nextAnswer() {
        const answer = this.exampleAnswers.next();
        return answer.done ? '' : answer.value;
    }
    play(callback) {
        new ComputerMessage(['In this example you only have to press the green buttons.']).add();
        new ComputerMessage(['Meanwhile, keep an eye on the changes in the sidebar marked in yellow.']).add();
        super.play(callback);
    }
    showMenuMessage() {
        const answer = this.nextAnswer();
        new HumanMessage([
            new Paragraph().appendChildren([
                new Button().setTitle('I want to add a unit test').appendText('Add unit test').onClick(() => this.startAddUnitTestFlow()).setDisabled(answer !== 'Add unit test'),
                new Button().setTitle('I want to see a hint').appendText('Show hint').onClick(() => this.showHint()).setDisabled(answer !== 'Show hint'),
                new Button().setTitle('I want to submit the unit tests').appendText('Submit unit tests').onClick(() => this.prepareSubmitUnitTests()).setDisabled(answer !== 'Submit unit tests'),
            ]),
        ]).add();
    }
    showFormUnitTestMessage() {
        const parameterFields = this.useCase.parameters.map(variable => variable.setValue(this.nextAnswer()).setDisabled().toHtml());
        const unitField = this.useCase.unit.setValue(this.nextAnswer()).setDisabled().toHtml();
        const answer = this.nextAnswer();
        const submitButton = new Input().setType('submit').setValue('I want to add this unit test').setDisabled(answer !== 'I want to add this unit test');
        const cancelButton = new Button()
            .appendText('Cancel')
            .setTitle('I don\'t want to add a unit test now')
            .onClick(() => this.cancelAddUnitTestFlow())
            .setDisabled(answer !== 'Cancel');
        const buttonBlock = new Paragraph().appendChildren([submitButton, cancelButton]);
        new HumanMessage([
            new Form()
                .onSubmit(formData => this.prepareAddUnitTest(formData))
                .appendChildren([...parameterFields, unitField, buttonBlock]),
        ]).add();
    }
    processCallback() {
        new ComputerMessage([`Congratulations, now you understand the basics of ${this.methodology.name()}.`]).add();
        super.processCallback();
    }
}

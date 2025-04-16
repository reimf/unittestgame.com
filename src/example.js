import { Level } from './level.js';
import { ComputerMessage, HumanMessage } from './frame.js';
import { Button, Div, Form, Input, Paragraph } from './html.js';
export class Example extends Level {
    constructor(methodology, useCase) {
        super(methodology, useCase);
        this.exampleAnswers = this.useCase.exampleAnswerGenerator();
        this.exampleMessages = this.methodology.exampleMessageGenerator();
    }
    nextAnswer() {
        const answer = this.exampleAnswers.next();
        return answer.done ? '' : answer.value;
    }
    nextMessage() {
        const message = this.exampleMessages.next();
        return message.done ? new ComputerMessage([]) : message.value;
    }
    play(callback) {
        new ComputerMessage(['In this example you only have to press the green buttons.']).add();
        new ComputerMessage(['Meanwhile, keep an eye on the changes in the sidebar marked in yellow.']).add();
        super.play(callback);
    }
    showMenuMessage() {
        this.nextMessage().add();
        const buttonToClick = this.nextAnswer();
        const fields = [...this.useCase.parameters, this.useCase.unit].map(variable => variable.setValue(buttonToClick === 'I want to add this unit test' ? this.nextAnswer() : '').setDisabled().toHtml());
        const submitButton = new Input().setType('submit').setValue('I want to add this unit test').setDisabled(buttonToClick !== 'I want to add this unit test');
        new HumanMessage([
            new Form()
                .onSubmit(formData => this.prepareAddUnitTest(formData))
                .appendChildren(fields)
                .appendChild(new Paragraph().appendChild(submitButton)),
            new Div().appendText('OR').addClass('or'),
            new Paragraph().appendChild(new Button().appendText('I want to submit the unit tests').onClick(() => this.prepareSubmitUnitTests()).setDisabled(buttonToClick !== 'I want to submit the unit tests')),
        ]).add();
    }
    processCallback() {
        new ComputerMessage([`Congratulations, now you understand the basics of ${this.methodology.name()}.`]).add();
        super.processCallback();
    }
}

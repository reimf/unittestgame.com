import { Level } from './level.js';
import { ComputerMessage, HumanMessage } from './frame.js';
import { Button, Div, Form, Input, Paragraph } from './html.js';
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
        const buttonToClick = this.nextAnswer();
        const parameterFields = this.useCase.parameters.map(variable => variable.setValue(buttonToClick === 'I want to add this unit test' ? this.nextAnswer() : '').setDisabled().toHtml());
        const unitField = this.useCase.unit.setValue(buttonToClick === 'I want to add this unit test' ? this.nextAnswer() : '').setDisabled().toHtml();
        const submitButton = new Input().setType('submit').setValue('I want to add this unit test').setDisabled(buttonToClick !== 'I want to add this unit test');
        const buttonBlock = new Paragraph().appendChild(submitButton);
        new HumanMessage([
            new Form()
                .onSubmit(formData => this.prepareAddUnitTest(formData))
                .appendChildren([...parameterFields, unitField, buttonBlock]),
            new Div().appendText('OR').addClass('or'),
            new Paragraph().appendChild(new Button().appendText('I want to submit the unit tests').onClick(() => this.prepareSubmitUnitTests()).setDisabled(buttonToClick !== 'I want to submit the unit tests')),
        ]).add();
    }
    processCallback() {
        new ComputerMessage([`Congratulations, now you understand the basics of ${this.methodology.name()}.`]).add();
        super.processCallback();
    }
}

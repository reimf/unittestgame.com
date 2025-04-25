import { Level } from './level.js';
import { ComputerMessage, HumanMessage } from './frame.js';
import { Button, Div, Form, Input, Paragraph } from './html.js';
export class Example extends Level {
    constructor(methodology, useCase) {
        super(methodology, useCase);
        this.exampleGuidance = methodology.exampleGuidanceGenerator(useCase);
    }
    nextGuide() {
        const answer = this.exampleGuidance.next();
        return answer.done ? '' : answer.value;
    }
    play(callback) {
        new ComputerMessage(['In this example you only have to press the green buttons.']).add();
        new ComputerMessage(['Meanwhile, keep an eye on the changes in the sidebar marked in yellow.']).add();
        super.play(callback);
    }
    showMenuMessage() {
        const message = this.nextGuide();
        new ComputerMessage([message]).add();
        const buttonToClick = this.nextGuide();
        const fields = [...this.useCase.parameters, this.useCase.unit].map(variable => variable.setValue(buttonToClick === 'I want to add this unit test' ? this.nextGuide() : '').setDisabled().toHtml());
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
    levelFinishedValue() {
        return 1;
    }
    processCallback() {
        new ComputerMessage([`Congratulations, now you understand the basics of ${this.methodology.name()}.`]).add();
        super.processCallback();
    }
}

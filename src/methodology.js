import { ComputerMessage } from './frame.js';
import { NumberVariable } from './variable.js';
import { Button, Form, Input, Paragraph } from './html.js';
import { HumanMessage } from './frame.js';
export class Methodology {
    getExampleSeen(storage) {
        return storage.getItem(this.name()) === 'true';
    }
    setExampleSeen(storage) {
        storage.setItem(this.name(), 'true');
    }
    showIncorrectUnitTestMessage(penaltyIncorrectUnitTest) {
        new ComputerMessage(['I did NOT add the unit test, because it is NOT correct.']).add();
        new ComputerMessage([`The cost for trying to add an incorrect unit test is ${penaltyIncorrectUnitTest}%.`]).add();
    }
    showMinimumScoreEndMessage(score) {
        new ComputerMessage([
            'You have to retry this level, ' +
                `because your score dropped to ${score}%.`,
        ]).add();
    }
    showFormUnitTestMessage(valueA, valueB, valueDivide, callback) {
        const parameterA = new NumberVariable('a', 'a').setValue(valueA).setReadonly().toHtml();
        const parameterB = new NumberVariable('b', 'b').setValue(valueB).setReadonly().toHtml();
        const unit = new NumberVariable('a / b', 'divide').setValue(valueDivide).setReadonly().toHtml();
        const submitButton = new Input().setType('submit').setValue('I want to add this unit test');
        const cancelButton = new Button()
            .setDisabled()
            .setTitle('I don\'t want to add a unit test now')
            .appendText('Cancel')
            .addClass('cancel');
        const buttonBlock = new Paragraph().appendChildren([submitButton, cancelButton]);
        new HumanMessage([
            new Form()
                .onSubmit((event) => {
                event.preventDefault();
                new HumanMessage([
                    'I want to add the following unit test.',
                    `divide(${valueA}, ${valueB}) === ${valueDivide}`,
                ]).replace();
                callback();
            })
                .appendChildren([parameterA, parameterB, unit, buttonBlock]),
        ]).add();
    }
}

import { ButtonMessage, ComputerMessage } from './frame.js';
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
        new ButtonMessage(`divide(${valueA}, ${valueB}) === ${valueDivide}`, () => callback()).add();
        // const parameterA = new NumberVariable('a', 'a').setValue(valueA).setReadonly().toHtml()
        // const parameterB = new NumberVariable('b', 'b').setValue(valueB).setReadonly().toHtml()
        // const unit = new NumberVariable('a / b', 'divide').setValue(valueDivide).setReadonly().toHtml()
        // const submitButton = new Input().setType('submit').setValue('I want to add this unit test')
        // const cancelButton = new Button()
        //     .setDisabled()
        //     .setTitle('I don\'t want to add a unit test now')
        //     .appendText('Cancel')
        //     .addClass('cancel')
        // const buttonBlock = new Paragraph().appendChildren([submitButton, cancelButton])
        // new HumanMessage([
        //     new Form().onSubmit((_event: Event) => callback()).appendChildren([parameterA, parameterB, unit, buttonBlock]),
        // ]).add()
    }
}

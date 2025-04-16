import { Level } from './level.js'
import { ComputerMessage, HumanMessage } from './frame.js'
import { Button, Div, Form, Input, Paragraph } from './html.js'
import { Methodology } from './methodology.js'
import { UseCase } from './use_case.js'

export class Example extends Level {
    private readonly exampleAnswers: Generator<string>

    constructor(methodology: Methodology, useCase: UseCase) {
        super(methodology, useCase)
        this.exampleAnswers = this.useCase.exampleAnswerGenerator()
    }

    private nextAnswer(): string {
        const answer = this.exampleAnswers.next()
        return answer.done ? '' : answer.value
    }

    public play(callback: () => void): void {
        new ComputerMessage(['In this example you only have to press the green buttons.']).add()
        new ComputerMessage(['Meanwhile, keep an eye on the changes in the sidebar marked in yellow.']).add()
        super.play(callback)
    }

    protected showMenuMessage(): void {
        const buttonToClick = this.nextAnswer()
        const parameterFields = this.useCase.parameters.map(variable => variable.setValue(buttonToClick === 'I want to add this unit test' ? this.nextAnswer() : '').setDisabled().toHtml())
        const unitField = this.useCase.unit.setValue(buttonToClick === 'I want to add this unit test' ? this.nextAnswer() : '').setDisabled().toHtml()
        const submitButton = new Input().setType('submit').setValue('I want to add this unit test').setDisabled(buttonToClick !== 'I want to add this unit test')
        const buttonBlock = new Paragraph().appendChild(submitButton)
        new HumanMessage([
            new Form()
                .onSubmit(formData => this.prepareAddUnitTest(formData))
                .appendChildren([...parameterFields, unitField, buttonBlock]),
            new Div().appendText('OR').addClass('or'),
            new Paragraph().appendChild(
                new Button().appendText('I want to submit the unit tests').onClick(() => this.prepareSubmitUnitTests()).setDisabled(buttonToClick !== 'I want to submit the unit tests')
            ),
        ]).add()
    }

    protected processCallback(): void {
        new ComputerMessage([`Congratulations, now you understand the basics of ${this.methodology.name()}.`]).add()
        super.processCallback()
    }
}

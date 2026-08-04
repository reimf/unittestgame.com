import { Div, Html, Input, Label, Paragraph } from './html.js'
import { ConversationText } from './conversation-language-base.js'

export type Value = boolean|number|string

export abstract class Variable {
    public readonly label: ConversationText
    public readonly name: string

    protected constructor(label: ConversationText, name: string) {
        this.label = label
        this.name = name
    }

    protected buildLabelDiv(): Div {
        return new Div().appendText(this.label)
    }

    public abstract getInput(value: string): Value
    public abstract toHtml(): Html
    public abstract format(value: Value): string
}

export class RadioVariable extends Variable {
    private readonly texts: readonly ConversationText[]

    public constructor(label: ConversationText, name: string, texts: readonly ConversationText[]) {
        super(label, name)
        this.texts = texts
    }

    public getInput(value: string): string {
        return value
    }

    public toHtml(): Html {
        const radioButtons = this.texts.map(text => {
            const input = new Input()
              .setType('radio')
              .setName(this.name)
              .setValue(text)
              .setRequired()
            return new Label().appendChild(input).appendText(text)
        })
        const paragraph = new Paragraph().appendChild(this.buildLabelDiv()).appendChildren(radioButtons)
        return paragraph
    }

    public format(value: string): string {
        return `"${value}"`
    }
}

export class BooleanVariable extends Variable {
    private readonly texts: readonly [ConversationText, ConversationText]

    public constructor(label: ConversationText, name: string, texts: readonly [ConversationText, ConversationText]) {
        super(label, name)
        this.texts = texts
    }

    public getInput(value: string): boolean {
        return value === 'true'
    }

    public toHtml(): Html {
        const radioButtons = [true, false].map((value, index) => {
            const input = new Input()
              .setType('radio')
              .setName(this.name)
              .setValue(`${value}`)
              .setRequired()
            return new Label().appendChild(input).appendText(this.texts[index]!)
        })
        const paragraph = new Paragraph().appendChild(this.buildLabelDiv()).appendChildren(radioButtons)
        return paragraph
    }

    public format(value: boolean): string {
        return `${value}`
    }
}

export class IntegerVariable extends Variable {
    public constructor(label: ConversationText, name: string) {
        super(label, name)
    }

    public getInput(value: string): number {
        return Number(value)
    }

    public toHtml(): Html {
        const input = new Input()
          .setType('number')
          .setName(this.name)
          .setRequired()
          .setPattern(/[0-9]{1,4}/)
          .setTitle('an integer number with at most 4 digits')
        const label = new Label().appendChild(this.buildLabelDiv()).appendChild(input)
        return new Paragraph().appendChild(label)
    }

    public format(value: string): string {
        return `${value}`
    }
}


import { Html, Input, Label, Paragraph, Span } from './html.js'
import { ConversationLanguage, ConversationText } from './conversation-language-base.js'

export type Value = boolean|number|string

export abstract class Variable {
    public readonly label: ConversationText
    public readonly name: string

    protected constructor(label: ConversationText, name: string) {
        this.label = label
        this.name = name
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
        const paragraph = new Paragraph().appendChild(new Span().appendText(this.label)).appendChildren(radioButtons)
        return paragraph
    }

    public format(value: string): string {
        return `"${value}"`
    }
}

export class BooleanVariable extends Variable {
    public constructor(label: ConversationText, name: string) {
        super(label, name)
    }

    public getInput(value: string): boolean {
        return value === 'true'
    }

    public toHtml(): Html {
        const radioButtons = [ConversationLanguage.bless('true'), ConversationLanguage.bless('false')].map(text => {
            const input = new Input()
              .setType('radio')
              .setName(this.name)
              .setValue(text)
              .setRequired()
            return new Label().appendChild(input).appendText(text)
        })
        const paragraph = new Paragraph().appendChild(new Span().appendText(this.label)).appendChildren(radioButtons)
        return paragraph
    }

    public format(value: boolean): string {
        return `${value}`
    }
}

export class TextVariable extends Variable {
    public constructor(label: ConversationText, name: string) {
        super(label, name)
    }

    public getInput(value: string): string {
        return value
    }

    public toHtml(): Html {
        const input = new Input()
          .setType('text')
          .setName(this.name)
          .setRequired()
          .setPattern(/.{1,10}/)
          .setTitle('a text with at most 10 characters')
        const label = new Label().appendChild(new Span().appendText(this.label)).appendChild(input)
        return new Paragraph().appendChild(label)
    }

    public format(value: string): string {
        return `"${value}"`
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
          .setType('text')
          .setName(this.name)
          .setRequired()
          .setPattern(/[0-9]{1,4}/)
          .setTitle('an integer number with at most 4 digits')
        const label = new Label().appendChild(new Span().appendText(this.label)).appendChild(input)
        return new Paragraph().appendChild(label)
    }

    public format(value: string): string {
        return `${value}`
    }
}


import { Html, Input, Label, Paragraph, Span } from './html.js'

export abstract class Variable {
    protected readonly label: string
    protected value: string = ''
    public readonly name: string
    protected disabled: boolean = false

    protected constructor(label: string, name: string) {
        this.label = label
        this.name = name
    }

    public setValue(value: string): this {
        this.value = value
        return this
    }

    public setDisabled(disabled: boolean = true): this {
        this.disabled = disabled
        return this
    }

    public abstract getInput(value: string): boolean | number | string
    public abstract toHtml(): Html
    public abstract format(value: boolean | number | string | undefined): string
}

export class RadioVariable extends Variable {
    private readonly texts: string[]

    public constructor(label: string, name: string, texts: string[]) {
        super(label, name)
        this.texts = texts
    }

    public getInput(value: string): string {
        return value
    }

    public toHtml(): Html {
        const radioButtons = this.texts.map(text => {
            const input = new Input().setType('radio').setName(this.name).setValue(text).setChecked(text === this.value).setDisabled(this.disabled).setRequired()
            const label = new Label().appendChild(input).appendText(text)
            return label
        })
        const paragraph = new Paragraph().appendChild(new Span().appendText(this.label)).appendChildren(radioButtons)
        return paragraph
    }

    public format(value: string): string {
        return value === undefined ? 'undefined' : `"${value}"`
    }
}

export class BooleanVariable extends Variable {
    public constructor(label: string, name: string) {
        super(label, name)
    }

    public getInput(value: string): boolean {
        return value === 'true'
    }

    public toHtml(): Html {
        const radioButtons = ['true', 'false'].map(text => {
            const input = new Input().setType('radio').setName(this.name).setValue(text).setChecked(text === this.value).setDisabled(this.disabled).setRequired()
            const label = new Label().appendChild(input).appendText(text)
            return label
        })
        const paragraph = new Paragraph().appendChild(new Span().appendText(this.label)).appendChildren(radioButtons)
        return paragraph
    }

    public format(value: boolean): string {
        return value === undefined ? 'undefined' : value.toString()
    }
}

export class TextVariable extends Variable {
    public constructor(label: string, name: string) {
        super(label, name)
    }

    public getInput(value: string): string {
        return value
    }

    public toHtml(): Html {
        const input = new Input().setType('text').setName(this.name).setAutocomplete(false).setValue(this.value).addClass(this.value === '' ? 'empty' : 'preset').setDisabled(this.disabled).setRequired()
        const label = new Label().appendChild(new Span().appendText(this.label)).appendChild(input)
        const paragraph = new Paragraph().appendChild(label)
        return paragraph
    }

    public format(value: string): string {
        return value === undefined ? 'undefined' : `"${value}"`
    }
}

export class IntegerVariable extends Variable {
    public constructor(label: string, name: string) {
        super(label, name)
    }

    public getInput(value: string): number {
        return Number(value)
    }

    public toHtml(): Html {
        const displayValue = this.value === '' ? '' : Number(this.value).toFixed()
        const input = new Input().setType('text').setName(this.name).setAutocomplete(false).setValue(displayValue).addClass(displayValue === '' ? 'empty' : 'preset').setDisabled(this.disabled).setRequired().setPattern('[0-9]+')
        const label = new Label().appendChild(new Span().appendText(this.label)).appendChild(input)
        const paragraph = new Paragraph().appendChild(label)
        return paragraph
    }

    public format(value: string): string {
        return value === undefined ? 'undefined' : `${value}`
    }
}

export class FloatVariable extends Variable {
    public constructor(label: string, name: string) {
        super(label, name)
    }

    public getInput(value: string): number {
        return Number(value)
    }

    public toHtml(): Html {
        const displayValue = this.value === '' ? '' : Number(this.value).toFixed(1)
        const input = new Input().setType('text').setName(this.name).setAutocomplete(false).setValue(displayValue).addClass(displayValue === '' ? 'empty' : 'preset').setDisabled(this.disabled).setRequired().setPattern('[0-9]+(\.[0-9])?')
        const label = new Label().appendChild(new Span().appendText(this.label)).appendChild(input)
        const paragraph = new Paragraph().appendChild(label)
        return paragraph
    }

    public format(value: string): string {
        return value === undefined ? 'undefined' : `${value}`
    }
}

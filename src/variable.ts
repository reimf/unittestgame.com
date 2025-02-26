import { Html, Input, Label, Paragraph } from './html.js'

export abstract class Variable {
    protected constructor(protected label: string, public name: string) { }

    public abstract value(): boolean | number | string
    public abstract toHtml(): Html
    public abstract format(value: boolean | number | string): string
}

export class RadioVariable extends Variable {
    public constructor(label: string, name: string, private texts: string[]) {
        super(label, name)
        this.texts = texts
    }

    public value(): string {
        const input = document.querySelector(`input[name="${this.name}"]:checked`) as HTMLInputElement
        return input.value
    }

    public toHtml(): Html {
        const radioButtons = this.texts.map(text => {
            const input = new Input().type('radio').name(this.name).value(text)
            const label = new Label().appendChild(input).appendText(text)
            return label
        })
        const paragraph = new Paragraph().appendText(this.label).appendChildren(radioButtons)
        return paragraph
    }

    public format(value: string): string {
        return `"${value}"`
    }
}

export class CheckboxVariable extends Variable {
    public constructor(label: string, name: string) {
        super(label, name)
    }

    public value(): boolean {
        const input = document.querySelector(`input[name="${this.name}"]`) as HTMLInputElement
        return input.checked
    }

    public toHtml(): Html {
        const input = new Input().type('checkbox').name(this.name)
        const label = new Label().appendChild(input).appendText(this.label)
        const paragraph = new Paragraph().appendChild(label)
        return paragraph
    }

    public format(value: boolean): string {
        return value.toString()
    }
}

export class TextVariable extends Variable {
    public constructor(label: string, name: string) {
        super(label, name)
    }

    public value(): string {
        const input = document.querySelector(`input[name="${this.name}"]`) as HTMLInputElement
        return input.value
    }

    public toHtml(): Html {
        const input = new Input().type('text').name(this.name).autocomplete(false)
        const label = new Label().appendText(this.label).appendChild(input)
        const paragraph = new Paragraph().appendChild(label)
        return paragraph
    }

    public format(value: string): string {
        return `"${value}"`
    }
}

export class NumberVariable extends Variable {
    public constructor(label: string, name: string) {
        super(label, name)
    }

    public value(): number {
        const input = document.querySelector(`input[name="${this.name}"]`) as HTMLInputElement
        return Number(input.value)
    }

    public toHtml(): Html {
        const input = new Input().type('number').name(this.name).autocomplete(false)
        const label = new Label().appendText(this.label).appendChild(input)
        const paragraph = new Paragraph().appendChild(label)
        return paragraph
    }

    public format(value: number): string {
        return value.toString()
    }
}

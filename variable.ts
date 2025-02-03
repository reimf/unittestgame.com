abstract class Variable {
    protected constructor(protected label: string, public name: string) { }

    public abstract value(): boolean | number | string
    public abstract toHtml(): Html
}

class RadioVariable extends Variable {
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
            return new Label().appendChild(input).appendText(text)
        })
        return new Div().appendText(this.label).appendChildren(radioButtons)
    }
}

class CheckboxVariable extends Variable {
    public constructor(label: string, name: string) {
        super(label, name)
    }

    public value(): boolean {
        const input = document.querySelector(`input[name="${this.name}"]`) as HTMLInputElement
        return input.checked
    }

    public toHtml(): Html {
        const input = new Input().type('checkbox').name(this.name)
        const label = new Label().appendChild(input)
        return new Div().appendChild(label).appendText(this.label)
    }
}

class TextVariable extends Variable {
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
        return new Div().appendChild(label)
    }
}

class NumberVariable extends Variable {
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
        return new Div().appendChild(label)
    }
}

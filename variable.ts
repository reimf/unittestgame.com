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
            const input = new Input('radio')
            input.name(this.name)
            input.value(text)
            const label = new Label()
            label.appendChild(input)
            label.appendText(text)
            return label
        })
        const div = new Div()
        div.appendText(this.label)
        div.appendChildren(radioButtons)
        return div
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
        const input = new Input('checkbox')
        input.name(this.name)
        const label = new Label()
        label.appendChild(input)
        label.appendText(this.label)
        const div = new Div()
        div.appendChild(label)
        return div
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
        const input = new Input('text')
        input.name(this.name)
        input.autocomplete(false)
        const label = new Label()
        label.appendText(this.label)
        label.appendChild(input)
        const div = new Div()
        div.appendChild(label)
        return div
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
        const input = new Input('number')
        input.name(this.name)
        input.autocomplete(false)
        const label = new Label()
        label.appendText(this.label)
        label.appendChild(input)
        const div = new Div()
        div.appendChild(label)
        return div
    }
}

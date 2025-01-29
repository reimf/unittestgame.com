abstract class Variable {
    protected label: string
    public name: string

    protected constructor(label: string, name: string) {
        this.label = label
        this.name = name
    }

    public abstract value(element: HTMLElement): boolean | number | string
    public abstract toHtmlElement(): HTMLElement
}

class RadioVariable extends Variable {
    private options: string[]

    public constructor(label: string, name: string, options: string[]) {
        super(label, name)
        this.options = options
    }

    public value(element: HTMLInputElement): boolean | number | string {
        const selector = `input[name="${element.name}"]:checked`
        const checked = document.querySelector(selector) as HTMLInputElement
        return checked.value
    }

    public toHtmlElement(): HTMLElement {
        const div = document.createElement('div')
        const text = document.createTextNode(this.label)
        div.appendChild(text)
        for (const option of this.options) {
            const input = document.createElement('input')
            input.type = 'radio'
            input.name = this.name
            input.value = option
            const label = document.createElement('label')
            label.appendChild(input)
            const text = document.createTextNode(option)
            label.appendChild(text)
            div.appendChild(label)
        }        
        return div
    }
}

class BooleanVariable extends Variable {
    public constructor(label: string, name: string) {
        super(label, name)
    }

    public value(element: HTMLInputElement): boolean | number | string {
        return element.checked
    }

    public toHtmlElement(): HTMLElement {
        const div = document.createElement('div')
        const label = document.createElement('label')
        const text = document.createTextNode(this.label)
        label.appendChild(text)
        const input = document.createElement('input')
        input.type = 'checkbox'
        input.name = this.name
        label.appendChild(input)
        div.appendChild(label)
        return div
    }
}

class StringVariable extends Variable {
    public constructor(label: string, name: string) {
        super(label, name)
    }

    public value(element: HTMLInputElement): boolean | number | string {
        return element.value
    }

    public toHtmlElement(): HTMLElement {
        const div = document.createElement('div')
        const label = document.createElement('label')
        const text = document.createTextNode(this.label)
        label.appendChild(text)
        const input = document.createElement('input')
        input.type = 'text'
        input.name = this.name
        input.autocomplete = 'off'
        label.appendChild(input)
        div.appendChild(label)
        return div
    }
}

class NumberVariable extends Variable {
    public constructor(label: string, name: string) {
        super(label, name)
    }

    public value(element: HTMLInputElement): boolean | number | string {
        return Number(element.value)
    }

    public toHtmlElement(): HTMLElement {
        const div = document.createElement('div')
        const label = document.createElement('label')
        const text = document.createTextNode(this.label)
        label.appendChild(text)
        const input = document.createElement('input')
        input.type = 'number'
        input.name = this.name
        input.autocomplete = 'off'
        label.appendChild(input)
        div.appendChild(label)
        return div
    }
}

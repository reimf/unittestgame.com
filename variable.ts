abstract class Variable {
    protected label: string
    public name: string

    protected constructor(label: string, name: string) {
        this.label = label
        this.name = name
    }

    public abstract value(element: HTMLElement): boolean | number | string
    public abstract toHtml(): Html
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

    public toHtml(): Html {
        const radioButtons = this.options.map(option => {
            const input = new Html('input').type('radio').name(this.name).accessKey(option).value(option)
            return new Html('label').appendChild(input).appendText(option)
        })
        return new Html('div').appendText(this.label).appendChildren(radioButtons)
    }
}

class BooleanVariable extends Variable {
    public constructor(label: string, name: string) {
        super(label, name)
    }

    public value(element: HTMLInputElement): boolean | number | string {
        return element.checked
    }

    public toHtml(): Html {
        const input = new Html('input').type('checkbox').name(this.name)
        const label = new Html('label').appendChild(input)
        return new Html('div').appendChild(label).appendText(this.label)
    }
}

class StringVariable extends Variable {
    public constructor(label: string, name: string) {
        super(label, name)
    }

    public value(element: HTMLInputElement): boolean | number | string {
        return element.value
    }

    public toHtml(): Html {
        const input = new Html('input').type('text').name(this.name).autocomplete('off')
        const label = new Html('label').appendText(this.label).appendChild(input)
        return new Html('div').appendChild(label)
    }
}

class NumberVariable extends Variable {
    public constructor(label: string, name: string) {
        super(label, name)
    }

    public value(element: HTMLInputElement): boolean | number | string {
        return Number(element.value)
    }

    public toHtml(): Html {
        const input = new Html('input').type('number').name(this.name).autocomplete('off')
        const label = new Html('label').appendText(this.label).appendChild(input)
        return new Html('div').appendChild(label)
    }
}

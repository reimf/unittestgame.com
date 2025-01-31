abstract class Variable {
    protected constructor(protected label: string, public name: string) { }

    public abstract value(element: HTMLElement): boolean | number | string
    public abstract toHtml(): Html
}

class HorizontalRadioVariable extends Variable {
    public constructor(label: string, name: string, private options: string[]) {
        super(label, name)
        this.options = options
    }

    public value(element: HTMLInputElement): string {
        const selector = `input[name="${element.name}"]:checked`
        const checked = document.querySelector(selector) as HTMLInputElement
        return checked.value
    }

    public toHtml(): Html {
        const callback = (event: Event) => {
            const target = event.target as HTMLInputElement
            const form = target.closest('form') as HTMLFormElement
            const button = form.querySelector('input[type="submit"]') as HTMLInputElement
            button.click()
        }

        const radioButtons = this.options.map(option => {
            const input = new Html('input').type('radio').name(this.name).accessKey(option).value(option).on('mouseup', callback)
            return new Html('label').addClass('with-horizontal-radio-input').appendChild(input).appendText(option)
        })
        return new Html('div').addClass('with-horizontal-radio-input').appendText(this.label).appendChildren(radioButtons)
    }
}

class VerticalRadioVariable extends Variable {
    public constructor(label: string, name: string, private options: string[]) {
        super(label, name)
        this.options = options
    }

    public value(element: HTMLInputElement): string {
        const selector = `input[name="${element.name}"]:checked`
        const checked = document.querySelector(selector) as HTMLInputElement
        return checked.value
    }

    public toHtml(): Html {
        const radioButtons = this.options.map(option => {
            const input = new Html('input').type('radio').name(this.name).accessKey(option).value(option)
            return new Html('label').addClass('with-vertical-radio-input').appendChild(input).appendText(option)
        })
        return new Html('div').addClass('with-vertical-radio-input').appendText(this.label).appendChildren(radioButtons)
    }
}

class CheckboxVariable extends Variable {
    public constructor(label: string, name: string) {
        super(label, name)
    }

    public value(element: HTMLInputElement): boolean {
        return element.checked
    }

    public toHtml(): Html {
        const input = new Html('input').type('checkbox').name(this.name)
        const label = new Html('label').addClass('with-checkbox-input').appendChild(input)
        return new Html('div').addClass('with-checkbox-input').appendChild(label).appendText(this.label)
    }
}

class TextVariable extends Variable {
    public constructor(label: string, name: string) {
        super(label, name)
    }

    public value(element: HTMLInputElement): string {
        return element.value
    }

    public toHtml(): Html {
        const input = new Html('input').type('text').name(this.name).autocomplete('off')
        const label = new Html('label').addClass('with-text-input').appendText(this.label).appendChild(input)
        return new Html('div').addClass('with-text-input').appendChild(label)
    }
}

class NumberVariable extends Variable {
    public constructor(label: string, name: string) {
        super(label, name)
    }

    public value(element: HTMLInputElement): number {
        return Number(element.value)
    }

    public toHtml(): Html {
        const input = new Html('input').type('number').name(this.name).autocomplete('off')
        const label = new Html('label').addClass('with-number-input').appendText(this.label).appendChild(input)
        return new Html('div').addClass('with-number-input').appendChild(label)
    }
}

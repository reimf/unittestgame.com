class Html {
    protected element: HTMLElement

    protected constructor(tagName: string) {
        this.element = document.createElement(tagName)
    }

    public id(id: string): Html {
        this.element.id = id
        return this
    }

    public addClass(value: string): Html {
        this.element.classList.add(value)
        return this
    }

    public appendText(value: string): Html {
        this.element.appendChild(document.createTextNode(value))
        return this
    }

    public appendChild(value: Html): Html {
        this.element.appendChild(value.element)
        return this
    }

    public appendChildren(values: Html[]): Html {
        for (const value of values)
            this.element.appendChild(value.element)
        return this
    }

    public on(eventType: string, callback: (event: Event) => void): Html {
        this.element.addEventListener(eventType, callback)
        return this
    }

    public addTo(parentId: string): void {
        const old = document.querySelector('#' + this.element.id)
        if (old)
            old.replaceWith(this.element)
        else
            document.querySelector('#' + parentId)!.appendChild(this.element)
    }
}

class Anchor extends Html {
    private anchor = this.element as HTMLAnchorElement

    public constructor(href: string) {
        super('a')
        this.href(href)
    }

    public href(value: string): Anchor {
        this.anchor.href = value
        return this
    }
}

class Input extends Html {
    private input = this.element as HTMLInputElement

    public constructor(type: string) {
        super('input')
        this.type(type)
    }

    public type(value: string): Input {
        this.input.type = value
        return this
    }

    public name(value: string): Input {
        this.input.name = value
        return this
    }

    public value(value: string): Input {
        this.input.value = value
        return this
    }

    public autocomplete(value: boolean): Input {
        this.input.autocomplete = value ? 'on' : 'off'
        return this
    }
}

class Header extends Html {
    public constructor(text: string) {
        super('header')
        this.appendText(text)
    }
}

class Paragraph extends Html {
    public constructor(text: string) {
        super('p')
        this.appendText(text)
    }
}

class Button extends Html {
    public constructor(text: string, callback: (event: Event) => void) {
        super('button')
        this.appendText(text).on('click', callback)
    }
}

class Label extends Html {
    public constructor() {
        super('label')
    }
}

class Div extends Html {
    public constructor() {
        super('div')
    }
}

class Code extends Html {
    public constructor(text: string) {
        super('code')
        this.appendText(text)
    }
}

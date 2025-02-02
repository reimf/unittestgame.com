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

    public href(value: string): Html {
        if (this.element instanceof HTMLAnchorElement)
            this.element.href = value
        return this
    }

    public type(value: string): Html {
        if (this.element instanceof HTMLInputElement)
            this.element.type = value
        return this
    }

    public name(value: string): Html {
        if (this.element instanceof HTMLInputElement)
            this.element.name = value
        return this
    }

    public value(value: string): Html {
        if (this.element instanceof HTMLInputElement)
            this.element.value = value
        return this
    }

    public autocomplete(value: boolean): Html {
        if (this.element instanceof HTMLInputElement)
            this.element.autocomplete = value ? 'on' : 'off'
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
    public constructor() {
        super('a')
    }
}

class Input extends Html {
    public constructor() {
        super('input')
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
    public constructor(text: string) {
        super('button')
        this.appendText(text)
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
    public constructor() {
        super('code')
    }
}

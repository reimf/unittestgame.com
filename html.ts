class Html {
    protected element: HTMLElement

    protected constructor(tagName: string) {
        this.element = document.createElement(tagName)
    }

    public id(id: string): void {
        this.element.id = id
    }

    public addClass(value: string): void {
        this.element.classList.add(value)
    }

    public appendText(value: string): void {
        this.element.appendChild(document.createTextNode(value))
    }

    public appendChild(value: Html): void {
        this.element.appendChild(value.element)
    }

    public appendChildren(values: Html[]): void {
        for (const value of values)
            this.element.appendChild(value.element)
    }

    public on(eventType: string, callback: (event: Event) => void): void {
        this.element.addEventListener(eventType, callback)
    }
}

class Span extends Html {
    public constructor(text: string) {
        super('span')
        this.appendText(text)
    }
}

class Anchor extends Html {
    private anchor = this.element as HTMLAnchorElement

    public constructor(href: string) {
        super('a')
        this.href(href)
    }

    public href(value: string): void {
        this.anchor.href = value
    }
}

class Input extends Html {
    private input = this.element as HTMLInputElement

    public constructor(type: string) {
        super('input')
        this.type(type)
    }

    public type(value: string): void {
        this.input.type = value
    }

    public name(value: string): void {
        this.input.name = value
    }

    public value(value: string): void {
        this.input.value = value
    }

    public autocomplete(value: boolean): void {
        this.input.autocomplete = value ? 'on' : 'off'
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

class UnorderedList extends Html {
    public constructor(listItems: ListItem[]) {
        super('ul')
        this.appendChildren(listItems)
    }
}

class ListItem extends Html {
    public constructor(child: Html) {
        super('li')
        this.appendChild(child)
    }
}

class Menu extends Html {
    public constructor(buttons: Button[]) {
        super('menu')
        this.appendChildren(buttons.map(button => new ListItem(button)))
    }
}

class Button extends Html {
    public constructor(text: string, callback: (event: Event) => void) {
        super('button')
        this.appendText(text)
        this.on('click', event => {
            new HumanMessage([new Paragraph(this.element.textContent! + '.')]).replace()
            callback(event)
        })
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

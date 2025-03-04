export abstract class Html {
    protected readonly element: HTMLElement

    protected constructor(tagName: string) {
        this.element = document.createElement(tagName)
    }

    protected id(id: string): Html {
        this.element.id = id
        return this
    }

    public addClass(value: string): Html {
        this.element.classList.add(value)
        return this
    }

    public appendText(text: string): Html {
        this.element.appendChild(document.createTextNode(text))
        return this
    }

    public appendLines(lines: string[]): Html {
        this.appendText(lines.join(' '))
        return this
    }

    public appendChild(child: Html): Html {
        this.element.appendChild(child.element)
        return this
    }

    public appendChildren(children: Html[]): Html {
        for (const child of children)
            this.element.appendChild(child.element)
        return this
    }

    protected on(eventType: string, callback: (event: Event) => void): Html {
        this.element.addEventListener(eventType, callback)
        return this
    }
}

export class Anchor extends Html {
    private readonly anchor = this.element as HTMLAnchorElement

    public constructor() {
        super('a')
    }

    public href(value: string): Anchor {
        this.anchor.href = value
        return this
    }
}

export class Input extends Html {
    private readonly input = this.element as HTMLInputElement

    public constructor() {
        super('input')
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

export class Form extends Html {
    public constructor() {
        super('form')
    }

    public onSubmit(callback: (event: Event) => void): Form {
        this.on('submit', event => callback(event))
        return this
    }
}

export class Header extends Html {
    public constructor() {
        super('header')
    }
}

export class Paragraph extends Html {
    public constructor() {
        super('p')
    }
}

export class Button extends Html {
    public constructor() {
        super('button')
    }

    public onClick(callback: (event: Event) => void): Button {
        this.on('click', event => callback(event))
        return this
    }
}

export class Label extends Html {
    public constructor() {
        super('label')
    }
}

export class Code extends Html {
    public constructor() {
        super('code')
    }
}

export class Section extends Html {
    public constructor() {
        super('section')
    }
}

export class Div extends Html {
    public constructor() {
        super('div')
    }
}

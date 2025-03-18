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

    public markdown(markdown: string): Html {
        const html = markdown
            // PASS 0: Escape HTML to prevent injection issues
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;")
            // PASS 1: Handle **bold**
            .replace(/\*\*(.+?)\*\*/g, (_, text) => `<b>${text}</b>`)
            // PASS 2: Handle *italic*
            .replace(/\*(.+?)\*/g, (_, text) => `<i>${text}</i>`)
            // PASS 3: Handle [text](url)
            .replace(/\[(.+?)\]\((.+?)\)/g, (_, text, url) => `<a href="${url}">${text}</a>`)
        this.element.insertAdjacentHTML('beforeend', html)
        return this
    }

    public text(text: string): Html {
        this.element.appendChild(document.createTextNode(text))
        return this
    }

    public prependChild(child: Html): Html {
        this.element.prepend(child.element)
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

export class Html {
    protected readonly element: HTMLElement

    public constructor(element: HTMLElement) {
        this.element = element
    }

    static getIdFromTitle(title: string): string {
        return title.toLowerCase().replace(/[^a-z0-9-]/g, ' ').trim().replace(/ +/g, '-')
    }

    protected id(title: string): Html {
        this.element.id = Html.getIdFromTitle(title)
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

    public appendChild(child: Html): Html {
        this.element.appendChild(child.element)
        return this
    }

    public appendChildren(children: Html[]): Html {
        for (const child of children)
            this.element.appendChild(child.element)
        return this
    }

    public appendSpinner(): Html {
        return this.appendChild(new Span().addClass('working'))
    }

    protected on(eventType: string, callback: (event: Event) => void): Html {
        this.element.addEventListener(eventType, callback)
        return this
    }
}

export class Input extends Html {
    private readonly input = this.element as HTMLInputElement

    public constructor() {
        super(document.createElement('input'))
    }

    public type(type: string): Input {
        this.input.type = type
        return this
    }

    public name(name: string): Input {
        this.input.name = name
        return this
    }

    public value(value: string): Input {
        this.input.value = value
        return this
    }

    public autocomplete(autocomplete: boolean): Input {
        this.input.autocomplete = autocomplete ? 'on' : 'off'
        return this
    }
}

export class Form extends Html {
    public constructor() {
        super(document.createElement('form'))
    }

    public onSubmit(callback: (event: Event) => void): Form {
        this.on('submit', event => callback(event))
        return this
    }
}

export class Header extends Html {
    public constructor() {
        super(document.createElement('header'))
    }
}

export class Paragraph extends Html {
    public constructor() {
        super(document.createElement('p'))
    }
}

export class Button extends Html {
    public constructor() {
        super(document.createElement('button'))
    }

    public onClick(callback: (event: Event) => void): Button {
        this.on('click', event => callback(event))
        return this
    }

    public title(title: string): Button {
        this.element.title = title
        return this
    }
}

export class Label extends Html {
    public constructor() {
        super(document.createElement('label'))
    }
}

export class Code extends Html {
    public constructor() {
        super(document.createElement('code'))
    }
}

export class Section extends Html {
    public constructor() {
        super(document.createElement('section'))
    }
}

export class Div extends Html {
    public constructor() {
        super(document.createElement('div'))
    }
}

export class Span extends Html {
    public constructor() {
        super(document.createElement('span'))
    }
}

export class Italic extends Html {
    public constructor() {
        super(document.createElement('i'))
    }
}

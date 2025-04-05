export class Html {
    private tagName: string = ''
    private id: string = ''
    private readonly classList: string[] = []
    public readonly children: Html[] = []
    private onClickCallback?: (event: Event) => void = undefined
    private title: string = ''

    protected setTagName(tagName: string): Html {
        this.tagName = tagName
        return this
    }

    protected setId(id: string): Html {
        this.id = id
        return this
    }

    public getId(): string {
        return this.id
    }

    public setTitle(title: string): Button {
        this.title = title
        return this
    }

    public addClass(value: string, condition: boolean = true): Html {
        if (condition)
            this.classList.push(value)
        return this
    }

    public onClick(callback: (event: Event) => void): Html {
        this.onClickCallback = callback
        return this
    }

    public appendMarkdown(markdown: string): Html {
        const buffer: string[] = []
        const flush = (buffer: string[]) => {
            if (buffer.length > 0) {
                this.appendText(buffer.join(''))
                buffer.length = 0
            }
        }
        for (let pos = 0; pos < markdown.length; pos++) {
            // Bold: **text**
            if (markdown.slice(pos, pos + 2) === '**') {
                const end = markdown.indexOf('**', pos + 2)
                if (end > pos) {
                    flush(buffer)
                    const text = markdown.slice(pos + 2, end)
                    const bold = new Bold().appendMarkdown(text)
                    this.appendChild(bold)
                    pos = end + 1
                    continue
                }
            }

            // Italic: *text*
            if (markdown[pos] === '*') {
                const end = markdown.indexOf('*', pos + 1)
                if (end > pos) {
                    flush(buffer)
                    const text = markdown.slice(pos + 1, end)
                    const italic = new Italic().appendMarkdown(text)
                    this.appendChild(italic)
                    pos = end
                    continue
                }
            }

            // Link: [text](url)
            if (markdown[pos] === '[') {
                const closeBracket = markdown.indexOf(']', pos)
                const openParen = markdown.indexOf('(', closeBracket)
                const closeParen = markdown.indexOf(')', openParen)
                if (closeBracket > pos && openParen === closeBracket + 1 && closeParen > openParen) {
                    flush(buffer)
                    const text = markdown.slice(pos + 1, closeBracket)
                    const url = markdown.slice(openParen + 1, closeParen)
                    const anchor = new Anchor().setHref(url).appendMarkdown(text)
                    this.appendChild(anchor)
                    pos = closeParen
                    continue
                }
            }

            // Plain text
            buffer.push(markdown[pos])
        }
        flush(buffer)
        return this
    }

    public appendText(text: string): Html {
        this.children.push(new Text(text))
        return this
    }

    public prependChild(child: Html): Html {
        this.children.unshift(child)
        return this
    }

    public appendChild(child: Html): Html {
        this.children.push(child)
        return this
    }

    public appendChildren(children: Html[]): Html {
        this.children.push(...children)
        return this
    }

    public toNode(): Node {
        const node = document.createElement(this.tagName)
        if (this.id)
            node.id = this.id
        if (this.title)
            node.title = this.title
        if (this.onClickCallback)
            node.addEventListener('click', event => this.onClickCallback!(event))
            for (const klasse of this.classList)
            node.classList.add(klasse)
        for (const child of this.children)
            node.appendChild(child.toNode())
        return node
    }
}

export class Text extends Html {
    public readonly text: string

    public constructor(text: string) {
        super()
        this.text = text
    }

    public toNode(): Node {
        return document.createTextNode(this.text)
    }
}

export class Input extends Html {
    private type: string = ''
    private name: string = ''
    private value: string = ''
    private autocomplete: string = ''

    public constructor() {
        super()
        this.setTagName('input')
    }

    public setType(type: string): Input {
        this.type = type
        return this
    }

    public setName(name: string): Input {
        this.name = name
        return this
    }

    public setValue(value: string): Input {
        this.value = value
        return this
    }

    public setAutocomplete(autocomplete: boolean): Input {
        this.autocomplete = autocomplete ? 'on' : 'off'
        return this
    }

    public toNode(): Node {
        const node = super.toNode() as HTMLInputElement
        if (this.type)
            node.type = this.type
        if (this.name)
            node.name = this.name
        if (this.value)
            node.value = this.value
        if (this.autocomplete)
            node.autocomplete = this.autocomplete as AutoFill
        return node
    }
}

export class Form extends Html {
    private onSubmitCallback?: (event: Event) => void = undefined

    public constructor() {
        super()
        this.setTagName('form')
    }

    public onSubmit(callback: (event: Event) => void): Form {
        this.onSubmitCallback = callback
        return this
    }

    public toNode(): Node {
        const node = super.toNode() as HTMLFormElement
        if (this.onSubmitCallback)
            node.addEventListener('submit', event => this.onSubmitCallback!(event))
        return node
    }
}

export class Header extends Html {
    public constructor() {
        super()
        this.setTagName('header')
    }
}

export class Paragraph extends Html {
    public constructor() {
        super()
        this.setTagName('p')
    }
}

export class Button extends Html {
    public constructor() {
        super()
        this.setTagName('button')
    }
}

export class Label extends Html {
    public constructor() {
        super()
        this.setTagName('label')
    }
}

export class Code extends Html {
    public constructor() {
        super()
        this.setTagName('code')
    }
}

export class Section extends Html {
    public constructor() {
        super()
        this.setTagName('section')
    }
}

export class Div extends Html {
    public constructor() {
        super()
        this.setTagName('div')
    }
}

export class Span extends Html {
    public constructor() {
        super()
        this.setTagName('span')
    }
}

export class Italic extends Html {
    public constructor() {
        super()
        this.setTagName('i')
    }
}

export class Bold extends Html {
    public constructor() {
        super()
        this.setTagName('b')
    }
}

export class Anchor extends Html {
    public href: string = ''

    public constructor() {
        super()
        this.setTagName('a')
    }

    public setHref(href: string): Anchor {
        this.href = href
        return this
    }

    public toNode(): Node {
        const node = super.toNode() as HTMLAnchorElement
        if (this.href)
            node.href = this.href
        return node
    }
}

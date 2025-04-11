export class Html {
    private tagName: string = ''
    private id: string = ''
    private readonly classList: string[] = []
    public readonly children: Html[] = []
    private static timeOfLastDelayedCall: number = 0

    protected callDelayed(callback: () => void): void {
        const now = Date.now()
        const delay = Math.max(0, 500 + Html.timeOfLastDelayedCall - now)
        Html.timeOfLastDelayedCall = now + delay
        window.setTimeout(() => callback(), delay)
    }

    protected setTagName(tagName: string): this {
        this.tagName = tagName
        return this
    }

    public setId(id: string): this {
        this.id = id
        return this
    }

    public getId(): string {
        return this.id
    }

    public addClass(value: string, condition: boolean = true): this {
        if (condition)
            this.classList.push(value)
        return this
    }

    public appendMarkdown(markdown: string): this {
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

    public appendText(text: string): this {
        this.children.push(new Text(text))
        return this
    }

    public prependChild(child: Html): this {
        this.children.unshift(child)
        return this
    }

    public appendChild(child: Html): this {
        this.children.push(child)
        return this
    }

    public appendChildren(children: Html[]): this {
        this.children.push(...children)
        return this
    }

    public toAttributes(): string[] {
        const attributes: string[] = []
        if (this.classList.length > 0)
            attributes.push(`class="${this.classList.join(' ')}"`)
        if (this.id)
            attributes.push(`id="${this.id}"`)
        return attributes
    }

    public toString(): string {
        return '<' + this.tagName + this.toAttributes().sort().map(attribute => ' ' + attribute).join('') + '>' +
            this.children.map(child => child.toString()).join('') +
            '</' + this.tagName + '>'
    }

    public toNode(): Node {
        const node = document.createElement(this.tagName)
        for (const klasse of this.classList)
            node.classList.add(klasse)
        if (this.id)
            node.id = this.id
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

    public toString(): string {
        return this.text
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

    public setType(type: string): this {
        this.type = type
        return this
    }

    public setName(name: string): this {
        this.name = name
        return this
    }

    public setValue(value: string): this {
        this.value = value
        return this
    }

    public setAutocomplete(autocomplete: boolean): this {
        this.autocomplete = autocomplete ? 'on' : 'off'
        return this
    }

    public toAttributes(): string[] {
        const attributes = super.toAttributes()
        if (this.type)
            attributes.push(`type="${this.type}"`)
        if (this.name)
            attributes.push(`name="${this.name}"`)
        if (this.value)
            attributes.push(`value="${this.value}"`)
        if (this.autocomplete)
            attributes.push(`autocomplete="${this.autocomplete}"`)
        return attributes
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

    public onSubmit(callback: (event: Event) => void): this {
        this.onSubmitCallback = callback
        return this
    }

    public toNode(): Node {
        const node = super.toNode() as HTMLFormElement
        if (this.onSubmitCallback)
            node.addEventListener('submit', event => {
                event.preventDefault()
                this.onSubmitCallback!(event)
            })
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
    private title: string = ''
    private onClickCallback?: (event: Event) => void = undefined

    public constructor() {
        super()
        this.setTagName('button')
    }

    public setTitle(title: string): this {
        this.title = title
        return this
    }

    public onClick(callback: (event: Event) => void): this {
        this.onClickCallback = callback
        return this
    }

    public toAttributes(): string[] {
        const attributes = super.toAttributes()
        if (this.title)
            attributes.push(`title="${this.title}"`)
        return attributes
    }

    public toNode(): Node {
        const node = super.toNode() as HTMLButtonElement
        if (this.title)
            node.title = this.title
        if (this.onClickCallback)
            node.addEventListener('click', event => {
                event.preventDefault()
                const target = event.target as HTMLButtonElement
                const div = target.closest('div')
                const section = target.closest('section')
                if (section && div) {
                    section.classList.remove('reveal')
                    const text = (target.title || target.textContent) + "."
                    const textNode = document.createTextNode(text)
                    const paragraph = document.createElement('p')
                    paragraph.appendChild(textNode)
                    div.replaceChildren(paragraph)
                    this.callDelayed(() => section.classList.add('reveal'))
                    this.onClickCallback!(event)
                }
            })
        return node
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

    public setHref(href: string): this {
        this.href = href
        return this
    }

    public toAttributes(): string[] {
        const attributes = super.toAttributes()
        if (this.href)
            attributes.push(`href="${this.href}"`)
        return attributes
    }

    public toNode(): Node {
        const node = super.toNode() as HTMLAnchorElement
        if (this.href)
            node.href = this.href
        return node
    }
}

import { Translation } from './translation.js'

abstract class Content {
    private static timeOfLastDelayedCall: number = 0

    protected callDelayed(callback: () => void): void {
        const now = Date.now()
        const delay = Math.max(0, 500 + Html.timeOfLastDelayedCall - now)
        Html.timeOfLastDelayedCall = now + delay
        window.setTimeout(() => callback(), delay)
    }

    public abstract toString(): string
    public abstract toNode(): Node
}

export class Html extends Content {
    private tagName: string
    private id: string = ''
    private readonly classList: string[] = []
    private readonly children: Content[] = []

    protected constructor(tagName: string) {
        super()
        this.tagName = tagName
    }

    public setId(id: string): this {
        this.id = id
        return this
    }

    public getId(): string {
        return this.id
    }

    public addClass(value: string): this {
        if (value)
            this.classList.push(value)
        return this
    }

    public appendMarkdown(markdown: Translation): this {
        const markdownText = markdown.toString()
        const buffer: string[] = []
        const flush = (buffer: string[]) => {
            if (buffer.length > 0) {
                this.appendTranslation(new Translation(buffer.join('')))
                buffer.length = 0
            }
        }
        for (let pos = 0; pos < markdownText.length; pos++) {
            // Bold: **text**
            if (markdownText.slice(pos, pos + 2) === '**') {
                const end = markdownText.indexOf('**', pos + 2)
                if (end > pos) {
                    flush(buffer)
                    const text = markdownText.slice(pos + 2, end)
                    const bold = new Bold().appendMarkdown(new Translation(text))
                    this.appendChild(bold)
                    pos = end + 1
                    continue
                }
            }

            // Italic: *text*
            if (markdownText[pos] === '*') {
                const end = markdownText.indexOf('*', pos + 1)
                if (end > pos) {
                    flush(buffer)
                    const text = markdownText.slice(pos + 1, end)
                    const italic = new Italic().appendMarkdown(new Translation(text))
                    this.appendChild(italic)
                    pos = end
                    continue
                }
            }

            // Link: [text](url)
            if (markdownText[pos] === '[') {
                const closeBracket = markdownText.indexOf(']', pos)
                const openParen = markdownText.indexOf('(', closeBracket)
                const closeParen = markdownText.indexOf(')', openParen)
                if (closeBracket > pos && openParen === closeBracket + 1 && closeParen > openParen) {
                    flush(buffer)
                    const text = markdownText.slice(pos + 1, closeBracket)
                    const url = markdownText.slice(openParen + 1, closeParen)
                    const anchor = new Anchor().setHref(url).appendMarkdown(new Translation(text))
                    this.appendChild(anchor)
                    pos = closeParen
                    continue
                }
            }

            // HTML: <tag>content</tag>
            if (markdownText[pos] === '<') {
                const openTagEnd = markdownText.indexOf('>', pos)
                if (openTagEnd > pos) {
                    const tag = markdownText.slice(pos + 1, openTagEnd)
                    if (tag[0] !== ' ') {
                        const closingTagStart = markdownText.indexOf('</' + tag + '>', openTagEnd + 1)
                        if (closingTagStart > openTagEnd) {
                            const closingTagEnd = markdownText.indexOf('>', closingTagStart + 1)
                            if (closingTagEnd > closingTagStart) {
                                flush(buffer)
                                const content = markdownText.slice(pos, closingTagStart)
                                const html = new Other(content)
                                this.appendChild(html)
                                pos = closingTagEnd
                                continue
                            }
                        }
                    }

                    continue
                }
            }

            // Plain text
            buffer.push(markdownText[pos])
        }
        flush(buffer)
        return this
    }

    public appendTranslation(translation: Translation): this {
        this.children.push(new Text(translation))
        return this
    }

    public prependChild(child: Content): this {
        this.children.unshift(child)
        return this
    }

    public appendChild(child: Content): this {
        this.children.push(child)
        return this
    }

    public appendChildren(children: Content[]): this {
        this.children.push(...children)
        return this
    }

    protected toAttributes(): string[] {
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

    protected replaceEnclosingMessageContent(element: HTMLElement, text: string): void {
        const section = element.closest('section')!
        section.classList.remove('reveal')
        const textNode = document.createTextNode(text + '.')
        const paragraph = document.createElement('p')
        paragraph.appendChild(textNode)
        section.querySelector('div')?.replaceChildren(paragraph)
        this.callDelayed(() => section.classList.add('reveal'))
    }
}

class Text extends Content {
    public readonly translation: Translation

    public constructor(translation: Translation) {
        super()
        this.translation = translation
    }

    public toString(): string {
        return this.translation.toString()
    }

    public toNode(): Node {
        return document.createTextNode(this.toString())
    }
}

class Other extends Content {
    public readonly html: string

    public constructor(html: string) {
        super()
        this.html = html
    }

    public toString(): string {
        return this.html
    }

    public toNode(): Node {
        const template = document.createElement('template')
        template.innerHTML = this.html
        if (template.content.childNodes.length === 1)
            return template.content.firstChild!
        return (new Text(new Translation('ERROR'))).toNode()
    }
}

class FormControl extends Html {
    private disabled: boolean = false

    public setDisabled(disabled: boolean): this {
        this.disabled = disabled
        return this
    }

    protected toAttributes(): string[] {
        const attributes = super.toAttributes()
        if (this.disabled)
            attributes.push('disabled="disabled"')
        return attributes
    }

    public toNode(): Node {
        const node = super.toNode() as HTMLElement
        if (this.disabled)
            node.setAttribute('disabled', 'disabled')
        return node
    }
}

export class Input extends FormControl {
    private type: string = ''
    private name: string = ''
    private value: string = ''
    private autocomplete: AutoFillBase = ''
    private checked: string = ''
    private required: string = ''
    private pattern: string = ''

    public constructor() {
        super('input')
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

    public setAutocomplete(autocomplete: boolean = true): this {
        this.autocomplete = autocomplete ? 'on' : 'off'
        return this
    }

    public setChecked(checked: boolean = true): this {
        this.checked = checked ? 'checked' : ''
        return this
    }

    public setRequired(required: boolean = true): this {
        this.required = required ? 'required' : ''
        return this
    }

    public setPattern(pattern: string): this {
        this.pattern = pattern
        return this
    }

    protected toAttributes(): string[] {
        const attributes = super.toAttributes()
        if (this.type)
            attributes.push(`type="${this.type}"`)
        if (this.name)
            attributes.push(`name="${this.name}"`)
        if (this.value)
            attributes.push(`value="${this.value}"`)
        if (this.autocomplete)
            attributes.push(`autocomplete="${this.autocomplete}"`)
        if (this.checked)
            attributes.push(`checked="${this.checked}"`)
        if (this.required)
            attributes.push(`required="${this.required}"`)
        if (this.pattern)
            attributes.push(`pattern="${this.pattern}"`)
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
            node.autocomplete = this.autocomplete
        if (this.checked)
            node.checked = true
        if (this.required)
            node.required = true
        if (this.pattern)
            node.pattern = this.pattern
        node.addEventListener('focus', () => node.checked = true)
        return node
    }
}

export type StringMap = Map<string, string>

export class Form extends Html {
    private onSubmitCallback?: (formData: StringMap) => void = undefined

    public constructor() {
        super('form')
    }

    public onSubmit(callback: (formData: StringMap) => void): this {
        this.onSubmitCallback = callback
        return this
    }

    public toNode(): Node {
        const node = super.toNode() as HTMLFormElement
        if (this.onSubmitCallback)
            node.addEventListener('submit', event => {
                event.preventDefault()
                node.querySelectorAll('input').forEach(input => input.disabled = false)
                const formData = new Map<string, string>(new FormData(node).entries() as Iterable<[string, string]>)
                const submit = node.querySelector('input[type="submit"]') as HTMLInputElement
                this.replaceEnclosingMessageContent(node, submit.value)
                this.onSubmitCallback!(formData)
            })
        return node
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

export class Button extends FormControl {
    private onClickCallback?: (event: Event) => void = undefined

    public constructor() {
        super('button')
    }

    public onClick(callback: (event: Event) => void): this {
        this.onClickCallback = callback
        return this
    }

    public toNode(): Node {
        const node = super.toNode() as HTMLButtonElement
        if (this.onClickCallback)
            node.addEventListener('click', event => {
                event.preventDefault()
                this.replaceEnclosingMessageContent(node, node.textContent)
                this.onClickCallback!(event)
            })
        return node
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

export class Span extends Html {
    public constructor() {
        super('span')
    }
}

export class Italic extends Html {
    public constructor() {
        super('i')
    }
}

export class Bold extends Html {
    public constructor() {
        super('b')
    }
}

export class Anchor extends Html {
    public href: string = ''

    public constructor() {
        super('a')
    }

    public setHref(href: string): this {
        this.href = href
        return this
    }

    protected toAttributes(): string[] {
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

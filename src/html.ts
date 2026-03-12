abstract class Content {
    private static timeOfLastDelayedCall: number = 0

    protected callDelayed(callback: () => void): void {
        const now = Date.now()
        const delay = Math.max(0, 250 + Html.timeOfLastDelayedCall - now)
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

    public appendMarkdown(markdown: string): this {
        let begin = 0
        while (begin < markdown.length) {
            // Bold: **text**
            if (markdown.slice(begin, begin + 2) === '**') {
                const end = markdown.indexOf('**', begin + 2)
                if (end > begin) {
                    const text = markdown.slice(begin + 2, end)
                    const bold = new Bold().appendMarkdown(text)
                    this.appendChild(bold)
                    begin = end + 2
                    continue
                }
            }

            // Italic: *text*
            if (markdown[begin] === '*') {
                const end = markdown.indexOf('*', begin + 1)
                if (end > begin) {
                    const text = markdown.slice(begin + 1, end)
                    const italic = new Italic().appendMarkdown(text)
                    this.appendChild(italic)
                    begin = end + 1
                    continue
                }
            }

            // Link: [text](url)
            if (markdown[begin] === '[') {
                const closeBracket = markdown.indexOf(']', begin)
                const openParen = markdown.indexOf('(', closeBracket)
                const closeParen = markdown.indexOf(')', openParen)
                if (closeBracket > begin && openParen === closeBracket + 1 && closeParen > openParen) {
                    const text = markdown.slice(begin + 1, closeBracket)
                    const url = markdown.slice(openParen + 1, closeParen)
                    const anchor = new Anchor().setHref(url).appendMarkdown(text)
                    this.appendChild(anchor)
                    begin = closeParen + 1
                    continue
                }
            }

            // Plain text: consume up to the next possible special character
            const star = markdown.indexOf('*', begin + 1)
            const openBracket = markdown.indexOf('[', begin + 1)
            const end = Math.min(star > begin ? star : markdown.length, openBracket > begin ? openBracket : markdown.length)
            const text = markdown.slice(begin, end)
            this.appendText(text)
            begin = end
        }
        return this
    }

    public appendText(text: string): this {
        this.children.push(new Text(text))
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

    public appendChildren(children: readonly Content[]): this {
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
        for (const class_ of this.classList)
            node.classList.add(class_)
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
    private readonly text: string

    public constructor(text: string) {
        super()
        this.text = text
    }

    public toString(): string {
        return this.text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    }

    public toNode(): Node {
        return document.createTextNode(this.text)
    }
}

class FormControl extends Html {
    private disabled: boolean = false

    public setDisabled(disabled: boolean): this {
        this.disabled = disabled
        return this
    }

    protected override toAttributes(): string[] {
        const attributes = super.toAttributes()
        if (this.disabled)
            attributes.push('disabled="disabled"')
        return attributes
    }

    public override toNode(): Node {
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

    protected override toAttributes(): string[] {
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

    public override toNode(): Node {
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

    public override toNode(): Node {
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

    public override toNode(): Node {
        const node = super.toNode() as HTMLButtonElement
        if (this.onClickCallback)
            node.addEventListener('click', event => {
                event.preventDefault()
                this.replaceEnclosingMessageContent(node, node.textContent || 'ERROR')
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

export class OrderedList extends Html {
    public constructor(elements: Html[]) {
        super('ol')
        this.appendChildren(elements.map(element => new ListItem().appendChild(element)))
    }
}

class ListItem extends Html {
    public constructor() {
        super('li')
    }
}

export class Code extends Html {
    public constructor() {
        super('code')
        this.addClass('language-javascript')
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

export class Del extends Html {
    public constructor() {
        super('del')
    }
}

export class Ins extends Html {
    public constructor() {
        super('ins')
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
    private href: string = ''

    public constructor() {
        super('a')
    }

    public setHref(href: string): this {
        this.href = href
        return this
    }

    protected override toAttributes(): string[] {
        const attributes = super.toAttributes()
        if (this.href)
            attributes.push(`href="${this.href}"`)
        return attributes
    }

    public override toNode(): Node {
        const node = super.toNode() as HTMLAnchorElement
        if (this.href)
            node.href = this.href
        return node
    }
}

import { Locale, LocalizedText } from './locale.js'

abstract class Content {
    private static timeOfLastDelayedCall: number = 0

    protected callDelayed(callback: () => void): void {
        const now = Date.now()
        const delay = Math.max(0, 250 + Html.timeOfLastDelayedCall - now)
        Html.timeOfLastDelayedCall = now + delay
        window.setTimeout(() => callback(), delay)
    }

    public abstract toNode(): Node
}

export class Html extends Content {
    private readonly tagName: string
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

    public appendMarkdown(markdown: LocalizedText): this {
        const patterns = [
            /\*\*(?<bold>.+?)\*\*/,
            /\*(?<italic>.+?)\*/,
            /`(?<code>.+?)`/,
            /\[(?<linkText>.+?)\]\((?<linkUrl>.+?)\)/,
            /(?<plain>[^*`[]+)/,
        ]
        const pattern = new RegExp(patterns.map(regexp => regexp.source).join('|'), 'g')

        for (const { groups } of markdown.matchAll(pattern)) {
            const { bold, italic, code, linkText, linkUrl, plain } = groups!
            if (bold)
                this.appendChild(new Bold().appendMarkdown(Locale.bless(bold)))
            else if (italic)
                this.appendChild(new Italic().appendMarkdown(Locale.bless(italic)))
            else if (code)
                this.appendChild(new Code().appendMarkdown(Locale.bless(code)))
            else if (linkText && linkUrl)
                this.appendChild(new Anchor().setHref(linkUrl).appendMarkdown(Locale.bless(linkText)))
            else if (plain)
                this.appendText(Locale.bless(plain))
        }
        return this
    }

    public appendText(text: LocalizedText): this {
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

    public toNode(): Node {
        return this.toDomElement()
    }

    public toDomElement(): HTMLElement {
        const element = document.createElement(this.tagName)
        if (this.id)
            element.id = this.id
        element.classList.add(...this.classList)
        element.replaceChildren(...this.children.map(child => child.toNode()))
        return element
    }

    protected replaceEnclosingMessageContent(element: HTMLElement, text: LocalizedText): void {
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
    private readonly text: LocalizedText

    public constructor(text: LocalizedText) {
        super()
        this.text = text
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

    public override toDomElement(): HTMLElement {
        const element = super.toDomElement()
        if (this.disabled)
            element.setAttribute('disabled', 'disabled')
        return element
    }
}

export class Input extends FormControl {
    private type: string = ''
    private name: string = ''
    private value: string = ''
    private autocomplete: boolean|undefined = undefined
    private checked: boolean = false
    private required: boolean = false
    private pattern: string = ''
    private title: string = ''

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
        this.autocomplete = autocomplete
        return this
    }

    public setChecked(checked: boolean = true): this {
        this.checked = checked
        return this
    }

    public setRequired(required: boolean = true): this {
        this.required = required
        return this
    }

    public setPattern(pattern: RegExp, title: string): this {
        this.pattern = pattern.toString().replaceAll('/', '')
        this.title = title
        return this
    }

    public override toDomElement(): HTMLElement {
        const input = super.toDomElement() as HTMLInputElement
        if (this.type)
            input.type = this.type
        if (this.name)
            input.name = this.name
        if (this.value)
            input.value = this.value
        if (this.autocomplete !== undefined)
            input.autocomplete = this.autocomplete ? "on" : "off"
        if (this.checked)
            input.checked = true
        if (this.required)
            input.required = true
        if (this.pattern)
            input.pattern = this.pattern
        if (this.title)
            input.title = this.title
        input.addEventListener('focus', () => input.checked = true)
        return input
    }
}

export class Submit extends Input {
    public constructor(text: LocalizedText) {
        super()
        this.setType('submit').setValue(text)
    }
}

export class Form extends Html {
    private readonly callback: (formData: FormData) => void

    public constructor(callback: (formData: FormData) => void) {
        super('form')
        this.callback = callback
    }

    public override toDomElement(): HTMLElement {
        const form = super.toDomElement() as HTMLFormElement
        if (this.callback)
            form.addEventListener('submit', event => {
                event.preventDefault()
                form.querySelectorAll('input').forEach(input => input.disabled = false)
                const formData = new FormData(form)
                const submit = form.querySelector('input[type="submit"]') as HTMLInputElement
                this.replaceEnclosingMessageContent(form, Locale.bless(submit.value))
                this.callback!(formData)
            })
        return form
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
    private readonly callback: () => void

    public constructor(text: LocalizedText, callback: () => void) {
        super('button')
        this.appendText(text)
        this.callback = callback
    }

    public override toDomElement(): HTMLElement {
        const button = super.toDomElement() as HTMLButtonElement
        if (this.callback)
            button.addEventListener('click', event => {
                event.preventDefault()
                this.replaceEnclosingMessageContent(button, Locale.bless(button.textContent))
                this.callback!()
            })
        return button
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
    }
}

export class CodeBlock extends Code {
    public constructor() {
        super()
        this.addClass('block')
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

    public override toDomElement(): HTMLElement {
        const anchor = super.toDomElement() as HTMLAnchorElement
        if (this.href)
            anchor.href = this.href
        return anchor
    }
}

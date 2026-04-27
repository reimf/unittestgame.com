import { Locale, LocalizedText } from './locale.js'

abstract class Content {
    private static timeOfLastDelayedCall: number = 0
    protected node: Node

    protected constructor(node: Node) {
        this.node = node
    }

    public getNode(): Node {
        return this.node
    }

    protected callDelayed(callback: () => void): void {
        const now = Date.now()
        const delay = Math.max(0, 250 + Html.timeOfLastDelayedCall - now)
        Html.timeOfLastDelayedCall = now + delay
        window.setTimeout(() => callback(), delay)
    }
}

export abstract class Html extends Content {
    protected constructor(tagName: string) {
        const element = document.createElement(tagName)
        super(element)
    }

    public getElement(): HTMLElement {
        return this.node as HTMLElement
    }

    public setId(id: string): this {
        this.getElement().id = id
        return this
    }

    public getId(): string {
        return this.getElement().id
    }

    public addClass(value: string): this {
        if (value)
            this.getElement().classList.add(value)
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
        this.getElement().append(new Text(text).getNode())
        return this
    }

    public prependChild(child: Content): this {
        this.getElement().prepend(child.getNode())
        return this
    }

    public appendChild(child: Content): this {
        this.getElement().append(child.getNode())
        return this
    }

    public appendChildren(children: readonly Content[]): this {
        this.getElement().append(...(children.map(child => child.getNode())))
        return this
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
    public constructor(text: LocalizedText) {
        const textNode = document.createTextNode(text)
        super(textNode)
    }
}

export class Input extends Html {
    public constructor() {
        super('input')
        this.getInputElement().addEventListener('focus', () => this.getInputElement().checked = true)
    }

    private getInputElement(): HTMLInputElement {
        return this.getElement() as HTMLInputElement
    }

    public setType(type: string): this {
        this.getInputElement().type = type
        return this
    }

    public setName(name: string): this {
        this.getInputElement().name = name
        return this
    }

    public setValue(value: string): this {
        this.getInputElement().value = value
        return this
    }

    public setDisabled(disabled: boolean): this {
        this.getInputElement().disabled = disabled
        return this
    }

    public setAutocomplete(autocomplete: boolean = true): this {
        this.getInputElement().autocomplete = autocomplete ? 'on' : 'off'
        return this
    }

    public setChecked(checked: boolean = true): this {
        this.getInputElement().checked = checked
        return this
    }

    public setRequired(required: boolean = true): this {
        this.getInputElement().required = required
        return this
    }

    public setPattern(pattern: RegExp): this {
        this.getInputElement().pattern = pattern.toString().replaceAll('/', '')
        return this
    }

    public setTitle(title: string): this {
        this.getInputElement().title = title
        return this
    }
}

export class Submit extends Input {
    public constructor(text: LocalizedText) {
        super()
        this.setType('submit').setValue(text)
    }
}

export class Form extends Html {
    public constructor(callback: (formData: FormData) => void) {
        super('form')
        this.getFormElement().addEventListener('submit', event => {
            event.preventDefault()
            this.getFormElement().querySelectorAll('input').forEach(input => input.disabled = false)
            const formData = new FormData(this.getFormElement())
            const submit = this.getFormElement().querySelector('input[type="submit"]') as HTMLInputElement
            this.replaceEnclosingMessageContent(this.getFormElement(), Locale.bless(submit.value))
            callback(formData)
        })
    }

    private getFormElement(): HTMLFormElement {
        return this.getElement() as HTMLFormElement
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
    public constructor(text: LocalizedText, callback: () => void) {
        super('button')
        this.appendText(text)
        this.getElement().addEventListener('click', event => {
            event.preventDefault()
            this.replaceEnclosingMessageContent(this.getElement(), Locale.bless(this.getElement().textContent))
            callback()
        })
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
    public constructor() {
        super('a')
    }

    private getAnchorElement(): HTMLAnchorElement {
        return this.getElement() as HTMLAnchorElement
    }

    public setHref(href: string): this {
        this.getAnchorElement().href = href
        return this
    }
}

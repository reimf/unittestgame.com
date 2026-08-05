import { ConversationLanguage, ConversationText } from './conversation-language-base.js'

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

    public getElement<T extends HTMLElement = HTMLElement>(): T {
        return this.node as T
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

    public appendMarkdown(markdown: ConversationText): this {
        const patterns = [
            /\*(?<italic>.+?)\*/,
            /`(?<code>.+?)`/,
            /!\[(?<alt>.+?)\]\((?<src>.+?)\)/,
            /\[(?<text>.+?)\]\((?<href>.+?)\)/,
            /(?<plain>[^*`![]+|[*`![])/
        ]
        const pattern = new RegExp(patterns.map(regexp => regexp.source).join('|'), 'g')

        for (const { groups } of markdown.matchAll(pattern)) {
            const { italic, code, text, href, plain, alt, src } = groups!
            if (italic)
                this.appendChild(new Italic().appendMarkdown(ConversationLanguage.bless(italic)))
            else if (code)
                this.appendChild(new Code().appendMarkdown(ConversationLanguage.bless(code)))
            else if (alt && src)
                this.appendChild(new Img(src, alt))
            else if (text && href)
                this.appendChild(new Anchor(href).appendMarkdown(ConversationLanguage.bless(text)))
            else if (plain)
                this.appendText(ConversationLanguage.bless(plain))
        }
        return this
    }

    public appendText(text: ConversationText): this {
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

    public replaceChildren(children: readonly Content[]): this {
        this.getElement().replaceChildren(...(children.map(child => child.getNode())))
        return this
    }

    protected replaceEnclosingMessageContent(element: HTMLElement, text: ConversationText): void {
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
    public constructor(text: ConversationText) {
        const textNode = document.createTextNode(text)
        super(textNode)
    }
}

export class Input extends Html {
    public constructor() {
        super('input')
        const input = this.getElement<HTMLInputElement>()
        input.addEventListener('focus', () => input.checked = true)
    }

    public setType(type: string): this {
        this.getElement<HTMLInputElement>().type = type
        return this
    }

    public setName(name: string): this {
        this.getElement<HTMLInputElement>().name = name
        return this
    }

    public setValue(value: string): this {
        this.getElement<HTMLInputElement>().value = value
        return this
    }

    public setRequired(required: boolean = true): this {
        this.getElement<HTMLInputElement>().required = required
        return this
    }

    public setPattern(pattern: RegExp): this {
        this.getElement<HTMLInputElement>().pattern = pattern.toString().replaceAll('/', '')
        return this
    }

    public setTitle(title: string): this {
        this.getElement<HTMLInputElement>().title = title
        return this
    }
}

export class Submit extends Input {
    public constructor(text: ConversationText) {
        super()
        this.setType('submit').setValue(text)
    }
}

export class Form extends Html {
    public constructor(callback: (formData: FormData) => void) {
        super('form')
        this.getElement<HTMLFormElement>().addEventListener('submit', event => {
            event.preventDefault()
            const formData = new FormData(this.getElement<HTMLFormElement>())
            const submit = this.getElement<HTMLFormElement>().querySelector('input[type="submit"]') as HTMLInputElement
            this.replaceEnclosingMessageContent(this.getElement<HTMLFormElement>(), ConversationLanguage.bless(submit.value))
            callback(formData)
        })
    }

    public onChange(callback: (formData: FormData) => void): this {
        // radio inputs are checked on focus (see Input's constructor), which does not bubble as a 'change' event, so 'focusin' is needed too
        const handler = () => callback(new FormData(this.getElement<HTMLFormElement>()))
        this.getElement<HTMLFormElement>().addEventListener('change', handler)
        this.getElement<HTMLFormElement>().addEventListener('focusin', handler)
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
    public constructor(text: ConversationText, private readonly callback: () => void) {
        super('button')
        this.appendText(text)
        this.getElement().addEventListener('click', event => this.handleClick(event))
    }

    protected handleClick(event: Event): void {
        event.preventDefault()
        this.callback()
    }

    public setDisabled(disabled: boolean = true): this {
        this.getElement<HTMLButtonElement>().disabled = disabled
        return this
    }
}

export class MessageButton extends Button {
    protected override handleClick(event: Event): void {
        this.replaceEnclosingMessageContent(this.getElement(), ConversationLanguage.bless(this.getElement().textContent))
        super.handleClick(event)
    }
}

export class Label extends Html {
    public constructor() {
        super('label')
    }
}

export class Select extends Html {
    public constructor(callback: (value: string) => void) {
        super('select')
        const select = this.getElement<HTMLSelectElement>()
        select.addEventListener('change', () => callback(select.value))
    }
}

export class Option extends Html {
    public constructor(value: string, text: ConversationText, selected: boolean) {
        super('option')
        const option = this.getElement<HTMLOptionElement>()
        option.value = value
        option.defaultSelected = selected
        this.appendText(text)
    }
}

export class OrderedList extends Html {
    public constructor() {
        super('ol')
    }
}

export class ListItem extends Html {
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

export class Anchor extends Html {
    public constructor(href: string) {
        super('a')
        this.getElement<HTMLAnchorElement>().href = href
    }
}

export class Img extends Html {
    public constructor(src: string, alt: string) {
        super('img')
        const img = this.getElement<HTMLImageElement>()
        img.src = src
        img.alt = alt
    }
}

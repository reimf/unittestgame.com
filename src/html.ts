export abstract class Html {
    protected element: HTMLElement

    protected constructor(tagName: string) {
        this.element = document.createElement(tagName)
    }

    public id(id: string): void {
        this.element.id = id
    }

    public addClass(value: string): void {
        this.element.classList.add(value)
    }

    public appendText(value: string): void {
        this.element.appendChild(document.createTextNode(value))
    }

    public appendChild(value: Html): void {
        this.element.appendChild(value.element)
    }

    public appendChildren(values: Html[]): void {
        for (const value of values)
            this.element.appendChild(value.element)
    }

    public on(eventType: string, callback: (event: Event) => void): void {
        this.element.addEventListener(eventType, callback)
    }
}

export class Span extends Html {
    public constructor(text: string) {
        super('span')
        this.appendText(text)
    }
}

export class Anchor extends Html {
    private anchor = this.element as HTMLAnchorElement

    public constructor(href: string) {
        super('a')
        this.href(href)
    }

    public href(value: string): void {
        this.anchor.href = value
    }
}

export class Input extends Html {
    private input = this.element as HTMLInputElement

    public constructor(type: string) {
        super('input')
        this.type(type)
    }

    public type(value: string): void {
        this.input.type = value
    }

    public name(value: string): void {
        this.input.name = value
    }

    public value(value: string): void {
        this.input.value = value
    }

    public autocomplete(value: boolean): void {
        this.input.autocomplete = value ? 'on' : 'off'
    }
}

export class Form extends Html {
    public constructor(inputs: Html[], submitButtonText: string, private callbackSubmit: () => void, cancelButtonText: string, callbackCancel: () => void) {
        super('form')
        const submitButton = new Input('submit')
        submitButton.value(submitButtonText)
        const cancelButton = new Button(cancelButtonText, () => callbackCancel())
        const buttonBlock = new Div()
        buttonBlock.appendChild(submitButton)
        buttonBlock.appendChild(cancelButton)
        this.appendChildren(inputs)
        this.appendChild(buttonBlock)
        this.on('submit', () => this.callbackSubmit())
    }
}

export class Header extends Html {
    public constructor(text: string) {
        super('header')
        this.appendText(text)
    }
}

export class Paragraph extends Html {
    public constructor(text: string) {
        super('p')
        this.appendText(text)
    }
}

export class UnorderedList extends Html {
    public constructor(listItems: ListItem[]) {
        super('ul')
        this.appendChildren(listItems)
    }
}

export class ListItem extends Html {
    public constructor(child: Html) {
        super('li')
        this.appendChild(child)
    }
}

export class Menu extends Html {
    public constructor(buttons: Button[]) {
        super('menu')
        this.appendChildren(buttons.map(button => new ListItem(button)))
    }
}

export class Button extends Html {
    public constructor(text: string, callback: (event: Event) => void) {
        super('button')
        this.appendText(text)
        this.on('click', event => {
            new HumanMessage([new Paragraph(this.element.textContent! + '.')]).replace()
            callback(event)
        })
    }
}

export class Label extends Html {
    public constructor() {
        super('label')
    }
}

export class Div extends Html {
    public constructor() {
        super('div')
    }
}

export class Code extends Html {
    public constructor(text: string) {
        super('code')
        this.appendText(text)
    }
}

export abstract class Section extends Html {
    public constructor(children: Html[]) {
        super('section')
        this.appendChildren(children)
    }

    protected existingElement(): HTMLElement | null {
        return document.querySelector('#' + this.element.id)
    }

    protected replaceExisting(): void {
        this.existingElement()!.replaceWith(this.element)
    }

    protected addTo(parentId: string): void {
        document.querySelector('#' + parentId)!.appendChild(this.element)
    }
}

export class Panel extends Section {
    public constructor(header: string, children: Html[]) {
        super([new Header(header), ...children])
    }

    public show(id: string): void {
        this.id(id)
        if (this.existingElement())
            this.replaceExisting()
        else
            this.addTo('panels')
    }

    public static remove(id: string): void {
        document.querySelector('#' + id)?.remove()
    }
}

export abstract class Message extends Section {
    protected constructor(children: Html[]) {
        super(children)
    }

    public show(): void {
        const count = document.querySelector('#messages')!.childElementCount
        this.id(`message-${count}`)
        this.addTo('messages')
        this.scrollIntoView()
    }

    protected scrollIntoView(): void {
        this.element.scrollIntoView()
    }
}

export class ComputerMessage extends Message {
    public constructor(children: Html[]) {
        super(children)
        this.addClass('computer')
    }
}

export class HumanMessage extends Message {
    public constructor(children: Html[]) {
        super(children)
        this.addClass('human')
    }

    public show(): void {
        super.show()
        this.setFocus()
    }

    public replace(): void {
        const lastMessage = document.querySelector('#messages')!.lastElementChild!
        this.id(lastMessage.id)
        this.replaceExisting()
        this.setFocus()
        this.scrollIntoView()
    }

    private setFocus(): void {
        const firstFocusable = this.element.querySelector('button, input') as HTMLElement
        firstFocusable?.focus()
    }
}

export class HumanMenuMessage extends HumanMessage {
    public constructor(buttons: Button[]) {
        super([
            new Menu(buttons),
        ])
    }
}

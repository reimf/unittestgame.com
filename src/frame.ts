import { Html, Header, Paragraph, Section } from './html.js'

abstract class Frame extends Section {
    protected constructor(children: Html[]) {
        super()
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

export class Panel extends Frame {
    public constructor(title: string, children: Html[]) {
        super([new Header().appendText(title), ...children])
        this.id(Panel.idFromTitle(title))
    }

    private static idFromTitle(title: string): string {
        return title.toLowerCase().replace(/ /g, '-')
    }

    public show(): void {
        if (this.existingElement())
            this.replaceExisting()
        else
            this.addTo('panels')
    }

    public static remove(title: string): void {
        document.querySelector('#' + Panel.idFromTitle(title))?.remove()
    }
}

abstract class Message extends Frame {
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
        this.on('click', event => {
            if (event.target instanceof HTMLButtonElement) {
                const message = new HumanMessage([new Paragraph().appendText(event.target.textContent + '.')])
                message.id(this.element.id)
                message.replaceExisting()
            }
        })
    }

    public show(): void {
        super.show()
        this.focusFirst()
    }

    public replace(): void {
        const id = document.querySelector('#messages')!.lastElementChild!.id
        this.id(id)
        this.replaceExisting()
    }

    private focusFirst(): void {
        const focusables = this.element.querySelectorAll('button:enabled, input:enabled') as NodeListOf<HTMLElement>
        if (focusables.length > 0)
            focusables[0].focus()
    }
}

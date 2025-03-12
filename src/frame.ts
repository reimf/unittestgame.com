import { Html, Header, Paragraph, Section } from './html.js'

abstract class Frame extends Section {
    protected constructor(children: Html[]) {
        super()
        this.children(children)
    }

    public abstract show(): void

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
    public constructor(title: string, children: Html[] = []) {
        super([new Header().text(title), ...children])
        const id = title.toLowerCase().replace(/ /g, '-')
        this.id(id)
    }

    public show(): void {
        if (this.existingElement())
            this.replaceExisting()
        else
            this.addTo('panels')
    }

    public remove(): void {
        document.querySelector('#' + this.element.id)?.remove()
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

    private scrollIntoView(): void {
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
                const paragraph = new Paragraph().text(event.target.textContent + '.')
                const message = new HumanMessage([paragraph])
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
        const focusables = this.element.querySelectorAll('button:enabled, input:enabled')
        if (focusables.length > 0) {
            const firstFocusable = focusables[0] as HTMLElement
            firstFocusable.focus()
        }
    }
}

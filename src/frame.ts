import { Div, Html, Header, Paragraph, Section } from './html.js'

abstract class Frame extends Section {
    protected constructor(elements: (Html|string)[]) {
        super()
        const children = elements.map(element => element instanceof Html ? element : new Paragraph().markdown(element))
        this.appendChildren([new Div().appendChildren(children)])
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
    public constructor(title: string, elements: (Html|string)[] = []) {
        super(elements)
        this.prependChild(new Header().text(title))
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
    protected constructor(elements: (Html|string)[]) {
        super(elements)
    }

    public show(): void {
        const count = document.querySelector('#messages')!.childElementCount
        this.id(`message-${count}`)
        this.addTo('messages')
        this.element.scrollIntoView()
    }
}

export class ComputerMessage extends Message {
    public constructor(elements: (Html|string)[]) {
        super(elements)
        this.addClass('computer')
    }
}

export class HumanMessage extends Message {
    public constructor(children: (Html|string)[]) {
        super(children)
        this.addClass('human')
        this.on('click', event => {
            if (event.target instanceof HTMLButtonElement) {
                const message = new HumanMessage([event.target.textContent + '.'])
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
        const focusables = this.element.querySelectorAll('button, input')
        if (focusables.length > 0) {
            const firstFocusable = focusables[0] as HTMLElement
            firstFocusable.focus()
        }
    }
}

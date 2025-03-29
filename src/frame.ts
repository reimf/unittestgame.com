import { Italic, Div, Html, Header, Paragraph, Section, Span } from './html.js'

abstract class Frame extends Section {
    protected constructor(elements: (Html|string)[]) {
        super()
        const children = elements.map(element => element instanceof Html ? element : new Paragraph().markdown(element))
        this.appendChild(new Div().appendChildren(children))
    }

    protected existingElement(): HTMLElement | null {
        return document.querySelector('#' + this.element.id)
    }

    protected replaceExisting(): void {
        this.existingElement()!.replaceWith(this.element)
    }

    protected removeExisting(): void {
        this.existingElement()!.remove()
    }

    protected addTo(parentId: string): void {
        document.querySelector('#' + parentId)!.appendChild(this.element)
    }
}

export class Panel extends Frame {
    public constructor(title: string, elements: (Html|string)[]) {
        super(elements)
        this.prependChild(new Header().text(title))
        this.id(title)
    }

    public static appendWorkingTo(title: string): void {
        const header = document.querySelector(`#${Html.getIdFromTitle(title)} > header`)
        if (header)
            new Html(header as HTMLElement).appendSpinner()
    }

    public static removeAll(): void {
        document.querySelector('#panels')?.replaceChildren()
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

    public add(): void {
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

    public appendWorking(): ComputerMessage {
        const paragraph = new Html(this.element.querySelector('p') as HTMLElement)
        const italic = new Italic().appendSpinner()
        paragraph.appendChild(italic)
        return this
    }

    public static removeLast(): void {
        const id = document.querySelector('#messages')!.lastElementChild!.id
        const lastComputerMessage = new ComputerMessage([])
        lastComputerMessage.id(id)
        lastComputerMessage.removeExisting()
    }
}

export class HumanMessage extends Message {
    public constructor(children: (Html|string)[]) {
        super(children)
        this.addClass('human')
        this.on('click', event => {
            if (event.target instanceof HTMLButtonElement) {
                const text = event.target.title || event.target.textContent
                const message = new HumanMessage([text + '.'])
                message.id(this.element.id)
                message.replaceExisting()
            }
        })
    }

    public add(): void {
        super.add()
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

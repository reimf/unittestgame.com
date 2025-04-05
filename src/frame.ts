import { Div, Html, Header, Paragraph, Section } from './html.js'
import { Random } from './random.js'

abstract class Frame extends Section {
    protected constructor(elements: (Html|string)[]) {
        super()
        const children = elements.map(element => element instanceof Html ? element : new Paragraph().appendMarkdown(element))
        this.appendChild(new Div().appendChildren(children))
    }

    protected existingElement(): HTMLElement | null {
        return document.querySelector('#' + this.getId())
    }

    protected replaceExisting(): void {
        this.existingElement()!.replaceWith(this.toNode())
    }

    protected removeExisting(): void {
        this.existingElement()!.remove()
    }

    protected addTo(parentId: string): Node {
        const node = this.toNode()
        document.querySelector('#' + parentId)!.appendChild(node)
        return node
    }
}

export class Panel extends Frame {
    public constructor(title: string, elements: (Html|string)[]) {
        super(elements)
        this.prependChild(new Header().appendText(title))
        const id = title.toLowerCase().replace(/[^a-z0-9-]/g, ' ').trim().replace(/ +/g, '-')
        this.setId(id)
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
        document.querySelector('#' + this.getId())?.remove()
    }
}

abstract class Message extends Frame {
    protected constructor(elements: (Html|string)[]) {
        super(elements)
    }

    public add(): void {
        const count = document.querySelector('#messages')!.childElementCount
        this.setId(`message-${count}`)
        const node = this.addTo('messages') as HTMLElement
        node.scrollIntoView()
    }
}

export class ComputerMessage extends Message {
    public constructor(elements: (Html|string)[]) {
        super(elements)
        this.addClass('computer')
    }

    public appendProcessing(): ComputerMessage {
        this.children[0].children[0].addClass('processing')
        return this
    }

    public static removeLast(): void {
        const id = document.querySelector('#messages')!.lastElementChild!.id
        const lastComputerMessage = new ComputerMessage([])
        lastComputerMessage.setId(id)
        lastComputerMessage.removeExisting()
    }
}

export class HumanMessage extends Message {
    public constructor(children: (Html|string)[]) {
        super(children)
        this.addClass('human')
        this.onClick(event => {
            if (event.target instanceof HTMLButtonElement) {
                const text = event.target.title || event.target.textContent
                const message = new HumanMessage([text + '.'])
                message.setId(this.getId())
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
        this.setId(id)
        this.replaceExisting()
    }

    private focusFirst(): void {
        setTimeout(() => {
            const focusable = document.querySelector('button, input')
            if (focusable)
                (focusable as HTMLElement).focus()
        }, Random.integerFromRange(500))
    }
}

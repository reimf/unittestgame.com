import { Button, Div, Html, Header, Paragraph, Section } from './html.js'

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
        const id = title.toLowerCase().replace(/[^a-z0-9-]/g, ' ').trim().replace(/ +/g, '-')
        this.setId(id).prependChild(new Header().appendText(title))
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

    public add(extra?: () => void): void {
        this.callDelayed(() => {
            const count = document.querySelector('#messages')!.childElementCount
            this.setId(`message-${count}`)
            const node = this.addTo('messages') as HTMLElement
            node.classList.add('reveal')
            node.scrollIntoView()
            this.focusFirst()
            if (extra)
                extra()
        })
    }

    private focusFirst(): void {
        const focusable = document.querySelector('button, input')
        if (focusable)
            (focusable as HTMLElement).focus()
    }

    public replaceExisting(): void {
        this.callDelayed(() => super.replaceExisting())
    }
}

export class ComputerMessage extends Message {
    public constructor(elements: (Html|string)[]) {
        super(elements)
        this.addClass('computer')
    }

    public static removeLast(): void {
        const id = document.querySelector('#messages')!.lastElementChild!.id
        new ComputerMessage([]).setId(id).removeExisting()
    }
}

export class ProcessingMessage extends ComputerMessage {
    private readonly callback: () => void
    private readonly delay: number

    public constructor(text: string, callback: () => void, delay: number) {
        super([new Paragraph().appendMarkdown(text).addClass('processing')])
        this.callback = callback
        this.delay = delay
    }

    public add(): void {
        super.add(
            () => window.setTimeout(() => { ComputerMessage.removeLast(); this.callback() }, this.delay)
        )
    }
}

export class HumanMessage extends Message {
    public constructor(children: (Html|string)[]) {
        super(children)
        this.addClass('human')
    }

    public replace(): void {
        const id = document.querySelector('#messages')!.lastElementChild!.id
        this.setId(id).addClass('reveal').replaceExisting()
    }
}

export class ButtonMessage extends HumanMessage {
    public constructor(text: string, callback: () => void) {
        super([
            new Paragraph().appendChild(
                new Button().onClick(callback).appendText(text)
            )
        ])
    }
}

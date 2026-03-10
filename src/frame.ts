import { Button, Div, Html, Header, Paragraph, Section } from './html.js'

abstract class Frame extends Section {
    protected constructor(elements: readonly (Html|string)[]) {
        super()
        const children = elements.map(element => element instanceof Html ? element : new Paragraph().appendMarkdown(element))
        this.appendChild(new Div().appendChildren(children))
    }

    protected existingElement(): HTMLElement|null {
        return document.querySelector('#' + this.getId())
    }

    protected addTo(parent: Element): Node {
        const node = this.toNode()
        parent.appendChild(node)
        return node
    }
}

export class Panel extends Frame {
    public constructor(id: string, title: string, elements: readonly (Html|string)[]) {
        super(elements)
        this.setId(id).prependChild(new Header().appendText(title))
    }

    private static getPanelsElement(): HTMLElement {
        return document.querySelector('#panels')!
    }

    public static removeAll(): void {
        this.getPanelsElement().replaceChildren()
    }

    public show(): void {
        const existingElement = this.existingElement()
        if (existingElement)
            existingElement.replaceWith(this.toNode())
        else
            this.addTo(Panel.getPanelsElement())
    }
}

export abstract class Message extends Frame {
    protected constructor(elements: readonly (Html|string)[]) {
        super(elements)
    }

    private static getMessagesElement(): HTMLElement {
        return document.querySelector('#messages')!
    }

    public static hideAllButLast(): void {
        const messages = [...Message.getMessagesElement().children]
        const messagesButLast = messages.slice(0, messages.length - 1)
        messagesButLast.forEach(message => message.classList.add('hidden'))
    }

    public static addToLast(elements: Html[]): void {
        const lastMessage = Message.getMessagesElement().lastElementChild!
        const lastDiv = lastMessage.querySelector('div')!
        elements.forEach(element => lastDiv.appendChild(element.toNode()))
    }

    public add(extra: () => void=() => {}): void {
        this.callDelayed(() => {
            const count = Message.getMessagesElement().childElementCount
            this.setId(`message-${count}`)
            const node = this.addTo(Message.getMessagesElement()) as HTMLElement
            node.classList.add('reveal')
            node.scrollIntoView()
            const focusable = document.querySelector('button:not([disabled]), input:not([disabled])')
            if (focusable)
                (focusable as HTMLElement).focus()
            extra()
        })
    }
}

export class ComputerMessage extends Message {
    public constructor(elements: readonly (Html|string)[]) {
        super(elements)
        this.addClass('computer')
    }
}

export class CheckingMessage extends ComputerMessage {
    private readonly callback: () => void
    private readonly delay: number
    private readonly finalText: string

    public constructor(checkingText: string, finalText: string, callback: () => void, delay: number) {
        super([new Paragraph().appendMarkdown(checkingText + '...').addClass('checking')])
        this.finalText = finalText
        this.callback = callback
        this.delay = delay
    }

    public override add(): void {
        super.add(
            () => window.setTimeout(() => {
                this.replaceEnclosingMessageContent(this.existingElement()!, this.finalText)
                this.callback()
            }, this.delay)
        )
    }
}

export class HumanMessage extends Message {
    public constructor(children: readonly (Html|string)[]) {
        super(children)
        this.addClass('human')
    }
}

export class QuestionMessage extends HumanMessage {
    public constructor(text: string, callback: () => void) {
        super([
            new Button().onClick(callback).appendText(text)
        ])
    }
}

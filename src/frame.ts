import { Button, Div, Html, Header, Paragraph, Section } from './html.js'
import { Translation } from './translation.js'

abstract class Frame extends Section {
    protected constructor(elements: (Html|Translation)[]) {
        super()
        const children = elements.map(element => element instanceof Html ? element : new Paragraph().appendMarkdown(element))
        this.appendChild(new Div().appendChildren(children))
    }

    protected existingElement(): HTMLElement|null {
        return document.querySelector('#' + this.getId())
    }

    protected addTo(parentId: string): Node {
        const node = this.toNode()
        document.querySelector('#' + parentId)!.appendChild(node)
        return node
    }
}

export class Panel extends Frame {
    public constructor(id: string, title: Translation, elements: (Html|Translation)[]) {
        super(elements)
        this.setId(id).prependChild(new Header().appendTranslation(title))
    }

    public static removeAll(): void {
        document.querySelector('#panels')?.replaceChildren()
    }

    public show(): void {
        const existingElement = this.existingElement()
        if (existingElement)
            existingElement.replaceWith(this.toNode())
        else
            this.addTo('panels')
    }
}

abstract class Message extends Frame {
    protected constructor(elements: (Html|Translation)[]) {
        super(elements)
    }

    public add(extra?: () => void): void {
        this.callDelayed(() => {
            const count = document.querySelector('#messages')!.childElementCount
            this.setId(`message-${count}`)
            const node = this.addTo('messages') as HTMLElement
            node.classList.add('reveal')
            node.scrollIntoView()
            const focusable = document.querySelector('button:not([disabled]), input:not([disabled])')
            if (focusable)
                (focusable as HTMLElement).focus()
            if (extra)
                extra()
        })
    }
}

export class ComputerMessage extends Message {
    public constructor(elements: (Html|Translation)[]) {
        super(elements)
        this.addClass('computer')
    }
}

export class CheckingMessage extends ComputerMessage {
    private readonly callback: () => void
    private readonly delay: number
    private readonly finalText: Translation

    public constructor(checkingText: Translation, finalText: Translation, callback: () => void, delay: number) {
        super([new Paragraph().appendMarkdown(checkingText).addClass('checking')])
        this.finalText = finalText
        this.callback = callback
        this.delay = delay
    }

    public add(): void {
        super.add(
            () => window.setTimeout(() => {
                this.replaceEnclosingMessageContent(this.existingElement()!, this.finalText.toString())
                this.callback()
            }, this.delay)
        )
    }
}

export class HumanMessage extends Message {
    public constructor(children: (Html|Translation)[]) {
        super(children)
        this.addClass('human')
    }
}

export class QuestionMessage extends HumanMessage {
    public constructor(text: Translation, callback: () => void) {
        super([
            new Button().onClick(callback).appendTranslation(text)
        ])
    }
}

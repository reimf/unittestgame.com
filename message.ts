abstract class Message extends Section {
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

class ComputerMessage extends Message {
    public constructor(children: Html[]) {
        super(children)
        this.addClass('computer')
    }
}

class HumanMessage extends Message {
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

class HumanMenuMessage extends HumanMessage {
    public constructor(buttons: Button[]) {
        super([
            new Menu(buttons),
        ])
    }
}

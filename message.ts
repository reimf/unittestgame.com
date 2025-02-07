class Message extends Section {
    static messageCount: number = 0

    public constructor(children: Html[]) {
        super(children)
    }

    public addAsComputer(): void {
        this.id(`message-${++Message.messageCount}`)
        this.addClass('computer')
        this.addTo('messages')
        this.scrollIntoView()
    }

    public addAsHuman(): void {
        this.id(`message-${++Message.messageCount}`)
        this.addClass('human')
        this.addTo('messages')
        this.setFocus()
        this.scrollIntoView()
    }

    public replaceLastHuman(): void {
        this.id(`message-${Message.messageCount}`)
        this.addClass('human')
        this.replaceExisting()
        this.setFocus()
        this.scrollIntoView()
    }

    private setFocus(): void {
        const firstFocusable = this.element.querySelector('button, input') as HTMLElement
        firstFocusable?.focus()
    }

    private scrollIntoView(): void {
        this.element.scrollIntoView()
    }
}

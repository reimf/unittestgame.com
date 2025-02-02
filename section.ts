class Section extends Html {
    static messageCount: number = 0

    public constructor(children: Html[]) {
        super('section')
        this.appendChildren(children)
    }

    public show(id: string): void {
        this.id(id).addTo('panels')
    }

    public addAsComputer(): void {
        this.id(`message-${++Section.messageCount}`).addClass('computer').addTo('messages')
    }

    public addAsHuman(): void {
        this.id(`message-${++Section.messageCount}`).addClass('human').addTo('messages')
        this.setFocus()
    }

    public replaceLastHuman(): void {
        this.id(`message-${Section.messageCount}`).addClass('human').addTo('messages')
        this.setFocus()
    }

    private setFocus(): void {
        const firstFocusable = this.element.querySelector('button, input') as HTMLElement
        firstFocusable?.focus()
    }
}

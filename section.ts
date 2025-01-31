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
    }

    public replaceLastHuman(): void {
        this.id(`message-${Section.messageCount}`).addClass('human').addTo('messages')
    }
}

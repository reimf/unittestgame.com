class Section extends Html {
    static messageCount: number = 0

    public constructor(children: Html[]) {
        super('section')
        this.appendChildren(children)
    }

    public showPanel(id: string): void {
        this.id(id).addTo('panels')
    }

    public addComputerMessage(): void {
        this.id(`message-${++Section.messageCount}`).addClass('computer').addTo('messages')
    }

    public addHumanMessage(): void {
        this.id(`message-${++Section.messageCount}`).addClass('human').addTo('messages')
    }

    public replaceHumanMessage(): void {
        this.id(`message-${Section.messageCount}`).addClass('human').addTo('messages')
    }
}

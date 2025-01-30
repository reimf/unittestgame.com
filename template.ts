class Template {
    private elements: Html[]
    static messageId: number = 0

    public constructor(elements: Html[]) {
        this.elements = elements
    }

    private toHtml(id: string, className?: string): Html {
        return new Html('section').id(id).className(className).appendChildren(this.elements)
    }

    private inParent(parentId: string, sectionId: string, className?: string): void {
        document.querySelector('#' + sectionId)?.remove()
        const section = this.toHtml(sectionId, className).toHTMLElement()
        document.querySelector('#' + parentId)?.appendChild(section)
        section.querySelector('input')?.focus()
    }

    public inSidebar(id: string, className?: string): void {
        this.inParent('sidebar', id, className)
    }

    public newComputerMessage(): void {
        Template.messageId += 1
        this.inParent('messages', `message-${Template.messageId}`, 'computer')
    }

    public newHumanMessage(): void {
        Template.messageId += 1
        this.inParent('messages', `message-${Template.messageId}`, 'human')
    }

    public replaceLastHumanMessage(): void {
        this.inParent('messages', `message-${Template.messageId}`, 'human')
    }
}

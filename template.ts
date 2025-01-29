class Template {
    private items: any[]
    static messageId: number = 0

    public constructor(items: any[]) {
        this.items = items
    }

    private paragraph(lines: string[]): HTMLParagraphElement {
        const element = document.createElement('p')
        element.innerHTML = lines.join(' ').trim()
        return element
    }

    private *generateHtmlElements(items: any[]): Generator<HTMLElement> {
        const buffer: string[] = []
        for (const item of items.concat([undefined])) {
            if (typeof item === 'string')
                buffer.push(item)
            if (typeof item !== 'string' || item.endsWith('\n')) {
                yield this.paragraph(buffer)
                buffer.length = 0
            }
            if (Array.isArray(item))
                yield* this.generateHtmlElements(item)
            else if (item instanceof HTMLElement)
                yield item
            else if (item !== undefined && typeof item !== 'string')
                yield item.toHtmlElement()
        }
    }

    private toHtmlElement(id: string, _class?: string): HTMLElement {
        const section = document.createElement('section')
        section.id = id
        if (_class)
            section.classList.add(_class)

        const [title, ...body] = this.items

        const header = document.createElement('header')
        header.innerText = title
        section.appendChild(header)

        const main = document.createElement('main')
        for (const element of this.generateHtmlElements(body))
            main.appendChild(element)

        section.appendChild(main)
        return section
    }

    private inParent(parentId: string, sectionId: string, _class?: string): void {
        document.querySelector('#' + sectionId)?.remove()
        const section = this.toHtmlElement(sectionId, _class)
        document.querySelector('#' + parentId)?.appendChild(section)
        section.querySelector('input')?.focus()
    }

    public inSidebar(id: string, _class?: string): void {
        this.inParent('sidebar', id, _class)
    }

    public newHumanMessage(): void {
        Template.messageId += 1
        this.inParent('messages', `message-${Template.messageId}`, 'human')
    }

    public newComputerMessage(): void {
        Template.messageId += 1
        this.inParent('messages', `message-${Template.messageId}`, 'computer')
    }

    public replaceHumanMessage(): void {
        this.inParent('messages', `message-${Template.messageId}`, 'human')
    }
}

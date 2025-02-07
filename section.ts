abstract class Section extends Html {
    public constructor(children: Html[]) {
        super('section')
        this.appendChildren(children)
    }

    protected existingElement(): HTMLElement | null {
        return document.querySelector('#' + this.element.id)
    }

    protected replaceExisting(): void {
        this.existingElement()!.replaceWith(this.element)
    }

    protected addTo(parentId: string): void {
        document.querySelector('#' + parentId)!.appendChild(this.element)
    }
}

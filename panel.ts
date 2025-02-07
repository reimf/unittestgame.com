class Panel extends Section {
    public constructor(header: string, children: Html[]) {
        super([new Header(header), ...children])
    }

    private replaceExistingOrAddTo(parentId: string): void {
        if (this.existingElement())
            this.replaceExisting()
        else
            this.addTo(parentId)
    }

    public show(id: string): void {
        this.id(id)
        this.replaceExistingOrAddTo('panels')
    }
}

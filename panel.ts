class Panel extends Section {
    public constructor(header: string, children: Html[]) {
        super([new Header(header), ...children])
    }

    public show(id: string): void {
        this.id(id)
        if (this.existingElement())
            this.replaceExisting()
        else
            this.addTo('panels')
    }
}

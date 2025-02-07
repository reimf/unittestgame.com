class UnitTest {
    public constructor(readonly argumentList: any[], readonly expected: any) {
        this.argumentList = argumentList
        this.expected = expected
    }

    public toString(): string {
        return `${this.argumentList} -> ${this.expected}`
    }
    
    public toHtml(): Html {
        const div = new Div()
        div.appendText(this.toString())
        return div
    }
}

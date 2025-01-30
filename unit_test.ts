class UnitTest {
    readonly argumentList: any[]
    readonly expected: any

    public constructor(argumentList: any[], expected: any) {
        this.argumentList = argumentList
        this.expected = expected
    }

    public toHtml(): Html {
        return new Paragraph(`${this.argumentList} -> ${this.expected}`)
    }
}

class UnitTest {
    public constructor(readonly argumentList: any[], readonly expected: any) {
        this.argumentList = argumentList
        this.expected = expected
    }

    public toHtml(): Html {
        return new Paragraph(`${this.argumentList} -> ${this.expected}`)
    }
}

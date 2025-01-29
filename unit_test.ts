class UnitTest {
    readonly argumentList: any[]
    readonly expected: any

    public constructor(argumentList: any[], expected: any) {
        this.argumentList = argumentList
        this.expected = expected
    }

    public toHtmlElement(): HTMLElement {
        const element = document.createElement('div')
        element.textContent = `${this.argumentList} -> ${this.expected}`
        return element
    }
}

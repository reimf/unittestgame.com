"use strict";
class UnitTest {
    constructor(argumentList, expected) {
        this.argumentList = argumentList;
        this.expected = expected;
        this.argumentList = argumentList;
        this.expected = expected;
    }
    toString() {
        return `${this.argumentList} -> ${this.expected}`;
    }
    toHtml() {
        const div = new Div();
        div.appendText(this.toString());
        return div;
    }
}

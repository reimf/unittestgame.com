"use strict";
class UnitTest {
    constructor(argumentList, expected) {
        this.argumentList = argumentList;
        this.expected = expected;
        this.argumentList = argumentList;
        this.expected = expected;
    }
    toHtml() {
        return new Paragraph(`${this.argumentList} -> ${this.expected}`);
    }
}

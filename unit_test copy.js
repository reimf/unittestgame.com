"use strict";
class UnitTest {
    constructor(argumentList, expected) {
        this.argumentList = argumentList;
        this.expected = expected;
    }
    toHtml() {
        return new Html('div').appendText(`${this.argumentList} -> ${this.expected}`);
    }
}

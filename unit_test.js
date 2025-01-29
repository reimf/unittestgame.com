"use strict";
class UnitTest {
    constructor(argumentList, expected) {
        this.argumentList = argumentList;
        this.expected = expected;
    }
    toHtmlElement() {
        const element = document.createElement('div');
        element.textContent = `${this.argumentList} -> ${this.expected}`;
        return element;
    }
}

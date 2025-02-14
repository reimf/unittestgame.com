export default class UnitTest {
    constructor(argumentList, expected) {
        this.argumentList = argumentList;
        this.expected = expected;
        this.argumentList = argumentList;
        this.expected = expected;
    }
    toString() {
        return `${this.argumentList} -> ${this.expected}`;
    }
}

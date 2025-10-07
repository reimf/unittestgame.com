import { Highlighter } from './highlighter.js';
export class UnitTest {
    parameters;
    argumentList;
    unit;
    expected;
    constructor(parameters, argumentList, unit, expected) {
        this.parameters = parameters;
        this.argumentList = argumentList;
        this.unit = unit;
        this.expected = expected;
    }
    toHtmlWithResult(result) {
        const argumentsText = this.argumentList.map((value, index) => this.parameters[index].format(value)).join(', ');
        const text = `${this.unit.name}(${argumentsText}) === ${this.unit.format(result)}`;
        return Highlighter.line(text);
    }
    toHtml() {
        return this.toHtmlWithResult(this.expected);
    }
}

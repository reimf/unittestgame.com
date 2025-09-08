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
    toStringWithResult(result) {
        const argumentsText = this.argumentList.map((value, index) => this.parameters[index].format(value)).join(', ');
        return `${this.unit.name}(${argumentsText}) === ${this.unit.format(result)}`;
    }
    toString() {
        return this.toStringWithResult(this.expected);
    }
}

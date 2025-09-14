import { Translation } from './translation.js';
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
    toTranslationWithResult(result) {
        const argumentsText = this.argumentList.map((value, index) => this.parameters[index].format(value)).join(', ');
        return new Translation(`${this.unit.name}(${argumentsText}) === ${this.unit.format(result)}`);
    }
    toTranslation() {
        return this.toTranslationWithResult(this.expected);
    }
}

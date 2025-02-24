import { Variable } from "./variable.js"

export class UnitTest {
    public constructor(readonly parameters: Variable[], readonly argumentList: any[], readonly unit: Variable, readonly expected: any) {
        this.argumentList = argumentList
        this.expected = expected
    }

    public toStringWithResult(result: any): string {
        const argumentsText = this.argumentList.map((value, index) => {
            const parameter = this.parameters[index]
            return parameter.format(value)
        }).join(', ')
        return `${this.unit.name}(${argumentsText}) === ${this.unit.format(result)}`
    }

    public toString(): string {
        return this.toStringWithResult(this.expected)
    }
}

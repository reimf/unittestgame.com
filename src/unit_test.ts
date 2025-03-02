import { Variable } from "./variable.js"

export class UnitTest {
    private readonly parameters: Variable[]
    public readonly argumentList: any[]
    private readonly unit: Variable
    public readonly expected: any

    public constructor(parameters: Variable[], argumentList: any[], unit: Variable, expected: any) {
        this.parameters = parameters
        this.argumentList = argumentList
        this.unit = unit
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

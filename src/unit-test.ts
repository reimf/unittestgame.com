import { Translation } from './translation.js'
import { Variable } from './variable.js'

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

    public toTranslationWithResult(result: any): Translation {
        const argumentsText = this.argumentList.map((value, index) => this.parameters[index].format(value)).join(', ')
        return new Translation(`${this.unit.name}(${argumentsText}) === ${this.unit.format(result)}`)
    }

    public toTranslation(): Translation {
        return this.toTranslationWithResult(this.expected)
    }
}

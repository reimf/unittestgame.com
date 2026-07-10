import { Div } from './html.js'
import { ProgrammingLanguage } from './programming-language.js'
import { Value, Variable } from './variable.js'

export class UnitTest<Parameters extends readonly Value[] = readonly Value[], Result extends Value = Value> {
    private readonly parameters: readonly Variable[]
    public readonly argumentList: Parameters
    private readonly unit: Variable
    public readonly expected: Result

    public constructor(parameters: readonly Variable[], argumentList: Parameters, unit: Variable, expected: Result) {
        this.parameters = parameters
        this.argumentList = argumentList
        this.unit = unit
        this.expected = expected
    }

    public toTextWithResult(result: Result|undefined): string {
        const argumentsText = this.argumentList.map((value, index) => this.parameters[index]!.format(value)).join(', ')
        return `${this.unit.name}(${argumentsText}) === ${this.unit.format(result)}`
    }

    public toHtmlWithResult(result: Result|undefined, programmingLanguage: ProgrammingLanguage): Div {
        return programmingLanguage.highlight(this.toTextWithResult(result))[0]!
    }

    public toHtml(programmingLanguage: ProgrammingLanguage): Div {
        return this.toHtmlWithResult(this.expected, programmingLanguage)
    }
}

import { Div } from './html.js'
import { Highlighter } from './highlighter.js'
import { Variable } from './variable.js'

export class UnitTest {
    private readonly parameters: readonly Variable[]
    public readonly argumentList: readonly any[]
    private readonly unit: Variable
    public readonly expected: any

    public constructor(parameters: readonly Variable[], argumentList: readonly any[], unit: Variable, expected: any) {
        this.parameters = parameters
        this.argumentList = argumentList
        this.unit = unit
        this.expected = expected
    }

    public toHtmlWithResult(result: any): Div {
        const argumentsText = this.argumentList.map((value, index) => this.parameters[index].format(value)).join(', ')
        const text = `${this.unit.name}(${argumentsText}) === ${this.unit.format(result)}`
        return new Highlighter(text).highlight()
    }

    public toHtml(): Div {
        return this.toHtmlWithResult(this.expected)
    }
}

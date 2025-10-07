import { Div } from './html.js'
import { Highlighter } from './highlighter.js'
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

    public toHtmlWithResult(result: any): Div {
        const argumentsText = this.argumentList.map((value, index) => this.parameters[index].format(value)).join(', ')
        const text = `${this.unit.name}(${argumentsText}) === ${this.unit.format(result)}`
        return Highlighter.line(text)
    }

    public toHtml(): Div {
        return this.toHtmlWithResult(this.expected)
    }
}

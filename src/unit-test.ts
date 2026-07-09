import { Div } from './html.js'
import { ProgrammingLanguage } from './programming-language.js'
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

    public toTextWithResult(result: any): string {
        const argumentsText = this.argumentList.map((value, index) => this.parameters[index]!.format(value)).join(', ')
        return `${this.unit.name}(${argumentsText}) === ${this.unit.format(result)}`
    }

    public toHtmlWithResult(result: any, programmingLanguage: ProgrammingLanguage): Div {
        return programmingLanguage.highlight(this.toTextWithResult(result))[0]!
    }

    public toHtml(programmingLanguage: ProgrammingLanguage): Div {
        return this.toHtmlWithResult(this.expected, programmingLanguage)
    }
}

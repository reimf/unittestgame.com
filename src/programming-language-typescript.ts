import { ProgrammingLanguage } from './programming-language-base.js'
import type { TokenTypes } from './highlighter.js'
import { Variable, BooleanVariable, IntegerVariable } from './variable.js'

export class TypeScript extends ProgrammingLanguage {
    public override readonly id = 'typescript' as const
    public override readonly name = 'TypeScript'

    public override transpile(javascriptCode: string, parameters: readonly Variable[], unit: Variable): string {
        return javascriptCode
            .replace(/\bfunction (\w+)\((.*?)\) *\{/g, (_match: string, name: string, parameterList: string) => {
                const typedParameters = parameterList.split(', ').filter(parameterName => parameterName)
                    .map((parameterName, index) => `${parameterName}: ${this.dataType(parameters[index]!)}`)
                    .join(', ')
                return `function ${name}(${typedParameters}): ${this.dataType(unit)} {`
            })
    }

    private dataType(variable: Variable): string {
        if (variable instanceof BooleanVariable) return 'boolean'
        if (variable instanceof IntegerVariable) return 'number'
        return 'string'
    }

    public override getTokenTypes(): TokenTypes {
        return new Map([
            ['whitespace', /^ +/],
            ['number', /^\d+(\.\d+)?/],
            ['keyword', /^(function|if|return|let|new|number|boolean|string)\b/],
            ['literal', /^(true|false)\b/],
            ['class', /^[A-Z][a-zA-Z]*/],
            ['function', /^[a-zA-Z]+(?=\()/],
            ['variable', /^[a-zA-Z]+/],
            ['regexp', /^\/\S.*?\//],
            ['string', /^".*?"/],
            ['operator', /^(!==|!|%|&&|\+=|<=|<|===|=|>=|>|\|\||\/)/],
            ['punctuation', /^[(){}:,]/],
            ['dot', /^\./],
            ['error', /^.+/],
        ] as const)
    }
}

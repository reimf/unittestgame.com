import { ProgrammingLanguage } from './programming-language-base.js'
import type { TokenTypes } from './highlighter.js'
import { Variable, BooleanVariable, IntegerVariable, FloatVariable } from './variable.js'

export class Csharp extends ProgrammingLanguage {
    public override readonly id = 'csharp' as const
    public override readonly name = 'C#'

    public override transpile(javascriptCode: string, parameters: readonly Variable[], unit: Variable): string {
        return javascriptCode
            .replace(/  /g, '    ')
            .replace(/\bfunction (\w+)\((.*?)\) *\{/g, (_match: string, name: string, parameterList: string) => {
                const canReturnNull = /\breturn +undefined\b/.test(javascriptCode)
                const typedParameters = parameterList.split(', ').filter(parameterName => parameterName)
                    .map((parameterName, index) => `${this.dataType(parameters[index]!, false)} ${parameterName}`)
                    .join(', ')
                return `static ${this.dataType(unit, canReturnNull)} ${name}(${typedParameters}) {`
            })
            .replace(/\blet +/g, 'var ')
            .replace(/\bnew RegExp\((.+?)\)\.test\((.+?)\)/g, 'Regex.IsMatch($2, $1)')
            .replace(/\/([^\/]*)\/\.test\((.+?)\)/g, 'Regex.IsMatch($2, "$1")')
            .replace(/(\w+)\.length\b/g, '$1.Length')
            .replace(/(\w+)\.toFixed\((\d+)\)/g, '$1.ToString("F$2")')
            .replace(/(\w+)\.toFixed\(\)/g, '$1.ToString("F0")')
            .replace(/(\w+)\.toString\(\)/g, '$1.ToString()')
            .replace(/\bundefined\b/g, 'null')
            .replace(/===/g, '==')
            .replace(/!==/g, '!=')
            .replace(/^( +.+)$/gm, '$1;')
            .replace(/^(?=[\s\S]*Regex\.IsMatch\()/, 'using System.Text.RegularExpressions;\n')
    }

    private dataType(variable: Variable, nullable: boolean): string {
        const questionMarkIfNullable = nullable ? '?' : ''
        if (variable instanceof BooleanVariable) return 'bool' + questionMarkIfNullable
        if (variable instanceof IntegerVariable) return 'int' + questionMarkIfNullable
        if (variable instanceof FloatVariable) return 'double' + questionMarkIfNullable
        return 'string'
    }

    public override getTokenTypes(): TokenTypes {
        return new Map([
            ['whitespace', /^ +/],
            ['number', /^\d+(\.\d+)?/],
            ['keyword', /^(using|static|var|int|double|bool|string|if|return)\b\??/],
            ['literal', /^(true|false|null)\b/],
            ['function', /^[a-zA-Z][a-zA-Z0-9]*(?=\()/],
            ['class', /^[A-Z][a-zA-Z]*/],
            ['variable', /^[a-zA-Z][a-zA-Z0-9]*/],
            ['string', /^".*?"/],
            ['operator', /^(!=|!|%|&&|\+=|<=|<|==|=|>=|>|\|\|)/],
            ['punctuation', /^[(){};,]/],
            ['dot', /^\./],
            ['error', /^.+/],
        ] as const)
    }
}

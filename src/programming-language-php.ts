import { ProgrammingLanguage } from './programming-language-base.js'
import type { TokenTypes } from './highlighter.js'
import { Variable, BooleanVariable, IntegerVariable } from './variable.js'

export class Php extends ProgrammingLanguage {
    public override readonly id = 'php' as const
    public override readonly name = 'PHP'

    public override transpile(javascriptCode: string, parameters: readonly Variable[], unit: Variable): string {
        const variableNames = [
            ...parameters.map(parameter => parameter.name),
            ...[...javascriptCode.matchAll(/\blet (\w+)/g)].map(match => match[1]!),
        ]
        return javascriptCode
            .replace(/  /g, '    ')
            .replace(new RegExp(`\\b(${variableNames.join('|')})\\b`, 'g'), '$$$1')
            .replace(/\bfunction (\w+)\((.*?)\) *\{/g, (_match: string, name: string, parameterList: string) => {
                const typedParameters = parameterList.split(', ').filter(parameterName => parameterName)
                    .map((parameterName, index) => `${this.dataType(parameters[index]!)} ${parameterName}`)
                    .join(', ')
                return `function ${name}(${typedParameters}): ${this.dataType(unit)} {`
            })
            .replace(/\blet +/g, '')
            .replace(/\bnew RegExp\((.+?)\)\.test\((.+?)\)/g, 'preg_match("/$1/", $2)')
            .replace(/\/([^\/]*)\/\.test\((.+?)\)/g, 'preg_match("/$1/", $2)')
            .replace(/(\$\w+)\.length\b/g, 'strlen($1)')
            .replace(/\bMath\.floor\((\$\w+) \/ (\d+)\)/g, 'intdiv($1, $2)')
            .replace(/(\$\w+)\.toString\(\)/g, 'strval($1)')
            .replace(/ \+= /g, ' .= ')
            .replace(/ \+ /g, ' . ')
            .replace(/^( +.+)$/gm, '$1;')
    }

    private dataType(variable: Variable): string {
        if (variable instanceof BooleanVariable) return 'bool'
        if (variable instanceof IntegerVariable) return 'int'
        return 'string'
    }

    public override getTokenTypes(): TokenTypes {
        return new Map([
            ['whitespace', /^ +/],
            ['number', /^\d+(\.\d+)?/],
            ['keyword', /^(function|if|return|int|bool|string)\b/],
            ['literal', /^(true|false)\b/],
            ['function', /^[a-zA-Z_][a-zA-Z0-9_]*(?=\()/],
            ['variable', /^\$?[a-zA-Z_][a-zA-Z0-9_]*/],
            ['string', /^".*?"/],
            ['operator', /^(!==|!|%|&&|\.=|\.|<=|<|===|=|>=|>|\|\||\/)/],
            ['punctuation', /^[(){};:,]/],
            ['error', /^.+/],
        ] as const)
    }
}

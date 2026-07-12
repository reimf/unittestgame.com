import { ProgrammingLanguage } from './programming-language-base.js'
import type { TokenTypes } from './highlighter.js'
import { Variable, BooleanVariable, IntegerVariable } from './variable.js'

export class Java extends ProgrammingLanguage {
    public override readonly id = 'java' as const
    public override readonly name = 'Java'

    public override transpile(javascriptCode: string, parameters: readonly Variable[], unit: Variable): string {
        return javascriptCode
            .replace(/  /g, '    ')
            .replace(/\bfunction (\w+)\((.*?)\) *\{/g, (_match: string, name: string, parameterList: string) => {
                const typedParameters = parameterList.split(', ').filter(parameterName => parameterName)
                    .map((parameterName, index) => `${this.dataType(parameters[index]!)} ${parameterName}`)
                    .join(', ')
                return `static ${this.dataType(unit)} ${name}(${typedParameters}) {`
            })
            .replace(/\blet +/g, 'var ')
            .replace(/\bnew RegExp\((.+?)\)\.test\((.+?)\)/g, 'Pattern.compile($1).matcher($2).find()')
            .replace(/\/([^\/]*)\/\.test\((.+?)\)/g, 'Pattern.compile("$1").matcher($2).find()')
            .replace(/(\w+)\.length\b/g, '$1.length()')
            .replace(/\bMath\.floor\((\w+) \/ (\d+)\)/g, '$1 / $2')
            .replace(/(\w+)\.toString\(\)/g, 'String.valueOf($1)')
            .replace(/^(.*) === ("[^"]*")$/gm, '$2.equals($1)')
            .replace(/===/g, '==')
            .replace(/!==/g, '!=')
            .replace(/^( +.+)$/gm, '$1;')
            .replace(/^(?=[\s\S]*Pattern\.compile\()/, 'import java.util.regex.Pattern;\n')
    }

    private dataType(variable: Variable): string {
        if (variable instanceof BooleanVariable) return 'boolean'
        if (variable instanceof IntegerVariable) return 'int'
        return 'String'
    }

    public override getTokenTypes(): TokenTypes {
        return new Map([
            ['whitespace', /^ +/],
            ['number', /^\d+(\.\d+)?/],
            ['keyword', /^(import|static|var|int|boolean|String|if|return)\b/],
            ['literal', /^(true|false)\b/],
            ['function', /^[a-zA-Z][a-zA-Z0-9]*(?=\()/],
            ['class', /^[A-Z][a-zA-Z]*/],
            ['variable', /^[a-zA-Z][a-zA-Z0-9]*/],
            ['string', /^".*?"/],
            ['operator', /^(!=|!|%|&&|\+=|<=|<|==|=|>=|>|\|\||\/)/],
            ['punctuation', /^[(){};,]/],
            ['dot', /^\./],
            ['error', /^.+/],
        ] as const)
    }
}

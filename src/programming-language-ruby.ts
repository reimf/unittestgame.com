import { ProgrammingLanguage } from './programming-language-base.js'
import type { TokenTypes } from './highlighter.js'

export class Ruby extends ProgrammingLanguage {
    public override readonly id = 'ruby' as const
    public override readonly name = 'Ruby'

    public override transpile(typescriptCode: string): string {
        return typescriptCode
            .replace(/: (?:number|boolean|string)/g, '')
            .replace(/\bfunction (\w+)\((.*?)\) \{/g, 'def $1($2)')
            .replace(/===/g, '==')
            .replace(/!==/g, '!=')
            .replace(/\bif +\((.+?)\) +return (.+)$/gm, 'return $2 if $1')
            .replace(/\n\}$/g, '\nend')
    }

    public override getTokenTypes(): TokenTypes {
        return new Map([
            ['whitespace', /^ +/],
            ['number', /^\d+(\.\d+)?/],
            ['keyword', /^(def|if|return|end)\b/],
            ['literal', /^(true|false)\b/],
            ['function', /^[a-zA-Z_][a-zA-Z0-9_]*(?=\()/],
            ['variable', /^[a-zA-Z_][a-zA-Z0-9_]*/],
            ['string', /^("[^"]*"|'[^']*')/],
            ['operator', /^(!=|==|<=|>=|&&|\|\||%|\+|\/|<|>|=|!|-|\*)/],
            ['punctuation', /^[(),]/],
            ['dot', /^\./],
            ['error', /^.+/],
        ] as const)
    }
}

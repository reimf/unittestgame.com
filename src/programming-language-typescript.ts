import { ProgrammingLanguage } from './programming-language-base.js'
import type { TokenTypes } from './highlighter.js'

export class TypeScript extends ProgrammingLanguage {
    public override readonly id = 'typescript' as const
    public override readonly name = 'TypeScript'

    public override transpile(typescriptCode: string): string {
        return typescriptCode
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

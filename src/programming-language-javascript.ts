import { ProgrammingLanguage } from './programming-language-base.js'
import type { TokenTypes } from './highlighter.js'

export class JavaScript extends ProgrammingLanguage {
    public override readonly id = 'javascript' as const
    public override readonly name = 'JavaScript'

    public override transpile(typescriptCode: string): string {
        return typescriptCode
            .replace(/: \w+/g, '')
    }

    public override getTokenTypes(): TokenTypes {
        return new Map([
            ['whitespace', /^ +/],
            ['number', /^\d+(\.\d+)?/],
            ['keyword', /^(function|if|return|let|new)\b/],
            ['literal', /^(true|false)\b/],
            ['class', /^[A-Z][a-zA-Z]*/],
            ['function', /^[a-zA-Z]+(?=\()/],
            ['variable', /^[a-zA-Z]+/],
            ['regexp', /^\/\S.*?\//],
            ['string', /^".*?"/],
            ['operator', /^(!==|!|%|&&|\+=|<=|<|===|=|>=|>|\|\||\/)/],
            ['punctuation', /^[(){},]/],
            ['dot', /^\./],
            ['error', /^.+/],
        ] as const)
    }
}

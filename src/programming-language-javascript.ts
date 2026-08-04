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
            ['number', /^\d+/],
            ['type', /^JAVASCRIPT-IS-DYNAMICALLY-TYPED/],
            ['keyword', /^(function|if|return)\b/],
            ['literal', /^(true|false)\b/],
            ['operator', /^(===|!==|<=|<|>=|>|=|\*|%|!|\|\||&&)/],
            ['class', /^[A-Z][a-zA-Z]*/],
            ['function', /^[a-zA-Z]+(?=\()/],
            ['variable', /^[a-zA-Z]+/],
            ['string', /^".*?"/],
            ['punctuation', /^(\(|\)|\{|\}|,)/],
            ['dot', /^\./],
            ['error', /^.+/],
        ] as const)
    }
}

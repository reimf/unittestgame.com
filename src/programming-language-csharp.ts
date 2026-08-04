import { ProgrammingLanguage } from './programming-language-base.js'
import type { TokenTypes } from './highlighter.js'

export class Csharp extends ProgrammingLanguage {
    public override readonly id = 'csharp' as const
    public override readonly name = 'C#'

    public override transpile(typescriptCode: string): string {
        return typescriptCode
            .replace(/\bnumber\b/g, 'int')
            .replace(/\bboolean\b/g, 'bool')
            .replace(/\bfunction (\w+)\((.*?)\): (\w+) \{/g, 'static $3 $1($2)\n{')
            .replace(/(\w+): (\w+)/g, '$2 $1')
            .replace(/===/g, '==')
            .replace(/!==/g, '!=')
            .replace(/^( +.+)$/gm, '$1;')
    }

    public override getTokenTypes(): TokenTypes {
        return new Map([
            ['whitespace', /^ +/],
            ['number', /^\d+/],
            ['type', /^(int|bool|string)\b/],
            ['keyword', /^(static|if|return)\b/],
            ['literal', /^(true|false)\b/],
            ['operator', /^(==|!=|<=|<|>=|>|=|\*|%|!|\|\||&&)/],
            ['function', /^[a-zA-Z][a-zA-Z0-9]*(?=\()/],
            ['class', /^[A-Z][a-zA-Z]*/],
            ['variable', /^[a-zA-Z][a-zA-Z0-9]*/],
            ['string', /^".*?"/],
            ['punctuation', /^(\(|\)|\{|\}|;|,)/],
            ['dot', /^\./],
            ['error', /^.+/],
        ] as const)
    }
}

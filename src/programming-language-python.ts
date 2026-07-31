import { ProgrammingLanguage } from './programming-language-base.js'
import type { TokenTypes } from './highlighter.js'

export class Python extends ProgrammingLanguage {
    public override readonly id = 'python' as const
    public override readonly name = 'Python'

    public override transpile(typescriptCode: string): string {
        return typescriptCode
            .replace(/\bnumber\b/g, 'int')
            .replace(/\bboolean\b/g, 'bool')
            .replace(/\bstring\b/g, 'str')
            .replace(/\bfunction (\w+)\((.*?)\): (\w+) \{/g, 'def $1($2) -> $3:')
            .replace(/(\w+)\.length\b/g, 'len($1)')
            .replace(/\btrue\b/g, 'True')
            .replace(/\bfalse\b/g, 'False')
            .replace(/===/g, '==')
            .replace(/!==/g, '!=')
            .replace(/&&/g, 'and')
            .replace(/\|\|/g, 'or')
            .replace(/!(?!=)/g, 'not ')
            .replace(/\bif +\((.+?)\) +return/g, 'if $1: return')
            .replace(/\n\}/g, '')
    }

    public override getTokenTypes(): TokenTypes {
        return new Map([
            ['whitespace', /^ +/],
            ['number', /^\d+(\.\d+)?/],
            ['keyword', /^(def|if|return|and|or|not|is)\b|^(?:int|bool|str)\b(?!\()/],
            ['literal', /^(True|False|None)\b/],
            ['class', /^[A-Z][a-zA-Z]*/],
            ['function', /^[a-zA-Z_][a-zA-Z0-9_]*(?=\()/],
            ['variable', /^[a-zA-Z_][a-zA-Z0-9_]*/],
            ['string', /^("[^"]*"|'[^']*')/],
            ['operator', /^(!=|%|\+|\/\/|\/|<=|<|==|=|>=|>|->|-|\*)/],
            ['punctuation', /^[(){}[\]:,]/],
            ['dot', /^\./],
            ['error', /^.+/],
        ] as const)
    }
}

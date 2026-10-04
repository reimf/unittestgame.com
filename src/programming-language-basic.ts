import { ProgrammingLanguage } from './programming-language-base.js'
import type { TokenTypes } from './highlighter.js'

export class Basic extends ProgrammingLanguage {
    public override readonly id = 'basic' as const
    public override readonly name = 'BASIC'

    public override transpile(typescriptCode: string): string {
        return typescriptCode
            .replace(/\bfunction (\w+)\((.*?)\): (\w+) \{/g, 'Function $1($2) As $3')
            .replace(/(\w+): (\w+)/g, '$1 As $2')
            .replace(/\bnumber\b/g, 'Integer')
            .replace(/\bboolean\b/g, 'Boolean')
            .replace(/\bstring\b/g, 'String')
            .replace(/\bif +\((.+)\) +return/g, 'If $1 Then return')
            .replace(/\breturn\b/g, 'Return')
            .replace(/\btrue\b/g, 'True')
            .replace(/\bfalse\b/g, 'False')
            .replace(/!==/g, '<>')
            .replace(/===/g, '=')
            .replace(/&&/g, 'And')
            .replace(/\|\|/g, 'Or')
            .replace(/!/g, 'Not ')
            .replace(/%/g, 'Mod')
            .replace(/\n\}$/g, '\nEnd Function')
    }

    public override getTokenTypes(): TokenTypes {
        return new Map([
            ['whitespace', /^ +/],
            ['number', /^\d+/],
            ['type', /^(Integer|Boolean|String)\b/],
            ['keyword', /^(Function|As|If|Then|Return|End)\b/],
            ['literal', /^(True|False)\b/],
            ['operator', /^(<>|<=|<|>=|>|=|\*|(Mod|Not|Or|And)\b)/],
            ['function', /^[a-zA-Z_][a-zA-Z0-9_]*(?=\()/],
            ['variable', /^[a-zA-Z_][a-zA-Z0-9_]*/],
            ['string', /^".*?"/],
            ['punctuation', /^(\(|\)|,)/],
            ['dot', /^\./],
            ['error', /^.+/],
        ] as const)
    }
}

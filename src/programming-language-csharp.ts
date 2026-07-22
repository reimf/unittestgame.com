import { ProgrammingLanguage } from './programming-language-base.js'
import type { TokenTypes } from './highlighter.js'

export class Csharp extends ProgrammingLanguage {
    public override readonly id = 'csharp' as const
    public override readonly name = 'C#'

    public override transpile(javascriptCode: string): string {
        return javascriptCode
            .replace(/\blet (\w+): (\w+)\b/g, '$2 $1')
            .replace(/\bfunction (\w+)\((.*?)\): (\w+) \{/g, 'static $3 $1($2)\n{')
            .replace(/\bnumber\b/g, 'int')
            .replace(/\bboolean\b/g, 'bool')
            .replace(/(\w+): (\w+)/g, '$2 $1')
            .replace(/\bnew RegExp\((.+?)\)\.test\((.+?)\)/g, 'Regex.IsMatch($2, $1)')
            .replace(/\/([^\/]*)\/\.test\((.+?)\)/g, 'Regex.IsMatch($2, "$1")')
            .replace(/(\w+)\.length\b/g, '$1.Length')
            .replace(/\bMath\.floor\((\w+) \/ (\d+)\)/g, '$1 / $2')
            .replace(/(\w+)\.toString\(\)/g, '$1.ToString()')
            .replace(/===/g, '==')
            .replace(/!==/g, '!=')
            .replace(/^( +.+)$/gm, '$1;')
            .replace(/^(?=[\s\S]*Regex\.IsMatch\()/, 'using System.Text.RegularExpressions;\n')
    }

    public override getTokenTypes(): TokenTypes {
        return new Map([
            ['whitespace', /^ +/],
            ['number', /^\d+(\.\d+)?/],
            ['keyword', /^(using|static|var|int|bool|string|if|return)\b/],
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

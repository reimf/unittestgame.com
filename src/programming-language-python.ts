import { ProgrammingLanguage } from './programming-language-base.js'
import type { TokenTypes } from './highlighter.js'

export class Python extends ProgrammingLanguage {
    public override readonly id = 'python' as const
    public override readonly name = 'Python'

    public override transpile(javascriptCode: string): string {
        return javascriptCode
            .replace(/  /g, '    ')
            .replace(/\bfunction (.*) +\{/g, 'def $1:')
            .replace(/\blet +/g, '')
            .replace(/\bnew +/g, '')
            .replace(/\bRegExp\((.+?)\)\.test\((.+?)\)/g, 're.search($1, $2) is not None')
            .replace(/\/([^\/]*)\/\.test\((.+?)\)/g, "re.search('$1', $2)")
            .replace(/(\w+)\.length\b/g, 'len($1)')
            .replace(/\bMath\.floor\((\w+) \/ (\d+)\) \+ "\." \+ (\w+) % (\d+)/g, 'str($1 // $2) + "." + str($3 % $4)')
            .replace(/"" \+ Math\.floor\((\w+) \/ (\d+)\)/g, 'str($1 // $2)')
            .replace(/(\w+)\.toString\(\)/g, 'str($1)')
            .replace(/\btrue\b/g, 'True')
            .replace(/\bfalse\b/g, 'False')
            .replace(/===/g, '==')
            .replace(/!==/g, '!=')
            .replace(/&&/g, 'and')
            .replace(/\|\|/g, 'or')
            .replace(/!(?!=)/g, 'not ')
            .replace(/\bif +\((.+?)\) +return/g, 'if $1: return')
            .replace(/\n *\}/g, '')
            .replace(/^(?=[\s\S]*re\.search\()/, 'import re\n')
    }

    public override getTokenTypes(): TokenTypes {
        return new Map([
            ['whitespace', /^ +/],
            ['number', /^\d+(\.\d+)?/],
            ['keyword', /^(def|if|return|and|or|not|is)\b/],
            ['literal', /^(True|False|None)\b/],
            ['class', /^[A-Z][a-zA-Z]*/],
            ['function', /^[a-zA-Z_][a-zA-Z0-9_]*(?=\()/],
            ['variable', /^[a-zA-Z_][a-zA-Z0-9_]*/],
            ['regexp', /^\/\S.*?\//],
            ['string', /^("[^"]*"|'[^']*')/],
            ['operator', /^(!=|%|\+|\/\/|<=|<|==|=|>=|>)/],
            ['punctuation', /^[(){}[\]:,]/],
            ['dot', /^\./],
            ['error', /^.+/],
        ] as const)
    }
}

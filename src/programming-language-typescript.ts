import { ProgrammingLanguage } from './programming-language-base.js'
import type { TokenTypes } from './highlighter.js'

export class TypeScript extends ProgrammingLanguage {
    public override readonly id = 'typescript' as const
    public override readonly name = 'TypeScript'

    public override transpile(typescriptCode: string): string {
        return typescriptCode
            .replace(/(Math\.floor\(\w+ \/ \d+\))\.toString\(\) \+ "\." \+ \((\w+ % \d+)\)\.toString\(\)/g, '$1 + "." + ($2)')
            .replace(/"\$" \+ (Math\.floor\(\w+ \/ \d+\))\.toString\(\)/g, '"$" + $1')
            .replace(/"\$" \+ (\(Math\.floor\(\w+ \/ \d+\) \* \d+\))\.toString\(\)/g, '"$" + $1')
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
            ['string', /^".*?"/],
            ['operator', /^(!==|!|%|&&|\+=|\+|-|\*|<=|<|===|=|>=|>|\|\||\/)/],
            ['punctuation', /^[(){}:,]/],
            ['dot', /^\./],
            ['error', /^.+/],
        ] as const)
    }
}

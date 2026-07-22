import { ProgrammingLanguage } from './programming-language-base.js'
import type { TokenTypes } from './highlighter.js'

export class Java extends ProgrammingLanguage {
    public override readonly id = 'java' as const
    public override readonly name = 'Java'

    public override transpile(javascriptCode: string): string {
        return javascriptCode
            .replace(/\blet (\w+): (\w+)\b/g, '$2 $1')
            .replace(/\bfunction (\w+)\((.*?)\): (\w+) \{/g, 'static $3 $1($2) {')
            .replace(/\bnumber\b/g, 'int')
            .replace(/\bboolean\b/g, 'boolean')
            .replace(/\bstring\b/g, 'String')
            .replace(/(\w+): (\w+)/g, '$2 $1')
            .replace(/\bnew RegExp\((.+?)\)\.test\((.+?)\)/g, 'Pattern.compile($1).matcher($2).find()')
            .replace(/\/([^\/]*)\/\.test\((.+?)\)/g, 'Pattern.compile("$1").matcher($2).find()')
            .replace(/(\w+)\.length\b/g, '$1.length()')
            .replace(/\bMath\.floor\((\w+) \/ (\d+)\)/g, '$1 / $2')
            .replace(/(\w+)\.toString\(\)/g, 'String.valueOf($1)')
            .replace(/^(.*) === ("[^"]*")$/gm, '$2.equals($1)')
            .replace(/===/g, '==')
            .replace(/!==/g, '!=')
            .replace(/^( +.+)$/gm, '$1;')
            .replace(/^(?=[\s\S]*Pattern\.compile\()/, 'import java.util.regex.Pattern;\n')
    }

    public override getTokenTypes(): TokenTypes {
        return new Map([
            ['whitespace', /^ +/],
            ['number', /^\d+(\.\d+)?/],
            ['keyword', /^(import|static|var|int|boolean|String|if|return)\b/],
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

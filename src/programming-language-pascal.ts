import { ProgrammingLanguage } from './programming-language-base.js'
import type { TokenTypes } from './highlighter.js'

export class Pascal extends ProgrammingLanguage {
    public override readonly id = 'pascal' as const
    public override readonly name = 'Pascal'

    public override transpile(typescriptCode: string): string {
        return typescriptCode
            .replace(/\bnumber\b/g, 'integer')
            .replace(/\bfunction (\w+)\((.*?)\): (\w+) \{/g, (_, name: string, parameters: string, type: string) => `function ${name}(${parameters.replace(/, /g, '; ')}): ${type};\nbegin`)
            .replace(/\bif +\((.+)\) +return/g, (_, condition: string) => `if ${this.parenthesizeComparisons(condition)} then return`)
            .replace(/\breturn (.+)$/gm, 'exit($1);')
            .replace(/"/g, '\'')
            .replace(/!==/g, '<>')
            .replace(/===/g, '=')
            .replace(/&&/g, 'and')
            .replace(/\|\|/g, 'or')
            .replace(/!/g, 'not ')
            .replace(/%/g, 'mod')
            .replace(/\n\}$/g, '\nend;')
    }

    private parenthesizeComparisons(condition: string): string {
        if (!/&&|\|\|/.test(condition))
            return condition
        return condition.replace(/\w+(?: % \d+)? (?:===|!==|<=|<|>=|>) \w+/g, '($&)')
    }

    public override getTokenTypes(): TokenTypes {
        return new Map([
            ['whitespace', /^ +/],
            ['number', /^\d+/],
            ['type', /^(integer|boolean|string)\b/],
            ['keyword', /^(function|begin|if|then|exit|end)\b/],
            ['literal', /^(true|false)\b/],
            ['operator', /^(<>|<=|<|>=|>|=|\*|(mod|not|or|and)\b)/],
            ['function', /^[a-zA-Z_][a-zA-Z0-9_]*(?=\()/],
            ['variable', /^[a-zA-Z_][a-zA-Z0-9_]*/],
            ['string', /^'.*?'/],
            ['punctuation', /^(\(|\)|:|;|,)/],
            ['dot', /^\./],
            ['error', /^.+/],
        ] as const)
    }
}

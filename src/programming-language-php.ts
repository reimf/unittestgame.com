import { ProgrammingLanguage } from './programming-language-base.js'
import type { TokenTypes } from './highlighter.js'

export class Php extends ProgrammingLanguage {
    public override readonly id = 'php' as const
    public override readonly name = 'PHP'

    public override formatVariableName(name: string): string {
        return `$${name}`
    }

    public override transpile(typescriptCode: string): string {
        const signatureMatch = typescriptCode.match(/\bfunction \w+\((.*?)\):/)
        const parameterNames = signatureMatch?.[1] ? signatureMatch[1].split(', ').map(parameter => parameter.split(': ')[0]!) : []
        const prefixedCode = parameterNames.length > 0
            ? typescriptCode.replace(new RegExp(`\\b(${parameterNames.join('|')})\\b`, 'g'), '$$$1')
            : typescriptCode
        return prefixedCode
            .replace(/\bnumber\b/g, 'int')
            .replace(/\bboolean\b/g, 'bool')
            .replace(/\bfunction (\w+)\((.*?)\): (\w+) \{/g, 'function $1($2): $3 {')
            .replace(/(\$?\w+): (\w+)/g, '$2 $1')
            .replace(/ \+= /g, ' .= ')
            .replace(/ \+ /g, ' . ')
            .replace(/^( +.+)$/gm, '$1;')
    }

    public override getTokenTypes(): TokenTypes {
        return new Map([
            ['whitespace', /^ +/],
            ['number', /^\d+/],
            ['type', /^(int|bool|string)\b/],
            ['keyword', /^(function|if|return)\b/],
            ['literal', /^(true|false)\b/],
            ['operator', /^(===|!==|<=|<|>=|>|=|\*|%|!|\|\||&&)/],
            ['function', /^[a-zA-Z_][a-zA-Z0-9_]*(?=\()/],
            ['variable', /^\$?[a-zA-Z_][a-zA-Z0-9_]*/],
            ['string', /^".*?"/],
            ['punctuation', /^(\(|\)|\{|\}|;|:|,)/],
            ['error', /^.+/],
        ] as const)
    }
}

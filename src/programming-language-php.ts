import { ProgrammingLanguage } from './programming-language-base.js'
import type { TokenTypes } from './highlighter.js'

export class Php extends ProgrammingLanguage {
    public override readonly id = 'php' as const
    public override readonly name = 'PHP'

    public override transpile(javascriptCode: string): string {
        const signatureMatch = javascriptCode.match(/\bfunction \w+\((.*?)\):/)
        const parameterNames = signatureMatch?.[1] ? signatureMatch[1].split(', ').map(parameter => parameter.split(': ')[0]!) : []
        const variableNames = [
            ...parameterNames,
            ...[...javascriptCode.matchAll(/\blet (\w+)/g)].map(match => match[1]!),
        ]
        const prefixedCode = variableNames.length > 0
            ? javascriptCode.replace(new RegExp(`\\b(${variableNames.join('|')})\\b`, 'g'), '$$$1')
            : javascriptCode
        return prefixedCode
            .replace(/\blet (\$?\w+): \w+\b/g, '$1')
            .replace(/\bfunction (\w+)\((.*?)\): (\w+) \{/g, 'function $1($2): $3 {')
            .replace(/\bnumber\b/g, 'int')
            .replace(/\bboolean\b/g, 'bool')
            .replace(/\bstring\b/g, 'string')
            .replace(/(\$?\w+): (\w+)/g, '$2 $1')
            .replace(/\bnew RegExp\((.+?)\)\.test\((.+?)\)/g, 'preg_match("/$1/", $2)')
            .replace(/\/([^\/]*)\/\.test\((.+?)\)/g, 'preg_match("/$1/", $2)')
            .replace(/(\$\w+)\.length\b/g, 'strlen($1)')
            .replace(/\bMath\.floor\((\$\w+) \/ (\d+)\)/g, 'intdiv($1, $2)')
            .replace(/(\$\w+)\.toString\(\)/g, 'strval($1)')
            .replace(/ \+= /g, ' .= ')
            .replace(/ \+ /g, ' . ')
            .replace(/^( +.+)$/gm, '$1;')
    }

    public override getTokenTypes(): TokenTypes {
        return new Map([
            ['whitespace', /^ +/],
            ['number', /^\d+(\.\d+)?/],
            ['keyword', /^(function|if|return|int|bool|string)\b/],
            ['literal', /^(true|false)\b/],
            ['function', /^[a-zA-Z_][a-zA-Z0-9_]*(?=\()/],
            ['variable', /^\$?[a-zA-Z_][a-zA-Z0-9_]*/],
            ['string', /^".*?"/],
            ['operator', /^(!==|!|%|&&|\.=|\.|<=|<|===|=|>=|>|\|\||\/)/],
            ['punctuation', /^[(){};:,]/],
            ['error', /^.+/],
        ] as const)
    }
}

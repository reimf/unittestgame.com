import { Div } from "./html"
import { Highlighter, Tokenizer, type TokenTypes } from './highlighter.js'

const PROGRAMMING_LANGUAGE_IDS = ['javascript', 'python'] as const
export type ProgrammingLanguageId = typeof PROGRAMMING_LANGUAGE_IDS[number]
export const PROGRAMMING_LANGUAGE_ID_TO_NAME: Map<ProgrammingLanguageId, string> = new Map([
    ['javascript', 'JavaScript'],
    ['python', 'Python'],
])

export abstract class ProgrammingLanguage {
    public readonly id: ProgrammingLanguageId
    public readonly tokenTypes: TokenTypes

    public static readonly programmingLanguageIds = [...PROGRAMMING_LANGUAGE_IDS] as const
    
    constructor(id: ProgrammingLanguageId) {
        this.id = id
        this.tokenTypes = this.getTokenTypes()
    }

    protected abstract transpile(javascriptCode: string): string

    protected abstract getTokenTypes(): TokenTypes

    public highlight(currentCode: string, previousCode?: string): Div[] {
        const tokenizer = new Tokenizer(this.tokenTypes)
        const highlighter = new Highlighter()
        const currentLines = this.transpile(currentCode).split('\n')
        if (previousCode === undefined)
            return currentLines
                .filter(line => line)
                .map(line => highlighter.highlightTokens(tokenizer.tokens(line)))
        const previousLines = this.transpile(previousCode).split('\n')
        const length = Math.max(currentLines.length, previousLines.length)
        const paddedCurrentLines = Array(length - currentLines.length).fill('').concat(currentLines)
        const paddedPreviousLines = Array(length - previousLines.length).fill('').concat(previousLines)
        return paddedCurrentLines
            .map((currentLine, index) => [currentLine, paddedPreviousLines[index]!] as [string, string])
            .filter(([currentLine, previousLine]) => currentLine || previousLine)
            .map(([currentLine, previousLine]) => highlighter.highlightDiff(tokenizer.tokens(currentLine), tokenizer.tokens(previousLine)))
    }
}

export class JavaScript extends ProgrammingLanguage {
    public constructor() {
        super("javascript")
    }

    public override transpile(javascriptCode: string): string {
        return javascriptCode
    }

    public override getTokenTypes(): TokenTypes {
        return new Map([
            ['whitespace', /^ +/],
            ['number', /^\d+(\.\d+)?/],
            ['keyword', /^(function|if|else|return|let|new)\b/],
            ['literal', /^(true|false|undefined)\b/],
            ['class', /^[A-Z][a-zA-Z]*/],
            ['function', /^[a-zA-Z]+(?=\()/],
            ['variable', /^[a-zA-Z]+/],
            ['regexp', /^\/\S.*?\//],
            ['string', /^".*?"/],
            ['operator', /^(!=*|=+|%=?|\+=?|-=?|\*=?|\/=?|<=?|>=?|&+|\|+)/],
            ['punctuation', /^[(){},]/],
            ['dot', /^\./],
            ['error', /^.+/],
        ] as const)
    }
}

export class Python extends ProgrammingLanguage {
    public constructor() {
        super("python")
    }

    public override transpile(javascriptCode: string): string {
        return javascriptCode
            .replace(/  /g, '    ')
            .replace(/\bfunction (.*) +\{/g, 'def $1:')
            .replace(/\blet +/g, '')
            .replace(/\bnew +/g, '')
            .replace(/\bRegExp\((.+?)\)\.test\((.+?)\)/g, 're.search($1, $2) is not None')
            .replace(/\/([^\/]*)\/\.test\((.+?)\)/g, "re.search('$1', $2)")
            .replace(/(\w+)\.length\b/g, 'len($1)')
            .replace(/(\w+)\.toFixed\((\d+)\)/g, "format($1, '.$2f')")
            .replace(/(\w+)\.toFixed\(\)/g, "format($1, '.0f')")
            .replace(/(\w+)\.toString\(\)/g, 'str($1)')
            .replace(/\btrue\b/g, 'True')
            .replace(/\bfalse\b/g, 'False')
            .replace(/\bundefined\b/g, 'None')
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
            ['keyword', /^(def|if|elif|else|return|and|or|not|in|is)\b/],
            ['literal', /^(True|False|None)\b/],
            ['class', /^[A-Z][a-zA-Z]*/],
            ['function', /^[a-zA-Z_][a-zA-Z0-9_]*(?=\()/],
            ['variable', /^[a-zA-Z_][a-zA-Z0-9_]*/],
            ['regexp', /^\/\S.*?\//],
            ['string', /^("[^"]*"|'[^']*')/],
            ['operator', /^(==|!=|<=|>=|\*\*|\/\/|[+\-*/%<>=])/],
            ['punctuation', /^[(){}[\]:,]/],
            ['dot', /^\./],
            ['error', /^.+/],
        ] as const)
    }
}

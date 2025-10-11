import { Div, Span, Del, Ins } from './html.js'

type TokenType = {
    name: string
    regexp: RegExp
}

class Token {
    public readonly type: string
    public readonly text: string

    public constructor(type: string, text: string) {
        this.type = type
        this.text = text
    }

    public equals(other: Token): boolean {
        return this.type === other.type && this.text === other.text
    }
}

class Tokenizer {
    private readonly text: string
    private readonly tokenTypes: readonly TokenType[] = [
        { name: 'whitespace', regexp: /^ +/ },
        { name: 'number', regexp: /^\d+(\.\d+)?/ },
        { name: 'keyword', regexp: /^(function|if|else|return|let|new)\b/ },
        { name: 'literal', regexp: /^(true|false|undefined)\b/ },
        { name: 'class', regexp: /^[A-Z][a-zA-Z]*/ },
        { name: 'function', regexp: /^[a-zA-Z]+(?=\()/ },
        { name: 'variable', regexp: /^[a-zA-Z]+/ },
        { name: 'regexp', regexp: /^\/\S.*?\// },
        { name: 'string', regexp: /^".*?"/ },
        { name: 'operator', regexp: /^(!=*|=+|%=?|\+=?|-=?|\*=?|\/=?|<=?|>=?|&+|\|+)/ },
        { name: 'punctuation', regexp: /^[(){},]/ },
        { name: 'bullet', regexp: /^\./},
        { name: 'error', regexp: /^.+/ },
    ]

    public constructor(text: string) {
        this.text = text
    }

    public* tokens(index: number = 0): Generator<Token> {
        for (const tokenType of this.tokenTypes) {
            const match = this.text.slice(index).match(tokenType.regexp)
            if (match) {
                yield new Token(tokenType.name, match[0])
                yield* this.tokens(index + match[0].length)
                return
            }
        }
    }
}

export class Highlighter {
    private readonly currentLine: string
    private readonly previousLine?: string

    public constructor(currentLine: string, previousLine?: string) {
        this.currentLine = currentLine
        this.previousLine = previousLine
    }

    public highlight(): Div {
        if (this.previousLine === undefined)
            return this.highlightLine(this.currentLine)
        return this.highlightDiff(this.currentLine, this.previousLine)
    }

    private highlightLine(currentLine: string): Div {
        const tokens = Array.from(new Tokenizer(currentLine).tokens())
        const spans = tokens.map(token => new Span().addClass(token.type).appendText(token.text))
        return new Div().appendChildren(spans)
    }

    private highlightDiff(currentLine: string, previousLine: string): Div {
        const previousTokens = Array.from(new Tokenizer(previousLine).tokens())
        const currentTokens = Array.from(new Tokenizer(currentLine).tokens())
        const commonTokens = this.longestCommonSubsequence(currentTokens, previousTokens)
        const div = new Div()
        while (previousTokens.length || currentTokens.length) {
            if (commonTokens.length && previousTokens.length && currentTokens.length && previousTokens[0].equals(commonTokens[0]) && currentTokens[0].equals(commonTokens[0])) {
                const token = commonTokens.shift()!
                div.appendChild(new Span().addClass(token.type).appendText(token.text))
                previousTokens.shift()
                currentTokens.shift()
            }
            else if (previousTokens.length && !(commonTokens.length && previousTokens[0].equals(commonTokens[0]))) {
                const token = previousTokens.shift()!
                div.appendChild(new Del().addClass(token.type).appendText(token.text))
            }
            else if (currentTokens.length && !(commonTokens.length && currentTokens[0].equals(commonTokens[0]))) {
                const token = currentTokens.shift()!
                div.appendChild(new Ins().addClass(token.type).appendText(token.text))
            }
        }
        return div
    }

    private longestCommonSubsequence(currentTokens: readonly Token[], previousTokens: readonly Token[]): Token[] {
        const [previousLength, currentLength] = [previousTokens.length, currentTokens.length]
        const commonLengths: number[][] = Array(previousLength + 1).fill(0).map(() => Array(currentLength + 1).fill(0))
        // Build LCS length table
        for (let current = 0; current < previousLength; current++)
            for (let previous = 0; previous < currentLength; previous++)
                commonLengths[current + 1][previous + 1] = previousTokens[current].equals(currentTokens[previous])
                    ? commonLengths[current][previous] + 1
                    : Math.max(commonLengths[current][previous + 1], commonLengths[current + 1][previous])
        // Backtrack to find LCS
        const commonTokens: Token[] = []
        let [previous, current] = [previousLength, currentLength]
        while (previous > 0 && current > 0)
            if (previousTokens[previous - 1].equals(currentTokens[current - 1])) {
                commonTokens.unshift(previousTokens[previous - 1])
                previous--
                current--
            }
            else if (commonLengths[previous - 1][current] > commonLengths[previous][current - 1])
                previous--
            else
                current--
        return commonTokens
    }
}

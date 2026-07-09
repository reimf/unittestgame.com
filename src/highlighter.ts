import { Del, Div, Ins, Span } from './html.js'
import { Locale } from './locale.js'

type TokenType = 'whitespace' | 'number' | 'keyword' | 'literal' | 'class' | 'function' | 'variable' | 'regexp' | 'string' | 'operator' | 'punctuation' | 'dot' | 'error'
export type TokenTypes = ReadonlyMap<TokenType, RegExp>

export class Token {
    public readonly type: TokenType
    public readonly text: string

    public constructor(type: TokenType, text: string) {
        this.type = type
        this.text = text
    }

    public equals(other: Token): boolean {
        return this.type === other.type && this.text === other.text
    }
}

export class Tokenizer {
    private readonly tokenTypes: TokenTypes

    public constructor(tokenTypes: TokenTypes) {
        this.tokenTypes = tokenTypes
    }

    public tokens(code: string): Token[] {
        return Array.from(this.tokenGenerator(code))
    }

    private* tokenGenerator(code: string): Generator<Token> {
        for (const [name, regexp] of this.tokenTypes) {
            const match = code.match(regexp)
            if (match) {
                yield new Token(name, match[0])
                yield* this.tokenGenerator(code.slice(match[0].length))
                return
            }
        }
    }
}

export class Highlighter {
    public highlightTokens(tokens: readonly Token[]): Div {
        const spans = tokens.map(token => new Span().addClass(token.type).appendText(Locale.bless(token.text)))
        return new Div().appendChildren(spans)
    }

    public highlightDiff(currentTokens: readonly Token[], previousTokens: readonly Token[]): Div {
        const previousTokensToConsume = [...previousTokens]
        const currentTokensToConsume = [...currentTokens]
        const commonTokens = this.longestCommonSubsequence(currentTokensToConsume, previousTokensToConsume)
        const div = new Div()
        while (previousTokensToConsume.length > 0 || currentTokensToConsume.length > 0) {
            if (commonTokens.length > 0 && previousTokensToConsume.length > 0 && currentTokensToConsume.length > 0 && previousTokensToConsume[0]!.equals(commonTokens[0]!) && currentTokensToConsume[0]!.equals(commonTokens[0]!)) {
                const token = commonTokens.shift()!
                div.appendChild(new Span().addClass(token.type).appendText(Locale.bless(token.text)))
                previousTokensToConsume.shift()
                currentTokensToConsume.shift()
            }
            else if (previousTokensToConsume.length > 0 && !(commonTokens.length > 0 && previousTokensToConsume[0]!.equals(commonTokens[0]!))) {
                const token = previousTokensToConsume.shift()!
                div.appendChild(new Del().addClass(token.type).appendText(Locale.bless(token.text)))
            }
            else if (currentTokensToConsume.length > 0 && !(commonTokens.length > 0 && currentTokensToConsume[0]!.equals(commonTokens[0]!))) {
                const token = currentTokensToConsume.shift()!
                div.appendChild(new Ins().addClass(token.type).appendText(Locale.bless(token.text)))
            }
        }
        return div
    }

    private longestCommonSubsequence(currentTokens: readonly Token[], previousTokens: readonly Token[]): Token[] {
        const [previousLength, currentLength] = [previousTokens.length, currentTokens.length]
        const commonLengths: number[][] = Array(previousLength + 1).fill(0).map(() => Array(currentLength + 1).fill(0))
        // Build LCS length table
        for (let previous = 0; previous < previousLength; previous++)
            for (let current = 0; current < currentLength; current++)
                commonLengths[previous + 1]![current + 1] = previousTokens[previous]!.equals(currentTokens[current]!)
                    ? commonLengths[previous]![current]! + 1
                    : Math.max(commonLengths[previous]![current + 1]!, commonLengths[previous + 1]![current]!)
        // Backtrack to find LCS
        const commonTokens: Token[] = []
        let [previous, current] = [previousLength, currentLength]
        while (previous > 0 && current > 0)
            if (previousTokens[previous - 1]!.equals(currentTokens[current - 1]!)) {
                commonTokens.unshift(previousTokens[previous - 1]!)
                previous--
                current--
            }
            else if (commonLengths[previous - 1]![current]! > commonLengths[previous]![current - 1]!)
                previous--
            else
                current--
        return commonTokens
    }
}

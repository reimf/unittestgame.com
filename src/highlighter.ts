import { Div, Span, Del, Ins } from './html.js'

export class Highlighter {
    public static line(text: string): Div {
        const div = new Div()
        for (const [type, token] of Highlighter.tokenize(text))
            div.appendChild(new Span().addClass(type).appendText(token))
        return div
    }

    // inline diff
    public static lines(textFrom: string, textTo: string): Div {
        const div = new Div()
        const tokensFrom = Array.from(Highlighter.tokenize(textFrom))
        const tokensTo = Array.from(Highlighter.tokenize(textTo))
        
        const diffs = Highlighter.diff(tokensFrom, tokensTo)
        
        for (const [operation, type, token] of diffs) {
            if (operation === 'equal') {
                div.appendChild(new Span().addClass(type).appendText(token))
            } else if (operation === 'delete') {
                div.appendChild(new Del().addClass(type).appendText(token))
            } else if (operation === 'insert') {
                div.appendChild(new Ins().addClass(type).appendText(token))
            }
        }
        
        return div
    }

    private static diff(tokensFrom: [string, string][], tokensTo: [string, string][]): ['equal' | 'delete' | 'insert', string, string][] {
        const result: ['equal' | 'delete' | 'insert', string, string][] = []
        const lcs = Highlighter.longestCommonSubsequence(tokensFrom, tokensTo)
        
        let i = 0, j = 0, k = 0
        
        while (i < tokensFrom.length || j < tokensTo.length) {
            if (k < lcs.length && i < tokensFrom.length && j < tokensTo.length &&
                tokensFrom[i][0] === lcs[k][0] && tokensFrom[i][1] === lcs[k][1] &&
                tokensTo[j][0] === lcs[k][0] && tokensTo[j][1] === lcs[k][1]) {
                // Equal token
                result.push(['equal', tokensFrom[i][0], tokensFrom[i][1]])
                i++
                j++
                k++
            } else if (i < tokensFrom.length && (k >= lcs.length || tokensFrom[i][0] !== lcs[k][0] || tokensFrom[i][1] !== lcs[k][1])) {
                // Deleted token
                result.push(['delete', tokensFrom[i][0], tokensFrom[i][1]])
                i++
            } else if (j < tokensTo.length) {
                // Inserted token
                result.push(['insert', tokensTo[j][0], tokensTo[j][1]])
                j++
            }
        }
        
        return result
    }

    private static longestCommonSubsequence(tokensFrom: [string, string][], tokensTo: [string, string][]): [string, string][] {
        const m = tokensFrom.length
        const n = tokensTo.length
        const dp: number[][] = Array(m + 1).fill(0).map(() => Array(n + 1).fill(0))
        
        // Build LCS length table
        for (let i = 1; i <= m; i++) {
            for (let j = 1; j <= n; j++) {
                if (tokensFrom[i - 1][0] === tokensTo[j - 1][0] && tokensFrom[i - 1][1] === tokensTo[j - 1][1]) {
                    dp[i][j] = dp[i - 1][j - 1] + 1
                } else {
                    dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
                }
            }
        }
        
        // Reconstruct LCS
        const lcs: [string, string][] = []
        let i = m, j = n
        while (i > 0 && j > 0) {
            if (tokensFrom[i - 1][0] === tokensTo[j - 1][0] && tokensFrom[i - 1][1] === tokensTo[j - 1][1]) {
                lcs.unshift(tokensFrom[i - 1])
                i--
                j--
            } else if (dp[i - 1][j] > dp[i][j - 1]) {
                i--
            } else {
                j--
            }
        }
        
        return lcs
    }

    private static *tokenize(text: string): Generator<[string, string]> {
        const types: [string, RegExp][] = [
            ['whitespace', /^ +/], 
            ['number', /^\d+(\.\d+)?/],
            ['keyword', /^(function|if|else|return|let|new)\b/],
            ['literal', /^(true|false|undefined)/],
            ['class', /^[A-Z][a-zA-Z]*/],
            ['function', /^[a-zA-Z]+(?=\()/],
            ['variable', /^[a-zA-Z]+/],
            ['regexp', /^\/\S.*?\//],
            ['string', /^".*?"/],
            ['operator', /^(!=*|=+|%=?|\+=?|-=?|\*=?|\/=?|<=?|>=?|&+|\|+)/],
            ['punctuation', /^[(){},]/],
            ['bullet', /^\./],
            ['error', /^.*/],
        ]
        while (text.length > 0) {
            for (const [type, regex] of types) {
                const match = text.match(regex)
                if (match) {
                    const token = match[0].replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
                    text = text.slice(match[0].length)
                    yield [type, token]
                    break
                }                
            }
        }
    }
}

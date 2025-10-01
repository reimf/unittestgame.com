import { Div, Span, Del, Ins } from './html.js'

export class Highlighter {
    public static line(text: string): Div {
        const div = new Div()
        for (const [type, token] of Highlighter.tokenize(text))
            div.appendChild(new Span().addClass(type).appendText(token))
        return div
    }

    public static lines(textFrom: string, textTo: string): Div {
        const div = new Div()
        const tokensFrom = Array.from(Highlighter.tokenize(textFrom))
        const tokensTo = Array.from(Highlighter.tokenize(textTo))
        
        const identicalStart = Highlighter.numberOfIdenticalTokens(tokensFrom, tokensTo, 0, 0, +1)
        const identicalEnd = Highlighter.numberOfIdenticalTokens(tokensFrom, tokensTo, tokensFrom.length - 1, tokensTo.length - 1, -1)
        
        const endFrom = tokensFrom.length - identicalEnd
        const endTo = tokensTo.length - identicalEnd
        
        // Add unchanged tokens before diff
        for (let i = 0; i < identicalStart; i++)
            div.appendChild(new Span().addClass(tokensFrom[i][0]).appendText(tokensFrom[i][1]))
        
        // Add deleted tokens
        for (let i = identicalStart; i < endFrom; i++)
            div.appendChild(new Del().addClass(tokensFrom[i][0]).appendText(tokensFrom[i][1]))
        
        // Add inserted tokens
        for (let i = identicalStart; i < endTo; i++)
            div.appendChild(new Ins().addClass(tokensTo[i][0]).appendText(tokensTo[i][1]))
        
        // Add unchanged tokens after diff
        for (let i = endTo; i < tokensTo.length; i++)
            div.appendChild(new Span().addClass(tokensTo[i][0]).appendText(tokensTo[i][1]))
        
        return div
    }

    private static numberOfIdenticalTokens(tokensFrom: [string, string][], tokensTo: [string, string][], startFrom: number, startTo: number, direction: number): number {
        let count = 0
        let indexFrom = startFrom
        let indexTo = startTo
        
        while (indexFrom >= 0 && indexFrom < tokensFrom.length && indexTo >= 0 && indexTo < tokensTo.length &&
               tokensFrom[indexFrom][0] === tokensTo[indexTo][0] &&
               tokensFrom[indexFrom][1] === tokensTo[indexTo][1]) {
            count++
            indexFrom += direction
            indexTo += direction
        }
        
        return count
    }

    private static *tokenize(text: string): Generator<[string, string]> {
        const types: [string, RegExp][] = [
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

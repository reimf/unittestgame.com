import { Div, Span, Del, Ins } from './html.js';
class Token {
    type;
    text;
    constructor(type, text) {
        this.type = type;
        this.text = text;
    }
    equals(other) {
        return this.type === other.type && this.text === other.text;
    }
}
class Tokenizer {
    text;
    constructor(text) {
        this.text = text;
    }
    *tokens() {
        const types = [
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
        ];
        while (this.text) {
            for (const [type, regex] of types) {
                const match = this.text.match(regex);
                if (match) {
                    this.text = this.text.slice(match[0].length);
                    yield new Token(type, match[0]);
                    break;
                }
            }
        }
    }
}
export class Highlighter {
    static line(text) {
        const tokens = Array.from(new Tokenizer(text).tokens());
        const spans = tokens.map(token => new Span().addClass(token.type).appendText(token.text));
        return new Div().appendChildren(spans);
    }
    static lines(currentText, previousText) {
        const previousTokens = Array.from(new Tokenizer(previousText).tokens());
        const currentTokens = Array.from(new Tokenizer(currentText).tokens());
        const commonTokens = Highlighter.longestCommonSubsequence(currentTokens, previousTokens);
        const div = new Div();
        while (previousTokens.length || currentTokens.length) {
            if (commonTokens.length && previousTokens.length && currentTokens.length && previousTokens[0].equals(commonTokens[0]) && currentTokens[0].equals(commonTokens[0])) {
                const token = commonTokens.shift();
                div.appendChild(new Span().addClass(token.type).appendText(token.text));
                previousTokens.shift();
                currentTokens.shift();
            }
            else if (previousTokens.length && !(commonTokens.length && previousTokens[0].equals(commonTokens[0]))) {
                const token = previousTokens.shift();
                div.appendChild(new Del().addClass(token.type).appendText(token.text));
            }
            else if (currentTokens.length && !(commonTokens.length && currentTokens[0].equals(commonTokens[0]))) {
                const token = currentTokens.shift();
                div.appendChild(new Ins().addClass(token.type).appendText(token.text));
            }
        }
        return div;
    }
    static longestCommonSubsequence(currentTokens, previousTokens) {
        const previousLength = previousTokens.length;
        const currentLength = currentTokens.length;
        const commonLengths = Array(previousLength + 1).fill(0).map(() => Array(currentLength + 1).fill(0));
        // Build LCS length table
        for (let currentIndex = 0; currentIndex < previousLength; currentIndex++)
            for (let previousIndex = 0; previousIndex < currentLength; previousIndex++)
                if (previousTokens[currentIndex].equals(currentTokens[previousIndex]))
                    commonLengths[currentIndex + 1][previousIndex + 1] = commonLengths[currentIndex][previousIndex] + 1;
                else
                    commonLengths[currentIndex + 1][previousIndex + 1] = Math.max(commonLengths[currentIndex][previousIndex + 1], commonLengths[currentIndex + 1][previousIndex]);
        // Backtrack to find LCS
        const commonTokens = [];
        let previousIndex = previousLength;
        let currentIndex = currentLength;
        while (previousIndex > 0 && currentIndex > 0)
            if (previousTokens[previousIndex - 1].equals(currentTokens[currentIndex - 1])) {
                commonTokens.unshift(previousTokens[previousIndex - 1]);
                previousIndex--;
                currentIndex--;
            }
            else if (commonLengths[previousIndex - 1][currentIndex] > commonLengths[previousIndex][currentIndex - 1])
                previousIndex--;
            else
                currentIndex--;
        return commonTokens;
    }
}

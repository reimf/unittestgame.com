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
    tokenTypes = [
        { name: 'whitespace', regexp: /^( +)/ },
        { name: 'number', regexp: /^(\d+(?:\.\d+)?)/ },
        { name: 'keyword', regexp: /^(function|if|else|return|let|new)\b/ },
        { name: 'literal', regexp: /^(true|false|undefined)\b/ },
        { name: 'class', regexp: /^([A-Z][a-zA-Z]*)/ },
        { name: 'function', regexp: /^([a-zA-Z]+)\(/ },
        { name: 'variable', regexp: /^([a-zA-Z]+)/ },
        { name: 'regexp', regexp: /^(\/\S.*?\/)/ },
        { name: 'string', regexp: /^(".*?")/ },
        { name: 'operator', regexp: /^(!=*|=+|%=?|\+=?|-=?|\*=?|\/=?|<=?|>=?|&+|\|+)/ },
        { name: 'punctuation', regexp: /^([(){},])/ },
        { name: 'bullet', regexp: /^(\.)/ },
        { name: 'error', regexp: /^(.+)/ },
    ];
    constructor(text) {
        this.text = text;
    }
    *tokens(index = 0) {
        for (const tokenType of this.tokenTypes) {
            const match = this.text.slice(index).match(tokenType.regexp);
            if (match) {
                yield new Token(tokenType.name, match[1]);
                yield* this.tokens(index + match[1].length);
                return;
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
        const [previousLength, currentLength] = [previousTokens.length, currentTokens.length];
        const commonLengths = Array(previousLength + 1).fill(0).map(() => Array(currentLength + 1).fill(0));
        // Build LCS length table
        for (let current = 0; current < previousLength; current++)
            for (let previous = 0; previous < currentLength; previous++)
                commonLengths[current + 1][previous + 1] = previousTokens[current].equals(currentTokens[previous])
                    ? commonLengths[current][previous] + 1
                    : Math.max(commonLengths[current][previous + 1], commonLengths[current + 1][previous]);
        // Backtrack to find LCS
        const commonTokens = [];
        let [previous, current] = [previousLength, currentLength];
        while (previous > 0 && current > 0)
            if (previousTokens[previous - 1].equals(currentTokens[current - 1])) {
                commonTokens.unshift(previousTokens[previous - 1]);
                previous--;
                current--;
            }
            else if (commonLengths[previous - 1][current] > commonLengths[previous][current - 1])
                previous--;
            else
                current--;
        return commonTokens;
    }
}

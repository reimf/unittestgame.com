import { Div, Span } from './html.js';
export class Highlighter {
    static highlight(text) {
        const types = [
            ['terminator', /^\n/],
            ['whitespace', /^ +/],
            ['number', /^\d+(\.\d+)?/],
            ['keyword', /^(function|if|else|return|let|new)/],
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
        ];
        const div = new Div();
        let line = text + '\n';
        while (line.length > 0) {
            for (const [type, regex] of types) {
                const match = line.match(regex);
                if (match) {
                    const token = match[0].replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
                    line = line.slice(match[0].length);
                    if (type === 'error')
                        throw new Error(`Unexpected character "${token}" in line "${line}"`);
                    if (type !== 'terminator')
                        div.appendChild(new Span().addClass(type).appendText(token));
                    break;
                }
            }
        }
        return div;
    }
}

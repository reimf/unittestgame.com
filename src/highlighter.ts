import { Div, Span } from './html.js'

type TokenType = 'WHITESPACE' 
               | 'NUMBER' 
               | 'KEYWORD' 
               | 'LITERAL' 
               | 'CLASS' 
               | 'FUNCTION' 
               | 'VARIABLE' 
               | 'REGEXP' 
               | 'STRING' 
               | 'OPERATOR' 
               | 'PUNCTUATION' 
               | 'BULLET' 
               | undefined

export class Highlighter {
    static highlight(text: string): Div {
        const whitespace = [' ']
        const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
        const lowercase = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
        const uppercase = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
        const identifier = [...lowercase, ...uppercase]
        const quotes = ['"']
        const operators = ['=', '%', '+', '-', '*', '/', '>', '<', '<', '>', '&', '|']
        const negators = ['!']
        const equalSigns = ['=']
        const punctuations = ['(', ')', '{', '}', ',']
        const bullets = ['.']
        const regexDelimiters = ['/']
        const terminators = ['\n']
        const keywords = new Set(['function', 'if', 'else', 'return', 'let', 'new'])
        const literals = new Set(['true', 'false', 'null', 'undefined'])
        const substitutions = new Map<string, string>([['&', '&amp;'], ['<', '&lt;'], ['>', '&gt;']])

        const line = text + terminators[0]
        const div = new Div()
        let i = 0
        let previousToken: string = ''
        while (true) {
            let token = line[i++]

            if (terminators.includes(token))
                return div

            let type: TokenType = undefined

            // Whitespace: / +/
            if (whitespace.includes(token)) {
                while (whitespace.includes(line[i]))
                    token += line[i++]
                type = 'WHITESPACE'
            }

            // Numbers: /\d+(\.\d+)?/
            if (digits.includes(token)) {
                while (digits.includes(line[i]))
                    token += line[i++]
                if (line[i] === '.') {
                    token += line[i++]
                    while (digits.includes(line[i]))
                        token += line[i++]
                }
                type = 'NUMBER'
            }

            // Identifiers: keywords / literals / classes / functions / variables: /[a-zA-Z]+/
            if (identifier.includes(token)) {
                while (identifier.includes(line[i]))
                    token += line[i++]
                if (keywords.has(token))
                    type = 'KEYWORD'
                else if (literals.has(token))
                    type = 'LITERAL'
                else if (uppercase.includes(token[0]))
                    type = 'CLASS'
                else if (previousToken === 'function' || previousToken === '.')
                    type = 'FUNCTION'
                else
                    type = 'VARIABLE'
            }

            // Regular expressions: /\/.*?\//
            if (regexDelimiters.includes(token) && !whitespace.includes(line[i])) {
                while (!regexDelimiters.includes(line[i]))
                    token += line[i++]
                token += line[i++] // closing slash
                type = 'REGEXP'
            }

            // Strings: ".*?"
            if (quotes.includes(token)) {
                while (!quotes.includes(line[i]))
                    token += line[i++]
                token += line[i++] // closing quote
                type = 'STRING'
            }

            // Not (equal) operator: /!=*/
            if (negators.includes(token)) {
                while (equalSigns.includes(line[i]))
                    token += line[i++]
                type = 'OPERATOR'
            }

            // Operators: /[=%\+\-\*\/><>&|]+/
            if (operators.includes(token)) {
                token = substitutions.get(token) || token
                while (operators.includes(line[i])) {
                    const char = line[i++]
                    token += substitutions.get(char) || char
                }
                type = 'OPERATOR'
            }

            // Punctuation: /[(){},]/
            if (punctuations.includes(token))
                type = 'PUNCTUATION'

            // Bullet: /\./
            if (bullets.includes(token))
                type = 'BULLET'

            if (!type)
                throw new Error(`Unexpected character: ${token} in line: ${line}`)
            
            div.appendChild(new Span().addClass(type.toLowerCase()).appendText(token))
            if (type !== 'WHITESPACE')
                previousToken = token
        }
    }
}

import { Level } from './level-base.js'
import { ConversationText } from './conversation-language-base.js'

export class FloatFormat extends Level<[string], boolean> {
    protected identifier(): string {
        return 'float-format'
    }

    protected name(): string {
        return 'Float Format'
    }

    protected specification(): ConversationText {
        return this.conversationLanguage.floatFormatSpecification()
    }

    private* returnRegexDotTests(): Generator<string> {
        const signs = ['[+-]?', '[+-]*', '[+-]+', '[+-]', '[-]?', '[-]', '[+]?', '[+]', '']
        const digits = ['[0-9]', '[0-9]*', '[0-9]+', '']
        const fractions = ['\\.[0-9]+', '(\\.[0-9]+)?', '(\\.[0-9]+)*', '\\.[0-9]*', '(\\.[0-9]*)?', '(\\.[0-9]*)*', '']

        for (const sign of signs)
            for (const digit of digits)
                for (const fraction of fractions)
                    yield `    return /^${sign}${digit}${fraction}$/.test(text)`
    }

    protected getCandidateElements(): string[][] {
        return [
            [
                'function isFloatFormat(text: string): boolean {'
            ],
            [
                ...this.returnRegexDotTests(),
                '    return true',
                '    return false',
            ],
            [
                '}'
            ],
        ]
    }

    protected* minimalUnitTestGenerator(): Generator<[[string], boolean]> {
        yield [['+12'], true]
        yield [['-12.34'], true]
        yield [['12.34'], true]
        yield [['+-12'], false]
        yield [['12.'], false]
        yield [['.34'], false]
        yield [['12.3.4'], false]
    }

    protected* hintGenerator(): Generator<[string]> {
        for (let i = 0; i < 10; i++) {
            const integerPart = this.picker.integerUnder(100).toString()
            const precision = this.picker.integerUnder(4)
            const fractionalPart = this.picker.integerUnder(10 ** precision).toString().padStart(precision, '0')
            const sign = this.picker.elementFrom(['-', '+', ''])
            const correctFormat = sign + integerPart + '.' + fractionalPart
            yield [correctFormat]

            const pos = this.picker.integerUnder(correctFormat.length)
            const substitution = this.picker.elementFrom(['0', '+', '-', '.'])
            const probablyIncorrectFormat = correctFormat.substring(0, pos) + substitution + correctFormat.substring(pos + 1)
            yield [probablyIncorrectFormat]
        }
    }
}

import { Level } from './level.js'
import { Random } from './random.js'
import { Paragraph } from './html.js'
import { Panel } from './frame.js'
import { Variable, CheckboxVariable, TextVariable } from './variable.js'

export class FloatFormat extends Level {
    public constructor() {
        super(6)
    }

    public showSpecificationPanel(): void {
        new Panel('Specification', [
            new Paragraph().appendLines([
                'Return true if the text represents a float and returns false if it doesn\'t.',
                'A float may start with a plus or a minus sign.',
                'This is followed by one or more digits.',
                'If that is followed by a dot, one or more digits must follow.',
            ]),
        ]).show()
    }

    public getParameters(): Variable[] {
        return [
            new TextVariable('Text', 'text')
        ]
    }

    public getUnit(): Variable {
        return new CheckboxVariable(
            'Does it represent a float?',
            'isFloatFormat'
        )
    }

    public getCandidateElements(): string[][] {
        return [
            [
                'let regex = "^"',
            ],
            [
                'regex += "[+-]?"',
                'regex += "[+-]*"',
                'regex += "[+-]+"',
                'regex += "[+-]"',
                'regex += "[-]?"',
                'regex += "[-]*"',
                'regex += "[-]+"',
                'regex += "[-]"',
                'regex += "[+]?"',
                'regex += "[+]*"',
                'regex += "[+]+"',
                'regex += "[+]"',
                '',
            ],
            [
                'regex += "[0-9]"',
                'regex += "[0-9]*"',
                'regex += "[0-9]+"',
                '',
            ],
            [
                'regex += "\\\\.[0-9]+"',
                'regex += "(\\\\.[0-9]+)?"',
                'regex += "(\\\\.[0-9]+)*"',
                'regex += "\\\\.[0-9]*"',
                'regex += "(\\\\.[0-9]*)?"',
                'regex += "(\\\\.[0-9]*)*"',
                '',
            ],
            [
                'regex += "$"',
            ],
            [
                'return new RegExp(regex).test(text)',
                'return true',
                'return false',
                '',
            ],
        ]
    }

    public *minimalUnitTestGenerator(): Generator<any[]> {
        yield [['+123'], true]
        yield [['-123.45'], true]
        yield [['123.45'], true]
        yield [['+-123'], false]
        yield [['123.'], false]
        yield [['.45'], false]
        yield [['12.3.45'], false]
    }

    public *hintGenerator(): Generator<any[]> {
        for (let i = 0; i < 100; i++) {
            const integerPart = Random.integerUnder(1000).toString()
            const precision = Random.integerUnder(4)
            const fractionalPart = Random.integerUnder(10 ** precision).toString().padStart(precision, '0')
            const sign = Random.elementFrom(['-', '+', ''])
            const correctFormat = sign + integerPart + '.' + fractionalPart
            yield [correctFormat]

            const pos = Random.integerUnder(correctFormat.length)
            const substitution = Random.elementFrom(['0', '+', '-', '.'])
            const probablyIncorrectFormat = correctFormat.substring(0, pos) + substitution + correctFormat.substring(pos + 1)
            yield [probablyIncorrectFormat]
        }
    }
}

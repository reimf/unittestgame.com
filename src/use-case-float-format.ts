import { UseCase } from './use-case-base.js'
import { Random } from './random.js'
import { Variable, BooleanVariable, TextVariable } from './variable.js'

export class FloatFormat extends UseCase {
    public identifier(): string {
        return 'float-format'
    }

    public name(): string {
        return 'Float Format'
    }

    public specification(): string {
        return this.locale.returnTrueIfTheTextRepresentsAFloatAndFalseIfItDoesnt()
    }

    protected getParameters(): Variable[] {
        return [
            new TextVariable('Text', 'text')
        ]
    }

    protected getUnit(): Variable {
        return new BooleanVariable('Represents a float', 'isFloatFormat')
    }

    protected getCandidateElements(): string[][] {
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
                'return undefined',
            ],
        ]
    }

    protected* minimalUnitTestGenerator(): Generator<any[]> {
        yield [['+12'], true]
        yield [['-12.34'], true]
        yield [['12.34'], true]
        yield [['+-12'], false]
        yield [['12.'], false]
        yield [['.34'], false]
        yield [['12.3.4'], false]
    }

    protected* hintGenerator(): Generator<any[]> {
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

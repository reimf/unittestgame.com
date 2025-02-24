import { Level } from './level.js'
import { Random } from './random.js'
import { Paragraph, Panel } from './html.js'
import { Variable, CheckboxVariable, TextVariable } from './variable.js'
import { UnitTest } from './unit_test.js'

export class FloatFormat extends Level {
    public showSpecificationPanel(): void {
        new Panel('Specification', [
            new Paragraph([
                'Return true if the text represents a float and returns false if it doesn\'t.',
                'A float may start with a plus or a minus sign.',
                'This is followed by one or more digits.',
                'If that is followed by a dot, one or more digit must follow.',
            ]),
        ]).show('specification')
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
                'regex += "\\.[0-9]+"',
                'regex += "(\\.[0-9]+)?"',
                'regex += "(\\.[0-9]+)*"',
                'regex += "\\.[0-9]*"',
                'regex += "(\\.[0-9]*)?"',
                'regex += "(\\.[0-9]*)*"',
                '',
            ],
            [
                'regex += "$"',
            ],
            [
                'return new RegExp(regex).test(text)',
                'return true',
                'return false',
            ]
        ]
    }

    public getMinimalUnitTests(parameters: Variable[], unit: Variable): UnitTest[] {
        return [
            new UnitTest(parameters, ['+123'], unit, true),
            new UnitTest(parameters, ['-123.45'], unit, true),
            new UnitTest(parameters, ['123.45'], unit, true),
            new UnitTest(parameters, ['+-123'], unit, false),
            new UnitTest(parameters, ['123.'], unit, false),
            new UnitTest(parameters, ['.45'], unit, false),
            new UnitTest(parameters, ['12.3.45'], unit, false),
        ]
    }

    public *hintGenerator(): Generator<any[]> {
        for (let i = 0; i < 100; i++) {
            const number = Math.random() * 1000
            const precision = Random.randomInt(4)
            const sign = Random.elementFrom(['-', '+', ''])
            const rounded = number.toFixed(precision)
            const text1 = sign + rounded
            yield [text1]

            const pos = Random.randomInt(text1.length)
            const text2 = text1.substring(0, pos) + Random.elementFrom(['0', '+', '-', '.']) + text1.substring(pos + 1)
            yield [text2]
        }
    }
}

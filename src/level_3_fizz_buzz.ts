import { Level } from './level.js'
import { Paragraph } from './html.js'
import { Panel } from './frame.js'
import { Variable, TextVariable, NumberVariable } from './variable.js'
import { UnitTest } from './unit_test.js'

export class FizzBuzz extends Level {
    public showSpecificationPanel(): void {
        new Panel('Specification', [
            new Paragraph().appendLines([
                'Return "Fizz" if the number is divisible by 3,',
                '"Buzz" if the number is divisible by 5,',
                '"FizzBuzz" if the number is divisible by both 3 and 5,',
                'and a string containing the number otherwise.',
            ]),
        ]).show()
    }

    public getParameters(): Variable[] {
        return [
            new NumberVariable(
                'Number',
                'number'
            ),
        ]
    }

    public getUnit(): Variable {
        return new TextVariable(
            'Output',
            'fizzBuzz',
        )
    }

    public getCandidateElements(): string[][] {
        return [
            [
                'if (number === 15) return "FizzBuzz"',
                'if (number % 15 === 0) return "FizzBuzz"',
                '',
            ],
            [
                'if (number === 3) return "Fizz"',
                'if (number % 3 === 0) return "Fizz"',
                ''
            ],
            [
                'if (number === 5) return "Buzz"',
                'if (number % 5 === 0) return "Buzz"',
                ''
            ],
            [
                'return "Fizz"',
                'return "Buzz"',
                'return "FizzBuzz"',
                'return number.toString()',
            ]
        ]
    }

    public getMinimalUnitTests(parameters: Variable[], unit: Variable): UnitTest[] {
        return [
            new UnitTest(parameters, [6], unit, "Fizz"),
            new UnitTest(parameters, [25], unit, "Buzz"),
            new UnitTest(parameters, [30], unit, "FizzBuzz"),
            new UnitTest(parameters, [1], unit, "1"),
        ]
    }

    public *hintGenerator(): Generator<any[]> {
        for (let number = 0; number < 100; number += 1)
            yield [number]
    }
}

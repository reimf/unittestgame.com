import { Level } from './level.js';
import { Paragraph, Panel } from './html.js';
import { TextVariable, NumberVariable } from './variable.js';
import { UnitTest } from './unit_test.js';
export class FizzBuzz extends Level {
    constructor(index) {
        super(index);
        this.description = 'is it fizz or buzz';
    }
    showSpecificationPanel() {
        new Panel('Specification', [
            new Paragraph('Return "Fizz" if the number is divisible by 3, ' +
                '"Buzz" if the number is divisible by 5, ' +
                '"FizzBuzz" if the number is divisible by both 3 and 5, ' +
                'and a string containing the number otherwise.'),
        ]).show('specification');
    }
    getParameters() {
        return [
            new NumberVariable('Number', 'number'),
        ];
    }
    getUnit() {
        return new TextVariable('Output', 'fizzBuzz');
    }
    getCandidateElements() {
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
                'return ""',
                'return number.toString()',
                ''
            ]
        ];
    }
    getMinimalUnitTests() {
        return [
            new UnitTest([6], "Fizz"),
            new UnitTest([25], "Buzz"),
            new UnitTest([30], "FizzBuzz"),
            new UnitTest([1], "1"),
        ];
    }
    *hintGenerator() {
        for (let number = 0; number < 100; number += 1)
            yield [number];
    }
}

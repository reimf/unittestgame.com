import { Panel } from './frame.js';
import { Paragraph } from './html.js';
import { Level } from './level.js';
import { TextVariable, NumberVariable } from './variable.js';
export class FizzBuzz extends Level {
    constructor() {
        super(3);
    }
    showSpecificationPanel() {
        new Panel('Specification', [
            new Paragraph().appendLines([
                'Return "Fizz" if the number is divisible by 3,',
                '"Buzz" if the number is divisible by 5,',
                '"FizzBuzz" if the number is divisible by both 3 and 5,',
                'and a string containing the number otherwise.',
            ]),
        ]).show();
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
                'return "Fizz"',
                'return "Buzz"',
                'return "FizzBuzz"',
                'return number.toString()',
                '',
            ],
        ];
    }
    *minimalUnitTestGenerator() {
        yield [[6], "Fizz"];
        yield [[25], "Buzz"];
        yield [[30], "FizzBuzz"];
        yield [[1], "1"];
    }
    *hintGenerator() {
        for (let number = 0; number < 100; number += 1)
            yield [number];
    }
}

import { UseCase } from './use_case.js';
import { TextVariable, IntegerVariable } from './variable.js';
export class FizzBuzz extends UseCase {
    name() {
        return 'FizzBuzz';
    }
    specification() {
        return ('Return "Fizz" if the number is divisible by 3, ' +
            '"Buzz" if the number is divisible by 5, ' +
            '"FizzBuzz" if the number is divisible by both 3 and 5, and ' +
            'a string containing the number otherwise.');
    }
    getParameters() {
        return [
            new IntegerVariable('Number', 'number'),
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
                'return undefined',
            ],
        ];
    }
    *minimalUnitTestGenerator() {
        yield [[6], 'Fizz'];
        yield [[25], 'Buzz'];
        yield [[30], 'FizzBuzz'];
        yield [[1], '1'];
    }
    *hintGenerator() {
        for (let number = 0; number < 100; number += 1)
            yield [number];
    }
}

import { UseCase } from './use-case-base.js';
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
            new IntegerVariable('Number', 'num'),
        ];
    }
    getUnit() {
        return new TextVariable('Output', 'fizzBuzz');
    }
    getCandidateElements() {
        return [
            [
                'if (num === 15) return "FizzBuzz"',
                'if (num % 15 === 0) return "FizzBuzz"',
                '',
            ],
            [
                'if (num === 3) return "Fizz"',
                'if (num % 3 === 0) return "Fizz"',
                ''
            ],
            [
                'if (num === 5) return "Buzz"',
                'if (num % 5 === 0) return "Buzz"',
                ''
            ],
            [
                'return "Fizz"',
                'return "Buzz"',
                'return "FizzBuzz"',
                'return num.toString()',
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
        for (let num = 0; num < 100; num += 1)
            yield [num];
    }
}

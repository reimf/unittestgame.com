import { UseCase } from './use-case-base.js';
import { RadioVariable, IntegerVariable } from './variable.js';
export class FizzBuzz extends UseCase {
    identifier() {
        return 'fizz-buzz';
    }
    name() {
        return 'FizzBuzz';
    }
    specification() {
        return this.locale.returnFizzIfTheNumberIsDivisibleBy3();
    }
    getParameters() {
        return [
            new IntegerVariable('Number', 'num'),
        ];
    }
    getUnit() {
        return new RadioVariable('Output', 'fizzBuzz', ['Fizz', 'Buzz', 'FizzBuzz', 'Other']);
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
                'return "Other"',
                'return undefined',
            ],
        ];
    }
    *minimalUnitTestGenerator() {
        yield [[6], 'Fizz'];
        yield [[25], 'Buzz'];
        yield [[30], 'FizzBuzz'];
        yield [[1], 'Other'];
    }
    *hintGenerator() {
        for (let num = 0; num < 100; num += 1)
            yield [num];
    }
}

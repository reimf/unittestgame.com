import { UseCase } from '../../src/use_case.js';
import { TextVariable, IntegerVariable } from '../../src/variable.js';
export class FakeUseCase extends UseCase {
    name() {
        return 'Fake Use Case';
    }
    specification() {
        return 'The usual FizzBuzz leet code challenge.';
    }
    getParameters() {
        return [new IntegerVariable('Number', 'num')];
    }
    getUnit() {
        return new TextVariable('Output', 'fizzBuzz');
    }
    getCandidateElements() {
        return [
            [
                'if (num % 15 === 0) return "FizzBuzz"',
                ''
            ],
            [
                'if (num % 3 === 0) return "Fizz"',
                ''
            ],
            [
                'if (num % 5 === 0) return "Buzz"',
                ''
            ],
            [
                'return ""',
                'return num.toString()'
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

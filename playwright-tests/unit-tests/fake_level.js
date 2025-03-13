import { UseCase } from '../../src/use_case.js';
import { TextVariable, NumberVariable } from '../../src/variable.js';
export class FakeUseCase extends UseCase {
    getSpecification() {
        return ('Return "Fizz" if the number is divisible by 3, ' +
            '"Buzz" if the number is divisible by 5, ' +
            '"FizzBuzz" if the number is divisible by both 3 and 5, and ' +
            'a string containing the number otherwise.');
    }
    getParameters() {
        return [new NumberVariable('Number', 'number')];
    }
    getUnit() {
        return new TextVariable('Output', 'fizzBuzz');
    }
    getCandidateElements() {
        return [
            ['if (number % 15 === 0) return "FizzBuzz"', ''],
            ['if (number % 3 === 0) return "Fizz"', ''],
            ['if (number % 5 === 0) return "Buzz"', ''],
            ['return ""', 'return number.toString()'],
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

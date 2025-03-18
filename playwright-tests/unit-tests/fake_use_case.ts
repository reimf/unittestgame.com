import { UseCase } from '../../src/use_case.js'
import { Variable, TextVariable, NumberVariable } from '../../src/variable.js'

export class FakeUseCase extends UseCase {
    public getSpecification(): string {
        return (
            'The usual FizzBuzz leet code challenge.'
        )
    }

    public getParameters(): Variable[] {
        return [new NumberVariable('Number', 'number')]
    }

    public getUnit(): Variable {
        return new TextVariable('Output', 'fizzBuzz')
    }

    public getCandidateElements(): string[][] {
        return [
            [
                'if (number % 15 === 0) return "FizzBuzz"',
                ''
            ],
            [
                'if (number % 3 === 0) return "Fizz"',
                ''
            ],
            [
                'if (number % 5 === 0) return "Buzz"',
                ''
            ],
            [
                'return ""',
                'return number.toString()'
            ],
        ]
    }

    public *minimalUnitTestGenerator(): Generator<any[]> {
        yield [[6], 'Fizz']
        yield [[25], 'Buzz']
        yield [[30], 'FizzBuzz']
        yield [[1], '1']
    }

    public *hintGenerator(): Generator<any[]> {
        for (let number = 0; number < 100; number += 1)
            yield [number]
    }
}

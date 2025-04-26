import { UseCase } from '../../src/use_case.js'
import { Variable, TextVariable, IntegerVariable } from '../../src/variable.js'

export class FakeUseCase extends UseCase {
    public name(): string {
        return 'Fake Use Case'
    }

    public specification(): string {
        return 'The usual FizzBuzz leet code challenge.'
    }

    public getParameters(): Variable[] {
        return [new IntegerVariable('Number', 'num')]
    }

    public getUnit(): Variable {
        return new TextVariable('Output', 'fizzBuzz')
    }

    public getCandidateElements(): string[][] {
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
        ]
    }

    public* minimalUnitTestGenerator(): Generator<any[]> {
        yield [[6], 'Fizz']
        yield [[25], 'Buzz']
        yield [[30], 'FizzBuzz']
        yield [[1], '1']
    }

    public* hintGenerator(): Generator<any[]> {
        for (let num = 0; num < 100; num += 1)
            yield [num]
    }
}

import { UseCase } from './use-case-base.js'
import { Variable, TextVariable, IntegerVariable } from './variable.js'

export class FizzBuzz extends UseCase {
    public name(): string {
        return 'FizzBuzz'
    }
    public specification(): string {
        return this.locale.returnFizzIfTheNumberIsDivisibleBy3()
    }

    public getParameters(): Variable[] {
        return [
            new IntegerVariable('Number', 'num'),
        ]
    }

    public getUnit(): Variable {
        return new TextVariable('Output', 'fizzBuzz')
    }

    public getCandidateElements(): string[][] {
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

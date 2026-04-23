import { Level } from './level-base.js'
import { Locale, LocalizedText } from './locale.js'
import { Variable, RadioVariable, IntegerVariable } from './variable.js'

export class FizzBuzz extends Level {
    protected identifier(): string {
        return 'fizz-buzz'
    }

    protected name(): string {
        return 'FizzBuzz'
    }
    protected specification(): LocalizedText {
        return this.locale.fizzBuzzSpecification()
    }

    protected getParameters(): Variable[] {
        return [
            new IntegerVariable(Locale.bless('Number'), 'num'),
        ]
    }

    protected getUnit(): Variable {
        return new RadioVariable(Locale.bless('Output'), 'fizzBuzz', [Locale.bless('Fizz'), Locale.bless('Buzz'), Locale.bless('FizzBuzz'), Locale.bless('Other')])
    }

    protected getCandidateElements(): string[][] {
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
        ]
    }

    protected* minimalUnitTestGenerator(): Generator<any[]> {
        yield [[6], 'Fizz']
        yield [[25], 'Buzz']
        yield [[30], 'FizzBuzz']
        yield [[1], 'Other']
    }

    protected* hintGenerator(): Generator<any[]> {
        for (let num = 0; num < 100; num += 1)
            yield [num]
    }
}

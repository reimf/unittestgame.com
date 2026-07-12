import { Level } from './level-base.js'
import { Locale, LocalizedText } from './locale.js'
import { Variable, IntegerVariable, TextVariable } from './variable.js'

export class FizzBuzz extends Level<[number], string> {
    protected identifier(): string {
        return 'fizz-buzz'
    }

    protected name(): string {
        return 'FIZZBUZZ'
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
        return new TextVariable(Locale.bless('Output'), 'fizzBuzz')
    }

    protected getCandidateElements(): string[][] {
        return [
            [
                'if (num === 15) return "FIZZBUZZ"',
                'if (num % 15 === 0) return "FIZZBUZZ"',
                '',
            ],
            [
                'if (num === 3) return "FIZZ"',
                'if (num % 3 === 0) return "FIZZ"',
                ''
            ],
            [
                'if (num === 5) return "BUZZ"',
                'if (num % 5 === 0) return "BUZZ"',
                ''
            ],
            [
                'return "FIZZ"',
                'return "BUZZ"',
                'return "FIZZBUZZ"',
                'return num.toString()',
            ],
        ]
    }

    protected* minimalUnitTestGenerator(): Generator<[[number], string]> {
        yield [[6], 'FIZZ']
        yield [[25], 'BUZZ']
        yield [[30], 'FIZZBUZZ']
        yield [[1], '1']
    }

    protected* hintGenerator(): Generator<[number]> {
        for (let num = 0; num < 50; num += 1)
            yield [num]
    }
}

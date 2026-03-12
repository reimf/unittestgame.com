import { Level } from './level-base.js'
import { Variable, BooleanVariable, IntegerVariable } from './variable.js'

export class EvenOrOdd extends Level {
    protected identifier(): string {
        return 'even-odd'
    }

    protected name(): string {
        return 'Even or Odd'
    }

    protected specification(): string {
        return this.locale.evenOddSpecification()
    }

    protected getParameters(): Variable[] {
        return [
            new IntegerVariable('Number', 'num'),
        ]
    }

    protected getUnit(): Variable {
        return new BooleanVariable('Is even', 'isEven')
    }

    protected getCandidateElements(): string[][] {
        return [
            [
                'if (num !== 2) return false',
                'if (num === 2) return true',
                'if (num % 2 !== 0) return false',
                'if (num % 4 !== 0) return false',
                'if (num % 2 === 0) return true',
                'if (num % 4 === 0) return true',
                '',
            ],
            [
                'return true',
                'return false',
                'return undefined',
            ],
        ]
    }

    protected* minimalUnitTestGenerator(): Generator<any[]> {
        yield [[25], false]
        yield [[26], true]
    }

    protected* hintGenerator(): Generator<any[]> {
        for (let num = 0; num <= 40; num += 1)
            yield [num]
    }
}

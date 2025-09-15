import { UseCase } from './use-case-base.js'
import { Variable, BooleanVariable, IntegerVariable } from './variable.js'

export class LeapYear extends UseCase {
    public identifier(): string {
        return 'leap-year'
    }

    public name(): string {
        return 'Leap Year'
    }

    public specification(): string {
        return this.locale.returnTrueIfTheYearIsALeapYearAndFalseIfItIsNot()
    }

    protected getParameters(): Variable[] {
        return [
            new IntegerVariable('Year', 'year'),
        ]
    }

    protected getUnit(): Variable {
        return new BooleanVariable('Is a leap year', 'isLeapYear')
    }

    protected getCandidateElements(): string[][] {
        return [
            [
                'if (year % 400 === 0) return true',
                'if (year % 200 === 0) return true',
                '',
            ],
            [
                'if (year % 100 === 0) return false',
                '',
            ],
            [
                'if (year % 4 !== 0) return true',
                'if (year % 4 === 0) return true',
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
        yield [[2002], false]
        yield [[2004], true]
        yield [[1800], false]
        yield [[1600], true]
    }

    protected* hintGenerator(): Generator<any[]> {
        for (let year = 2001; year <= 2030; year += 1)
            yield [year]
        for (let year = 1000; year <= 3000; year += 100)
            yield [year]
    }
}

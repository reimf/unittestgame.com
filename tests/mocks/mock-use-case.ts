import { UseCase } from '../../src/use-case-base.js'
import { Variable, BooleanVariable, IntegerVariable } from '../../src/variable.js'

export class MockUseCase extends UseCase {
    public name(): string {
        return 'Mock Use Case'
    }

    public specification(): string {
        return (
            'Mock Specification'
        )
    }

    public getParameters(): Variable[] {
        return [
            new IntegerVariable('Year', 'year'),
        ]
    }

    public getUnit(): Variable {
        return new BooleanVariable('Is a leap year', 'isLeapYear')
    }

    public getCandidateElements(): string[][] {
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

    public* minimalUnitTestGenerator(): Generator<any[]> {
        yield [[2002], false]
        yield [[2004], true]
        yield [[1800], false]
        yield [[1600], true]
    }

    public* hintGenerator(): Generator<any[]> {
        for (let year = 2001; year <= 2030; year += 1)
            yield [year]
        for (let year = 1000; year <= 3000; year += 100)
            yield [year]
    }
}

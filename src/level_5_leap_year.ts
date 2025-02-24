import { Level } from './level.js'
import { Paragraph, Panel } from './html.js'
import { Variable, CheckboxVariable, NumberVariable } from './variable.js'
import { UnitTest } from './unit_test.js'

export class LeapYear extends Level {
    public showSpecificationPanel(): void {
        new Panel('Specification', [
            new Paragraph([
                'Return true if the year is a leap year and',
                'return false if the year is not a leap year.',
                'A year is a leap year if it is divisible by 4.',
                'The exception is that years that are divisible by 100 are not leap years,',
                'unless they are also divisible by 400.'
            ]),
        ]).show('specification')
    }

    public getParameters(): Variable[] {
        return [
            new NumberVariable(
                'Year',
                'year'
            ),
        ]
    }

    public getUnit(): Variable {
        return new CheckboxVariable(
            'Is it a leap year?',
            'isLeapYear'
        )
    }

    public getCandidateElements(): string[][] {
        return [
            [
                'if (year % 400 == 0) return true',
                'if (year % 200 == 0) return true',
                'if (year == 2000) return true',
                '',
            ],
            [
                'if (year % 100 == 0) return false',
                'if (year == 1900) return false',
                'if (year == 2100) return false',
                '',
            ],
            [
                'if (year % 4 != 0) return true',
                'if (year % 4 == 0) return true',
                '',
            ],
            [
                'return year % 2 == 0',
                'return year % 2 != 0',
                'return true',
                'return false',
            ],
        ]
    }

    public getMinimalUnitTests(parameters: Variable[], unit: Variable): UnitTest[] {
        return [
            new UnitTest(parameters, [2001], unit, false),
            new UnitTest(parameters, [2002], unit, false),
            new UnitTest(parameters, [2004], unit, true),
            new UnitTest(parameters, [1800], unit, false),
            new UnitTest(parameters, [1600], unit, true),
        ]
    }

    public *hintGenerator(): Generator<any[]> {
        for (let year = 2001; year <= 2030; year += 1)
            yield [year]
        for (let year = 1000; year <= 3000; year += 100)
            yield [year]
    }
}

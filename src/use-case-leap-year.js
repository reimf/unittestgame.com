import { UseCase } from './use-case-base.js';
import { BooleanVariable, IntegerVariable } from './variable.js';
export class LeapYear extends UseCase {
    name() {
        return 'Leap Year';
    }
    specification() {
        return this.locale.returnTrueIfTheYearIsALeapYearAndFalseIfItIsNot();
    }
    getParameters() {
        return [
            new IntegerVariable('Year', 'year'),
        ];
    }
    getUnit() {
        return new BooleanVariable('Is a leap year', 'isLeapYear');
    }
    getCandidateElements() {
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
        ];
    }
    *minimalUnitTestGenerator() {
        yield [[2002], false];
        yield [[2004], true];
        yield [[1800], false];
        yield [[1600], true];
    }
    *hintGenerator() {
        for (let year = 2001; year <= 2030; year += 1)
            yield [year];
        for (let year = 1000; year <= 3000; year += 100)
            yield [year];
    }
}

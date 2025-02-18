import { Level } from './level.js';
import { Paragraph, Panel } from './html.js';
import { CheckboxVariable, NumberVariable } from './variable.js';
import { UnitTest } from './unit_test.js';
export class LeapYear extends Level {
    constructor(index) {
        super(index);
        this.description = 'find the leap years';
    }
    showSpecificationPanel() {
        new Panel('Specification', [
            new Paragraph('Return true if the year is a leap year and return false if the year is not a leap year. ' +
                'A year is a leap year if it is divisible by 4. ' +
                'The exception is that years that are divisible by 100 are not leap years, unless they are also divisible by 400.'),
        ]).show('specification');
    }
    getParameters() {
        return [
            new NumberVariable('Year', 'year'),
        ];
    }
    getUnit() {
        return new CheckboxVariable('Is it a leap year?', 'isLeapYear');
    }
    getCandidateElements() {
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
        ];
    }
    getMinimalUnitTests() {
        return [
            new UnitTest([2001], false),
            new UnitTest([2002], false),
            new UnitTest([2004], true),
            new UnitTest([1800], false),
            new UnitTest([1600], true),
        ];
    }
    *hintGenerator() {
        for (let year = 2001; year <= 2030; year += 1)
            yield [year];
        for (let year = 1000; year <= 3000; year += 100)
            yield [year];
    }
}

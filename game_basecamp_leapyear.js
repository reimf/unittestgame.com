"use strict";
class Leapyear extends Basecamp {
    constructor() {
        super();
    }
    description() {
        return 'A1W2P2 leapyearcalculator.py';
    }
    introductionTemplate() {
        return new Template([
            'Introduction\n',
            'Basecamp students are instructed to write a function that determines whether or not a year is a leap year.',
            'You are hired to write the CodeGrade autotests for this function.',
        ]);
    }
    specificationTemplate() {
        return new Template([
            'Problem description\n',
            'Most years have 365 days.',
            'However, the time required for the Earth to orbit the Sun is actually slightly more than that.',
            'As a result, an extra day, February 29, is included in some years to correct for this difference.',
            'Such years are referred to as leap years.',
            'The rules for determining whether or not a year is a leap year follow:\n',
            '- Any year that is divisible by 400 is a leap year.\n',
            '- Of the remaining years, any year that is divisible by 100 is not a leap year.\n',
            '- Of the remaining years, any year that is divisible by 4 is a leap year.\n',
            '- All other years are not leap years.\n',
        ]);
    }
    getParameters() {
        return [
            new NumberVariable('Year', 'year'),
        ];
    }
    getUnit() {
        return new BooleanVariable('Is it a leap year?', 'isLeapyear');
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
    getSpecialUnitTests() {
        return [
            new UnitTest([2001], false),
            new UnitTest([2002], false),
            new UnitTest([2004], true),
            new UnitTest([1800], false),
            new UnitTest([1600], true),
        ];
    }
    *generalArgumentsGenerator() {
        for (let year = 2001; year <= 2030; year += 1)
            yield [year];
        for (let year = 1000; year <= 3000; year += 100)
            yield [year];
    }
}

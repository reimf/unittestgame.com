"use strict";
class Leapyear extends Game {
    constructor() {
        super();
        this.theme = School.instance;
    }
    description() {
        return 'I want to write better unit tests for a leap year calculator.';
    }
    introductionMessage() {
        return new Section([
            new Paragraph('Students are instructed to write a function that determines whether or not a year is a leap year.')
        ]);
    }
    specificationPanel() {
        return new Section([
            new Header('Specification'),
            new Paragraph('Most years have 365 days. ' +
                'However, the time required for the earth to orbit the sun is actually slightly more than 365 days. ' +
                'As a result, an extra day, February 29, is included in some years to correct for this difference. ' +
                'Such years are called leap years. ' +
                'The rules for determining whether a year is a leap year or not are as follows:'),
            new Paragraph('- Any year that is divisible by 400 is a leap year.'),
            new Paragraph('- Of the remaining years, any year that is divisible by 100 is not a leap year.'),
            new Paragraph('- Of the remaining years, any year that is divisible by 4 is a leap year.'),
            new Paragraph('- All other years are not leap years.'),
        ]);
    }
    getParameters() {
        return [
            new NumberVariable('Year', 'year'),
        ];
    }
    getUnit() {
        return new CheckboxVariable('Is it a leap year?', 'isLeapyear');
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

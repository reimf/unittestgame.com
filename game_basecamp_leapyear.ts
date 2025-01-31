class Leapyear extends Basecamp {
    public constructor() {
        super()
    }

    public description(): string {
        return 'A1W2P2 leapyearcalculator.py'
    }

    protected introductionMessage(): Section {
        return new Section([
            new Paragraph(
                'Basecamp students are instructed to write a function that determines whether or not a year is a leap year. ' +
                'You are hired to write the CodeGrade autotests for this function.'
            ),
        ])
    }

    protected specificationMessage(): Section {
        return new Section([
            new Paragraph(
                'Most years have 365 days. ' +
                'However, the time required for the Earth to orbit the Sun is actually slightly more than that. ' +
                'As a result, an extra day, February 29, is included in some years to correct for this difference. ' +
                'Such years are referred to as leap years. ' +
                'The rules for determining whether or not a year is a leap year follow: '
            ),
            new Paragraph('- Any year that is divisible by 400 is a leap year.'),
            new Paragraph('- Of the remaining years, any year that is divisible by 100 is not a leap year.'),
            new Paragraph('- Of the remaining years, any year that is divisible by 4 is a leap year.'),
            new Paragraph('- All other years are not leap years.'),
        ])
    }

    protected getParameters(): Variable[] {
        return [
            new NumberVariable(
                'Year',
                'year'
            ),
        ]
    }

    protected getUnit(): Variable {
        return new CheckboxVariable(
            'Is it a leap year?',
            'isLeapyear'
        )
    }

    protected getCandidateElements(): string[][] {
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

    protected getSpecialUnitTests(): UnitTest[] {
        return [
            new UnitTest([2001], false),
            new UnitTest([2002], false),
            new UnitTest([2004], true),
            new UnitTest([1800], false),
            new UnitTest([1600], true),
        ]
    }

    protected *generalArgumentsGenerator(): Generator<any[]> {
        for (let year = 2001; year <= 2030; year += 1)
            yield [year]
        for (let year = 1000; year <= 3000; year += 100)
            yield [year]
    }
}

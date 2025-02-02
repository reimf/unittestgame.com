class Evenodd extends Game {
    readonly theme = Intro.instance

    public constructor() {
        super()
    }

    public description(): string {
        return 'I want to write unit tests for a function that checks if a number is even or odd.'
    }

    protected introductionMessage(): Section {
        return new Section([
            new Paragraph(
                'All integer numbers are even or odd.'
            )
        ])
    }

    protected specificationPanel(): Section {
        return new Section([
            new Header('Specification'),
            new Paragraph(
                'A number is even if it is divisible by 2, otherwise it is odd.'
            ),
        ])
    }

    protected getParameters(): Variable[] {
        return [
            new NumberVariable(
                'Number',
                'number'
            ),
        ]
    }

    protected getUnit(): Variable {
        return new CheckboxVariable(
            'Is the number even?',
            'isEven'
        )
    }

    protected getCandidateElements(): string[][] {
        return [
            [
                'if (number === 0) return true',
                'if (number === 1) return false',
                'if (number === 2) return true',
                'if (number === 3) return false',
                'if (number === 4) return true',
                'if (number === 5) return false',
                'if (number === 6) return true',
                'if (number === 7) return false',
                'if (number === 8) return true',
                'if (number === 9) return false',
                'if (number === 10) return true',
                '',
            ],
            [
                'return number % 2 === 0',
                'return true',
                'return false',
            ],
        ]
    }

    protected getSpecialUnitTests(): UnitTest[] {
        return [
            new UnitTest([17], false),
            new UnitTest([24], true),
        ]
    }

    protected *generalArgumentsGenerator(): Generator<any[]> {
        for (let number = 0; number <= 40; number += 1)
            yield [number]
    }
}

class Evenodd extends Game {
    public readonly theme = AIBot.instance
    public readonly description = 'I want to write unit tests for a function that checks if a number is even or odd'

    public constructor() {
        super()
    }

    protected introductionMessage(): Message {
        return new Message([
            new Paragraph(
                'All integer numbers are even or odd.'
            )
        ])
    }

    protected specificationPanel(): Panel {
        return new Panel('Specification', [
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
                'return number < 1',
                'return number < 2',
                'return number < 3',
                'return number < 4',
                'return number < 5',
                'return number < 6',
                'return number < 7',
                'return number < 8',
                'return number < 9',
                'return number < 10',
                'return number > 1',
                'return number > 2',
                'return number > 3',
                'return number > 4',
                'return number > 5',
                'return number > 6',
                'return number > 7',
                'return number > 8',
                'return number > 9',
                'return number > 10',
                'return number % 2 === 0',
                'return true',
                'return false',
            ],
        ]
    }

    protected getMinimalUnitTests(): UnitTest[] {
        return [
            new UnitTest([17], false),
            new UnitTest([24], true),
        ]
    }

    protected *hintGenerator(): Generator<any[]> {
        for (let number = 0; number <= 40; number += 1)
            yield [number]
    }
}

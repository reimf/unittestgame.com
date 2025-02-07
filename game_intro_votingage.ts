class Votingage extends Game {
    public readonly theme = Intro.instance
    public readonly description = 'I want to write unit tests for a function that checks if a person is allowed to vote based on their age'

    public constructor() {
        super()
    }

    protected introductionMessage(): Message {
        return new Message([
            new Paragraph(
                'A legal voting age is the minimum age that a person is allowed to vote in a democratic process. ' +
                'For general elections around the world, the right to vote is restricted to adults, and most nations use 18 as their voting age. ' +
                'A government needs a function that determines whether someone is allowed to vote or not.'
            )
        ])
    }

    protected specificationPanel(): Panel {
        return new Panel('Specification', [
            new Paragraph(
                'If you are 18 years or over, you are allowed to vote.'
            ),
        ])
    }

    protected getParameters(): Variable[] {
        return [
            new NumberVariable(
                'Age',
                'age'
            ),
        ]
    }

    protected getUnit(): Variable {
        return new CheckboxVariable(
            'Allowed to vote?',
            'isAllowedToVote'
        )
    }

    protected getCandidateElements(): string[][] {
        return [
            [
                'return age >= 16',
                'return age >= 17',
                'return age >= 18',
                'return age >= 19',
                'return age >= 20',
                'return age >= 21',
                'return true',
                'return false',
            ],
        ]
    }

    protected getMinimalUnitTests(): UnitTest[] {
        return [
            new UnitTest([17], false),
            new UnitTest([18], true),
        ]
    }

    protected *hintGenerator(): Generator<any[]> {
        for (let age = 1; age <= 40; age += 1)
            yield [age]
    }
}

class Votingage extends Game {
    public readonly theme = Intro.instance
    public readonly description = 'I want to write unit tests for a function that checks if a person is allowed to vote based on their age.'

    public constructor() {
        super()
    }

    protected introductionMessage(): Section {
        return new Section([
            new Paragraph(
                'A legal voting age is the minimum age that a person is allowed to vote in a democratic process. ' +
                'For general elections around the world, the right to vote is restricted to adults, and most nations use 18 as their voting age. ' +
                'A government needs a function that determines whether someone is allowed to vote or not.'
            )
        ])
    }

    protected specificationPanel(): Section {
        return new Section([
            new Header('Specification'),
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
            'mayVote'
        )
    }

    protected getCandidateElements(): string[][] {
        return [
            [
                'if (age >= 16) return true',
                'if (age >= 18) return true',
                'if (age >= 20) return true',
                '',
            ],
            [
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

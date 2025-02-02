class Votingage extends Game {
    public constructor(theme: Theme) {
        super(theme)
    }

    public description(): string {
        return 'I want to write unit tests for voting age.'
    }

    protected introductionMessage(): Section {
        return new Section([
            new Paragraph(
                'A legal voting age is the minimum age that a person is allowed to vote in a democratic process. ' +
                'For general elections around the world, the right to vote is restricted to adults, and most nations use 18 as their voting age.'
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

    protected getSpecialUnitTests(): UnitTest[] {
        return [
            new UnitTest([17], false),
            new UnitTest([18], true),
        ]
    }

    protected *generalArgumentsGenerator(): Generator<any[]> {
        for (let age = 1; age <= 40; age += 1)
            yield [age]
    }
}

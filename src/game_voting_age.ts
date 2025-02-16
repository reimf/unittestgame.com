import { Game } from './game.js'
import { Paragraph, Panel } from './html.js'
import { Variable, CheckboxVariable, NumberVariable } from './variable.js'
import { UnitTest } from './unit_test.js'

export class VotingAge extends Game {
    public readonly description = 'VotingAge: is someone allowed to vote'

    public constructor() {
        super()
    }

    protected specificationPanel(): Panel {
        return new Panel('Specification', [
            new Paragraph(
                'Return true if the age is 18 years or over and return false if the age is under 18.'
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

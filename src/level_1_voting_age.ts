import { Level } from './level.js'
import { Paragraph, Panel } from './html.js'
import { Variable, CheckboxVariable, NumberVariable } from './variable.js'
import { UnitTest } from './unit_test.js'

export class VotingAge extends Level {
    public index = 1

    public showSpecificationPanel(): void {
        new Panel('Specification', [
            new Paragraph(
                'Return true if the age is 18 years or over and return false if the age is under 18.'
            ),
        ]).show('specification')
    }

    public getParameters(): Variable[] {
        return [
            new NumberVariable(
                'Age',
                'age'
            ),
        ]
    }

    public getUnit(): Variable {
        return new CheckboxVariable(
            'Allowed to vote?',
            'isAllowedToVote'
        )
    }

    public getCandidateElements(): string[][] {
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

    public getMinimalUnitTests(): UnitTest[] {
        return [
            new UnitTest([17], false),
            new UnitTest([18], true),
        ]
    }

    public *hintGenerator(): Generator<any[]> {
        for (let age = 1; age <= 40; age += 1)
            yield [age]
    }
}

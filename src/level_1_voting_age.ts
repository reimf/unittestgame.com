import { Level } from './level.js'
import { Paragraph } from './html.js'
import { Panel } from './frame.js'
import { Variable, CheckboxVariable, NumberVariable } from './variable.js'
import { UnitTest } from './unit_test.js'

export class VotingAge extends Level {
    public showSpecificationPanel(): void {
        new Panel('Specification', [
            new Paragraph().appendText('Return true if the age is 18 years or over and return false if the age is under 18.'),
        ]).show()
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

    public getMinimalUnitTests(parameters: Variable[], unit: Variable): UnitTest[] {
        return [
            new UnitTest(parameters, [17], unit, false),
            new UnitTest(parameters, [18], unit, true),
        ]
    }

    public *hintGenerator(): Generator<any[]> {
        for (let age = 1; age <= 40; age += 1)
            yield [age]
    }
}

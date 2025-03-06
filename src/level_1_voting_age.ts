import { Panel } from './frame.js'
import { Paragraph } from './html.js'
import { Level } from './level.js'
import { Variable, CheckboxVariable, NumberVariable } from './variable.js'

export class VotingAge extends Level {
    public constructor() {
        super(1)
    }

    public showSpecificationPanel(): void {
        new Panel('Specification', [
            new Paragraph().appendLines([
                'Return true if the age is 18 years or over and',
                'return false if the age is under 18.'
            ]),
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
                'if (age >= 16) return true',
                'if (age >= 17) return true',
                'if (age >= 18) return true',
                'if (age >= 19) return true',
                'if (age >= 20) return true',
                'if (age >= 21) return true',
                '',
            ],
            [
                'return true',
                'return false',
                '',
            ],
        ]
    }

    public *minimalUnitTestGenerator(): Generator<any[]> {
        yield [[17], false]
        yield [[18], true]
    }

    public *hintGenerator(): Generator<any[]> {
        for (let age = 1; age <= 40; age += 1)
            yield [age]
    }
}

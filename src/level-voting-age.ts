import { Level } from './level-base.js'
import { Variable, BooleanVariable, IntegerVariable } from './variable.js'

export class VotingAge extends Level {
    protected identifier(): string {
        return 'voting-age'
    }

    protected name(): string {
        return 'Voting Age'
    }

    protected specification(): string {
        return this.locale.returnTrueIfTheAgeIs18YearsOrOverAndReturnFalseIfTheAgeIsUnder18()
    }

    protected getParameters(): Variable[] {
        return [
            new IntegerVariable('Age', 'age'),
        ]
    }

    protected getUnit(): Variable {
        return new BooleanVariable('Is allowed to vote', 'isAllowedToVote')
    }

    protected getCandidateElements(): string[][] {
        return [
            [
                'if (age >= 16) return true',
                'if (age >= 17) return true',
                'if (age >= 18) return true',
                'if (age >= 19) return true',
                'if (age >= 20) return true',
                'if (age <= 16) return false',
                'if (age < 17) return false',
                'if (age < 18) return false',
                'if (age < 19) return false',
                'if (age < 20) return false',
                'if (age < 21) return false',
                'if (age === 18) return true',
                'if (age === 17) return false',
                '',
            ],
            [
                'return true',
                'return false',
                'return undefined',
            ],
        ]
    }

    protected* minimalUnitTestGenerator(): Generator<any[]> {
        yield [[16], false]
        yield [[17], false]
        yield [[18], true]
        yield [[19], true]
    }

    protected* hintGenerator(): Generator<any[]> {
        for (let age = 0; age <= 40; age += 1)
            yield [age]
    }
}

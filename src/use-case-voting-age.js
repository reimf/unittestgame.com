import { UseCase } from './use-case-base.js';
import { BooleanVariable, IntegerVariable } from './variable.js';
export class VotingAge extends UseCase {
    name() {
        return 'Voting Age';
    }
    specification() {
        return this.locale.returnTrueIfTheAgeIs18YearsOrOverAndFalseIfTheAgeIsUnder18();
    }
    getParameters() {
        return [
            new IntegerVariable('Age', 'age'),
        ];
    }
    getUnit() {
        return new BooleanVariable('Is allowed to vote', 'isAllowedToVote');
    }
    getCandidateElements() {
        return [
            [
                'if (age >= 16) return true',
                'if (age >= 17) return true',
                'if (age >= 18) return true',
                'if (age >= 19) return true',
                'if (age >= 20) return true',
                'if (age <= 16) return false',
                'if (age <= 17) return false',
                'if (age <= 18) return false',
                'if (age <= 19) return false',
                'if (age <= 20) return false',
                'if (age === 18) return true',
                'if (age === 17) return false',
                '',
            ],
            [
                'return true',
                'return false',
                'return undefined',
            ],
        ];
    }
    *minimalUnitTestGenerator() {
        yield [[16], false];
        yield [[17], false];
        yield [[18], true];
        yield [[19], true];
    }
    *hintGenerator() {
        for (let age = 1; age <= 40; age += 1)
            yield [age];
    }
}

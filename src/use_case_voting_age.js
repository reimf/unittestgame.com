import { UseCase } from './use_case.js';
import { CheckboxVariable, NumberVariable } from './variable.js';
export class VotingAge extends UseCase {
    name() {
        return 'Voting Age';
    }
    specification() {
        return 'Return true if the age is 18 years or over and return false if the age is under 18.';
    }
    getParameters() {
        return [
            new NumberVariable('Age', 'age'),
        ];
    }
    getUnit() {
        return new CheckboxVariable('Is allowed to vote', 'isAllowedToVote');
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
                '',
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

import { Level } from './level.js';
import { Paragraph } from './html.js';
import { Panel } from './frame.js';
import { CheckboxVariable, NumberVariable } from './variable.js';
export class VotingAge extends Level {
    constructor() {
        super(1);
    }
    showSpecificationPanel() {
        new Panel('Specification', [
            new Paragraph().appendLines([
                'Return true if the age is 18 years or over and',
                'return false if the age is under 18.'
            ]),
        ]).show();
    }
    getParameters() {
        return [
            new NumberVariable('Age', 'age'),
        ];
    }
    getUnit() {
        return new CheckboxVariable('Allowed to vote?', 'isAllowedToVote');
    }
    getCandidateElements() {
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
        ];
    }
    *minimalUnitTestGenerator() {
        yield [[17], false];
        yield [[18], true];
    }
    *hintGenerator() {
        for (let age = 1; age <= 40; age += 1)
            yield [age];
    }
}

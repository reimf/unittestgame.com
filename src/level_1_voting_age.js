import { Level } from './level.js';
import { Paragraph } from './html.js';
import { Panel } from './frame.js';
import { CheckboxVariable, NumberVariable } from './variable.js';
export class VotingAge extends Level {
    showSpecificationPanel() {
        new Panel('Specification', [
            new Paragraph().appendText('Return true if the age is 18 years or over and return false if the age is under 18.'),
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
                'return age >= 16',
                'return age >= 17',
                'return age >= 18',
                'return age >= 19',
                'return age >= 20',
                'return age >= 21',
                'return true',
                'return false',
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

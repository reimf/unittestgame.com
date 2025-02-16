import Game from './game.js';
import { Paragraph, Panel } from './html.js';
import { CheckboxVariable, NumberVariable } from './variable.js';
import UnitTest from './unit_test.js';
export default class VotingAge extends Game {
    constructor() {
        super();
        this.description = 'VotingAge: is someone allowed to vote';
    }
    specificationPanel() {
        return new Panel('Specification', [
            new Paragraph('Return true if the age is 18 years or over and return false if the age is under 18.'),
        ]);
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
    getMinimalUnitTests() {
        return [
            new UnitTest([17], false),
            new UnitTest([18], true),
        ];
    }
    *hintGenerator() {
        for (let age = 1; age <= 40; age += 1)
            yield [age];
    }
}

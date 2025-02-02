"use strict";
class Votingage extends Game {
    constructor(theme) {
        super(theme);
    }
    description() {
        return 'I want to write unit tests for voting age.';
    }
    introductionMessage() {
        return new Section([
            new Paragraph('A legal voting age is the minimum age that a person is allowed to vote in a democratic process. ' +
                'For general elections around the world, the right to vote is restricted to adults, and most nations use 18 as their voting age.')
        ]);
    }
    specificationPanel() {
        return new Section([
            new Header('Specification'),
            new Paragraph('If you are 18 years or over, you are allowed to vote.'),
        ]);
    }
    getParameters() {
        return [
            new NumberVariable('Age', 'age'),
        ];
    }
    getUnit() {
        return new CheckboxVariable('Allowed to vote?', 'mayVote');
    }
    getCandidateElements() {
        return [
            [
                'if (age >= 16) return true',
                'if (age >= 18) return true',
                'if (age >= 20) return true',
                '',
            ],
            [
                'return true',
                'return false',
            ],
        ];
    }
    getSpecialUnitTests() {
        return [
            new UnitTest([17], false),
            new UnitTest([18], true),
        ];
    }
    *generalArgumentsGenerator() {
        for (let age = 1; age <= 40; age += 1)
            yield [age];
    }
}

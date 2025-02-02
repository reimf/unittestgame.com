"use strict";
class Evenodd extends Game {
    constructor() {
        super();
        this.theme = Intro.instance;
    }
    description() {
        return 'I want to write unit tests for a function that checks if a number is even or odd.';
    }
    introductionMessage() {
        return new Section([
            new Paragraph('All integer numbers are even or odd.')
        ]);
    }
    specificationPanel() {
        return new Section([
            new Header('Specification'),
            new Paragraph('A number is even if it is divisible by 2, otherwise it is odd.'),
        ]);
    }
    getParameters() {
        return [
            new NumberVariable('Number', 'number'),
        ];
    }
    getUnit() {
        return new CheckboxVariable('Is the number even?', 'isEven');
    }
    getCandidateElements() {
        return [
            [
                'if (number === 0) return true',
                'if (number === 1) return false',
                'if (number === 2) return true',
                'if (number === 3) return false',
                'if (number === 4) return true',
                'if (number === 5) return false',
                'if (number === 6) return true',
                'if (number === 7) return false',
                'if (number === 8) return true',
                'if (number === 9) return false',
                'if (number === 10) return true',
                '',
            ],
            [
                'return number % 2 === 0',
                'return true',
                'return false',
            ],
        ];
    }
    getSpecialUnitTests() {
        return [
            new UnitTest([17], false),
            new UnitTest([24], true),
        ];
    }
    *generalArgumentsGenerator() {
        for (let number = 0; number <= 40; number += 1)
            yield [number];
    }
}

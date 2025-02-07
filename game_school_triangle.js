"use strict";
class Triangle extends Game {
    constructor() {
        super();
        this.theme = School.instance;
        this.description = 'I want to write better unit tests for a triangle type checker';
    }
    introductionMessage() {
        return new Message([
            new Paragraph('Students are instructed to write a function that determines the type of a triangle.')
        ]);
    }
    specificationPanel() {
        return new Panel('Specification', [
            new Paragraph('A triangle can be classified based on the lengths of its sides as equilateral, isosceles or scalene. ' +
                'All three sides of an equilateral triangle have the same length. ' +
                'An isosceles triangle has two sides that are the same length, and a third side that is a different length ' +
                'If all of the sides have different lengths then the triangle is scalene.'),
        ]);
    }
    getParameters() {
        return [
            new NumberVariable('Side A', 'a'),
            new NumberVariable('Side B', 'b'),
            new NumberVariable('Side C', 'c'),
        ];
    }
    getUnit() {
        return new RadioVariable('Type of triangle', 'triangleType', ['equilateral', 'isosceles', 'scalene']);
    }
    getCandidateElements() {
        return [
            [
                'if (a === b && b === c) return "equilateral"',
                'if (a === b || b === c || a === c) return "equilateral"',
                'if (a === b) return "equilateral"',
                'if (b === c) return "equilateral"',
                'if (a === c) return "equilateral"',
                '',
            ],
            [
                'if (a === b || b === c || a === c) return "isosceles"',
                'if (a === b || b === c) return "isosceles"',
                'if (a === b || a === c) return "isosceles"',
                'if (b === c || a === c) return "isosceles"',
                'if (a === b) return "isosceles"',
                'if (a === c) return "isosceles"',
                'if (b === c) return "isosceles"',
                '',
            ],
            [
                'return "equilateral"',
                'return "isosceles"',
                'return "scalene"',
                'return ""',
            ],
        ];
    }
    getMinimalUnitTests() {
        return [
            new UnitTest([5, 5, 5], 'equilateral'),
            new UnitTest([3, 5, 5], 'isosceles'),
            new UnitTest([5, 3, 5], 'isosceles'),
            new UnitTest([5, 5, 3], 'isosceles'),
            new UnitTest([3, 4, 5], 'scalene'),
        ];
    }
    *hintGenerator() {
        for (let a = 6; a < 9; a++)
            for (let b = 6; b < 9; b++)
                for (let c = 6; c < 9; c++)
                    yield [a, b, c];
    }
}

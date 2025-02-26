import { Level } from './level.js';
import { Paragraph } from './html.js';
import { Panel } from './frame.js';
import { RadioVariable, NumberVariable } from './variable.js';
import { UnitTest } from './unit_test.js';
export class TriangleType extends Level {
    showSpecificationPanel() {
        new Panel('Specification', [
            new Paragraph().appendLines([
                'Return the type of the triangle: equilateral, isosceles or scalene.',
                'A triangle is equilateral if all three sides have the same length.',
                'A triangle is isosceles if two sides have the same length and a third side has a different length.',
                'A triangle is scalene if all three sides have different lengths.',
            ]),
        ]).show();
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
    getMinimalUnitTests(parameters, unit) {
        return [
            new UnitTest(parameters, [5, 5, 5], unit, 'equilateral'),
            new UnitTest(parameters, [3, 5, 5], unit, 'isosceles'),
            new UnitTest(parameters, [5, 3, 5], unit, 'isosceles'),
            new UnitTest(parameters, [5, 5, 3], unit, 'isosceles'),
            new UnitTest(parameters, [3, 4, 5], unit, 'scalene'),
        ];
    }
    *hintGenerator() {
        for (let a = 6; a < 9; a++)
            for (let b = 6; b < 9; b++)
                for (let c = 6; c < 9; c++)
                    yield [a, b, c];
    }
}

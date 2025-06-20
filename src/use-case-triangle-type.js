import { UseCase } from './use-case-base.js';
import { RadioVariable, IntegerVariable } from './variable.js';
export class TriangleType extends UseCase {
    name() {
        return 'Triangle Type';
    }
    specification() {
        return ('Return the type of the triangle: equilateral, isosceles or scalene. ' +
            'A triangle is equilateral if all three sides have the same length. ' +
            'A triangle is isosceles if two sides have the same length and a third side has a different length. ' +
            'A triangle is scalene if all three sides have different lengths.');
    }
    getParameters() {
        return [
            new IntegerVariable('Side A', 'a'),
            new IntegerVariable('Side B', 'b'),
            new IntegerVariable('Side C', 'c'),
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
                'if (a !== b && a !== c && b !== c) return "scalene"',
                '',
            ],
            [
                'return "equilateral"',
                'return "isosceles"',
                'return "scalene"',
                'return undefined',
            ],
        ];
    }
    *minimalUnitTestGenerator() {
        yield [[5, 5, 5], 'equilateral'];
        yield [[3, 5, 5], 'isosceles'];
        yield [[5, 3, 5], 'isosceles'];
        yield [[5, 5, 3], 'isosceles'];
        yield [[3, 4, 5], 'scalene'];
    }
    *hintGenerator() {
        for (let a = 6; a < 9; a++)
            for (let b = 6; b < 9; b++)
                for (let c = 6; c < 9; c++)
                    yield [a, b, c];
    }
}

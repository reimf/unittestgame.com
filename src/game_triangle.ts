import { Game } from './game.js'
import { Paragraph, Panel } from './html.js'
import { Variable, RadioVariable, NumberVariable } from './variable.js'
import { UnitTest } from './unit_test.js'

export class Triangle extends Game {
    public readonly description = 'Triangle: name the triangle type'

    public constructor() {
        super()
    }

    protected specificationPanel(): Panel {
        return new Panel('Specification', [
            new Paragraph(
                'Return the type of the triangle: equilateral, isosceles or scalene. ' +
                'A triangle is equilateral if all three sides have the same length. ' +
                'A triangle is isosceles if two sides have the same length and a third side has a different length. ' +
                'A triangle is scalene if all three sides have different lengths.'
            ),
        ])
    }

    protected getParameters(): Variable[] {
        return [
            new NumberVariable('Side A', 'a'),
            new NumberVariable('Side B', 'b'),
            new NumberVariable('Side C', 'c'),
        ]
    }

    protected getUnit(): Variable {
        return new RadioVariable(
            'Type of triangle',
            'triangleType',
            ['equilateral', 'isosceles', 'scalene']
        )
    }

    protected getCandidateElements(): string[][] {
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
        ]
    }

    protected getMinimalUnitTests(): UnitTest[] {
        return [
            new UnitTest([5, 5, 5], 'equilateral'),
            new UnitTest([3, 5, 5], 'isosceles'),
            new UnitTest([5, 3, 5], 'isosceles'),
            new UnitTest([5, 5, 3], 'isosceles'),
            new UnitTest([3, 4, 5], 'scalene'),
        ]
    }

    protected *hintGenerator(): Generator<any[]> {
        for (let a = 6; a < 9; a++)
            for (let b = 6; b < 9; b++)
                for (let c = 6; c < 9; c++)
                    yield [a, b, c]
    }
}

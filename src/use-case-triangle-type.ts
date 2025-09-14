import { UseCase } from './use-case-base.js'
import { Variable, RadioVariable, IntegerVariable } from './variable.js'
import { Translation } from './translation.js'

export class TriangleType extends UseCase {
    public identifier(): string {
        return 'triangle-type'
    }

    public name(): string {
        return 'Triangle Type'
    }

    public specification(): Translation {
        return this.locale.returnTheTypeOfTheTriangle()
    }

    public getParameters(): Variable[] {
        return [
            new IntegerVariable('Side A', 'a'),
            new IntegerVariable('Side B', 'b'),
            new IntegerVariable('Side C', 'c'),
        ]
    }

    public getUnit(): Variable {
        return new RadioVariable('Type of triangle', 'triangleType', ['equilateral', 'isosceles', 'scalene'])
    }

    public getCandidateElements(): string[][] {
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
        ]
    }

    public* minimalUnitTestGenerator(): Generator<any[]> {
        yield [[5, 5, 5], 'equilateral']
        yield [[3, 5, 5], 'isosceles']
        yield [[5, 3, 5], 'isosceles']
        yield [[5, 5, 3], 'isosceles']
        yield [[3, 4, 5], 'scalene']
    }

    public* hintGenerator(): Generator<any[]> {
        for (let a = 6; a < 9; a++)
            for (let b = 6; b < 9; b++)
                for (let c = 6; c < 9; c++)
                    yield [a, b, c]
    }
}

import { Level } from './level-base.js'
import { Locale, LocalizedText } from './locale.js'
import { Variable, RadioVariable, IntegerVariable } from './variable.js'

export class TriangleType extends Level {
    protected identifier(): string {
        return 'triangle-type'
    }

    protected name(): string {
        return 'Triangle Type'
    }

    protected specification(): LocalizedText {
        return this.locale.triangleTypeSpecification()
    }

    protected getParameters(): Variable[] {
        return [
            new IntegerVariable(Locale.bless('Side A'), 'a'),
            new IntegerVariable(Locale.bless('Side B'), 'b'),
            new IntegerVariable(Locale.bless('Side C'), 'c'),
        ]
    }

    protected getUnit(): Variable {
        return new RadioVariable(Locale.bless('Type of triangle'), 'triangleType', [Locale.bless('equilateral'), Locale.bless('isosceles'), Locale.bless('scalene')])
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

    protected* minimalUnitTestGenerator(): Generator<any[]> {
        yield [[5, 5, 5], 'equilateral']
        yield [[3, 5, 5], 'isosceles']
        yield [[5, 3, 5], 'isosceles']
        yield [[5, 5, 3], 'isosceles']
        yield [[3, 4, 5], 'scalene']
    }

    protected* hintGenerator(): Generator<any[]> {
        for (let a = 6; a < 9; a++)
            for (let b = 6; b < 9; b++)
                for (let c = 6; c < 9; c++)
                    yield [a, b, c]
    }
}

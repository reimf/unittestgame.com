import { Level } from './level-base.js'
import { ConversationLanguage, ConversationText } from './conversation-language-base.js'
import { Variable, RadioVariable } from './variable.js'

export class TriangleType extends Level<[number, number, number], string> {
    protected identifier(): string {
        return 'triangle-type'
    }

    protected name(): string {
        return 'Triangle Type'
    }

    protected specification(): ConversationText {
        return this.conversationLanguage.triangleTypeSpecification()
    }

    protected getUnit(): Variable {
        return new RadioVariable(ConversationLanguage.bless('Type of triangle'), 'triangleType', [ConversationLanguage.bless('EQUILATERAL'), ConversationLanguage.bless('ISOSCELES'), ConversationLanguage.bless('SCALENE')])
    }

    protected getCandidateElements(): string[][] {
        return [
            [
                'function triangleType(a: number, b: number, c: number): string {'
            ],
            [
                '    if (a === b && b === c) return "EQUILATERAL"',
                '    if (a === b || b === c || a === c) return "EQUILATERAL"',
                '    if (a === b) return "EQUILATERAL"',
                '    if (b === c) return "EQUILATERAL"',
                '    if (a === c) return "EQUILATERAL"',
                '',
            ],
            [
                '    if (a === b || b === c || a === c) return "ISOSCELES"',
                '    if (a === b || b === c) return "ISOSCELES"',
                '    if (a === b || a === c) return "ISOSCELES"',
                '    if (b === c || a === c) return "ISOSCELES"',
                '    if (a === b) return "ISOSCELES"',
                '    if (a === c) return "ISOSCELES"',
                '    if (b === c) return "ISOSCELES"',
                '    if (a !== b && a !== c && b !== c) return "SCALENE"',
                '',
            ],
            [
                '    return "EQUILATERAL"',
                '    return "ISOSCELES"',
                '    return "SCALENE"',
            ],
            [
                '}'
            ],
        ]
    }

    protected* minimalUnitTestGenerator(): Generator<[[number, number, number], string]> {
        yield [[5, 5, 5], 'EQUILATERAL']
        yield [[3, 5, 5], 'ISOSCELES']
        yield [[5, 3, 5], 'ISOSCELES']
        yield [[5, 5, 3], 'ISOSCELES']
        yield [[3, 4, 5], 'SCALENE']
    }

    protected* hintGenerator(): Generator<[number, number, number]> {
        for (let a = 6; a < 9; a++)
            for (let b = 6; b < 9; b++)
                for (let c = 6; c < 9; c++)
                    yield [a, b, c]
    }
}

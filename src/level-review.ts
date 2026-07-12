import { Level } from './level-base.js'
import { Locale, LocalizedText } from './locale.js'
import { Variable, IntegerVariable, RadioVariable } from './variable.js'

export class Review extends Level<[number, number], string> {
    protected identifier(): string {
        return 'review'
    }

    protected name(): string {
        return 'Review'
    }
    protected specification(): LocalizedText {
        return this.locale.reviewSpecification()
    }

    protected getParameters(): Variable[] {
        return [
            new IntegerVariable(Locale.bless('Price'), 'price'),
            new IntegerVariable(Locale.bless('Quality'), 'quality'),
        ]
    }

    protected getUnit(): Variable {
        return new RadioVariable(Locale.bless('Output'), 'review', [Locale.bless('GOOD'), Locale.bless('BAD'), Locale.bless('OK')])
    }

    protected getCandidateElements(): string[][] {
        return [
            [
                'if (price < 19 && quality >= 6) return "GOOD"',
                'if (price < 20 && quality >= 6) return "GOOD"',
                'if (price < 21 && quality >= 6) return "GOOD"',
                'if (price < 19 && quality >= 7) return "GOOD"',
                'if (price < 20 && quality >= 7) return "GOOD"',
                'if (price < 21 && quality >= 7) return "GOOD"',
                'if (price < 19 && quality >= 8) return "GOOD"',
                'if (price < 20 && quality >= 8) return "GOOD"',
                'if (price < 21 && quality >= 8) return "GOOD"',
                '',
            ],
            [
                'if (price >= 19 && quality < 6) return "BAD"',
                'if (price >= 20 && quality < 6) return "BAD"',
                'if (price >= 21 && quality < 6) return "BAD"',
                'if (price >= 19 && quality < 7) return "BAD"',
                'if (price >= 20 && quality < 7) return "BAD"',
                'if (price >= 21 && quality < 7) return "BAD"',
                'if (price >= 19 && quality < 8) return "BAD"',
                'if (price >= 20 && quality < 8) return "BAD"',
                'if (price >= 21 && quality < 8) return "BAD"',
                '',
            ],
            [
                'return "GOOD"',
                'return "BAD"',
                'return "OK"',
            ],
        ]
    }

    protected* minimalUnitTestGenerator(): Generator<[[number, number], string]> {
        yield [[19, 7], 'GOOD']
        yield [[20, 6], 'BAD']
        yield [[20, 7], 'OK']
        yield [[19, 6], 'OK']
    }

    protected* hintGenerator(): Generator<[number, number]> {
        for (let price = 10; price <= 30; price += 3)
            for (let quality = 4; quality <= 10; quality += 1)
                yield [price, quality]
    }
}

import { Level } from './level-base.js'
import { Locale, LocalizedText } from './locale.js'
import { Variable, IntegerVariable, RadioVariable } from './variable.js'

export class Review extends Level {
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
        return new RadioVariable(Locale.bless('Output'), 'review', [Locale.bless('Good'), Locale.bless('Bad'), Locale.bless('Ok')])
    }

    protected getCandidateElements(): string[][] {
        return [
            [
                'if (price < 19 && quality >= 6) return "Good"',
                'if (price < 20 && quality >= 6) return "Good"',
                'if (price < 21 && quality >= 6) return "Good"',
                'if (price < 19 && quality >= 7) return "Good"',
                'if (price < 20 && quality >= 7) return "Good"',
                'if (price < 21 && quality >= 7) return "Good"',
                'if (price < 19 && quality >= 8) return "Good"',
                'if (price < 20 && quality >= 8) return "Good"',
                'if (price < 21 && quality >= 8) return "Good"',
                '',
            ],
            [
                'if (price >= 19 && quality < 6) return "Bad"',
                'if (price >= 20 && quality < 6) return "Bad"',
                'if (price >= 21 && quality < 6) return "Bad"',
                'if (price >= 19 && quality < 7) return "Bad"',
                'if (price >= 20 && quality < 7) return "Bad"',
                'if (price >= 21 && quality < 7) return "Bad"',
                'if (price >= 19 && quality < 8) return "Bad"',
                'if (price >= 20 && quality < 8) return "Bad"',
                'if (price >= 21 && quality < 8) return "Bad"',
                '',
            ],
            [
                'return "Good"',
                'return "Bad"',
                'return "Ok"',
                'return undefined',
            ],
        ]
    }

    protected* minimalUnitTestGenerator(): Generator<any[]> {
        yield [[19, 7], 'Good']
        yield [[20, 6], 'Bad']
        yield [[20, 7], 'Ok']
        yield [[19, 6], 'Ok']
    }

    protected* hintGenerator(): Generator<any[]> {
        for (let price = 10; price <= 30; price += 1)
            for (let quality = 1; quality <= 10; quality += 1)
                yield [price, quality]
    }
}

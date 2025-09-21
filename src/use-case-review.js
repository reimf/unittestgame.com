import { UseCase } from './use-case-base.js';
import { IntegerVariable, RadioVariable } from './variable.js';
export class Review extends UseCase {
    identifier() {
        return 'review';
    }
    name() {
        return 'Review';
    }
    specification() {
        return this.locale.returnGoodIfThePriceIsGoodAndTheQualityIsGood();
    }
    getParameters() {
        return [
            new IntegerVariable('Price', 'price'),
            new IntegerVariable('Quality', 'quality'),
        ];
    }
    getUnit() {
        return new RadioVariable('Output', 'review', ['Good', 'Bad', 'Ok']);
    }
    getCandidateElements() {
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
            ],
        ];
    }
    *minimalUnitTestGenerator() {
        yield [[19, 7], 'Good'];
        yield [[20, 6], 'Bad'];
        yield [[20, 7], 'Ok'];
        yield [[19, 6], 'Ok'];
    }
    *hintGenerator() {
        for (let price = 10; price <= 30; price += 1)
            for (let quality = 1; quality <= 10; quality += 1)
                yield [price, quality];
    }
}

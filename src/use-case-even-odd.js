import { UseCase } from './use-case-base.js';
import { BooleanVariable, IntegerVariable } from './variable.js';
export class EvenOdd extends UseCase {
    name() {
        return 'Even or Odd';
    }
    specification() {
        return this.locale.returnTrueIfTheNumberIsEvenAndFalseIfItIsOdd();
    }
    getParameters() {
        return [
            new IntegerVariable('Number', 'num'),
        ];
    }
    getUnit() {
        return new BooleanVariable('Is even', 'isEven');
    }
    getCandidateElements() {
        return [
            [
                'if (num === 1) return false',
                'if (num === 2) return true',
                'if (num === 3) return false',
                'if (num === 4) return true',
                'if (num === 5) return false',
                'if (num === 6) return true',
                'if (num === 7) return false',
                'if (num === 8) return true',
                'if (num === 9) return false',
                'if (num === 10) return true',
                'if (num === 11) return false',
                'if (num === 12) return true',
                'if (num === 13) return false',
                'if (num === 14) return true',
                'if (num === 15) return false',
                'if (num === 16) return true',
                'if (num === 17) return false',
                'if (num === 18) return true',
                'if (num === 19) return false',
                'if (num === 20) return true',
                'if (num < 1) return true',
                'if (num < 2) return true',
                'if (num < 1) return false',
                'if (num < 2) return false',
                'if (num > 1) return true',
                'if (num > 2) return true',
                'if (num > 1) return false',
                'if (num > 2) return false',
                'if (num % 1 !== 0) return false',
                'if (num % 2 !== 0) return false',
                'if (num % 4 !== 0) return false',
                'if (num % 1 === 0) return true',
                'if (num % 2 === 0) return true',
                'if (num % 4 === 0) return true',
                '',
            ],
            [
                'return true',
                'return false',
                'return undefined',
            ],
        ];
    }
    *minimalUnitTestGenerator() {
        yield [[25], false];
        yield [[26], true];
    }
    *hintGenerator() {
        for (let num = 0; num <= 40; num += 1)
            yield [num];
    }
}

import { UseCase } from './use_case.js';
import { CheckboxVariable, IntegerVariable } from './variable.js';
export class EvenOdd extends UseCase {
    name() {
        return 'Even or Odd';
    }
    specification() {
        return 'Return true if a number is even and false if it is odd.';
    }
    getParameters() {
        return [
            new IntegerVariable('Number', 'number'),
        ];
    }
    getUnit() {
        return new CheckboxVariable('Is even', 'isEven');
    }
    getCandidateElements() {
        return [
            [
                'if (number === 1) return false',
                'if (number === 2) return true',
                'if (number === 3) return false',
                'if (number === 4) return true',
                'if (number === 5) return false',
                'if (number === 6) return true',
                'if (number === 7) return false',
                'if (number === 8) return true',
                'if (number === 9) return false',
                'if (number === 10) return true',
                'if (number === 11) return false',
                'if (number === 12) return true',
                'if (number === 13) return false',
                'if (number === 14) return true',
                'if (number === 15) return false',
                'if (number === 16) return true',
                'if (number === 17) return false',
                'if (number === 18) return true',
                'if (number === 19) return false',
                'if (number === 20) return true',
                'if (number < 1) return true',
                'if (number < 2) return true',
                'if (number < 1) return false',
                'if (number < 2) return false',
                'if (number > 1) return true',
                'if (number > 2) return true',
                'if (number > 1) return false',
                'if (number > 2) return false',
                'if (number % 1 !== 0) return false',
                'if (number % 2 !== 0) return false',
                'if (number % 4 !== 0) return false',
                'if (number % 1 === 0) return true',
                'if (number % 2 === 0) return true',
                'if (number % 4 === 0) return true',
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
        for (let number = 0; number <= 40; number += 1)
            yield [number];
    }
}

import { UseCase } from './use_case.js';
import { CheckboxVariable, NumberVariable } from './variable.js';
export class EvenOdd extends UseCase {
    name() {
        return 'Even or Odd';
    }
    specification() {
        return 'Return true if a number is even and false if it is odd.';
    }
    getParameters() {
        return [
            new NumberVariable('Number', 'number'),
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
        yield [[17], false];
        yield [[18], true];
    }
    *hintGenerator() {
        for (let number = 0; number <= 40; number += 1)
            yield [number];
    }
}

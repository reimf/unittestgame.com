import { Level } from './level.js';
import { Paragraph } from './html.js';
import { Panel } from './frame.js';
import { CheckboxVariable, NumberVariable } from './variable.js';
export class EvenOdd extends Level {
    showSpecificationPanel() {
        new Panel('Specification', [
            new Paragraph().appendText('Return true if the number is even and false if it is odd.'),
        ]).show();
    }
    getParameters() {
        return [
            new NumberVariable('Number', 'number'),
        ];
    }
    getUnit() {
        return new CheckboxVariable('Is the number even?', 'isEven');
    }
    getCandidateElements() {
        return [
            [
                'if (number === 0) return true',
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
                'if (number < 1) return true',
                'if (number < 2) return true',
                'if (number < 3) return true',
                'if (number < 4) return true',
                'if (number < 5) return true',
                'if (number < 6) return true',
                'if (number < 7) return true',
                'if (number < 8) return true',
                'if (number < 9) return true',
                'if (number < 10) return true',
                'if (number > 1) return true',
                'if (number > 2) return true',
                'if (number > 3) return true',
                'if (number > 4) return true',
                'if (number > 5) return true',
                'if (number > 6) return true',
                'if (number > 7) return true',
                'if (number > 8) return true',
                'if (number > 9) return true',
                'if (number > 10) return true',
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
        yield [[24], true];
    }
    *hintGenerator() {
        for (let number = 0; number <= 40; number += 1)
            yield [number];
    }
}

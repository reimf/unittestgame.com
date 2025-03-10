import { Panel } from './frame.js';
import { Paragraph } from './html.js';
import { Level } from './level.js';
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
                'if (number % 1) return false',
                'if (number % 2) return false',
                'if (number % 4) return false',
                '',
            ],
            [
                'return true',
                'return false',
                '',
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

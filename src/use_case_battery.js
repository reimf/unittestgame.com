import { UseCase } from './use_case.js';
import { IntegerVariable, RadioVariable } from './variable.js';
export class Battery extends UseCase {
    name() {
        return 'Example';
    }
    specification() {
        return 'A smartphone normally operates in Normal Mode, but when the battery is less than 20%, it operates in Low Power Mode.';
    }
    getParameters() {
        return [
            new IntegerVariable('Battery', 'battery'),
        ];
    }
    getUnit() {
        return new RadioVariable('Mode', 'mode', ['Normal Mode', 'Low Power Mode']);
    }
    getCandidateElements() {
        return [
            [
                'if (battery >= 18) return "Normal Mode"',
                'if (battery >= 19) return "Normal Mode"',
                'if (battery >= 20) return "Normal Mode"',
                'if (battery >= 21) return "Normal Mode"',
                'if (battery >= 22) return "Normal Mode"',
                'if (battery < 19) return "Low Power Mode"',
                'if (battery < 20) return "Low Power Mode"',
                'if (battery < 21) return "Low Power Mode"',
                'if (battery < 22) return "Low Power Mode"',
                'if (battery < 23) return "Low Power Mode"',
                'if (battery === 20) return "Normal Mode"',
                'if (battery === 19) return "Low Power Mode"',
                '',
            ],
            [
                'return "Normal Mode"',
                'return "Low Power Mode"',
                'return undefined',
            ],
        ];
    }
    *minimalUnitTestGenerator() {
        yield [[18], 'Low Power Mode'];
        yield [[19], 'Low Power Mode'];
        yield [[20], 'Normal Mode'];
        yield [[21], 'Normal Mode'];
    }
    *hintGenerator() {
        for (let battery = 18; battery <= 21; battery += 1)
            yield [battery];
    }
    *exampleAnswerGenerator() {
        yield 'I want to add this unit test';
        yield '20';
        yield 'Normal Mode';
        yield 'I want to add this unit test';
        yield '19';
        yield 'Low Power Mode';
        yield 'I want to submit the unit tests';
        yield 'I want to add this unit test';
        yield '21';
        yield 'Normal Mode';
        yield 'I want to submit the unit tests';
        yield 'I want to add this unit test';
        yield '18';
        yield 'Low Power Mode';
        yield 'I want to submit the unit tests';
    }
}

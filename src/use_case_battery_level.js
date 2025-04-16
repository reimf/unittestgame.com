import { UseCase } from './use_case.js';
import { IntegerVariable, RadioVariable } from './variable.js';
export class BatteryLevel extends UseCase {
    name() {
        return 'Example';
    }
    specification() {
        return 'A smartphone normally operates in Normal Mode, but when the battery level is less than 20%, it operates in Low Power Mode.';
    }
    getParameters() {
        return [
            new IntegerVariable('Battery Level', 'batteryLevel'),
        ];
    }
    getUnit() {
        return new RadioVariable('Power Mode', 'powerMode', ['Normal Mode', 'Low Power Mode']);
    }
    getCandidateElements() {
        return [
            [
                'if (batteryLevel >= 18) return "Normal Mode"',
                'if (batteryLevel >= 19) return "Normal Mode"',
                'if (batteryLevel >= 20) return "Normal Mode"',
                'if (batteryLevel >= 21) return "Normal Mode"',
                'if (batteryLevel >= 22) return "Normal Mode"',
                'if (batteryLevel < 19) return "Low Power Mode"',
                'if (batteryLevel < 20) return "Low Power Mode"',
                'if (batteryLevel < 21) return "Low Power Mode"',
                'if (batteryLevel < 22) return "Low Power Mode"',
                'if (batteryLevel < 23) return "Low Power Mode"',
                'if (batteryLevel === 20) return "Normal Mode"',
                'if (batteryLevel === 19) return "Low Power Mode"',
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
        for (let batteryLevel = 18; batteryLevel <= 21; batteryLevel += 1)
            yield [batteryLevel];
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

import { UseCase } from './use-case-base.js';
import { TextVariable, FloatVariable } from './variable.js';
export class SpeedDisplay extends UseCase {
    identifier() {
        return 'speed-display';
    }
    name() {
        return 'Speed Display';
    }
    specification() {
        return this.locale.theFunctionReceivesTheSpeedInKilometersPerHourWithAtMostOneDecimal();
    }
    getParameters() {
        return [
            new FloatVariable('Speed', 'speed')
        ];
    }
    getUnit() {
        return new TextVariable('Display', 'display');
    }
    getCandidateElements() {
        return [
            [
                'if (speed === 0.0) return "START"',
                'if (speed < 0.5) return "START"',
                'if (speed < 1.0) return "START"',
                '',
            ],
            [
                'if (speed < 19.9) return speed.toFixed(1)',
                'if (speed < 20.0) return speed.toFixed(1)',
                'if (speed <= 20.0) return speed.toFixed(1)',
                'if (speed < 30.0) return speed.toFixed(1)',
                '',
            ],
            [
                'if (speed >= 200.0) return "DANGER"',
                'if (speed >= 199.5) return "DANGER"',
                'if (speed > 199.5) return "DANGER"',
                'if (speed > 199.0) return "DANGER"',
                '',
            ],
            [
                'return speed.toFixed()',
                'return speed.toFixed(1)',
                'return speed.toString()',
                'return undefined',
            ],
        ];
    }
    *minimalUnitTestGenerator() {
        yield [[0.0], 'START'];
        yield [[0.1], '0.1'];
        yield [[19.9], '19.9'];
        yield [[20.0], '20'];
        yield [[199.4], '199'];
        yield [[199.5], 'DANGER'];
    }
    *hintGenerator() {
        for (let speed = 0; speed <= 1; speed += 0.1)
            yield [speed];
        for (let speed = 0; speed <= 27; speed += 0.3)
            yield [speed];
        for (let speed = 30; speed <= 220; speed += 10)
            yield [speed];
    }
}

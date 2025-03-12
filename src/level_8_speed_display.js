import { Level } from './level.js';
import { TextVariable, NumberVariable } from './variable.js';
export class SpeedDisplay extends Level {
    getSpecification() {
        return ('The function receives the speed in meters per hour and ' +
            'must display the speed in kilometers per hour. ' +
            'If something is wrong with the speed, ' +
            'then the function must return "ERROR" (e.g. -1000 becomes "ERROR"). ' +
            'If possible, show one decimal (e.g. 12345 becomes "12.3"). ' +
            'Otherwise, round to whole kilometers per hour (e.g. 87654 becomes "87.7"). ' +
            'If the speed no longer fits on the display, ' +
            'then the function must return "DANGER" (e.g. 300000 becomes "DANGER").\n' +
            'The display looks like this, where every X is a LED light:\n' +
            '+-------------------+\n' +
            '|  X   XXXX   XXXX  |\n' +
            '|  X   X  X   X  X  |\n' +
            '|  X   XXXX   XXXX  |\n' +
            '|  X   X  X   X  X  |\n' +
            '|  X   XXXX X XXXX  |\n' +
            '|                   |\n' +
            '| X ERROR  DANGER X |\n' +
            '+-------------------+');
    }
    getParameters() {
        return [
            new NumberVariable('SpeedDisplay in meters per hour', 'speed')
        ];
    }
    getUnit() {
        return new TextVariable('Expected display output', 'display');
    }
    getCandidateElements() {
        return [
            [
                'if (speed < 0) return "ERROR"',
                'if (speed <= 0) return "ERROR"',
                '',
            ],
            [
                'if (speed <= 19900) return (speed / 1000).toFixed(1)',
                'if (speed < 19950) return (speed / 1000).toFixed(1)',
                'if (speed <= 19950) return (speed / 1000).toFixed(1)',
                'if (speed < 20000) return (speed / 1000).toFixed(1)',
                '',
            ],
            [
                'if (speed >= 200000) return "DANGER"',
                'if (speed > 199500) return "DANGER"',
                'if (speed >= 199500) return "DANGER"',
                'if (speed > 199000) return "DANGER"',
                '',
            ],
            [
                'return Math.round(speed / 1000).toString()',
                'return (speed / 1000).toFixed()',
                'return (speed / 1000).toFixed(1)',
                'return (speed / 1000).toString()',
                '',
            ],
        ];
    }
    *minimalUnitTestGenerator() {
        yield [[-1], 'ERROR'];
        yield [[0], '0.0'];
        yield [[19950], '19.9'];
        yield [[19951], '20'];
        yield [[199499], '199'];
        yield [[199500], 'DANGER'];
    }
    *hintGenerator() {
        yield [-1000];
        for (let speed = 0; speed <= 27000; speed += 900)
            yield [speed];
        for (let speed = 30000; speed <= 220000; speed += 10000)
            yield [speed];
    }
}

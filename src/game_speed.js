import Game from './game.js';
import { Paragraph, Panel, Code } from './html.js';
import { TextVariable, NumberVariable } from './variable.js';
import UnitTest from './unit_test.js';
export default class Speed extends Game {
    constructor() {
        super();
        this.description = 'Speed: display the speed of a car';
    }
    specificationPanel() {
        return new Panel('Specification', [
            new Paragraph('Return the correct display output. ' +
                'The function receives the speed in meters per hour and must display the speed in kilometers per hour.'),
            new Code('+-------------------+\n' +
                '|  X   XXXX   XXXX  |\n' +
                '|  X   X  X   X  X  |\n' +
                '|  X   XXXX   XXXX  |\n' +
                '|  X   X  X   X  X  |\n' +
                '|  X   XXXX X XXXX  |\n' +
                '+-------------------+'),
            new Paragraph('If something is wrong with the speed (for example, if it is negative), ' +
                'then the function must return "ERROR" and the display will start blinking slowly. ' +
                'If possible, show one decimal place, for example, "12.3". ' +
                'Otherwise, round to whole kilometers per hour, such as "49". ' +
                'If the speed no longer fits on the display, ' +
                'then the function must return "DANGER" and the display will start blinking rapidly.'),
        ]);
    }
    getParameters() {
        return [
            new NumberVariable('Speed in meters per hour', 'speed')
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
                'return (speed / 1000).toFixed() // no decimals',
                'return (speed / 1000).toFixed(1)',
                'return (speed / 1000).toString()',
                'return ""',
            ],
        ];
    }
    getMinimalUnitTests() {
        return [
            new UnitTest([-1], 'ERROR'),
            new UnitTest([0], '0.0'),
            new UnitTest([19950], '19.9'),
            new UnitTest([19951], '20'),
            new UnitTest([199499], '199'),
            new UnitTest([199500], 'DANGER'),
        ];
    }
    *hintGenerator() {
        yield [-1000];
        for (let speed = 0; speed <= 27000; speed += 900)
            yield [speed];
        for (let speed = 30000; speed <= 220000; speed += 10000)
            yield [speed];
    }
}

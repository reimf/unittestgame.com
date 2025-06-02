import { UseCase } from './use-case-base.js'
import { Variable, TextVariable, FloatVariable } from './variable.js'

export class SpeedDisplay extends UseCase {
    public name(): string {
        return 'Speed Display'
    }

    public specification(): string {
        return (
            'The function receives the speed in kilometers per hour with at most one decimal. ' +
            'If possible, show one decimal (e.g. 13 displays "13.0"). ' +
            'Otherwise, round to an integer (e.g. 87.6 displays "88"). ' +
            'Instead of "0.0" display "START". ' +
            'If the speed no longer fits on the display, ' +
            'then display "DANGER" (e.g. 300 displays "DANGER").\n' +
            'The display looks like this, where every X is a LED light:\n' +
            '+-------------------+\n' +
            '|  X   XXXX   XXXX  |\n' +
            '|  X   X  X   X  X  |\n' +
            '|  X   XXXX   XXXX  |\n' +
            '|  X   X  X   X  X  |\n' +
            '|  X   XXXX X XXXX  |\n' +
            '|                   |\n' +
            '| X START  DANGER X |\n' +
            '+-------------------+'
        )
    }

    public getParameters(): Variable[] {
        return [
            new FloatVariable('Speed', 'speed')
        ]
    }

    public getUnit(): Variable {
        return new TextVariable('Display', 'display')
    }

    public getCandidateElements(): string[][] {
        return [
            [
                'if (speed === 0.0) return "START"',
                'if (speed < 0.5) return "START"',
                'if (speed < 0.1) return "START"',
                'if (speed < 1.0) return "START"',
                '',
            ],
            [
                'if (speed < 19.9) return speed.toFixed(1)',
                'if (speed <= 19.9) return speed.toFixed(1)',
                'if (speed < 20.0) return speed.toFixed(1)',
                'if (speed <= 20.0) return speed.toFixed(1)',
                'if (speed < 30.0) return speed.toFixed(1)',
                '',
            ],
            [
                'if (speed >= 200.0) return "DANGER"',
                'if (speed >= 199.5) return "DANGER"',
                'if (speed > 199.5) return "DANGER"',
                'if (speed > 199.4) return "DANGER"',
                'if (speed > 199.0) return "DANGER"',
                '',
            ],
            [
                'return Math.round(speed).toString()',
                'return speed.toFixed()',
                'return speed.toFixed(1)',
                'return speed.toString()',
                'return undefined',
            ],
        ]
    }

    public* minimalUnitTestGenerator(): Generator<any[]> {
        yield [[0.0], 'START']
        yield [[0.1], '0.1']
        yield [[19.9], '19.9']
        yield [[20.0], '20']
        yield [[199.4], '199']
        yield [[199.5], 'DANGER']
    }

    public* hintGenerator(): Generator<any[]> {
        for (let speed = 0; speed <= 1; speed += 0.1)
            yield [speed]
        for (let speed = 0; speed <= 27; speed += 0.3)
            yield [speed]
        for (let speed = 30; speed <= 220; speed += 10)
            yield [speed]
    }
}

import { Level } from './level.js'
import { Paragraph } from './html.js'
import { Panel } from './frame.js'
import { Variable, TextVariable, NumberVariable } from './variable.js'

export class SpeedDisplay extends Level {

    public showSpecificationPanel(): void {
        new Panel('Specification', [
            new Paragraph().appendLines([
                'The function receives the speed in meters per hour and',
                'must display the speed in kilometers per hour.',
                'If something is wrong with the speed (e.g. negative speed),',
                'then the function must return "ERROR".',
                'If possible, show one decimal (e.g. "12.3").',
                'Otherwise, round to whole kilometers per hour (e.g. "49").',
                'If the speed no longer fits on the display,',
                'then the function must return "DANGER".'
            ]),
            new Paragraph().appendText(
                'The display looks like this:\n' +
                '+-------------------+\n' +
                '|  X   XXXX   XXXX  |\n' +
                '|  X   X  X   X  X  |\n' +
                '|  X   XXXX   XXXX  |\n' +
                '|  X   X  X   X  X  |\n' +
                '|  X   XXXX X XXXX  |\n' +
                '|                   |\n' +
                '|  ERROR    DANGER  |\n' +
                '+-------------------+'
            ),
        ]).show()
    }

    public getParameters(): Variable[] {
        return [
            new NumberVariable('SpeedDisplay in meters per hour', 'speed')
        ]
    }

    public getUnit(): Variable {
        return new TextVariable(
            'Expected display output',
            'display'
        )
    }

    public getCandidateElements(): string[][] {
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
                'return undefined',
            ],
        ]
    }

    public *minimalUnitTestGenerator(): Generator<any[]> {
        yield [[-1], 'ERROR']
        yield [[0], '0.0']
        yield [[19950], '19.9']
        yield [[19951], '20']
        yield [[199499], '199']
        yield [[199500], 'DANGER']
    }

    public *hintGenerator(): Generator<any[]> {
        yield [-1000]
        for (let speed = 0; speed <= 27000; speed += 900)
            yield [speed]
        for (let speed = 30000; speed <= 220000; speed += 10000)
            yield [speed]
    }
}

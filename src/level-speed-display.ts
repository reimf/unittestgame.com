import { Level } from './level-base.js'
import { Locale, LocalizedText } from './locale.js'
import { Variable, TextVariable, IntegerVariable } from './variable.js'

export class SpeedDisplay extends Level<[number], string> {
    protected identifier(): string {
        return 'speed-display'
    }

    protected name(): string {
        return 'Speed Display'
    }

    protected specification(): LocalizedText {
        return this.locale.speedDisplaySpecification()
    }

    protected getParameters(): Variable[] {
        return [
            new IntegerVariable(Locale.bless('Speed'), 'speed')
        ]
    }

    protected getUnit(): Variable {
        return new TextVariable(Locale.bless('Display'), 'display')
    }

    protected getCandidateElements(): string[][] {
        return [
            [
                'if (speed === 0) return "START"',
                'if (speed < 5) return "START"',
                'if (speed < 10) return "START"',
                '',
            ],
            [
                'if (speed < 199) return Math.floor(speed / 10) + "." + speed % 10',
                'if (speed < 200) return Math.floor(speed / 10) + "." + speed % 10',
                'if (speed <= 200) return Math.floor(speed / 10) + "." + speed % 10',
                'if (speed < 300) return Math.floor(speed / 10) + "." + speed % 10',
                '',
            ],
            [
                'if (speed >= 2000) return "DANGER"',
                'if (speed >= 1995) return "DANGER"',
                'if (speed > 1995) return "DANGER"',
                'if (speed > 1990) return "DANGER"',
                '',
            ],
            [
                'return "" + Math.floor(speed / 10)',
                'return Math.floor(speed / 10) + "." + speed % 10',
                'return "START"',
                'return "DANGER"',
            ],
        ]
    }

    protected* minimalUnitTestGenerator(): Generator<[[number], string]> {
        yield [[0], 'START']
        yield [[1], '0.1']
        yield [[199], '19.9']
        yield [[200], '20']
        yield [[1999], '199']
        yield [[2000], 'DANGER']
    }

    protected* hintGenerator(): Generator<[number]> {
        for (let speed = 0; speed < 10; speed += 3)
            yield [speed]
        for (let speed = 10; speed <= 270; speed += 40)
            yield [speed]
        for (let speed = 300; speed <= 2400; speed += 300)
            yield [speed]
    }
}

import { Level } from './level-base.js'
import { Locale, LocalizedText } from './locale.js'
import { Variable, TextVariable, FloatVariable } from './variable.js'

export class SpeedDisplay extends Level {
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
            new FloatVariable(Locale.bless('Speed'), 'speed')
        ]
    }

    protected getUnit(): Variable {
        return new TextVariable(Locale.bless('Display'), 'display')
    }

    protected getCandidateElements(): string[][] {
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
        ]
    }

    protected* minimalUnitTestGenerator(): Generator<any[]> {
        yield [[0.0], 'START']
        yield [[0.1], '0.1']
        yield [[19.9], '19.9']
        yield [[20.0], '20']
        yield [[199.4], '199']
        yield [[199.5], 'DANGER']
    }

    protected* hintGenerator(): Generator<any[]> {
        for (let speed = 0; speed <= 1; speed += 0.1)
            yield [speed]
        for (let speed = 0; speed <= 27; speed += 0.3)
            yield [speed]
        for (let speed = 30; speed <= 220; speed += 10)
            yield [speed]
    }
}

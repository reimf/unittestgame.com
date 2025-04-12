import { UseCase } from './use_case.js'
import { Variable, NumberVariable, RadioVariable } from './variable.js'

export class Battery extends UseCase {
    public name(): string {
        return 'Example'
    }
    public specification(): string {
        return 'A smartphone normally operates in Normal Mode, but when the battery is 20% or less, it operates in Low Power Mode.'
    }

    public getParameters(): Variable[] {
        return [
            new NumberVariable('Battery', 'battery'),
        ]
    }

    public getUnit(): Variable {
        return new RadioVariable('Mode', 'mode', ['Normal Mode', 'Low Power Mode'])
    }

    public getCandidateElements(): string[][] {
        return [
            [
                'if (battery >= 18) return "Normal Mode"',
                'if (battery >= 19) return "Normal Mode"',
                'if (battery >= 20) return "Normal Mode"',
                'if (battery >= 21) return "Normal Mode"',
                'if (battery >= 22) return "Normal Mode"',
                'if (battery <= 18) return "Low Power Mode"',
                'if (battery <= 19) return "Low Power Mode"',
                'if (battery <= 20) return "Low Power Mode"',
                'if (battery <= 21) return "Low Power Mode"',
                'if (battery <= 22) return "Low Power Mode"',
                'if (battery === 20) return "Normal Mode"',
                'if (battery === 19) return "Low Power Mode"',
                '',
            ],
            [
                'return "Normal Mode"',
                'return "Low Power Mode"',
                'return undefined',
            ],
        ]
    }

    public *minimalUnitTestGenerator(): Generator<any[]> {
        yield [[18], 'Low Power Mode']
        yield [[19], 'Low Power Mode']
        yield [[20], 'Normal Mode']
        yield [[21], 'Normal Mode']
    }

    public *hintGenerator(): Generator<any[]> {
        for (let battery = 18; battery <= 21; battery += 1)
            yield [battery]
    }

    public *exampleAnswerGenerator(): Generator<string> {
        yield 'Add unit test'
        yield '20'
        yield 'Normal Mode'
        yield 'I want to add this unit test'

        yield 'Add unit test'
        yield '19'
        yield 'Low Power Mode'
        yield 'I want to add this unit test'
        yield 'Submit unit tests'

        yield 'Add unit test'
        yield '21'
        yield 'Normal Mode'
        yield 'I want to add this unit test'
        yield 'Submit unit tests'

        yield 'Add unit test'
        yield '18'
        yield 'Low Power Mode'
        yield 'I want to add this unit test'
        yield 'Submit unit tests'
    }

}

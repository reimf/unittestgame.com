import { UseCase } from './use_case.js'
import { Variable, CheckboxVariable, NumberVariable } from './variable.js'

export class EvenOdd extends UseCase {
    public name(): string {
        return 'Even or Odd'
    }
    public specification(): string {
        return 'Return true if a number is even and false if it is odd.'
    }

    public getParameters(): Variable[] {
        return [
            new NumberVariable(
                'Number',
                'number'
            ),
        ]
    }

    public getUnit(): Variable {
        return new CheckboxVariable(
            'Is even',
            'isEven'
        )
    }

    public getCandidateElements(): string[][] {
        return [
            [
                'if (number === 1) return false',
                'if (number === 2) return true',
                'if (number < 1) return true',
                'if (number < 2) return true',
                'if (number < 1) return false',
                'if (number < 2) return false',
                'if (number > 1) return true',
                'if (number > 2) return true',
                'if (number > 1) return false',
                'if (number > 2) return false',
                'if (number % 1 !== 0) return false',
                'if (number % 2 !== 0) return false',
                'if (number % 4 !== 0) return false',
                'if (number % 1 === 0) return true',
                'if (number % 2 === 0) return true',
                'if (number % 4 === 0) return true',
                '',
            ],
            [
                'return true',
                'return false',
                '',
            ],
        ]
    }

    public *minimalUnitTestGenerator(): Generator<any[]> {
        yield [[17], false]
        yield [[18], true]
    }

    public *hintGenerator(): Generator<any[]> {
        for (let number = 0; number <= 40; number += 1)
            yield [number]
    }
}

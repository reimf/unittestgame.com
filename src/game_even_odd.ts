import { Game } from './game.js'
import { Paragraph, Panel } from './html.js'
import { Variable, CheckboxVariable, NumberVariable } from './variable.js'
import { UnitTest } from './unit_test.js'

export class EvenOdd extends Game {
    public readonly description = 'EvenOdd: separate the numbers'

    public constructor() {
        super()
    }

    protected specificationPanel(): Panel {
        return new Panel('Specification', [
            new Paragraph(
                'Return true if the number is even and false if it is odd.'
            ),
        ])
    }

    protected getParameters(): Variable[] {
        return [
            new NumberVariable(
                'Number',
                'number'
            ),
        ]
    }

    protected getUnit(): Variable {
        return new CheckboxVariable(
            'Is the number even?',
            'isEven'
        )
    }

    protected getCandidateElements(): string[][] {
        return [
            [
                'if (number === 0) return true',
                'if (number === 1) return false',
                'if (number === 2) return true',
                'if (number === 3) return false',
                'if (number === 4) return true',
                'if (number === 5) return false',
                'if (number === 6) return true',
                'if (number === 7) return false',
                'if (number === 8) return true',
                'if (number === 9) return false',
                'if (number === 10) return true',
                '',
            ],
            [
                'return number < 1',
                'return number < 2',
                'return number < 3',
                'return number < 4',
                'return number < 5',
                'return number < 6',
                'return number < 7',
                'return number < 8',
                'return number < 9',
                'return number < 10',
                'return number > 1',
                'return number > 2',
                'return number > 3',
                'return number > 4',
                'return number > 5',
                'return number > 6',
                'return number > 7',
                'return number > 8',
                'return number > 9',
                'return number > 10',
                'return number % 2 === 0',
                'return true',
                'return false',
            ],
        ]
    }

    protected getMinimalUnitTests(): UnitTest[] {
        return [
            new UnitTest([17], false),
            new UnitTest([24], true),
        ]
    }

    protected *hintGenerator(): Generator<any[]> {
        for (let number = 0; number <= 40; number += 1)
            yield [number]
    }
}

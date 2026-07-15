import { Level } from './level-base.js'
import { ConversationLanguage, ConversationText } from './conversation-language-base.js'
import { Variable, BooleanVariable, IntegerVariable } from './variable.js'

export class LeapYear extends Level<[number], boolean> {
    protected identifier(): string {
        return 'leap-year'
    }

    protected name(): string {
        return 'Leap Year'
    }

    protected specification(): ConversationText {
        return this.conversationLanguage.leapYearSpecification()
    }

    protected getParameters(): Variable[] {
        return [
            new IntegerVariable(ConversationLanguage.bless('Year'), 'year'),
        ]
    }

    protected getUnit(): Variable {
        return new BooleanVariable(ConversationLanguage.bless('Is a leap year'), 'isLeapYear')
    }

    protected getCandidateElements(): string[][] {
        return [
            [
                'if (year % 400 === 0) return true',
                'if (year % 200 === 0) return true',
                '',
            ],
            [
                'if (year % 100 === 0) return false',
                '',
            ],
            [
                'if (year % 4 !== 0) return true',
                'if (year % 4 === 0) return true',
                '',
            ],
            [
                'return true',
                'return false',
            ],
        ]
    }

    protected* minimalUnitTestGenerator(): Generator<[[number], boolean]> {
        yield [[2002], false]
        yield [[2004], true]
        yield [[1800], false]
        yield [[1600], true]
    }

    protected* hintGenerator(): Generator<[number]> {
        for (let year = 2001; year <= 2030; year += 1)
            yield [year]
        for (let year = 1000; year <= 3000; year += 100)
            yield [year]
    }
}

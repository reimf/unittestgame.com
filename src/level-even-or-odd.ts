import { Level } from './level-base.js'
import { ConversationLanguage, ConversationText } from './conversation-language-base.js'
import { Variable, BooleanVariable, IntegerVariable } from './variable.js'

export class EvenOrOdd extends Level<[number], boolean> {
    protected identifier(): string {
        return 'even-or-odd'
    }

    protected name(): string {
        return 'Even or Odd'
    }

    protected specification(): ConversationText {
        return this.conversationLanguage.evenOddSpecification()
    }

    protected getParameters(): Variable[] {
        return [
            new IntegerVariable(ConversationLanguage.bless('Number'), 'num'),
        ]
    }

    protected getUnit(): Variable {
        return new BooleanVariable(ConversationLanguage.bless('Is even'), 'isEven')
    }

    protected getCandidateElements(): string[][] {
        return [
            [
                'if (num !== 2) return false',
                'if (num === 2) return true',
                'if (num % 2 !== 0) return false',
                'if (num % 2 === 0) return true',
                '',
            ],
            [
                'return true',
                'return false',
            ],
        ]
    }

    protected* minimalUnitTestGenerator(): Generator<[[number], boolean]> {
        yield [[25], false]
        yield [[26], true]
    }

    protected* hintGenerator(): Generator<[number]> {
        for (let num = 0; num <= 40; num += 1)
            yield [num]
    }
}

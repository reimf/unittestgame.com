import { Level } from './level-base.js'
import { ConversationText } from './conversation-language-base.js'

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

    protected getCandidateElements(): string[][] {
        return [
            [
                'function isLeapYear(year: number): boolean {'
            ],
            [
                '    if (year % 400 === 0) return true',
                '    if (year % 200 === 0) return true',
                '',
            ],
            [
                '    if (year % 100 === 0) return false',
                '',
            ],
            [
                '    if (year % 4 !== 0) return true',
                '    if (year % 4 === 0) return true',
                '',
            ],
            [
                '    return true',
                '    return false',
            ],
            [
                '}'
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

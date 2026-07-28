import { Level } from './level-base.js'
import { ConversationText } from './conversation-language-base.js'

export class Discount extends Level<[number, boolean], number> {
    protected identifier(): string {
        return 'discount'
    }

    protected name(): string {
        return 'Discount'
    }

    protected specification(): ConversationText {
        return this.conversationLanguage.discountSpecification()
    }

    protected getCandidateElements(): string[][] {
        return [
            [
                'function discount(total: number, hasMemberCard: boolean): number {'
            ],
            [
                '    if (total >= 200 && hasMemberCard) return 20',
                '    if (total >= 199 && hasMemberCard) return 20',
                '    if (total >= 200 || hasMemberCard) return 20',
                '    if (total >= 199 || hasMemberCard) return 20',
                '',
            ],
            [
                '    if (total >= 100 || hasMemberCard) return 10',
                '    if (total >= 99 || hasMemberCard) return 10',
                '    if (total >= 100 && hasMemberCard) return 10',
                '    if (total >= 99 && hasMemberCard) return 10',
                '',
            ],
            [
                '    return 0',
                '    return 10',
                '    return 20',
            ],
            [
                '}'
            ],
        ]
    }

    protected* minimalUnitTestGenerator(): Generator<[[number, boolean], number]> {
        yield [[99, false], 0]
        yield [[100, false], 10]
        yield [[199, true], 10]
        yield [[200, true], 20]
    }

    protected* hintGenerator(): Generator<[number, boolean]> {
        for (let total = 0; total <= 300; total += 25)
            for (const hasMemberCard of [false, true])
                yield [total, hasMemberCard]
    }
}

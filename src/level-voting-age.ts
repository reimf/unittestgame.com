import { Level } from './level-base.js'
import { ConversationText } from './conversation-language-base.js'

export class VotingAge extends Level<[number], boolean> {
    protected identifier(): string {
        return 'voting-age'
    }

    protected name(): string {
        return 'Voting Age'
    }

    protected specification(): ConversationText {
        return this.conversationLanguage.votingAgeSpecification()
    }

    protected getCandidateElements(): string[][] {
        return [
            [
                'function isAllowedToVote(age: number): boolean {'
            ],
            [
                '    if (age >= 16) return true',
                '    if (age >= 17) return true',
                '    if (age >= 18) return true',
                '    if (age >= 19) return true',
                '    if (age >= 20) return true',
                '    if (age <= 16) return false',
                '    if (age < 17) return false',
                '    if (age < 18) return false',
                '    if (age < 19) return false',
                '    if (age < 20) return false',
                '    if (age < 21) return false',
                '    if (age === 18) return true',
                '    if (age === 17) return false',
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
        yield [[16], false]
        yield [[17], false]
        yield [[18], true]
        yield [[19], true]
    }

    protected* hintGenerator(): Generator<[number]> {
        for (let age = 0; age <= 40; age += 1)
            yield [age]
    }
}

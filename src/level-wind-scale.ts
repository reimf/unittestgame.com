import { Level } from './level-base.js'
import { ConversationText } from './conversation-language-base.js'

export class WindScale extends Level<[number], string> {
    protected identifier(): string {
        return 'wind-scale'
    }

    protected name(): string {
        return 'Wind Scale'
    }

    protected specification(): ConversationText {
        return this.conversationLanguage.windScaleSpecification()
    }

    protected getCandidateElements(): string[][] {
        return [
            [
                'function windCategory(speed: number): string {'
            ],
            [
                '    if (speed < 20) return "CALM"',
                '    if (speed <= 20) return "CALM"',
                '    if (speed < 19) return "CALM"',
                '    if (speed <= 19) return "CALM"',
                '',
            ],
            [
                '    if (speed < 50) return "BREEZE"',
                '    if (speed <= 50) return "BREEZE"',
                '    if (speed < 49) return "BREEZE"',
                '    if (speed <= 49) return "BREEZE"',
                '',
            ],
            [
                '    if (speed < 90) return "GALE"',
                '    if (speed <= 90) return "GALE"',
                '    if (speed < 89) return "GALE"',
                '    if (speed <= 89) return "GALE"',
                '',
            ],
            [
                '    return "CALM"',
                '    return "BREEZE"',
                '    return "GALE"',
                '    return "STORM"',
            ],
            [
                '}'
            ],
        ]
    }

    protected* minimalUnitTestGenerator(): Generator<[[number], string]> {
        yield [[19], 'CALM']
        yield [[20], 'BREEZE']
        yield [[49], 'BREEZE']
        yield [[50], 'GALE']
        yield [[89], 'GALE']
        yield [[90], 'STORM']
    }

    protected* hintGenerator(): Generator<[number]> {
        for (let speed = 0; speed <= 120; speed += 5)
            yield [speed]
    }
}

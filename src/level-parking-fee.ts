import { Level } from './level-base.js'
import { ConversationText } from './conversation-language-base.js'

export class ParkingFee extends Level<[number, boolean, boolean], string> {
    protected name(): string {
        return 'Parking Fee'
    }

    protected specification(): ConversationText {
        return this.conversationLanguage.parkingFeeSpecification()
    }

    protected getCandidateElements(): string[][] {
        return [
            [
                'function parkingFee(minutesParked: number, hasShopped: boolean, isWeekend: boolean): string {'
            ],
            [
                '    if (minutesParked < 30 || (isWeekend && hasShopped)) return "FREE"',
                '    if (minutesParked < 29 || (isWeekend && hasShopped)) return "FREE"',
                '    if (minutesParked < 30 || (isWeekend || hasShopped)) return "FREE"',
                '    if (minutesParked < 29 || (isWeekend || hasShopped)) return "FREE"',
                '    if (minutesParked < 30 && (isWeekend && hasShopped)) return "FREE"',
                '    if (minutesParked < 29 && (isWeekend && hasShopped)) return "FREE"',
                '    if (minutesParked < 30 && (isWeekend || hasShopped)) return "FREE"',
                '    if (minutesParked < 29 && (isWeekend || hasShopped)) return "FREE"',
                '',
            ],
            [
                '    if (isWeekend) return "$10"',
                '    if (isWeekend || hasShopped) return "$10"',
                '    if (isWeekend && hasShopped) return "$10"',
                '',
            ],
            [
                '    if (hasShopped) return "$" + Math.floor(minutesParked / 30).toString()',
                '    if (hasShopped) return "$" + Math.floor(minutesParked / 15).toString()',
                '',
            ],
            [
                '    return "FREE"',
                '    return "$10"',
                '    return "$" + Math.floor(minutesParked / 30).toString()',
                '    return "$" + Math.floor(minutesParked / 15).toString()',
            ],
            [
                '}'
            ],
        ]
    }

    protected* minimalUnitTestGenerator(): Generator<[[number, boolean, boolean], string]> {
        yield [[29, false, false], 'FREE']
        yield [[30, false, false], '$2']
        yield [[65, true, false], '$2']
        yield [[30, false, true], '$10']
    }

    protected* hintGenerator(): Generator<[number, boolean, boolean]> {
        for (let minutesParked = 0; minutesParked <= 150; minutesParked += 10)
            for (const hasShopped of [false, true])
                for (const isWeekend of [false, true])
                    yield [minutesParked, hasShopped, isWeekend]
    }
}

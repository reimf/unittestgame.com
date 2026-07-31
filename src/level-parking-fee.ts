import { Level } from './level-base.js'
import { ConversationText } from './conversation-language-base.js'

export class ParkingFee extends Level<[number, boolean, boolean], number> {
    protected name(): string {
        return 'Parking Fee'
    }

    protected specification(): ConversationText {
        return this.conversationLanguage.parkingFeeSpecification()
    }

    protected getCandidateElements(): string[][] {
        return [
            [
                'function parkingFee(minutesParked: number, hasShopped: boolean, isWeekend: boolean): number {'
            ],
            [
                '    if (minutesParked < 30 || (isWeekend && hasShopped)) return 0',
                '    if (minutesParked < 29 || (isWeekend && hasShopped)) return 0',
                '    if (minutesParked < 30 || (isWeekend || hasShopped)) return 0',
                '    if (minutesParked < 29 || (isWeekend || hasShopped)) return 0',
                '    if (minutesParked < 30 && (isWeekend && hasShopped)) return 0',
                '    if (minutesParked < 29 && (isWeekend && hasShopped)) return 0',
                '    if (minutesParked < 30 && (isWeekend || hasShopped)) return 0',
                '    if (minutesParked < 29 && (isWeekend || hasShopped)) return 0',
                '',
            ],
            [
                '    if (isWeekend) return 10',
                '    if (isWeekend || hasShopped) return 10',
                '    if (isWeekend && hasShopped) return 10',
                '',
            ],
            [
                '    if (hasShopped) return Math.floor(minutesParked / 30)',
                '    if (hasShopped) return Math.floor(minutesParked / 15)',
                '',
            ],
            [
                '    return 0',
                '    return 10',
                '    return Math.floor(minutesParked / 30)',
                '    return Math.floor(minutesParked / 15)',
            ],
            [
                '}'
            ],
        ]
    }

    protected* minimalUnitTestGenerator(): Generator<[[number, boolean, boolean], number]> {
        yield [[29, false, false], 0]
        yield [[30, false, false], 2]
        yield [[65, true, false], 2]
        yield [[30, false, true], 10]
    }

    protected* hintGenerator(): Generator<[number, boolean, boolean]> {
        for (let minutesParked = 0; minutesParked <= 150; minutesParked += 10)
            for (const hasShopped of [false, true])
                for (const isWeekend of [false, true])
                    yield [minutesParked, hasShopped, isWeekend]
    }
}

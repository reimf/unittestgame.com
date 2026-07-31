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
                '    if (isWeekend) return 1000',
                '    if (isWeekend || hasShopped) return 1000',
                '    if (isWeekend && hasShopped) return 1000',
                '',
            ],
            [
                '    if (hasShopped) return minutesParked * 3',
                '    if (hasShopped) return minutesParked * 5',
                '',
            ],
            [
                '    return 0',
                '    return 1000',
                '    return minutesParked * 3',
                '    return minutesParked * 5',
            ],
            [
                '}'
            ],
        ]
    }

    protected* minimalUnitTestGenerator(): Generator<[[number, boolean, boolean], number]> {
        yield [[29, false, false], 0]
        yield [[30, false, false], 150]
        yield [[65, true, false], 195]
        yield [[30, false, true], 1000]
    }

    protected* hintGenerator(): Generator<[number, boolean, boolean]> {
        for (let minutesParked = 0; minutesParked <= 150; minutesParked += 10)
            for (const hasShopped of [false, true])
                for (const isWeekend of [false, true])
                    yield [minutesParked, hasShopped, isWeekend]
    }
}

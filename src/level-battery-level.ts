import { ComputerMessage } from './frame.js'
import { Level } from './level-base.js'
import { ConversationText } from './conversation-language-base.js'

type FormStringsType = {
    message: ConversationText
    batteryLevel: string|null
    powerMode: string|null
}


export class BatteryLevel extends Level<[number], string> {
    protected identifier(): string {
        return 'battery-level'
    }

    protected name(): string {
        return 'Battery Level'
    }

    protected specification(): ConversationText {
        return this.conversationLanguage.batteryLevelSpecification()
    }

    protected getCandidateElements(): string[][] {
        return [
            [
                'function powerMode(batteryLevel: number): string {'
            ],
            [
                '    if (batteryLevel >= 18) return "NORMAL MODE"',
                '    if (batteryLevel >= 19) return "NORMAL MODE"',
                '    if (batteryLevel >= 20) return "NORMAL MODE"',
                '    if (batteryLevel >= 21) return "NORMAL MODE"',
                '    if (batteryLevel >= 22) return "NORMAL MODE"',
                '    if (batteryLevel <= 19) return "LOW POWER MODE"',
                '    if (batteryLevel <= 20) return "LOW POWER MODE"',
                '    if (batteryLevel <= 21) return "LOW POWER MODE"',
                '    if (batteryLevel <= 22) return "LOW POWER MODE"',
                '    if (batteryLevel <= 23) return "LOW POWER MODE"',
                '    if (batteryLevel === 20) return "NORMAL MODE"',
                '    if (batteryLevel === 19) return "LOW POWER MODE"',
                '',
            ],
            [
                '    return "NORMAL MODE"',
                '    return "LOW POWER MODE"',
                '    return ""',
            ],
            [
                '}'
            ],
        ]
    }

    protected* minimalUnitTestGenerator(): Generator<[[number], string]> {
        yield [[18], 'LOW POWER MODE']
        yield [[19], 'LOW POWER MODE']
        yield [[20], 'NORMAL MODE']
        yield [[21], 'NORMAL MODE']
    }

    protected* hintGenerator(): Generator<[number]> {
        for (let batteryLevel = 18; batteryLevel <= 21; batteryLevel += 1)
            yield [batteryLevel]
    }

    private exampleForms: FormStringsType[] = [
        {
            message: this.conversationLanguage.addBatteryLevel20(),
            batteryLevel: '20',
            powerMode: 'NORMAL MODE'
        },
        {
            message: this.conversationLanguage.addBatteryLevel19(),
            batteryLevel: '19',
            powerMode: 'LOW POWER MODE'
        },
        {
            message: this.conversationLanguage.submitUnitTestsFirst(),
            batteryLevel: null,
            powerMode: null
        },
        {
            message: this.conversationLanguage.addBatteryLevel21(),
            batteryLevel: '21',
            powerMode: 'NORMAL MODE'
        },
        {
            message: this.conversationLanguage.submitUnitTestsSecond(),
            batteryLevel: null,
            powerMode: null
        },
        {
            message: this.conversationLanguage.addBatteryLevel18(),
            batteryLevel: '18',
            powerMode: 'LOW POWER MODE'
        },
        {
            message: this.conversationLanguage.submitUnitTestsThird(),
            batteryLevel: null,
            powerMode: null
        }
    ]

    protected override showBeforeMenuMessage(): void {
        new ComputerMessage([this.exampleForms[0]!.message]).show()
    }

    private showWarning() {
        new ComputerMessage([this.conversationLanguage.wrongAction()]).show()
    }

    protected override isFormDataOk(formData: FormData): boolean {
        const exampleForm = this.exampleForms[0]!
        const batteryLevelOk = formData.get('batteryLevel') === exampleForm.batteryLevel
        const powerModeOk = formData.get('powerMode') === exampleForm.powerMode
        if (batteryLevelOk && powerModeOk) {
            this.exampleForms.shift()
            return true
        }
        this.showWarning()
        this.showMenuMessage()
        return false
    }

    protected override finishedEmoji(): string {
        return '👍'
    }
}

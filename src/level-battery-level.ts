import { ComputerMessage } from './frame.js'
import { Level } from './level-base.js'
import { ConversationText } from './conversation-language-base.js'

type FormStringsType = {
    message: ConversationText
    batteryLevel?: string
    powerMode?: string
}


export class BatteryLevel extends Level<[number], string> {
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
                '    if (batteryLevel === 20) return "NORMAL MODE"',
                '    if (batteryLevel === 19) return "LOW POWER MODE"',
                '',
            ],
            [
                '    return "LOW POWER MODE"',
                '    return "NORMAL MODE"',
                '    return "UNKNOWN"',
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

    private readonly allExampleForms: FormStringsType[] = [
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
        },
        {
            message: this.conversationLanguage.addBatteryLevel21(),
            batteryLevel: '21',
            powerMode: 'NORMAL MODE'
        },
        {
            message: this.conversationLanguage.submitUnitTestsSecond(),
        },
        {
            message: this.conversationLanguage.addBatteryLevel18(),
            batteryLevel: '18',
            powerMode: 'LOW POWER MODE'
        },
        {
            message: this.conversationLanguage.submitUnitTestsThird(),
        }
    ]

    private exampleForms: FormStringsType[] = [...this.allExampleForms]

    protected override reset(): void {
        super.reset()
        this.exampleForms = [...this.allExampleForms]
    }

    protected override showStepMessages(): void {
        //nothing
    }

    protected override showBeforeMenuMessage(): void {
        new ComputerMessage([this.exampleForms[0]!.message]).show()
    }

    protected override showAfterEndMessage(): void {
        new ComputerMessage([this.conversationLanguage.batteryLevelLesson()]).show()
    }

    private showWarning(warning: ConversationText) {
        new ComputerMessage([warning]).show()
    }

    private isExampleExpected(everythingOk: boolean, warning: ConversationText): boolean {
        if (everythingOk) {
            this.exampleForms.shift()
            return true
        }
        this.numberOfPenalties += 1
        this.showWarning(warning)
        this.showMenuMessage()
        return false
    }

    private isSubmitExpected(): boolean {
        const exampleForm = this.exampleForms[0]!
        const batteryLevelOk = !exampleForm.hasOwnProperty('batteryLevel')
        const powerModeOk = !exampleForm.hasOwnProperty('powerMode')
        return batteryLevelOk && powerModeOk
    }

    protected override isAddUnitTestOk(formData: FormData): boolean {
        if (this.isSubmitExpected())
            return this.isExampleExpected(false, this.conversationLanguage.wrongAdd())
        const exampleForm = this.exampleForms[0]!
        const batteryLevelOk = exampleForm.batteryLevel === formData.get('batteryLevel')
        const powerModeOk = exampleForm.powerMode === formData.get('powerMode')
        return this.isExampleExpected(batteryLevelOk && powerModeOk, this.conversationLanguage.wrongUnitTest())
    }

    protected override isSubmitUnitTestsOk(): boolean {
        return this.isExampleExpected(this.isSubmitExpected(), this.conversationLanguage.wrongSubmit())
    }
}

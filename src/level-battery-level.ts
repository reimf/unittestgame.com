import { ComputerMessage } from './frame.js'
import { Level } from './level-base.js'
import { Locale, LocalizedText } from './locale.js'
import { Variable, IntegerVariable, RadioVariable } from './variable.js'

type FormStringsType = {
    message: LocalizedText
    batteryLevel: string|null
    powerMode: string|null
}


export class BatteryLevel extends Level {
    protected identifier(): string {
        return 'battery-level'
    }

    protected name(): string {
        return 'Battery Level'
    }

    protected specification(): LocalizedText {
        return this.locale.batteryLevelSpecification()
    }

    protected getParameters(): Variable[] {
        return [
            new IntegerVariable(Locale.bless('Battery Level'), 'batteryLevel'),
        ]
    }

    protected getUnit(): Variable {
        return new RadioVariable(Locale.bless('Power Mode'), 'powerMode', [Locale.bless('Normal Mode'), Locale.bless('Low Power Mode')])
    }

    protected getCandidateElements(): string[][] {
        return [
            [
                'if (batteryLevel >= 18) return "Normal Mode"',
                'if (batteryLevel >= 19) return "Normal Mode"',
                'if (batteryLevel >= 20) return "Normal Mode"',
                'if (batteryLevel >= 21) return "Normal Mode"',
                'if (batteryLevel >= 22) return "Normal Mode"',
                'if (batteryLevel <= 19) return "Low Power Mode"',
                'if (batteryLevel <= 20) return "Low Power Mode"',
                'if (batteryLevel <= 21) return "Low Power Mode"',
                'if (batteryLevel <= 22) return "Low Power Mode"',
                'if (batteryLevel <= 23) return "Low Power Mode"',
                'if (batteryLevel === 20) return "Normal Mode"',
                'if (batteryLevel === 19) return "Low Power Mode"',
                '',
            ],
            [
                'return "Normal Mode"',
                'return "Low Power Mode"',
                'return undefined',
            ],
        ]
    }

    protected* minimalUnitTestGenerator(): Generator<any[]> {
        yield [[18], 'Low Power Mode']
        yield [[19], 'Low Power Mode']
        yield [[20], 'Normal Mode']
        yield [[21], 'Normal Mode']
    }

    protected* hintGenerator(): Generator<any[]> {
        for (let batteryLevel = 18; batteryLevel <= 21; batteryLevel += 1)
            yield [batteryLevel]
    }

    private exampleForms: FormStringsType[] = [
        {
            message: this.locale.addBatteryLevel20(),
            batteryLevel: '20',
            powerMode: 'Normal Mode'
        },
        {
            message: this.locale.addBatteryLevel19(),
            batteryLevel: '19',
            powerMode: 'Low Power Mode'
        },
        {
            message: this.locale.submitUnitTestsFirst(),
            batteryLevel: null,
            powerMode: null
        },
        {
            message: this.locale.addBatteryLevel21(),
            batteryLevel: '21',
            powerMode: 'Normal Mode'
        },
        {
            message: this.locale.submitUnitTestsSecond(),
            batteryLevel: null,
            powerMode: null
        },
        {
            message: this.locale.addBatteryLevel18(),
            batteryLevel: '18',
            powerMode: 'Low Power Mode'
        },
        {
            message: this.locale.submitUnitTestsThird(),
            batteryLevel: null,
            powerMode: null
        }
    ]

    protected override showBeforeMenuMessage(): void {
        new ComputerMessage([this.exampleForms[0]!.message]).show()
    }

    private showWarning() {
        new ComputerMessage([this.locale.wrongAction()]).show()
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

    protected override newNumberOfSubmissions(_oldNumberOfSubmissions: number): number {
        return 1
    }

    protected override getRandomElementFrom<T>(elements: readonly T[]): T {
        return elements[0]!
    }
}

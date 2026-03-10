import { ComputerMessage } from './frame.js';
import { Level } from './level-base.js';
import { IntegerVariable, RadioVariable } from './variable.js';
export class BatteryLevel extends Level {
    identifier() {
        return 'battery-level';
    }
    name() {
        return 'Battery Level';
    }
    specification() {
        return this.locale.aSmartphoneNormallyOperatesInNormalMode();
    }
    getParameters() {
        return [
            new IntegerVariable('Battery Level', 'batteryLevel'),
        ];
    }
    getUnit() {
        return new RadioVariable('Power Mode', 'powerMode', ['Normal Mode', 'Low Power Mode']);
    }
    getCandidateElements() {
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
        ];
    }
    *minimalUnitTestGenerator() {
        yield [[18], 'Low Power Mode'];
        yield [[19], 'Low Power Mode'];
        yield [[20], 'Normal Mode'];
        yield [[21], 'Normal Mode'];
    }
    *hintGenerator() {
        for (let batteryLevel = 18; batteryLevel <= 21; batteryLevel += 1)
            yield [batteryLevel];
    }
    exampleForms = [
        {
            message: this.locale.theSpecificationContainsTheNumber20(),
            batteryLevel: '20',
            powerMode: 'Normal Mode'
        },
        {
            message: this.locale.theCurrentFunctionNowAlwaysReturnsNormalMode(),
            batteryLevel: '19',
            powerMode: 'Low Power Mode'
        },
        {
            message: this.locale.theCurrentFunctionNowSometimesReturnsNormalModeAndSometimesLowPowerMode(),
            batteryLevel: undefined,
            powerMode: undefined
        },
        {
            message: this.locale.theCurrentFunctionNowReturnsNormalModeOnlyForBatteryLevel20Percent(),
            batteryLevel: '21',
            powerMode: 'Normal Mode'
        },
        {
            message: this.locale.submitTheUnitTestsAgainToSeeIfTheCurrentFunctionIsAccordingToTheSpecification(),
            batteryLevel: undefined,
            powerMode: undefined
        },
        {
            message: this.locale.theCurrentFunctionNowReturnsLowPowerModeOnlyForBatteryLevel19Percent(),
            batteryLevel: '18',
            powerMode: 'Low Power Mode'
        },
        {
            message: this.locale.submitTheUnitTestsAgainToSeeIfTheCurrentFunctionIsFinallyAccordingToTheSpecification(),
            batteryLevel: undefined,
            powerMode: undefined
        }
    ];
    showInstructionsMessage() {
        new ComputerMessage([this.locale.inThisLevelYouOnlyHaveToFollowTheInstructions()]).add();
    }
    showSidebarMessage() {
        new ComputerMessage([this.locale.meanwhileKeepAnEyeOnTheChangesInTheSidebar()]).add();
    }
    showBeforeMenuMessage() {
        new ComputerMessage([this.exampleForms[0].message]).add();
    }
    showCongratulationsMessage() {
        new ComputerMessage([this.locale.congratulationsNowYouUnderstandTheBasicsOfTestDrivenDevelopment()]).add();
    }
    showWarning() {
        new ComputerMessage([this.locale.thatIsNotWhatIAskedFor()]).add();
    }
    isFormDataOk(formData) {
        const exampleForm = this.exampleForms[0];
        const batteryLevelOk = formData.get('batteryLevel') === exampleForm.batteryLevel;
        const powerModeOk = formData.get('powerMode') === exampleForm.powerMode;
        if (batteryLevelOk && powerModeOk) {
            this.exampleForms.shift();
            return true;
        }
        this.showWarning();
        this.showMenuMessage();
        return false;
    }
    newNumberOfSubmissions(_oldNumberOfSubmissions) {
        return 1;
    }
    getRandomElementFrom(elements) {
        return elements[0];
    }
}

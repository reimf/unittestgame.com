import { UseCase } from './use-case-base.js'
import { Variable, IntegerVariable, RadioVariable } from './variable.js'

export class BatteryLevel extends UseCase {
    public identifier(): string {
        return 'battery-level'
    }

    public name(): string {
        return 'Battery Level'
    }

    public specification(): string {
        return this.locale.aSmartphoneNormallyOperatesInNormalMode()
    }

    protected getParameters(): Variable[] {
        return [
            new IntegerVariable('Battery Level', 'batteryLevel'),
        ]
    }

    protected getUnit(): Variable {
        return new RadioVariable('Power Mode', 'powerMode', ['Normal Mode', 'Low Power Mode'])
    }

    protected getCandidateElements(): string[][] {
        return [
            [
                'if (batteryLevel >= 18) return "Normal Mode"',
                'if (batteryLevel >= 19) return "Normal Mode"',
                'if (batteryLevel >= 20) return "Normal Mode"',
                'if (batteryLevel >= 21) return "Normal Mode"',
                'if (batteryLevel >= 22) return "Normal Mode"',
                'if (batteryLevel < 19) return "Low Power Mode"',
                'if (batteryLevel < 20) return "Low Power Mode"',
                'if (batteryLevel < 21) return "Low Power Mode"',
                'if (batteryLevel < 22) return "Low Power Mode"',
                'if (batteryLevel < 23) return "Low Power Mode"',
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

    public* exampleStringGeneratorTestDrivenDevelopment(): Generator<string> {
        // play
        yield this.locale.inThisExampleYouOnlyHaveToClickTheGreenButton()
        yield this.locale.meanwhileKeepAnEyeOnTheChangesInTheSidebar()

        // showMenuMessage
        yield this.locale.theSpecificationContainsTheNumber20()
        yield this.locale.iWantToAddThisUnitTest()
        yield '20'
        yield 'Normal Mode'

        // showMenuMessage
        yield this.locale.theCurrentFunctionNowAlwaysReturnsNormalMode()
        yield this.locale.iWantToAddThisUnitTest()
        yield '19'
        yield 'Low Power Mode'

        // showMenuMessage
        yield this.locale.theCurrentFunctionNowSometimesReturnsNormalModeAndSometimesLowPowerMode()
        yield this.locale.iWantToSubmitTheUnitTests()

        // showMenuMessage
        yield this.locale.theCurrentFunctionNowReturnsNormalModeOnlyForBatteryLevel20Percent()
        yield this.locale.iWantToAddThisUnitTest()
        yield '21'
        yield 'Normal Mode'

        // showMenuMessage
        yield this.locale.submitTheUnitTestsAgainToSeeIfTheCurrentFunctionIsAccordingToTheSpecification()
        yield this.locale.iWantToSubmitTheUnitTests()

        // showMenuMessage
        yield this.locale.theCurrentFunctionNowReturnsLowPowerModeOnlyForBatteryLevel19Percent()
        yield this.locale.iWantToAddThisUnitTest()
        yield '18'
        yield 'Low Power Mode'

        // showMenuMessage
        yield this.locale.submitTheUnitTestsAgainToSeeIfTheCurrentFunctionIsFinallyAccordingToTheSpecification()
        yield this.locale.iWantToSubmitTheUnitTests()

        // end
        yield this.locale.congratulationsNowYouUnderstandTheBasicsOfTestDrivenDevelopment()
    }

    public* exampleStringGeneratorMutationTesting(): Generator<string> {
        // play
        yield this.locale.inThisExampleYouOnlyHaveToClickTheGreenButton()
        yield this.locale.meanwhileKeepAnEyeOnTheChangesInTheSidebar()

        // showMenuMessage
        yield this.locale.theFunctionContainsTheNumber20()
        yield this.locale.iWantToAddThisUnitTest()
        yield '20'
        yield 'Normal Mode'

        // showMenuMessage
        yield this.locale.theFunctionDoesNotAlwaysReturnNormalMode()
        yield this.locale.iWantToAddThisUnitTest()
        yield '19'
        yield 'Low Power Mode'

        // showMenuMessage
        yield this.locale.allLinesInTheFunctionAreTestedNow()
        yield this.locale.iWantToSubmitTheUnitTests()

        // showMenuMessage
        yield this.locale.thisMutationOnlyReturnsNormalModeIfTheBatteryLevelIsExactly20Percent()
        yield this.locale.iWantToAddThisUnitTest()
        yield '21'
        yield 'Normal Mode'

        // showMenuMessage
        yield this.locale.submitTheUnitTestsAgainToSeeIfTheFunctionIsFullyTestedNow()
        yield this.locale.iWantToSubmitTheUnitTests()

        // showMenuMessage
        yield this.locale.thisMutationOnlyReturnsLowPowerModeIfTheBatteryLevelIsExactly19Percent()
        yield this.locale.iWantToAddThisUnitTest()
        yield '18'
        yield 'Low Power Mode'

        // showMenuMessage
        yield this.locale.submitTheUnitTestsAgainToSeeIfTheFunctionIsFinallyFullyTestedNow()
        yield this.locale.iWantToSubmitTheUnitTests()

        // end
        yield this.locale.congratulationsNowYouUnderstandTheBasicsOfMutationTesting()
    }
}

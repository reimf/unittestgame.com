import { UseCase } from './use-case-base.js';
import { IntegerVariable, RadioVariable } from './variable.js';
export class BatteryLevel extends UseCase {
    name() {
        return 'Example';
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
    *exampleGuidanceGeneratorTestDrivenDevelopment() {
        // constructor
        yield 'true'; // hasExampleGuidance
        // play
        yield this.locale.inThisExampleYouOnlyHaveToClickTheGreenButton();
        yield this.locale.meanwhileKeepAnEyeOnTheYellowMarkedChangesInTheSidebar();
        // showMenuMessage
        yield this.locale.theSpecificationContainsTheNumber20();
        yield this.locale.iWantToAddThisUnitTest();
        yield '20';
        yield 'Normal Mode';
        // showMenuMessage
        yield this.locale.theCurrentFunctionNowAlwaysReturnsNormalMode();
        yield this.locale.iWantToAddThisUnitTest();
        yield '19';
        yield 'Low Power Mode';
        // showMenuMessage
        yield this.locale.theCurrentFunctionNowSometimesReturnsNormalModeAndSometimesLowPowerMode();
        yield this.locale.iWantToSubmitTheUnitTests();
        // showMenuMessage
        yield this.locale.theCurrentFunctionNowReturnsNormalModeOnlyForBatteryLevel20Percent();
        yield this.locale.iWantToAddThisUnitTest();
        yield '21';
        yield 'Normal Mode';
        // showMenuMessage
        yield this.locale.submitTheUnitTestsAgainToSeeIfTheCurrentFunctionIsAccordingToTheSpecification();
        yield this.locale.iWantToSubmitTheUnitTests();
        // showMenuMessage
        yield this.locale.theCurrentFunctionNowReturnsLowPowerModeOnlyForBatteryLevel19Percent();
        yield this.locale.iWantToAddThisUnitTest();
        yield '18';
        yield 'Low Power Mode';
        // showMenuMessage
        yield this.locale.submitTheUnitTestsAgainToSeeIfTheCurrentFunctionIsFinallyAccordingToTheSpecification();
        yield this.locale.iWantToSubmitTheUnitTests();
        // end
        yield this.locale.congratulationsNowYouUnderstandTheBasicsOfTestDrivenDevelopment();
    }
    *exampleGuidanceGeneratorMutationTesting() {
        // constructor
        yield 'true';
        // play
        yield this.locale.inThisExampleYouOnlyHaveToClickTheGreenButton();
        yield this.locale.meanwhileKeepAnEyeOnTheYellowMarkedChangesInTheSidebar();
        // showMenuMessage
        yield this.locale.theFunctionContainsTheNumber20();
        yield this.locale.iWantToAddThisUnitTest();
        yield '20';
        yield 'Normal Mode';
        // showMenuMessage
        yield this.locale.theFunctionDoesNotAlwaysReturnNormalMode();
        yield this.locale.iWantToAddThisUnitTest();
        yield '19';
        yield 'Low Power Mode';
        // showMenuMessage
        yield this.locale.allLinesInTheFunctionAreCoveredNow();
        yield this.locale.iWantToSubmitTheUnitTests();
        // showMenuMessage
        yield this.locale.thisMutationOnlyReturnsNormalModeIfTheBatteryLevelIsExactly20Percent();
        yield this.locale.iWantToAddThisUnitTest();
        yield '21';
        yield 'Normal Mode';
        // showMenuMessage
        yield this.locale.submitTheUnitTestsAgainToSeeIfTheFunctionIsFullyTestedNow();
        yield this.locale.iWantToSubmitTheUnitTests();
        // showMenuMessage
        yield this.locale.thisMutationOnlyReturnsLowPowerModeIfTheBatteryLevelIsExactly19Percent();
        yield this.locale.iWantToAddThisUnitTest();
        yield '18';
        yield 'Low Power Mode';
        // showMenuMessage
        yield this.locale.submitTheUnitTestsAgainToSeeIfTheFunctionIsFinallyFullyTestedNow();
        yield this.locale.iWantToSubmitTheUnitTests();
        // end
        yield this.locale.congratulationsNowYouUnderstandTheBasicsOfMutationTesting();
    }
}

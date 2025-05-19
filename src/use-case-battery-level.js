import { UseCase } from './use-case.js';
import { IntegerVariable, RadioVariable } from './variable.js';
export class BatteryLevel extends UseCase {
    name() {
        return 'Example';
    }
    specification() {
        return 'A smartphone normally operates in Normal Mode, but when the battery level is less than 20%, it operates in Low Power Mode.';
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
        yield 'true';
        // play
        yield 'In this example you only have to click the green button.';
        yield 'Meanwhile, keep an eye on the yellow marked changes in the sidebar.';
        // showMenuMessage
        yield 'The *Specification* contains the number 20. That is a good starting point for a unit test. When the battery level is 20%, the function should return Normal Mode.';
        yield 'I want to add this unit test';
        yield '20';
        yield 'Normal Mode';
        // showMenuMessage
        yield 'The *Current Function* now always returns Normal Mode. The *Specification* says that when the battery level is less than 20%, the function should return Low Power Mode. So, add a unit test for a battery level less than 20%, say 19%.';
        yield 'I want to add this unit test';
        yield '19';
        yield 'Low Power Mode';
        // showMenuMessage
        yield 'The *Current Function* now sometimes returns Normal Mode and sometimes Low Power Mode. Submit the unit tests to see if the *Current Function* is according to the *Specification*.';
        yield 'I want to submit the unit tests';
        // showMenuMessage
        yield 'The *Current Function* now returns Normal Mode only for battery level 20%. Add a unit test for another battery level, say 21%, because the *Specification* says it should return Normal Mode for battery level 21% as well.';
        yield 'I want to add this unit test';
        yield '21';
        yield 'Normal Mode';
        // showMenuMessage
        yield 'Submit the unit tests again to see if the *Current Function* is according to the *Specification*.';
        yield 'I want to submit the unit tests';
        // showMenuMessage
        yield 'The *Current Function* now returns Low Power Mode only for battery level 19%. Add a unit test for another battery level, say 18%, because the *Specification* says it should return Low Power Mode for battery level 18% as well.';
        yield 'I want to add this unit test';
        yield '18';
        yield 'Low Power Mode';
        // showMenuMessage
        yield 'Submit the unit tests again to see if the *Current Function* is finally according to the *Specification*.';
        yield 'I want to submit the unit tests';
        // levelFinishedValue
        yield '1';
        // processCallback
        yield 'Congratulations, now you understand the basics of Test-Driven Development.';
    }
    *exampleGuidanceGeneratorMutationTesting() {
        // constructor
        yield 'true';
        // play
        yield 'In this example you only have to click the green button.';
        yield 'Meanwhile, keep an eye on the yellow marked changes in the sidebar.';
        // showMenuMessage
        yield '*The Function* contains the number 20. That is a good starting point for a unit test. When the battery level is 20%, the function returns Normal Mode.';
        yield 'I want to add this unit test';
        yield '20';
        yield 'Normal Mode';
        // showMenuMessage
        yield '*The Function* does not always return Normal Mode. When the battery level is less than 20%, the function returns Low Power Mode. So, add a unit test for a battery level less than 20%, say 19%.';
        yield 'I want to add this unit test';
        yield '19';
        yield 'Low Power Mode';
        // showMenuMessage
        yield 'All lines in *The Function* are covered now. Submit the unit tests to see if *The Function* is fully tested.';
        yield 'I want to submit the unit tests';
        // showMenuMessage
        yield 'This mutation only returns Normal Mode if the battery level is exactly 20%. Add a unit test for another battery level *The Function* returns Normal Mode for, say 21%.';
        yield 'I want to add this unit test';
        yield '21';
        yield 'Normal Mode';
        // showMenuMessage
        yield 'Submit the unit tests again to see if *The Function* is fully tested now.';
        yield 'I want to submit the unit tests';
        // showMenuMessage
        yield 'This mutation only returns Low Power Mode if the battery level is exactly 19%. Add a unit test for another battery level *The Function* returns Low Power Mode for, say 18%.';
        yield 'I want to add this unit test';
        yield '18';
        yield 'Low Power Mode';
        // showMenuMessage
        yield 'Submit the unit tests again to see if *The Function* is finally fully tested.';
        yield 'I want to submit the unit tests';
        // levelFinishedValue
        yield '1';
        // processCallback
        yield 'Congratulations, now you understand the basics of Mutation Testing.';
    }
}

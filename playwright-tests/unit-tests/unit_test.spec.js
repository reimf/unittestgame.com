import { test, expect } from '@playwright/test';
import { UnitTest } from '../../src/unit_test.js';
import { NumberVariable } from '../../src/variable.js';
test.describe('class UnitTest', () => {
    test('converts to a string', () => {
        const parameters = [new NumberVariable('A', 'a'), new NumberVariable('B', 'b')];
        const unit = new NumberVariable('Divide', 'divide');
        const unitTest = new UnitTest(parameters, [6, 3], unit, 2);
        expect(unitTest.toString()).toBe('divide(6, 3) === 2');
    });
    test('converts to a string with another result', () => {
        const parameters = [new NumberVariable('A', 'a'), new NumberVariable('B', 'b')];
        const unit = new NumberVariable('Divide', 'divide');
        const unitTest = new UnitTest(parameters, [6, 3], unit, 2);
        expect(unitTest.toStringWithResult(5)).toBe('divide(6, 3) === 5');
    });
});

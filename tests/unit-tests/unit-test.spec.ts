import { test, expect } from '@playwright/test'
import { UnitTest } from '../../src/unit-test.js'
import { IntegerVariable } from '../../src/variable.js'

test.describe('class UnitTest', () => {
    test('converts to a string', () => {
        const parameters = [new IntegerVariable('A', 'a'), new IntegerVariable('B', 'b')]
        const unit = new IntegerVariable('Divide', 'divide')
        const unitTest = new UnitTest(parameters, [6, 3], unit, 2)
        expect(unitTest.toString()).toBe('divide(6, 3) === 2')
    })

    test('converts to a string with another result', () => {
        const parameters = [new IntegerVariable('A', 'a'), new IntegerVariable('B', 'b')]
        const unit = new IntegerVariable('Divide', 'divide')
        const unitTest = new UnitTest(parameters, [6, 3], unit, 2)
        expect(unitTest.toStringWithResult(5)).toBe('divide(6, 3) === 5')
    })
})

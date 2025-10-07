import { test, expect } from '@playwright/test'
import { UnitTest } from '../../src/unit-test.js'
import { IntegerVariable } from '../../src/variable.js'

test.describe('class UnitTest', () => {
    test('converts to a string', () => {
        const parameters = [new IntegerVariable('A', 'a'), new IntegerVariable('B', 'b')]
        const unit = new IntegerVariable('Divide', 'divide')
        const unitTest = new UnitTest(parameters, [6, 3], unit, 2)
        expect(unitTest.toHtml().toString()).toBe(
            '<div>' +
                '<span class="function">divide</span>' +
                '<span class="punctuation">(</span>' +
                '<span class="number">6</span>' +
                '<span class="punctuation">,</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="number">3</span>' +
                '<span class="punctuation">)</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="operator">===</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="number">2</span>' +
            '</div>'
        )
    })

    test('converts to a string with another result', () => {
        const parameters = [new IntegerVariable('A', 'a'), new IntegerVariable('B', 'b')]
        const unit = new IntegerVariable('Divide', 'divide')
        const unitTest = new UnitTest(parameters, [6, 3], unit, 2)
        expect(unitTest.toHtmlWithResult(5).toString()).toBe(
            '<div>' +
                '<span class="function">divide</span>' +
                '<span class="punctuation">(</span>' +
                '<span class="number">6</span>' +
                '<span class="punctuation">,</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="number">3</span>' +
                '<span class="punctuation">)</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="operator">===</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="number">5</span>' +
            '</div>'
        )
    })
})

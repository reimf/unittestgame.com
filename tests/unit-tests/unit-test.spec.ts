import { test, expect } from '@playwright/test'
import { UnitTest } from '../../src/unit-test.js'
import { IntegerVariable } from '../../src/variable.js'
import { Locale } from '../../src/locale.js'

test.describe('class UnitTest', () => {
    test('converts to a string', () => {
        const parameters = [new IntegerVariable(Locale.bless('A'), 'a'), new IntegerVariable(Locale.bless('B'), 'b')]
        const unit = new IntegerVariable(Locale.bless('Divide'), 'divide')
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
        const parameters = [new IntegerVariable(Locale.bless('A'), 'a'), new IntegerVariable(Locale.bless('B'), 'b')]
        const unit = new IntegerVariable(Locale.bless('Divide'), 'divide')
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

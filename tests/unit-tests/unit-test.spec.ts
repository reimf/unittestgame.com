import { test, expect } from '@playwright/test'
import { JSDOM } from 'jsdom'
import { UnitTest } from '../../src/unit-test.js'
import { IntegerVariable } from '../../src/variable.js'
import { Locale } from '../../src/locale.js'

const { document } = new JSDOM('<!DOCTYPE html>').window
global.document = document

test.describe('class UnitTest', () => {
    test('converts to a string', () => {
        const parameters = [new IntegerVariable(Locale.bless('A'), 'a'), new IntegerVariable(Locale.bless('B'), 'b')]
        const unit = new IntegerVariable(Locale.bless('Divide'), 'divide')
        const unitTest = new UnitTest(parameters, [6, 3], unit, 2)
        const html = unitTest.toHtml()
        expect(html.toDomElement().outerHTML).toBe(
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
        const htmlWithResult = unitTest.toHtmlWithResult(5)
        expect(htmlWithResult.toDomElement().outerHTML).toBe(
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

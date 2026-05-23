import { test, expect } from '@playwright/test'
import { JSDOM } from 'jsdom'
import { TestResult } from '../../src/test-result.js'
import { Candidate } from '../../src/candidate.js'
import { UnitTest } from '../../src/unit-test.js'
import { IntegerVariable, BooleanVariable } from '../../src/variable.js'
import { Locale } from '../../src/locale.js'

const { document } = new JSDOM('<!DOCTYPE html>').window
global.document = document

test.describe('class TestResult', () => {
    test('passes', () => {
        const candidate = new Candidate(['function isNextNumber(a, b) { return a + 1 === b }'])
        const parameters = [new IntegerVariable(Locale.bless('A'), 'a'), new IntegerVariable(Locale.bless('B'), 'b')]
        const unit = new BooleanVariable(Locale.bless('Is next number'), 'isNextNumber')
        const unitTest = new UnitTest(parameters, [6, 7], unit, true)
        const testResult = new TestResult(candidate, unitTest)
        expect(testResult.passes).toBe(true)
    })

    test('fails', () => {
        const candidate = new Candidate(['function isNextNumber(a, b) { return a + 1 === b }'])
        const parameters = [new IntegerVariable(Locale.bless('A'), 'a'), new IntegerVariable(Locale.bless('B'), 'b')]
        const unit = new BooleanVariable(Locale.bless('Is next number'), 'isNextNumber')
        const unitTest = new UnitTest(parameters, [6, 5], unit, true)
        const testResult = new TestResult(candidate, unitTest)
        expect(testResult.passes).toBe(false)
    })

    test('converts to a string', () => {
        const candidate = new Candidate(['function isNextNumber(a, b) { return a + 1 === b }'])
        const parameters = [new IntegerVariable(Locale.bless('A'), 'a'), new IntegerVariable(Locale.bless('B'), 'b')]
        const unit = new BooleanVariable(Locale.bless('Is next number'), 'isNextNumber')
        const unitTest = new UnitTest(parameters, [6, 7], unit, true)
        const testResult = new TestResult(candidate, unitTest)
        const html = testResult.toHtml()
        expect(html.getElement().outerHTML).toBe(
            '<div>' +
                '<span class="function">isNextNumber</span>' +
                '<span class="punctuation">(</span>' +
                '<span class="number">6</span>' +
                '<span class="punctuation">,</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="number">7</span>' +
                '<span class="punctuation">)</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="operator">===</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="literal">true</span>' +
            '</div>'
        )
    })
})

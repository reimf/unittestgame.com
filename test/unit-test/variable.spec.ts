import { test, expect } from '@playwright/test'
import { JSDOM } from 'jsdom'
import { RadioVariable, BooleanVariable, TextVariable, IntegerVariable, FloatVariable } from '../../src/variable.js'
import { Locale } from '../../src/locale.js'

const { document } = new JSDOM('<!DOCTYPE html>').window
global.document = document

test.describe('class Variable', () => {
    test('subclass RadioVariable', () => {
        const variable = new RadioVariable(Locale.bless('Type of triangle'), 'triangleType', [
            Locale.bless('equilateral'), 
            Locale.bless('isosceles'), 
            Locale.bless('scalene'),
        ])
        const html = variable.toHtml()
        expect(html.getElement().outerHTML).toBe(
            '<p>' +
                '<span>Type of triangle</span>' +
                '<label>' +
                    '<input type="radio" name="triangleType" value="equilateral" required="">' +
                    'equilateral' +
                '</label>' +
                '<label>' +
                    '<input type="radio" name="triangleType" value="isosceles" required="">' +
                    'isosceles' +
                '</label>' +
                '<label>' +
                    '<input type="radio" name="triangleType" value="scalene" required="">' +
                    'scalene' +
                '</label>' +
            '</p>'
        )
    })

    test('subclass BooleanVariable', () => {
        const variable = new BooleanVariable(Locale.bless('Is even'), 'isEven')
        const html = variable.toHtml()
        expect(html.getElement().outerHTML).toBe(
            '<p>' +
                '<span>Is even</span>' +
                '<label>' +
                    '<input type="radio" name="isEven" value="true" required="">' +
                    'true' +
                '</label>' +
                '<label>' +
                    '<input type="radio" name="isEven" value="false" required="">' +
                    'false' +
                '</label>' +
            '</p>'
        )
    })

    test('subclass TextVariable', () => {
        const variable = new TextVariable(Locale.bless('Output'), 'fizzBuzz')
        const html = variable.toHtml()
        expect(html.getElement().outerHTML).toBe(
            '<p>' +
                '<label>' +
                    '<span>Output</span>' +
                    '<input type="text" name="fizzBuzz" autocomplete="off" class="empty" required="" pattern=".{1,10}" title="a text with at most 10 characters">' +
                '</label>' +
            '</p>'
        )
    })

    test('subclass IntegerVariable', () => {
        const variable = new IntegerVariable(Locale.bless('Number'), 'number')
        const html = variable.toHtml()
        expect(html.getElement().outerHTML).toBe(
            '<p>' +
                '<label>' +
                    '<span>Number</span>' +
                    '<input type="text" name="number" autocomplete="off" class="empty" required="" pattern="[0-9]{1,4}" title="an integer number with at most 4 digits">' +
                '</label>' +
            '</p>'
        )
    })

    test('subclass FloatVariable', () => {
        const variable = new FloatVariable(Locale.bless('Number'), 'number')
        const html = variable.toHtml()
        expect(html.getElement().outerHTML).toBe(
            '<p>' +
                '<label>' +
                    '<span>Number</span>' +
                    '<input type="text" name="number" autocomplete="off" class="empty" required="" pattern="[0-9]{1,4}(\\.[0-9])?" title="a floating-point number with at most 4 digits, an optional decimal point and an optional decimal">' +
                '</label>' +
            '</p>'
        )
    })
})

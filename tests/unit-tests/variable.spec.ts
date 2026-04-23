import { test, expect } from '@playwright/test'
import { RadioVariable, BooleanVariable, TextVariable, IntegerVariable, FloatVariable } from '../../src/variable.js'
import { Locale } from '../../src/locale.js'


test.describe('class Variable', () => {
    test('subclass RadioVariable', () => {
        const variable = new RadioVariable(Locale.bless('Type of triangle'), 'triangleType', [Locale.bless('equilateral'), Locale.bless('isosceles'), Locale.bless('scalene')])
        expect(variable.toHtml().toString()).toBe('<p><span>Type of triangle</span><label><input name="triangleType" required="required" type="radio" value="equilateral"></input>equilateral</label><label><input name="triangleType" required="required" type="radio" value="isosceles"></input>isosceles</label><label><input name="triangleType" required="required" type="radio" value="scalene"></input>scalene</label></p>')
    })

    test('subclass BooleanVariable', () => {
        const variable = new BooleanVariable(Locale.bless('Is even'), 'isEven')
        expect(variable.toHtml().toString()).toBe('<p><span>Is even</span><label><input name="isEven" required="required" type="radio" value="true"></input>true</label><label><input name="isEven" required="required" type="radio" value="false"></input>false</label></p>')
    })

    test('subclass TextVariable', () => {
        const variable = new TextVariable(Locale.bless('Output'), 'fizzBuzz')
        expect(variable.toHtml().toString()).toBe('<p><label><span>Output</span><input autocomplete="off" class="empty" name="fizzBuzz" pattern=".{1,10}" required="required" title="a text with at most 10 characters" type="text"></input></label></p>')
    })

    test('subclass IntegerVariable', () => {
        const variable = new IntegerVariable(Locale.bless('Number'), 'number')
        expect(variable.toHtml().toString()).toBe('<p><label><span>Number</span><input autocomplete="off" class="empty" name="number" pattern="[0-9]{1,4}" required="required" title="an integer number with at most 4 digits" type="text"></input></label></p>')
    })

    test('subclass FloatVariable', () => {
        const variable = new FloatVariable(Locale.bless('Number'), 'number')
        expect(variable.toHtml().toString()).toBe('<p><label><span>Number</span><input autocomplete="off" class="empty" name="number" pattern="[0-9]{1,4}(\.[0-9])?" required="required" title="a floating-point number with at most 4 digits, an optional decimal point and an optional decimal" type="text"></input></label></p>')
    })
})

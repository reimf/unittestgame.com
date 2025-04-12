import { test, expect } from '@playwright/test'
import { RadioVariable, CheckboxVariable, TextVariable, NumberVariable } from '../../src/variable.js'


test.describe('class Variable', () => {
    test('subclass RadioVariable', () => {
        const variable = new RadioVariable('Type of triangle', 'triangleType', ['equilateral', 'isosceles', 'scalene'])
        expect(variable.toHtml().toString()).toBe('<p>Type of triangle<label><input name="triangleType" required="required" type="radio" value="equilateral"></input>equilateral</label><label><input name="triangleType" required="required" type="radio" value="isosceles"></input>isosceles</label><label><input name="triangleType" required="required" type="radio" value="scalene"></input>scalene</label></p>')
    })

    test('subclass CheckboxVariable', () => {
        const variable = new CheckboxVariable('Is even', 'isEven')
        expect(variable.toHtml().toString()).toBe('<p><label><input name="isEven" type="checkbox"></input>Is even</label></p>')
    })

    test('subclass TextVariable', () => {
        const variable = new TextVariable('Output', 'fizzBuzz')
        expect(variable.toHtml().toString()).toBe('<p><label>Output<input autocomplete="off" name="fizzBuzz" required="required" type="text"></input></label></p>')
    })

    test('subclass NumberVariable', () => {
        const variable = new NumberVariable('Number', 'number')
        expect(variable.toHtml().toString()).toBe('<p><label>Number<input autocomplete="off" name="number" pattern="[0-9]*" required="required" type="text"></input></label></p>')
    })
})

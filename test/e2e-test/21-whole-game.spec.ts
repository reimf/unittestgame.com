import { test, expect } from '../fixture/fixture-coverage'
import { Game } from '../../src/game.js'
import { BooleanVariable, RadioVariable } from '../../src/variable.js'
import { BatteryLevel } from '../../src/level-battery-level.js'
import { MapStore } from '../../src/store.js'
import { RandomPicker } from '../../src/picker.js'
import { Locale } from '../../src/locale.js'
import { JavaScript } from '../../src/programming-language'

test.describe('whole game', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/?speed=fast')
    })

    test('plays whole game', async ({ page }) => {
        test.slow()

        const locale = new Locale('en')
        const programmingLanguage = new JavaScript()
        const picker = new RandomPicker()
        const store = new MapStore()
        const game = new Game(locale, programmingLanguage, picker, store)
        const levels = game.levels()

        for (const level of levels) {
            await page.getByRole('button', { name: `I want to play ${level.description()}` }).click()

            if (level instanceof BatteryLevel) {
                await page.getByLabel('Battery Level').fill('20')
                await page.getByLabel('Normal Mode').check()
                await page.getByRole('button', { name: 'I want to add this unit test' }).click()
                await page.getByLabel('Battery Level').fill('19')
                await page.getByLabel('Low Power Mode').check()
                await page.getByRole('button', { name: 'I want to add this unit test' }).click()
                await page.getByRole('button', { name: 'I want to submit the unit tests' }).click()
                await page.getByLabel('Battery Level').fill('21')
                await page.getByLabel('Normal Mode').check()
                await page.getByRole('button', { name: 'I want to add this unit test' }).click()
                await page.getByRole('button', { name: 'I want to submit the unit tests' }).click()
                await page.getByLabel('Battery Level').fill('18')
                await page.getByLabel('Low Power Mode').check()
                await page.getByRole('button', { name: 'I want to add this unit test' }).click()
                await page.getByRole('button', { name: 'I want to submit the unit tests' }).click()
            }
            else {
                const variables = [...level.parameters, level.unit]
                for (const unitTest of level.minimalUnitTests) {
                    const values = [...unitTest.argumentList, unitTest.expected]
                    for (let i = 0; i < variables.length; i++) {
                        const [variable, value] = [variables[i]!, values[i]!]
                        if (variable instanceof RadioVariable || variable instanceof BooleanVariable)
                            await page.getByLabel(value.toString(), { exact: true }).check()
                        else
                            await page.getByLabel(variable.label).fill(value.toString())
                    }
                    await page.getByRole('button', { name: 'I want to add this unit test' }).click()
                }
                await page.getByRole('button', { name: 'I want to submit the unit tests' }).click()
            }
        }

        const button = page.getByRole('button', { name: 'I\'ve completed all the levels' })
        await expect(button).toBeVisible()
        button.click()
        const messages = page.getByTestId('messages')
        await expect(messages).toContainText('You\'ve completed all the levels')
    })
})

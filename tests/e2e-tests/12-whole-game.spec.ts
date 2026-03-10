import { test, expect, Page } from '@playwright/test'
import { Config } from '../../src/config.js'
import { BooleanVariable, RadioVariable } from '../../src/variable.js'
import { BatteryLevel } from '../../src/level-battery-level.js'

test.describe('whole game', () => {
    let page: Page

    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext()
        await context.addInitScript({ path: './tests/e2e-tests/init-script.js' })
        page = await context.newPage()
        await page.goto('/')
    })

    test('plays whole game', async () => {
        test.slow()

        const config = new Config('en')
        const levels = config.allLevels()

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
                        const [variable, value] = [variables[i]!, values[i]]
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

        const button = page.getByRole('button', { name: 'I played all the levels' })
        await expect(button).toBeVisible()
    })
})

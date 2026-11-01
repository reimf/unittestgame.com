import { test, expect } from '../fixture/fixture-coverage'

test.describe('submit button style', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/en/game?speed=fast&picker=fixed&store=map')
        await page.getByRole('button', { name: 'I want to play Level 0 - Battery Level', exact: true }).click()
    })

    test('is secondary without unit tests', async ({ page }) => {
        await expect(page.getByRole('button', { name: 'I want to submit the unit tests', exact: true })).toHaveClass(/secondary/)
    })

    test.describe('after 3 unit tests', () => {
        test.beforeEach(async ({ page }) => {
            await page.getByLabel('batteryLevel').fill('20')
            await page.getByLabel('"NORMAL MODE"', { exact: true }).check()
            await page.getByRole('button', { name: 'I want to add this unit test', exact: true }).click()
            await page.getByLabel('batteryLevel').fill('19')
            await page.getByLabel('"LOW POWER MODE"', { exact: true }).check()
            await page.getByRole('button', { name: 'I want to add this unit test', exact: true }).click()
            await page.getByRole('button', { name: 'I want to submit the unit tests', exact: true }).click()
            await page.getByLabel('batteryLevel').fill('21')
            await page.getByLabel('"NORMAL MODE"', { exact: true }).check()
            await page.getByRole('button', { name: 'I want to add this unit test', exact: true }).click()
        })

        test('is still secondary', async ({ page }) => {
            await expect(page.getByRole('button', { name: 'I want to submit the unit tests', exact: true })).toHaveClass(/secondary/)
        })

        test('is primary after the 4th unit test', async ({ page }) => {
            await page.getByRole('button', { name: 'I want to submit the unit tests', exact: true }).click()
            await page.getByLabel('batteryLevel').fill('18')
            await page.getByLabel('"LOW POWER MODE"', { exact: true }).check()
            await page.getByRole('button', { name: 'I want to add this unit test', exact: true }).click()
            await expect(page.getByTestId('unit-tests').locator('li')).toHaveCount(4)
            await expect(page.getByRole('button', { name: 'I want to submit the unit tests', exact: true })).not.toHaveClass(/secondary/)
        })
    })
})

test.describe('submit button style in a level with a minimum of 6 unit tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/en/game?speed=fast&picker=fixed&store=map&setitem=penalties-level-battery-level:0&setitem=penalties-level-voting-age:0')
        await page.getByRole('button', { name: 'I want to play Level 2 - Wind Scale', exact: true }).click()
        for (const [speed, category] of [['19', '"CALM"'], ['20', '"BREEZE"'], ['49', '"BREEZE"'], ['50', '"GALE"'], ['89', '"GALE"']] as const) {
            await page.getByLabel('speed').fill(speed)
            await page.getByLabel(category, { exact: true }).check()
            await page.getByRole('button', { name: 'I want to add this unit test', exact: true }).click()
        }
    })

    test('is still secondary after 5 unit tests', async ({ page }) => {
        await expect(page.getByTestId('unit-tests').locator('li')).toHaveCount(5)
        await expect(page.getByRole('button', { name: 'I want to submit the unit tests', exact: true })).toHaveClass(/secondary/)
    })

    test('is primary after the 6th unit test', async ({ page }) => {
        await page.getByLabel('speed').fill('90')
        await page.getByLabel('"STORM"', { exact: true }).check()
        await page.getByRole('button', { name: 'I want to add this unit test', exact: true }).click()
        await expect(page.getByTestId('unit-tests').locator('li')).toHaveCount(6)
        await expect(page.getByRole('button', { name: 'I want to submit the unit tests', exact: true })).not.toHaveClass(/secondary/)
    })
})

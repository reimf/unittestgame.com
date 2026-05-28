import { test, expect } from '../fixture/fixture-coverage'

test.describe('keyboard', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/?speed=fast')
        await page.getByRole('button', { name: 'I want to play Level 1 - Battery Level' }).click()
    })

    test('has battery level focused', async ({ page }) => {
        const batteryLevel = page.getByLabel('Battery Level')
        await expect(batteryLevel).toBeFocused()
    })

    test('has normal mode focused after arrow down', async ({ page }) => {
        await page.keyboard.press('ArrowDown')
        const normalMode = page.getByLabel('Normal Mode')
        await expect(normalMode).toBeFocused()
    })

    test('has low power focused after arrow down and arrow right', async ({ page }) => {
        await page.keyboard.press('ArrowDown')
        await page.keyboard.press('ArrowRight')
        const lowPowerMode = page.getByLabel('Low Power Mode')
        await expect(lowPowerMode).toBeFocused()
    })

    test('has add unit test button focused after 2 arrow down', async ({ page }) => {
        await page.keyboard.press('ArrowDown')
        await page.keyboard.press('ArrowDown')
        const addThisUnitTest = page.getByRole('button', { name: 'I want to add this unit test' })
        await expect(addThisUnitTest).toBeFocused()
    })

    test('has submit button focused after arrow up', async ({ page }) => {
        await page.keyboard.press('ArrowUp')
        const submitTheUnitTests = page.getByRole('button', { name: 'I want to submit the unit tests' })
        await expect(submitTheUnitTests).toBeFocused()
    })
})

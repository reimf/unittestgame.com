import { test, expect } from '../fixture/fixture-coverage'

test.describe('keyboard', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/en/game?speed=fast')
        await page.getByRole('button', { name: 'I want to play Level 0 - Battery Level', exact: true }).click()
    })

    test('has battery level focused', async ({ page }) => {
        await expect(page.getByLabel('batteryLevel')).toBeFocused()
    })

    test('has normal mode focused after arrow down', async ({ page }) => {
        await page.keyboard.press('ArrowDown')
        await expect(page.getByLabel('"NORMAL MODE"', { exact: true })).toBeFocused()
    })

    test('has low power focused after arrow down and arrow right', async ({ page }) => {
        await page.keyboard.press('ArrowDown')
        await page.keyboard.press('ArrowRight')
        await expect(page.getByLabel('"LOW POWER MODE"', { exact: true })).toBeFocused()
    })

    test('has add unit test button focused after 2 arrow down', async ({ page }) => {
        await page.keyboard.press('ArrowDown')
        await page.keyboard.press('ArrowDown')
        await expect(page.getByRole('button', { name: 'I want to add this unit test', exact: true })).toBeFocused()
    })

    test('has submit button focused after 3 arrow down', async ({ page }) => {
        await page.keyboard.press('ArrowDown')
        await page.keyboard.press('ArrowDown')
        await page.keyboard.press('ArrowDown')
        await expect(page.getByRole('button', { name: 'I want to submit the unit tests', exact: true })).toBeFocused()
    })

    test('has submit button focused after arrow up', async ({ page }) => {
        await page.keyboard.press('ArrowUp')
        await expect(page.getByRole('button', { name: 'I want to submit the unit tests', exact: true })).toBeFocused()
    })
})

test.describe('keyboard across messages and panels', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/en/game?speed=fast')
    })

    test('has the home link focused after arrow down from the last message', async ({ page }) => {
        await page.getByRole('button', { name: 'I want to play Level 0 - Battery Level', exact: true }).focus()
        await page.keyboard.press('ArrowDown')
        await expect(page.getByRole('link', { name: 'Home', exact: true })).toBeFocused()
    })
})

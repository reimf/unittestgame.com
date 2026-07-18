import { test, expect } from '../fixture/fixture-coverage'

test.describe('keyboard', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/?speed=fast')
        await page.getByRole('button', { name: 'I want to play Level 0 - Battery Level' }).click()
    })

    test('has battery level focused', async ({ page }) => {
        await expect(page.getByLabel('Battery Level')).toBeFocused()
    })

    test('has normal mode focused after arrow down', async ({ page }) => {
        await page.keyboard.press('ArrowDown')
        await expect(page.getByLabel('NORMAL MODE')).toBeFocused()
    })

    test('has low power focused after arrow down and arrow right', async ({ page }) => {
        await page.keyboard.press('ArrowDown')
        await page.keyboard.press('ArrowRight')
        await expect(page.getByLabel('LOW POWER MODE')).toBeFocused()
    })

    test('has add unit test button focused after 2 arrow down', async ({ page }) => {
        await page.keyboard.press('ArrowDown')
        await page.keyboard.press('ArrowDown')
        await expect(page.getByRole('button', { name: 'I want to add this unit test' })).toBeFocused()
    })

    test('has submit button focused after 3 arrow down', async ({ page }) => {
        await page.keyboard.press('ArrowDown')
        await page.keyboard.press('ArrowDown')
        await page.keyboard.press('ArrowDown')
        await expect(page.getByRole('button', { name: 'I want to submit the unit tests' })).toBeFocused()
    })

    test('has submit button focused after arrow up', async ({ page }) => {
        await page.keyboard.press('ArrowUp')
        await expect(page.getByRole('button', { name: 'I want to submit the unit tests' })).toBeFocused()
    })
})

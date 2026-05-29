import { test, expect } from '../fixture/fixture-coverage'
import type { Page } from '@playwright/test'

test.describe('keyboard', () => {
    test.describe.configure({ mode: 'serial' })

    let page: Page

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage()
        await page.goto('/?speed=fast')
        await page.getByRole('button', { name: 'I want to play Level 1 - Battery Level' }).click()
    })

    test.afterAll(async () => {
        await page.close()
    })

    test('has battery level focused', async () => {
        const batteryLevel = page.getByLabel('Battery Level')
        await expect(batteryLevel).toBeFocused()
    })

    test('has normal mode focused after arrow down', async () => {
        await page.keyboard.press('ArrowDown')
        const normalMode = page.getByLabel('Normal Mode')
        await expect(normalMode).toBeFocused()
    })

    test('has low power focused after arrow right', async () => {
        await page.keyboard.press('ArrowRight')
        const lowPowerMode = page.getByLabel('Low Power Mode')
        await expect(lowPowerMode).toBeFocused()
    })

    test('has add unit test button focused after arrow down', async () => {
        await page.keyboard.press('ArrowDown')
        const addThisUnitTest = page.getByRole('button', { name: 'I want to add this unit test' })
        await expect(addThisUnitTest).toBeFocused()
    })

    test('has submit button focused after arrow down', async () => {
        await page.keyboard.press('ArrowDown')
        const submitTheUnitTests = page.getByRole('button', { name: 'I want to submit the unit tests' })
        await expect(submitTheUnitTests).toBeFocused()
    })

    test('has battery level focused after arrow down', async () => {
        await page.keyboard.press('ArrowDown')
        const batteryLevel = page.getByLabel('Battery Level')
        await expect(batteryLevel).toBeFocused()
    })

    test('has submit button focused after arrow up', async () => {
        await page.keyboard.press('ArrowUp')
        const submitTheUnitTests = page.getByRole('button', { name: 'I want to submit the unit tests' })
        await expect(submitTheUnitTests).toBeFocused()
    })
})

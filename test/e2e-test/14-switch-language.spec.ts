import { test, expect } from '../fixture/fixture-coverage'
import type { Page } from '@playwright/test'

test.describe('switch language', () => {
    test.describe.configure({ mode: 'serial' })

    let page: Page

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage()
        await page.goto('/?speed=fast')
        await page.locator('select').selectOption({ label: 'Overschakelen op Nederlands' })
    })

    test.afterAll(async () => {
        await page.close()
    })

    test('has welcome message in Dutch', async () => {
        const messages = page.getByTestId('messages')
        await expect(messages).toContainText('Hoi! Ik ben een AI bot die code schrijft. Jouw taak is om mij bij te sturen met unit testen.')
    })

    test('has language selector with Dutch as selected option', async () => {
        const option = page.getByRole('option', { name: 'Taal wijzigen' })
        await expect(option).toHaveAttribute('value', 'nl')
        await expect(option).toHaveJSProperty('selected', true)
    })

    test('has language selector with English as an alternative option', async () => {
        const option = page.getByRole('option', { name: 'Switch to English' })
        await expect(option).toHaveAttribute('value', 'en')
        await expect(option).toHaveJSProperty('selected', false)
    })

    test('has play button in Dutch', async () => {
        const button = page.getByRole('button', { name: 'Ik wil Level 1 - Battery Level spelen' })
        await expect(button).toBeVisible()
    })
})

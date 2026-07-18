import { test, expect } from '../fixture/fixture-coverage'

test.describe('change language', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/?speed=fast')
        await page.getByTestId('language-switcher').selectOption('nl')
        await page.waitForLoadState()
    })

    test('has welcome message in Dutch', async ({ page }) => {
        const messages = page.getByTestId('messages')
        await expect(messages).toContainText('Hoi! Ik ben een Nederlands sprekende AI bot die JavaScript code schrijft. Jouw taak is om mij bij te sturen met unit testen.')
    })

    test('has language selector with Dutch as selected option', async ({ page }) => {
        const select = page.getByTestId('language-switcher')
        await expect(select).toHaveValue('nl')
    })

    test('has language selector with English as an alternative option', async ({ page }) => {
        const option = page.getByTestId('language-switcher').locator('option[value="en"]')
        await expect(option).toHaveText('English')
    })

    test('has play button in Dutch', async ({ page }) => {
        const button = page.getByRole('button', { name: 'Ik wil Level 0 - Battery Level spelen' })
        await expect(button).toBeVisible()
    })
})

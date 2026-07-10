import { test, expect } from '../fixture/fixture-coverage'

test.describe('change language', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/?speed=fast')
        await page.getByTestId('language-switcher').locator('summary').click()
        await page.getByRole('link', { name: 'Overschakelen op Nederlands' }).click()
        await page.waitForLoadState()
    })

    test('has welcome message in Dutch', async ({ page }) => {
        const messages = page.getByTestId('messages')
        await expect(messages).toContainText('Hoi! Ik ben een AI bot die code schrijft. Jouw taak is om mij bij te sturen met unit testen.')
    })

    test('has language selector with Dutch as selected option', async ({ page }) => {
        const summary = page.getByTestId('language-switcher').locator('summary')
        await expect(summary).toHaveText('Taal: Nederlands')
    })

    test('has language selector with English as an alternative option', async ({ page }) => {
        await page.getByTestId('language-switcher').locator('summary').click()
        const link = page.getByRole('link', { name: 'Switch to English' })
        await expect(link).toHaveAttribute('href', /language=en/)
    })

    test('has play button in Dutch', async ({ page }) => {
        const button = page.getByRole('button', { name: 'Ik wil Level 1 - Battery Level spelen' })
        await expect(button).toBeVisible()
    })
})

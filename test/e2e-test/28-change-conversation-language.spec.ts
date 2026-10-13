import { test, expect } from '../fixture/fixture-coverage'

test.describe('change conversation language', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/en/game?speed=fast&picker=fixed&programming_language=python')
    })

    test('has conversation language selector showing English as the current language', async ({ page }) => {
        const summary = page.getByTestId('conversation-language-switcher').locator('summary')
        await expect(summary).toHaveText('English')
    })

    test('has conversation language selector with the other languages as alternative options', async ({ page }) => {
        const switcher = page.getByTestId('conversation-language-switcher')
        await switcher.locator('summary').click()
        await expect(switcher.getByRole('link')).toHaveText(['Nederlands', 'Deutsch', 'Français', 'Español', 'Italiano'])
    })

    test.describe('after switching to Nederlands', () => {
        test.beforeEach(async ({ page }) => {
            const switcher = page.getByTestId('conversation-language-switcher')
            await switcher.locator('summary').click()
            await switcher.getByRole('link', { name: 'Nederlands', exact: true }).click()
            await page.waitForLoadState()
        })

        test('has conversation language selector showing Nederlands as the current language', async ({ page }) => {
            const summary = page.getByTestId('conversation-language-switcher').locator('summary')
            await expect(summary).toHaveText('Nederlands')
        })

        test('has settings panel in Dutch', async ({ page }) => {
            const settingsPanel = page.getByTestId('settings')
            await expect(settingsPanel).toContainText('Instellingen')
        })

        test('keeps the other parameters', async ({ page }) => {
            await expect(page).toHaveURL('/nl/game?speed=fast&picker=fixed&programming_language=python')
            const summary = page.getByTestId('programming-language-switcher').locator('summary')
            await expect(summary).toHaveText('Python')
        })
    })
})

import { test, expect } from '@playwright/test'

test.describe('home theme toggle', () => {
    test.use({ colorScheme: 'dark' })

    test.beforeEach(async ({ page }) => {
        await page.goto('/en/index')
        await page.getByTestId('settings-menu').locator('summary').first().click()
    })

    test('shows the dark theme when the theme is dark', async ({ page }) => {
        await expect(page.getByTestId('theme-toggle')).toHaveText(/Dark mode/)
    })

    test.describe('after switching to the light theme', () => {
        test.beforeEach(async ({ page }) => {
            await page.getByTestId('theme-toggle').click()
        })

        test('has the light theme class', async ({ page }) => {
            await expect(page.locator('html')).toHaveClass(/theme-light/)
        })

        test('shows the light theme', async ({ page }) => {
            await expect(page.getByTestId('theme-toggle')).toHaveText(/Light mode/)
        })

        test('keeps the theme after a reload', async ({ page }) => {
            await page.reload()
            await expect(page.locator('html')).toHaveClass(/theme-light/)
            await expect(page.getByTestId('theme-toggle')).toHaveText(/Light mode/)
        })
    })

    test('keeps the grayscale of the game', async ({ page }) => {
        await page.evaluate(() => localStorage.setItem('theme', 'dark-grayscale'))
        await page.reload()
        await page.getByTestId('settings-menu').locator('summary').first().click()
        await expect(page.getByTestId('color-toggle')).toHaveText(/Grayscale/)
        await page.getByTestId('theme-toggle').click()
        await expect(page.locator('html')).toHaveClass(/theme-light/)
        await expect(page.locator('html')).toHaveClass(/theme-grayscale/)
    })

    test('switches to grayscale and keeps the dark theme', async ({ page }) => {
        await expect(page.getByTestId('color-toggle')).toHaveText(/Color/)
        await page.getByTestId('color-toggle').click()
        await expect(page.getByTestId('color-toggle')).toHaveText(/Grayscale/)
        await expect(page.locator('html')).toHaveClass(/theme-grayscale/)
        await expect(page.locator('html')).toHaveClass(/theme-dark/)
    })

    test('has the language switcher in the menu', async ({ page }) => {
        const switcher = page.getByTestId('language-switcher')
        await switcher.locator('summary').click()
        await switcher.getByRole('link', { name: 'Nederlands', exact: true }).click()
        await expect(page).toHaveURL('/nl/index')
    })

    test('uses the language of the page', async ({ page }) => {
        await page.goto('/nl/index')
        await expect(page.getByTestId('theme-toggle')).toHaveText(/Donkere modus/)
    })
})

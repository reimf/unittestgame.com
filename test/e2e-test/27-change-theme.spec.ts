import { test, expect } from '../fixture/fixture-coverage'

test.describe('change theme', () => {
    test.describe('with a light system theme', () => {
        test.use({ colorScheme: 'light' })

        test.beforeEach(async ({ page }) => {
            await page.goto('/en/game?speed=fast&picker=fixed')
        })

        test('has theme selector showing light as the current theme', async ({ page }) => {
            const summary = page.getByTestId('theme-switcher').locator('summary')
            await expect(summary).toContainText('Light theme')
        })

        test('has theme selector with dark as an alternative option', async ({ page }) => {
            const switcher = page.getByTestId('theme-switcher')
            await switcher.locator('summary').click()
            const option = switcher.getByRole('button', { name: 'Dark theme', exact: true })
            await expect(option).toBeVisible()
        })

        test('has a light color scheme', async ({ page }) => {
            await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(238, 238, 238)')
        })
    })

    test.describe('with a dark system theme', () => {
        test.use({ colorScheme: 'dark' })

        test.beforeEach(async ({ page }) => {
            await page.goto('/en/game?speed=fast&picker=fixed')
        })

        test('has theme selector showing dark as the current theme', async ({ page }) => {
            const summary = page.getByTestId('theme-switcher').locator('summary')
            await expect(summary).toContainText('Dark theme')
        })

        test('has a dark color scheme', async ({ page }) => {
            await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(17, 17, 17)')
        })
    })

    test.describe('after switching to the dark theme', () => {
        test.use({ colorScheme: 'light' })

        test.beforeEach(async ({ page }) => {
            await page.goto('/en/game?speed=fast&picker=fixed')
            const switcher = page.getByTestId('theme-switcher')
            await switcher.locator('summary').click()
            await switcher.getByRole('button', { name: 'Dark theme', exact: true }).click()
        })

        test('has theme selector showing dark as the current theme', async ({ page }) => {
            const summary = page.getByTestId('theme-switcher').locator('summary')
            await expect(summary).toContainText('Dark theme')
        })

        test('has theme selector with light as an alternative option', async ({ page }) => {
            const switcher = page.getByTestId('theme-switcher')
            await switcher.locator('summary').click()
            const option = switcher.getByRole('button', { name: 'Light theme', exact: true })
            await expect(option).toBeVisible()
        })

        test('has a dark color scheme', async ({ page }) => {
            await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(17, 17, 17)')
        })

        test('keeps the dark theme after a reload', async ({ page }) => {
            await page.reload()
            const summary = page.getByTestId('theme-switcher').locator('summary')
            await expect(summary).toContainText('Dark theme')
            await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(17, 17, 17)')
        })    })
})

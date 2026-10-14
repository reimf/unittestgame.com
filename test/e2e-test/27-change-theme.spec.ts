import type { Page } from '@playwright/test'
import { test, expect } from '../fixture/fixture-coverage'

const switchTheme = async (page: Page, name: string): Promise<void> => {
    const switcher = page.getByTestId('theme-switcher')
    await switcher.locator('summary').click()
    await switcher.getByRole('button', { name, exact: true }).click()
}

test.describe('change theme', () => {
    test.describe('with a stored theme in an unknown format', () => {
        test.use({ colorScheme: 'light' })

        test.beforeEach(async ({ page }) => {
            await page.addInitScript(() => localStorage.setItem('theme', 'dark'))
            await page.goto('/en/game?speed=fast&picker=fixed')
        })

        test('has theme selector showing the system theme as the current theme', async ({ page }) => {
            const summary = page.getByTestId('theme-switcher').locator('summary')
            await expect(summary).toHaveText('Light theme with color')
        })

        test('has the system theme classes', async ({ page }) => {
            await expect(page.locator('html')).toHaveClass('theme-light theme-color')
        })
    })

    test.describe('with a light system theme', () => {
        test.use({ colorScheme: 'light' })

        test.beforeEach(async ({ page }) => {
            await page.goto('/en/game?speed=fast&picker=fixed')
        })

        test('has theme selector showing light with color as the current theme', async ({ page }) => {
            const summary = page.getByTestId('theme-switcher').locator('summary')
            await expect(summary).toHaveText('Light theme with color')
        })

        test('has theme selector with the other themes as alternative options', async ({ page }) => {
            const switcher = page.getByTestId('theme-switcher')
            await switcher.locator('summary').click()
            await expect(switcher.getByRole('button')).toHaveText(['Light theme grayscale', 'Dark theme with color', 'Dark theme grayscale'])
        })

        test('has a light color scheme', async ({ page }) => {
            await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(238, 238, 238)')
        })

        test('has color', async ({ page }) => {
            await expect(page.locator('html')).toHaveCSS('filter', 'none')
        })
    })

    test.describe('with a dark system theme', () => {
        test.use({ colorScheme: 'dark' })

        test.beforeEach(async ({ page }) => {
            await page.goto('/en/game?speed=fast&picker=fixed')
        })

        test('has theme selector showing dark with color as the current theme', async ({ page }) => {
            const summary = page.getByTestId('theme-switcher').locator('summary')
            await expect(summary).toHaveText('Dark theme with color')
        })

        test('has a dark color scheme', async ({ page }) => {
            await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(17, 17, 17)')
        })
    })

    test.describe('after switching to the dark theme with color', () => {
        test.use({ colorScheme: 'light' })

        test.beforeEach(async ({ page }) => {
            await page.goto('/en/game?speed=fast&picker=fixed')
            await switchTheme(page, 'Dark theme with color')
        })

        test('has theme selector showing dark with color as the current theme', async ({ page }) => {
            const summary = page.getByTestId('theme-switcher').locator('summary')
            await expect(summary).toHaveText('Dark theme with color')
        })

        test('has theme selector with the other themes as alternative options', async ({ page }) => {
            const switcher = page.getByTestId('theme-switcher')
            await switcher.locator('summary').click()
            await expect(switcher.getByRole('button')).toHaveText(['Light theme with color', 'Light theme grayscale', 'Dark theme grayscale'])
        })

        test('has a dark color scheme', async ({ page }) => {
            await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(17, 17, 17)')
        })

        test('has color', async ({ page }) => {
            await expect(page.locator('html')).toHaveCSS('filter', 'none')
        })

        test('keeps the dark theme with color after a reload', async ({ page }) => {
            await page.reload()
            const summary = page.getByTestId('theme-switcher').locator('summary')
            await expect(summary).toHaveText('Dark theme with color')
            await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(17, 17, 17)')
        })

        test('stores the theme', async ({ page }) => {
            expect(await page.evaluate(() => localStorage.getItem('theme'))).toBe('dark-color')
        })

        test('has the dark and color theme classes', async ({ page }) => {
            await expect(page.locator('html')).toHaveClass('theme-dark theme-color')
        })
    })

    test.describe('after switching to the light theme grayscale', () => {
        test.use({ colorScheme: 'dark' })

        test.beforeEach(async ({ page }) => {
            await page.goto('/en/game?speed=fast&picker=fixed')
            await switchTheme(page, 'Light theme grayscale')
        })

        test('has theme selector showing light grayscale as the current theme', async ({ page }) => {
            const summary = page.getByTestId('theme-switcher').locator('summary')
            await expect(summary).toHaveText('Light theme grayscale')
        })

        test('has a light color scheme', async ({ page }) => {
            await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(238, 238, 238)')
        })

        test('has no color', async ({ page }) => {
            await expect(page.locator('html')).toHaveCSS('filter', 'grayscale(1)')
        })

        test('keeps the light theme grayscale after a reload', async ({ page }) => {
            await page.reload()
            const summary = page.getByTestId('theme-switcher').locator('summary')
            await expect(summary).toHaveText('Light theme grayscale')
            await expect(page.locator('html')).toHaveCSS('filter', 'grayscale(1)')
            await expect(page.locator('html')).toHaveClass('theme-light theme-grayscale')
        })
    })

    test.describe('after switching to the dark theme grayscale', () => {
        test.use({ colorScheme: 'light' })

        test.beforeEach(async ({ page }) => {
            await page.goto('/en/game?speed=fast&picker=fixed')
            await switchTheme(page, 'Dark theme grayscale')
        })

        test('has theme selector showing dark grayscale as the current theme', async ({ page }) => {
            const summary = page.getByTestId('theme-switcher').locator('summary')
            await expect(summary).toHaveText('Dark theme grayscale')
        })

        test('has a dark color scheme', async ({ page }) => {
            await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(17, 17, 17)')
        })

        test('has no color', async ({ page }) => {
            await expect(page.locator('html')).toHaveCSS('filter', 'grayscale(1)')
        })

        test('has the dark and grayscale theme classes', async ({ page }) => {
            await expect(page.locator('html')).toHaveClass('theme-dark theme-grayscale')
        })
    })
})

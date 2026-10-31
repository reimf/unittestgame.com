import { test, expect } from '../fixture/fixture-coverage'

test.describe('change theme', () => {
    test.describe('with a light system theme', () => {
        test.use({ colorScheme: 'light' })

        test.beforeEach(async ({ page }) => {
            await page.goto('/en/game?speed=fast&picker=fixed')
        })

        test('has buttons showing light mode and color as the current theme', async ({ page }) => {
            await expect(page.getByTestId('light-dark-button')).toHaveText('Light mode')
            await expect(page.getByTestId('color-grayscale-button')).toHaveText('Color')
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

        test('has buttons showing dark mode and color as the current theme', async ({ page }) => {
            await expect(page.getByTestId('light-dark-button')).toHaveText('Dark mode')
            await expect(page.getByTestId('color-grayscale-button')).toHaveText('Color')
        })

        test('has a dark color scheme', async ({ page }) => {
            await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(17, 17, 17)')
        })
    })

    test.describe('after switching to dark mode', () => {
        test.use({ colorScheme: 'light' })

        test.beforeEach(async ({ page }) => {
            await page.goto('/en/game?speed=fast&picker=fixed')
            await page.getByTestId('light-dark-button').click()
        })

        test('has a button showing dark mode', async ({ page }) => {
            await expect(page.getByTestId('light-dark-button')).toHaveText('Dark mode')
        })

        test('has a dark color scheme', async ({ page }) => {
            await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(17, 17, 17)')
        })

        test('has color', async ({ page }) => {
            await expect(page.locator('html')).toHaveCSS('filter', 'none')
        })

        test('keeps dark mode after a reload', async ({ page }) => {
            await page.reload()
            await expect(page.getByTestId('light-dark-button')).toHaveText('Dark mode')
            await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(17, 17, 17)')
        })

        test('stores the theme', async ({ page }) => {
            expect(await page.evaluate(() => localStorage.getItem('theme'))).toBe('dark-color')
        })

        test('has the dark and color theme classes', async ({ page }) => {
            await expect(page.locator('html')).toHaveClass('theme-dark theme-color')
        })
    })

    test.describe('after switching to grayscale in light mode', () => {
        test.use({ colorScheme: 'light' })

        test.beforeEach(async ({ page }) => {
            await page.goto('/en/game?speed=fast&picker=fixed')
            await page.getByTestId('color-grayscale-button').click()
        })

        test('has a button showing grayscale', async ({ page }) => {
            await expect(page.getByTestId('color-grayscale-button')).toHaveText('Grayscale')
        })

        test('has a light color scheme', async ({ page }) => {
            await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(238, 238, 238)')
        })

        test('has no color', async ({ page }) => {
            await expect(page.locator('html')).toHaveCSS('filter', 'grayscale(1)')
        })

        test('keeps grayscale after a reload', async ({ page }) => {
            await page.reload()
            await expect(page.getByTestId('color-grayscale-button')).toHaveText('Grayscale')
            await expect(page.locator('html')).toHaveCSS('filter', 'grayscale(1)')
            await expect(page.locator('html')).toHaveClass('theme-light theme-grayscale')
        })

        test('switches back to color', async ({ page }) => {
            await page.getByTestId('color-grayscale-button').click()
            await expect(page.getByTestId('color-grayscale-button')).toHaveText('Color')
            await expect(page.locator('html')).toHaveClass('theme-light theme-color')
        })
    })

    test.describe('after switching to grayscale and dark mode', () => {
        test.use({ colorScheme: 'light' })

        test.beforeEach(async ({ page }) => {
            await page.goto('/en/game?speed=fast&picker=fixed')
            await page.getByTestId('color-grayscale-button').click()
            await page.getByTestId('light-dark-button').click()
        })

        test('has buttons showing dark mode and grayscale', async ({ page }) => {
            await expect(page.getByTestId('light-dark-button')).toHaveText('Dark mode')
            await expect(page.getByTestId('color-grayscale-button')).toHaveText('Grayscale')
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

        test('switches back to light mode and keeps grayscale', async ({ page }) => {
            await page.getByTestId('light-dark-button').click()
            await expect(page.getByTestId('light-dark-button')).toHaveText('Light mode')
            await expect(page.locator('html')).toHaveClass('theme-light theme-grayscale')
        })
    })
})

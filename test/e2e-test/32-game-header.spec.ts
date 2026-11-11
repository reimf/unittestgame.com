import { test, expect } from '../fixture/fixture-coverage'

test.describe('game header', () => {
    test.use({ colorScheme: 'light' })

    test.beforeEach(async ({ page }) => {
        await page.goto('/en/game?speed=fast&programming_language=python')
    })

    test('has no page links', async ({ page }) => {
        await expect(page.locator('nav').getByRole('link', { name: 'How it works' })).toHaveCount(0)
    })

    test('has a secondary exit button to the home page', async ({ page }) => {
        const exitGame = page.locator('nav').getByRole('link', { name: 'Exit', exact: true })
        await expect(exitGame).toHaveClass(/secondary/)
        // Following the link would load the home page script, which the game's coverage does not cover.
        await expect(exitGame).toHaveAttribute('href', '/en/index')
    })

    test('keeps the programming language when switching the language', async ({ page }) => {
        await page.getByTestId('settings-menu').locator('summary').first().click()
        await page.getByTestId('language-switcher').locator('summary').click()
        await page.getByTestId('language-switcher').getByRole('link', { name: 'Nederlands', exact: true }).click()
        await expect(page).toHaveURL('/nl/game?speed=fast&programming_language=python')
    })

    test.describe('after switching to dark mode in the header', () => {
        test.beforeEach(async ({ page }) => {
            await page.getByTestId('settings-menu').locator('summary').first().click()
            await page.getByTestId('theme-toggle').click()
        })

        test('has the dark theme', async ({ page }) => {
            await expect(page.locator('html')).toHaveClass(/theme-dark/)
            await expect(page.getByTestId('theme-toggle')).toHaveText(/Dark → Light mode/)
        })

        test('switches back to light mode', async ({ page }) => {
            await page.getByTestId('theme-toggle').click()
            await expect(page.locator('html')).toHaveClass(/theme-light/)
            await expect(page.getByTestId('theme-toggle')).toHaveText(/Light → Dark mode/)
        })
    })

    test.describe('after switching to grayscale in the header', () => {
        test.beforeEach(async ({ page }) => {
            await page.getByTestId('settings-menu').locator('summary').first().click()
            await page.getByTestId('color-toggle').click()
        })

        test('has the grayscale theme', async ({ page }) => {
            await expect(page.locator('html')).toHaveClass(/theme-grayscale/)
            await expect(page.getByTestId('color-toggle')).toHaveText(/Grayscale → Color/)
        })

        test('switches back to color', async ({ page }) => {
            await page.getByTestId('color-toggle').click()
            await expect(page.locator('html')).toHaveClass(/theme-color/)
            await expect(page.getByTestId('color-toggle')).toHaveText(/Color → Grayscale/)
        })
    })
})

test.describe('level progress', () => {
    test('is hidden before a level is chosen', async ({ page }) => {
        await page.goto('/en/game?speed=fast&store=map')
        await expect(page.getByTestId('level-progress')).toBeHidden()
        await expect(page.getByTestId('level-name')).toHaveText('')
    })

    test.describe('after choosing a level', () => {
        test.beforeEach(async ({ page }) => {
            await page.goto('/en/game?speed=fast&store=map&setitem=penalties-level-battery-level:0&setitem=penalties-level-voting-age:1')
            await page.getByRole('button', { name: 'I want to play Level 2 - Wind Scale', exact: true }).click()
        })

        test('shows the level that is played', async ({ page }) => {
            await expect(page.getByTestId('level-progress')).toBeVisible()
            await expect(page.getByTestId('level-progress-label')).toHaveText('Level 2')
            await expect(page.getByTestId('level-name')).toHaveText('Wind Scale')
        })

        test('shows the finished levels', async ({ page }) => {
            await expect(page.locator('#level-progress progress')).toHaveJSProperty('value', 2)
        })

        test('is hidden after aborting the level', async ({ page }) => {
            await page.getByRole('button', { name: 'I want to abort this level', exact: true }).click()
            await expect(page.getByTestId('level-progress')).toBeHidden()
            await expect(page.getByTestId('level-name')).toHaveText('')
        })
    })

    test('shows the retried level with every level finished', async ({ page }) => {
        const levels = ['battery-level', 'voting-age', 'wind-scale', 'review', 'discount', 'fizz-buzz', 'leap-year', 'triangle-type', 'speed-display', 'parking-fee']
        await page.goto('/en/game?speed=fast&store=map&' + levels.map(level => `setitem=penalties-level-${level}:0`).join('&'))
        await page.getByTestId('level-overview').getByRole('button', { name: 'Retry', exact: true }).first().click()
        await expect(page.getByTestId('level-progress-label')).toHaveText('Level 0')
        await expect(page.getByTestId('level-name')).toHaveText('Battery Level')
        await expect(page.locator('#level-progress progress')).toHaveJSProperty('value', 10)
    })
})

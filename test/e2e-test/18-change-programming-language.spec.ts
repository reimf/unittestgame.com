import { test, expect } from '../fixture/fixture-coverage'

test.describe('change programming language', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/en/game?speed=fast&picker=fixed')
        const switcher = page.getByTestId('programming-language-switcher')
        await switcher.locator('summary').click()
        await switcher.getByRole('link', { name: 'Python', exact: true }).click()
        await page.waitForLoadState()
    })

    test('has programming language selector showing Python as the current language', async ({ page }) => {
        const summary = page.getByTestId('programming-language-switcher').locator('summary')
        await expect(summary).toContainText('Python')
    })

    test('has programming language selector with JavaScript as an alternative option', async ({ page }) => {
        const switcher = page.getByTestId('programming-language-switcher')
        await switcher.locator('summary').click()
        const option = switcher.getByRole('link', { name: 'JavaScript', exact: true })
        await expect(option).toBeVisible()
    })

    test('has the simplest candidate rendered in Python format in the current function panel', async ({ page }) => {
        await page.getByRole('button', { name: 'I want to play Level 0 - Battery Level', exact: true }).click()
        const currentFunctionPanel = page.getByTestId('current-function')
        const codeLines = currentFunctionPanel.locator('code')
        await expect(codeLines).toContainText('def powerMode(batteryLevel: int) -> str:    return "UNKNOWN"')
    })
})

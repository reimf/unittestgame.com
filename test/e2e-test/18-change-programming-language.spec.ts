import { test, expect } from '../fixture/fixture-coverage'

test.describe('change programming language', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/?speed=fast&picker=fixed')
        await page.getByTestId('programming-language-switcher').locator('summary').click()
        await page.getByRole('link', { name: 'Switch to Python' }).click()
        await page.waitForLoadState()
    })

    test('has programming language selector with Python as selected option', async ({ page }) => {
        const summary = page.getByTestId('programming-language-switcher').locator('summary')
        await expect(summary).toHaveText('Programming Language: Python')
    })

    test('has programming language selector with JavaScript as an alternative option', async ({ page }) => {
        await page.getByTestId('programming-language-switcher').locator('summary').click()
        const link = page.getByRole('link', { name: 'Switch to JavaScript' })
        await expect(link).toHaveAttribute('href', /programmingLanguage=javascript/)
    })

    test('has the simplest candidate rendered in Python format in the current function panel', async ({ page }) => {
        await page.getByRole('button', { name: 'I want to play Level 1 - Battery Level' }).click()
        const currentFunctionPanel = page.getByTestId('current-function')
        const codeLines = currentFunctionPanel.locator('code')
        await expect(codeLines).toContainText('def powerMode(batteryLevel):    return ""')
    })
})

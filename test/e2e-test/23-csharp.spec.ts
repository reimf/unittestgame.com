import { test, expect } from '../fixture/fixture-coverage'

test.describe('csharp programming language', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/?speed=fast&programmingLanguage=csharp')
        await page.getByRole('button', { name: 'I want to play Level 1 - Battery Level' }).click()
    })

    test('has the simplest candidate rendered in C# format in the current function panel', async ({ page }) => {
        const currentFunctionPanel = page.getByTestId('current-function')
        const codeLines = currentFunctionPanel.locator('code')
        await expect(codeLines).toContainText('static string powerMode(int batteryLevel) {    return null;}')
    })
})

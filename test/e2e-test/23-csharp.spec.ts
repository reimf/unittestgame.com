import { test, expect } from '../fixture/fixture-coverage'

test.describe('csharp programming language', () => {
    test('has the simplest candidate rendered in C# format in the current function panel', async ({ page }) => {
        await page.goto('/?speed=fast&programmingLanguage=csharp')
        await page.getByRole('button', { name: 'I want to play Level 1 - Battery Level' }).click()
        const currentFunctionPanel = page.getByTestId('current-function')
        const codeLines = currentFunctionPanel.locator('code')
        await expect(codeLines).toContainText('static string powerMode(int batteryLevel) {    return null;}')
    })

    test('has a nullable bool return type in the current function panel', async ({ page }) => {
        await page.goto('/?speed=fast&programmingLanguage=csharp&setitem=level-battery-level-finished:1')
        await page.getByRole('button', { name: 'I want to play Level 2 - Voting Age' }).click()
        const currentFunctionPanel = page.getByTestId('current-function')
        const codeLines = currentFunctionPanel.locator('code')
        await expect(codeLines).toContainText('static bool? isAllowedToVote(int age) {')
    })

    test('has a double parameter type in the current function panel', async ({ page }) => {
        await page.goto('/?speed=fast&programmingLanguage=csharp&setitem=level-battery-level-finished:1&setitem=level-voting-age-finished:1&setitem=level-even-or-odd-finished:1&setitem=level-review-finished:1&setitem=level-fizz-buzz-finished:1&setitem=level-leap-year-finished:1&setitem=level-triangle-type-finished:1')
        await page.getByRole('button', { name: 'I want to play Level 8 - Speed Display' }).click()
        const currentFunctionPanel = page.getByTestId('current-function')
        const codeLines = currentFunctionPanel.locator('code')
        await expect(codeLines).toContainText('static string display(double speed) {')
    })
})

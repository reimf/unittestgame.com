import { test, expect } from '../fixture/fixture-coverage'

test.describe('php programming language', () => {
    test('has the simplest candidate rendered in PHP format in the current function panel', async ({ page }) => {
        await page.goto('/?speed=fast&picker=fixed&programming_language=php')
        await page.getByRole('button', { name: 'I want to play Level 1 - Battery Level' }).click()
        const currentFunctionPanel = page.getByTestId('current-function')
        const codeLines = currentFunctionPanel.locator('code')
        await expect(codeLines).toContainText('function powerMode(int $batteryLevel): string {    return "";}')
    })

    test('has a bool return type in the current function panel', async ({ page }) => {
        await page.goto('/?speed=fast&programming_language=php&setitem=level-battery-level-finished:1')
        await page.getByRole('button', { name: 'I want to play Level 2 - Voting Age' }).click()
        await page.getByLabel('Age').fill('18')
        await page.getByLabel('true').check()
        await page.getByRole('button', { name: 'I want to add this unit test' }).click()
        const currentFunctionPanel = page.getByTestId('current-function')
        const codeLines = currentFunctionPanel.locator('code')
        await expect(codeLines).toContainText('function isAllowedToVote(int $age): bool {    return true;}')
    })

    test('has an int parameter type in the current function panel of Speed Display', async ({ page }) => {
        await page.goto('/?speed=fast&programming_language=php&setitem=level-battery-level-finished:1&setitem=level-voting-age-finished:1&setitem=level-even-or-odd-finished:1&setitem=level-review-finished:1&setitem=level-fizz-buzz-finished:1&setitem=level-leap-year-finished:1&setitem=level-triangle-type-finished:1')
        await page.getByRole('button', { name: 'I want to play Level 8 - Speed Display' }).click()
        const currentFunctionPanel = page.getByTestId('current-function')
        const codeLines = currentFunctionPanel.locator('code')
        await expect(codeLines).toContainText('function display(int $speed): string {')
    })
})

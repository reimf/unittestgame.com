import { test, expect } from '../fixture/fixture-coverage'

test.describe('typescript programming language', () => {
    test('has the simplest candidate rendered in TypeScript format in the current function panel', async ({ page }) => {
        await page.goto('/?speed=fast&picker=fixed&programming_language=typescript')
        await page.getByRole('button', { name: 'I want to play Level 0 - Battery Level' }).click()
        const currentFunctionPanel = page.getByTestId('current-function')
        const codeLines = currentFunctionPanel.locator('code')
        await expect(codeLines).toContainText('function powerMode(batteryLevel: number): string {    return ""}')
    })

    test('has a plain boolean return type in the current function panel', async ({ page }) => {
        await page.goto('/?speed=fast&programming_language=typescript&setitem=level-battery-level-finished:1')
        await page.getByRole('button', { name: 'I want to play Level 1 - Voting Age' }).click()
        await page.getByLabel('Age').fill('18')
        await page.getByLabel('true').check()
        await page.getByRole('button', { name: 'I want to add this unit test' }).click()
        const currentFunctionPanel = page.getByTestId('current-function')
        const codeLines = currentFunctionPanel.locator('code')
        await expect(codeLines).toContainText('function isAllowedToVote(age: number): boolean {    return true}')
    })

    test('has a number parameter type in the current function panel of Speed Display', async ({ page }) => {
        await page.goto('/?speed=fast&programming_language=typescript&setitem=level-battery-level-finished:1&setitem=level-voting-age-finished:1&setitem=level-wind-scale-finished:1&setitem=level-review-finished:1&setitem=level-fizz-buzz-finished:1&setitem=level-leap-year-finished:1&setitem=level-triangle-type-finished:1')
        await page.getByRole('button', { name: 'I want to play Level 7 - Speed Display' }).click()
        const currentFunctionPanel = page.getByTestId('current-function')
        const codeLines = currentFunctionPanel.locator('code')
        await expect(codeLines).toContainText('function display(speed: number): string {')
    })
})

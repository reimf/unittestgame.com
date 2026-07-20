import { test, expect } from '../fixture/fixture-coverage'

test.describe('java programming language', () => {
    test('has the simplest candidate rendered in Java format in the current function panel', async ({ page }) => {
        await page.goto('/?speed=fast&picker=fixed&programming_language=java')
        await page.getByRole('button', { name: 'I want to play Level 0 - Battery Level' }).click()
        const currentFunctionPanel = page.getByTestId('current-function')
        const codeLines = currentFunctionPanel.locator('code')
        await expect(codeLines).toContainText('static String powerMode(int batteryLevel) {    return "";}')
    })

    test('has a primitive boolean return type in the current function panel', async ({ page }) => {
        await page.goto('/?speed=fast&programming_language=java&setitem=level-battery-level-finished:1')
        await page.getByRole('button', { name: 'I want to play Level 1 - Voting Age' }).click()
        await page.getByLabel('Age').fill('18')
        await page.getByLabel('true').check()
        await page.getByRole('button', { name: 'I want to add this unit test' }).click()
        const currentFunctionPanel = page.getByTestId('current-function')
        const codeLines = currentFunctionPanel.locator('code')
        await expect(codeLines).toContainText('static boolean isAllowedToVote(int age) {    return true;}')
    })

    test('has an int parameter type in the current function panel of Speed Display', async ({ page }) => {
        await page.goto('/?speed=fast&programming_language=java&setitem=level-battery-level-finished:1&setitem=level-voting-age-finished:1&setitem=level-wind-scale-finished:1&setitem=level-review-finished:1&setitem=level-fizz-buzz-finished:1&setitem=level-leap-year-finished:1&setitem=level-triangle-type-finished:1')
        await page.getByRole('button', { name: 'I want to play Level 7 - Speed Display' }).click()
        const currentFunctionPanel = page.getByTestId('current-function')
        const codeLines = currentFunctionPanel.locator('code')
        await expect(codeLines).toContainText('static String display(int speed) {')
    })
})

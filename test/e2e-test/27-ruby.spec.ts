import { test, expect } from '../fixture/fixture-coverage'

test.describe('ruby programming language', () => {
    test('has the simplest candidate rendered in Ruby format in the current function panel', async ({ page }) => {
        await page.goto('/game?speed=fast&picker=fixed&programming_language=ruby')
        await page.getByRole('button', { name: 'I want to play Level 0 - Battery Level' }).click()
        const currentFunctionPanel = page.getByTestId('current-function')
        const codeLines = currentFunctionPanel.locator('code')
        await expect(codeLines).toContainText('def powerMode(batteryLevel)    return "UNKNOWN"end')
    })

    test('has a plain boolean return value in the current function panel', async ({ page }) => {
        await page.goto('/game?speed=fast&programming_language=ruby&setitem=level-battery-level-finished:1')
        await page.getByRole('button', { name: 'I want to play Level 1 - Voting Age' }).click()
        await page.getByLabel('Age').fill('18')
        await page.getByLabel('true').check()
        await page.getByRole('button', { name: 'I want to add this unit test' }).click()
        const currentFunctionPanel = page.getByTestId('current-function')
        const codeLines = currentFunctionPanel.locator('code')
        await expect(codeLines).toContainText('def isAllowedToVote(age)    return trueend')
    })

    test('has an untyped parameter in the current function panel of Speed Display', async ({ page }) => {
        await page.goto('/game?speed=fast&programming_language=ruby&setitem=level-battery-level-finished:1&setitem=level-voting-age-finished:1&setitem=level-wind-scale-finished:1&setitem=level-review-finished:1&setitem=level-discount-finished:1&setitem=level-fizz-buzz-finished:1&setitem=level-leap-year-finished:1&setitem=level-triangle-type-finished:1')
        await page.getByRole('button', { name: 'I want to play Level 8 - Speed Display' }).click()
        const currentFunctionPanel = page.getByTestId('current-function')
        const codeLines = currentFunctionPanel.locator('code')
        await expect(codeLines).toContainText('def display(speed)')
    })
})

import { test, expect } from '../fixture/fixture-coverage'

test.describe('python programming language', () => {
    test('has the simplest candidate rendered in Python format in the current function panel', async ({ page }) => {
        await page.goto('/?speed=fast&picker=fixed&programming_language=python')
        await page.getByRole('button', { name: 'I want to play Level 0 - Battery Level' }).click()
        const currentFunctionPanel = page.getByTestId('current-function')
        const codeLines = currentFunctionPanel.locator('code')
        await expect(codeLines).toContainText('def powerMode(batteryLevel: int) -> str:    return ""')
    })

    test('has a plain bool return type in the current function panel', async ({ page }) => {
        await page.goto('/?speed=fast&programming_language=python&setitem=level-battery-level-finished:1')
        await page.getByRole('button', { name: 'I want to play Level 1 - Voting Age' }).click()
        await page.getByLabel('Age').fill('18')
        await page.getByLabel('true').check()
        await page.getByRole('button', { name: 'I want to add this unit test' }).click()
        const currentFunctionPanel = page.getByTestId('current-function')
        const codeLines = currentFunctionPanel.locator('code')
        await expect(codeLines).toContainText('def isAllowedToVote(age: int) -> bool:    return True')
    })
})

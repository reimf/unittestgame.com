import { test, expect } from '@playwright/test'

test.describe('tdd replay level', () => {
    test.beforeEach(async({ page }) => {
        await page.addInitScript({ path: './playwright-tests/e2e-tests/init_script.js' })
        await page.goto('http://localhost:5500/')
        await page.getByRole('button', { name: 'I want a sidebar for terms with a purple background' }).click()
        await page.getByRole('button', { name: 'I want to play Level 1 - Test-Driven Development - Voting Age' }).click()
        await page.getByRole('button', { name: 'Exit level' }).click()
        await page.getByRole('button', { name: 'I want to play Level 1 - Test-Driven Development - Voting Age' }).click()
    })

    test('has no unit tests in the unit tests panel', async({ page }) => {
        const unitTestsPanel = page.getByTestId('unit-tests')
        await expect(unitTestsPanel).toContainText('You have not written any unit tests yet')
    })

    test('has the simplest candidate in the current function panel', async({ page }) => {
        const currentFunctionPanel = page.getByTestId('current-function')
        const codeLines = currentFunctionPanel.locator('code > div')
        await expect(codeLines).toContainText(['function isAllowedToVote(age) {', '  return true', '}'])
    })

    test('has 100% in the score panel', async({ page }) => {
        const scorePanel = page.getByTestId('score')
        await expect(scorePanel).toContainText('100')
    })
})

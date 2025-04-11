import { test, expect } from '@playwright/test'

test.describe('mt level start', () => {
    test.beforeEach(async({ context, page }) => {
        await context.addInitScript(_ => localStorage.setItem('Main - Sidebar Shown', 'Sun, 31 Dec 1899 00:00:00 GMT'))
        await context.addInitScript(_ => localStorage.setItem('Test-Driven Development - Example Seen', 'Sun, 31 Dec 1899 00:00:00 GMT'))
        await context.addInitScript(_ => localStorage.setItem('Test-Driven Development - Voting Age', '100'))
        await context.addInitScript({ path: './playwright-tests/e2e-tests/init_script.js' })
        await page.goto('http://localhost:5500/')
        await page.getByRole('button', { name: 'I want to see an example of Mutation Testing' }).click()
        await page.getByRole('button', { name: 'divide(4, 2) === 2' }).click()
        await page.getByRole('button', { name: 'divide(9, 3) === 3' }).click()
        await page.getByRole('button', { name: 'divide(6, 3) === 2' }).click()
        await page.getByRole('button', { name: 'divide(5, 0) === 0' }).click()
        await page.getByRole('button', { name: 'I want to play Level 2 - Mutation Testing - Even or Odd' }).click()
    })

    test('has no unittestgame panel', async({ page }) => {
        const unittestgamePanel = page.getByTestId('unittestgame')
        await expect(unittestgamePanel).not.toBeAttached()
    })

    test('has no specification panel', async({ page }) => {
        const specificationPanel = page.getByTestId('specification')
        await expect(specificationPanel).not.toBeAttached()
    })

    test('has no unit tests in the unit tests panel', async({ page }) => {
        const unitTestsPanel = page.getByTestId('unit-tests')
        await expect(unitTestsPanel).toContainText('You have not written any unit tests yet')
    })

    test('has no current function panel', async({ page }) => {
        const currentFunctionPanel = page.getByTestId('current-function')
        await expect(currentFunctionPanel).not.toBeAttached()
    })

    test('has the perfect candidate in the function panel', async({ page }) => {
        const theFunctionPanel = page.getByTestId('the-function')
        const codeLines = theFunctionPanel.locator('code > div')
        await expect(codeLines).toContainText(['function isEven(number) {', '  if (number % 2 !== 0) return false', '  return true', '}'])
    })

    test('has the current level panel', async({ page }) => {
        const levelPanel = page.getByTestId('current-level')
        await expect(levelPanel).toContainText('Mutation Testing - Even or Odd')
    })

    test('has contract message', async({ page }) => {
        const messages = page.getByTestId('messages')
        await expect(messages).toContainText('You read The Function and write Unit Tests that pass')
    })

    test('has action menu message', async({ page }) => {
        const messages = page.getByTestId('messages')
        const buttons = messages.getByRole('button')
        await expect(buttons).toHaveText([
            'Add unit test',
            'Show hint',
            'Submit unit tests',
        ])
    })
})

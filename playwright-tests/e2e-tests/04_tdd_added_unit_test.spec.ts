import { test, expect } from '@playwright/test'

test.describe('tdd added unit test', () => {
    test.beforeEach(async({ context, page }) => {
        await context.addInitScript(_ => localStorage.setItem('Main - Sidebar Shown', 'Sun, 31 Dec 1899 00:00:00 GMT'))
        await context.addInitScript(_ => localStorage.setItem('Test-Driven Development - Example', 'Sun, 31 Dec 1899 00:00:00 GMT'))
        await context.addInitScript({ path: './playwright-tests/e2e-tests/init_script.js' })
        await page.goto('http://localhost:5500/')
        await page.getByRole('button', { name: 'I want to play Level 2 - Test-Driven Development - Voting Age' }).click()
        await page.getByRole('button', { name: 'Add unit test' }).click()
        await page.getByLabel('Age').fill('12')
        await page.getByLabel('false').check()
        await page.getByRole('button', { name: 'I want to add this unit test' }).click()
    })

    test('has add unit test message', async({ page }) => {
        const messages = page.getByTestId('messages')
        await expect(messages).toContainText('isAllowedToVote(12) === false')
    })

    test('has added unit test message', async({ page }) => {
        const messages = page.getByTestId('messages')
        await expect(messages).toContainText('I added the unit test')
    })

    test('has added unit test in unit tests panel', async({ page }) => {
        const unitTestsPanel = page.getByTestId('unit-tests')
        await expect(unitTestsPanel).toContainText('isAllowedToVote(12) === false')
    })

    test('has another candidate in the current function panel', async({ page }) => {
        const currentFunctionPanel = page.getByTestId('current-function')
        const codeLines = currentFunctionPanel.locator('code > div')
        await expect(codeLines).toContainText(['function isAllowedToVote(age) {', '  return false // was: return undefined', '}'])
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

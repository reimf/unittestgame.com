import { test, expect } from '@playwright/test'

test.describe('tdd level start', () => {
    test.beforeEach(async({ context, page }) => {
        await context.addInitScript({ path: './playwright-tests/e2e-tests/init_script.js' })
        await page.goto('http://localhost:5500/')
        await page.getByRole('button', { name: 'I want a sidebar for terms with a purple background' }).click()
        await page.getByRole('button', { name: 'I want to play Level 1 - Test-Driven Development - Voting Age' }).click()
    })

    test('has no unittestgame panel', async({ page }) => {
        const unittestgamePanel = page.getByTestId('unittestgame')
        await expect(unittestgamePanel).not.toBeAttached()
    })

    test('has specification panel', async({ page }) => {
        const specificationPanel = page.getByTestId('specification')
        await expect(specificationPanel).toContainText('Return true if the age is 18 years or over and return false if the age is under 18 ')
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

    test('has no the function panel', async({ page }) => {
        const theFunctionPanel = page.getByTestId('the-function')
        await expect(theFunctionPanel).not.toBeAttached()
    })

    test('has 100% in the score panel', async({ page }) => {
        const scorePanel = page.getByTestId('score')
        await expect(scorePanel).toContainText('100')
    })

    test('has contract message', async({ page }) => {
        const messages = page.getByTestId('messages')
        await expect(messages).toContainText('You read the Specification and write Unit Tests')
    })

    test('has action menu message', async({ page }) => {
        const messages = page.getByTestId('messages')
        const buttons = messages.getByRole('button')
        await expect(buttons).toHaveText([
            'Add unit test',
            'Show hint',
            'Submit unit tests',
            'Exit level',
        ])
    })
})

import { test, expect, Page } from '@playwright/test'

test.describe('tdd level start', () => {
    let page: Page

    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext()
        await context.addInitScript({ path: './tests/e2e-tests/init-script.js' })
        page = await context.newPage()
        await page.goto('/')
        await page.getByRole('button', { name: 'I want to play Level 1 of 20 - Battery Level - Test-Driven Development - 🔓' }).click()
        await page.getByRole('button', { name: 'I want to add this unit test' }).click()
        await page.getByRole('button', { name: 'I want to add this unit test' }).click()
        await page.getByRole('button', { name: 'I want to submit the unit tests' }).click()
        await page.getByRole('button', { name: 'I want to add this unit test' }).click()
        await page.getByRole('button', { name: 'I want to submit the unit tests' }).click()
        await page.getByRole('button', { name: 'I want to add this unit test' }).click()
        await page.getByRole('button', { name: 'I want to submit the unit tests' }).click()
        await page.getByRole('button', { name: 'I want to play Level 2 of 20 - Voting Age - Test-Driven Development - 🔓' }).click()
    })

    test('has no unittestgame panel', async () => {
        const unittestgamePanel = page.getByTestId('unittestgame')
        await expect(unittestgamePanel).not.toBeAttached()
    })

    test('has specification panel', async () => {
        const specificationPanel = page.getByTestId('specification')
        await expect(specificationPanel).toContainText('Return true if the age is 18 years or over and return false if the age is under 18 ')
    })

    test('has no unit tests in the unit tests panel', async () => {
        const unitTestsPanel = page.getByTestId('unit-tests')
        await expect(unitTestsPanel).toContainText('You have not written any unit tests yet')
    })

    test('has the simplest candidate in the current function panel', async () => {
        const currentFunctionPanel = page.getByTestId('current-function')
        const codeLines = currentFunctionPanel.locator('code')
        await expect(codeLines).toContainText('function isAllowedToVote(age) {  return undefined}')
    })

    test('has no the function panel', async () => {
        const theFunctionPanel = page.getByTestId('the-function')
        await expect(theFunctionPanel).not.toBeAttached()
    })

    test('has the current level panel', async () => {
        const levelPanel = page.getByTestId('current-level')
        await expect(levelPanel).toContainText('Voting Age - Test-Driven Development')
    })

    test('has contract message', async () => {
        const messages = page.getByTestId('messages')
        await expect(messages).toContainText('First, you read the Specification and then you write Unit Tests')
    })

    test('has action menu message', async () => {
        const messages = page.getByTestId('messages')
        const buttons = messages.getByRole('button')
        await expect(buttons).toHaveText([
            'I want to add this unit test',
            'I want to submit the unit tests',
        ])
    })

    test.afterAll(async () => {
        await page.close()
    })
})

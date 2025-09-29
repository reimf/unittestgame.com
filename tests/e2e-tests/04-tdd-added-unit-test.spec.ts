import { test, expect, Page } from '@playwright/test'

test.describe('tdd added unit test', () => {
    let page: Page

    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext()
        await context.addInitScript(_ => localStorage.setItem('level-test-driven-development-battery-level-finished', '1'))
        await context.addInitScript({ path: './tests/e2e-tests/init-script.js' })
        page = await context.newPage()
        await page.goto('/')
        await page.getByRole('button', { name: 'I want to play Level 2 of 20 - Test-Driven Development - Voting Age - 🔓' }).click()
        await page.getByLabel('Age').fill('12')
        await page.getByLabel('false').check()
        await page.getByRole('button', { name: 'I want to add this unit test' }).click()
    })

    test('has I want to add this unit test message', async () => {
        const messages = page.getByTestId('messages')
        await expect(messages).toContainText('isAllowedToVote(12) === false')
    })

    test('has added unit test message', async () => {
        const messages = page.getByTestId('messages')
        await expect(messages).toContainText('I added the unit test')
    })

    test('has added unit test in unit tests panel', async () => {
        const unitTestsPanel = page.getByTestId('unit-tests')
        await expect(unitTestsPanel).toContainText('isAllowedToVote(12) === false')
    })

    test('has another candidate in the current function panel', async () => {
        const currentFunctionPanel = page.getByTestId('current-function')
        const codeLines = currentFunctionPanel.locator('code > div')
        await expect(codeLines).toContainText(['function isAllowedToVote(age) {', '  return false', '}'])
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

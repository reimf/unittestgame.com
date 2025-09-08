import { test, expect, Page } from '@playwright/test'

test.describe('tdd submit insufficient unit test', () => {
    let page: Page

    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext()
        await context.addInitScript(_ => localStorage.setItem('Test-Driven Development - Example', '1'))
        await context.addInitScript({ path: './tests/e2e-tests/init-script.js' })
        page = await context.newPage()
        await page.goto('/')
        await page.getByRole('button', { name: 'I want to play Level 2 - Test-Driven Development - Voting Age - 🔓' }).click()
        await page.getByRole('button', { name: 'I want to submit the unit tests' }).click()
    })

    test('has bug found message', async () => {
        const messages = page.getByTestId('messages')
        await expect(messages).toContainText('The Current Function is NOT according to the Specification')
    })

    test('has unit test in bug found message', async () => {
        const messages = page.getByTestId('messages')
        await expect(messages).toContainText('isAllowedToVote(1) === undefined')
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

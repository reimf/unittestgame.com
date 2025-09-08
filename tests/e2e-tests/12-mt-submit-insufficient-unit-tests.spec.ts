import { test, expect, Page } from '@playwright/test'

test.describe('mt submit insufficient unit test', () => {
    let page: Page

    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext()
        await context.addInitScript(_ => localStorage.setItem('Test-Driven Development - Example', '1'))
        await context.addInitScript(_ => localStorage.setItem('Test-Driven Development - Voting Age', '1'))
        await context.addInitScript(_ => localStorage.setItem('Mutation Testing - Example', '1'))
        await context.addInitScript({ path: './tests/e2e-tests/init-script.js' })
        page = await context.newPage()
        await page.goto('/')
        await page.getByRole('button', { name: 'I want to play Level 4 of 18 - Mutation Testing - Even or Odd - 🔓' }).click()
        await page.getByRole('button', { name: 'I want to submit the unit tests' }).click()
    })

    test('has bug found message', async () => {
        const messages = page.getByTestId('messages')
        await expect(messages).toContainText('The Function is NOT fully tested')
    })

    test('has a function in bug found message', async () => {
        const messages = page.getByTestId('messages')
        const codeLines = messages.locator('code > div')
        await expect(codeLines).toContainText(['function isEven(num) {', '  return undefined', '}'])
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

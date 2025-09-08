import { test, expect, Page } from '@playwright/test'

test.describe('mt incorrect unit test', () => {
    let page: Page

    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext()
        await context.addInitScript(_ => localStorage.setItem('Test-Driven Development - Example', '1'))
        await context.addInitScript(_ => localStorage.setItem('Test-Driven Development - Voting Age', '1'))
        await context.addInitScript(_ => localStorage.setItem('Mutation Testing - Example', '1'))
        await context.addInitScript({ path: './tests/e2e-tests/init-script.js' })
        page = await context.newPage()
        await page.goto('/')
        await page.getByRole('button', { name: 'I want to play Level 4 - Mutation Testing - Even or Odd - 🔓' }).click()
        await page.getByLabel('Number').fill('42')
        await page.getByLabel('false').check()
        await page.getByRole('button', { name: 'I want to add this unit test' }).click()
    })

    test('has I want to add this unit test message', async () => {
        const messages = page.getByTestId('messages')
        await expect(messages).toContainText('isEven(42) === false')
    })

    test('has incorrect unit test message', async () => {
        const messages = page.getByTestId('messages')
        await expect(messages).toContainText('I did NOT add the unit test')
    })

    test('has NOT added unit test in unit tests panel', async () => {
        const unitTestsPanel = page.getByTestId('unit-tests')
        await expect(unitTestsPanel).not.toContainText('isEven(42) === false')
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

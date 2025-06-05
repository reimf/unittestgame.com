import { test, expect, Page } from '@playwright/test'

test.describe('mt I want to add this unit test', () => {
    let page: Page

    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext()
        await context.addInitScript(_ => localStorage.setItem('Main - Sidebar Shown', '1'))
        await context.addInitScript(_ => localStorage.setItem('Test-Driven Development - Example', '1'))
        await context.addInitScript(_ => localStorage.setItem('Test-Driven Development - Voting Age', '1'))
        await context.addInitScript(_ => localStorage.setItem('Mutation Testing - Example', '1'))
        await context.addInitScript({ path: './tests/e2e-tests/init-script.js' })
        page = await context.newPage()
        await page.goto('/')
        await page.getByRole('button', { name: 'I want to play Level 4 - Mutation Testing - Even or Odd - 🔓' }).click()
    })

    test('has number field', async () => {
        const number = page.getByLabel('Number')
        await expect(number).toBeInViewport()
    })

    test('asks is even', async () => {
        const messages = page.getByTestId('messages')
        await expect(messages).toContainText('Is even')
    })

    test('has add this unit test button', async () => {
        const button = page.getByRole('button', { name: 'I want to add this unit test' })
        await expect(button).toBeInViewport()
    })

    test('has submit unit tests button', async () => {
        const button = page.getByRole('button', { name: 'I want to submit the unit tests' })
        await expect(button).toBeInViewport()
    })

    test.afterAll(async () => {
        await page.close()
    })
})

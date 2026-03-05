import { test, expect, Page } from '@playwright/test'

test.describe('mt I want to add this unit test', () => {
    let page: Page

    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext()
        await context.addInitScript(_ => localStorage.setItem('level-test-driven-development-battery-level-finished', '1'))
        await context.addInitScript(_ => localStorage.setItem('level-test-driven-development-even-odd-finished', '1'))
        await context.addInitScript(_ => localStorage.setItem('level-mutation-testing-voting-age-finished', '1'))
        await context.addInitScript({ path: './tests/e2e-tests/init-script.js' })
        page = await context.newPage()
        await page.goto('/')
        await page.getByRole('button', { name: 'I want to play Level 4 - Battery Level - Mutation Testing' }).click()
    })

    test('has battery level field', async () => {
        const number = page.getByLabel('Battery Level')
        await expect(number).toBeInViewport()
    })

    test('asks power mode', async () => {
        const messages = page.getByTestId('messages')
        await expect(messages).toContainText('Power Mode')
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

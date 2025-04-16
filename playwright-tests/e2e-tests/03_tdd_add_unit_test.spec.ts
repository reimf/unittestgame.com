import { test, expect } from '@playwright/test'

test.describe('tdd add unit test', () => {
    test.beforeEach(async({ context, page }) => {
        await context.addInitScript(_ => localStorage.setItem('Main - Sidebar Shown', 'Sun, 31 Dec 1899 00:00:00 GMT'))
        await context.addInitScript(_ => localStorage.setItem('Test-Driven Development - Example', 'Sun, 31 Dec 1899 00:00:00 GMT'))
        await context.addInitScript({ path: './playwright-tests/e2e-tests/init_script.js' })
        await page.goto('http://localhost:5500/')
        await page.getByRole('button', { name: 'I want to play Level 2 - Test-Driven Development - Voting Age' }).click()
        await page.getByRole('button', { name: 'Add unit test' }).click()
    })

    test('has age number field', async({ page }) => {
        const age = page.getByLabel('Age')
        await expect(age).toBeInViewport()
    })

    test('asks is allowed to vote', async({ page }) => {
        const messages = page.getByTestId('messages')
        await expect(messages).toContainText('Is allowed to vote')
    })

    test('has submit button', async({ page }) => {
        const submitButton = page.getByRole('button', { name: 'I want to add this unit test' })
        await expect(submitButton).toBeInViewport()
    })

    test('has cancel button', async({ page }) => {
        const cancelButton = page.getByRole('button', { name: 'Cancel' })
        await expect(cancelButton).toBeInViewport()
    })
})

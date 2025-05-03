import { test, expect } from '@playwright/test'

test.describe('mt I want to add this unit test', () => {
    test.beforeEach(async({ context, page }) => {
        await context.addInitScript(_ => localStorage.setItem('Main - Sidebar Shown', '1'))
        await context.addInitScript(_ => localStorage.setItem('Test-Driven Development - Example', '1'))
        await context.addInitScript(_ => localStorage.setItem('Test-Driven Development - Voting Age', '100'))
        await context.addInitScript(_ => localStorage.setItem('Mutation Testing - Example', '1'))
        await context.addInitScript({ path: './playwright-tests/e2e-tests/init_script.js' })
        await page.goto('/')
        await page.getByRole('button', { name: 'I want to play Level 4 - Mutation Testing - Even or Odd' }).click()
    })

    test('has number field', async({ page }) => {
        const number = page.getByLabel('Number')
        await expect(number).toBeInViewport()
    })

    test('asks is even', async({ page }) => {
        const messages = page.getByTestId('messages')
        await expect(messages).toContainText('Is even')
    })

    test('has add this unit test button', async({ page }) => {
        const button = page.getByRole('button', { name: 'I want to add this unit test' })
        await expect(button).toBeInViewport()
    })

    test('has submit unit tests button', async({ page }) => {
        const button = page.getByRole('button', { name: 'I want to submit the unit tests' })
        await expect(button).toBeInViewport()
    })
})

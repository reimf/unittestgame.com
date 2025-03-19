import { test, expect } from '@playwright/test'

test.describe('hint unit test', () => {
    test.beforeEach(async({ page }) => {
        await page.goto('http://localhost:5500/')
        await page.evaluate(_ => localStorage.setItem('Test-Driven Development - Voting Age', '100%'))
        await page.goto('http://localhost:5500/')
        await page.getByRole('button', { name: 'I want to play Level 2 - Mutation Testing - Even or Odd' }).click()
        await page.getByRole('button', { name: 'I want to see a hint' }).click()
    })

    test('has hint function message', async({ page }) => {
        const messages = page.getByTestId('messages')
        await expect(messages).toContainText(/function isEven\(number\) \{\n  return (true|false|undefined)\n\}/)
    })

    test('has action menu message', async({ page }) => {
        const messages = page.getByTestId('messages')
        const buttons = messages.getByRole('button')
        await expect(buttons).toHaveText([
            'I want to add a unit test',
            'I want to see a hint',
            'I want to submit the unit tests',
            'I want to exit this level',
        ])
    })
})

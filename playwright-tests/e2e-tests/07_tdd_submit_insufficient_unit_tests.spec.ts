import { test, expect } from '@playwright/test'

test.describe('tdd submit insufficient unit test', () => {
    test.beforeEach(async({ page }) => {
        await page.goto('http://localhost:5500/')
        await page.getByRole('button', { name: 'I want to play Level 1 - Test Driven Development - Voting Age' }).click()
        await page.getByRole('button', { name: 'I want to submit the unit tests' }).click()
    })

    test('has bug found message', async({ page }) => {
        const messages = page.getByTestId('messages')
        await expect(messages).toContainText('I checked the current function, but it is NOT according to the specification')
    })

    test('has unit test in bug found message', async({ page }) => {
        const messages = page.getByTestId('messages')
        await expect(messages).toContainText(/isAllowedToVote\(\d+\) === (true|false|undefined)/)
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

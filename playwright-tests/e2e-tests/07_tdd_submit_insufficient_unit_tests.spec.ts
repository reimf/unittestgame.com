import { test, expect } from '@playwright/test'

test.describe('tdd submit insufficient unit test', () => {
    test.beforeEach(async({ context, page }) => {
        await context.addInitScript({ path: './playwright-tests/e2e-tests/init_script.js' })
        await page.goto('http://localhost:5500/')
        await page.getByRole('button', { name: 'I want a sidebar for terms with a purple background' }).click()
        await page.getByRole('button', { name: 'I want to play Level 1 - Test-Driven Development - Voting Age' }).click()
        await page.getByRole('button', { name: 'Submit unit tests' }).click()
    })

    test('has bug found message', async({ page }) => {
        const messages = page.getByTestId('messages')
        await expect(messages).toContainText('I checked the Current Function, but it is NOT according to the Specification')
    })

    test('has unit test in bug found message', async({ page }) => {
        const messages = page.getByTestId('messages')
        await expect(messages).toContainText('isAllowedToVote(1) === true') 
    })

    test('has action menu message', async({ page }) => {
        const messages = page.getByTestId('messages')
        const buttons = messages.getByRole('button')
        await expect(buttons).toHaveText([
            'Add unit test',
            'Show hint',
            'Submit unit tests',
            'Exit level',
        ])
    })
})

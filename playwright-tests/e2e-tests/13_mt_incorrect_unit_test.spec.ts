import { test, expect } from '@playwright/test'

test.describe('mt incorrect unit test', () => {
    test.beforeEach(async({ page }) => {
        await page.goto('http://localhost:5500/')
        await page.evaluate(_ => localStorage.setItem('Test-Driven Development - Voting Age', '100%'))
        await page.goto('http://localhost:5500/')
        await page.getByRole('button', { name: 'I want to play Level 2 - Mutation Testing - Even or Odd' }).click()
        await page.getByRole('button', { name: 'I want to add a unit test' }).click()
        await page.getByLabel('Number').fill('42')
        await page.getByLabel('Is even').uncheck()
        await page.getByRole('button', { name: 'I want to add this unit test' }).click()
    })

    test('has add unit test message', async({ page }) => {
        const messages = page.getByTestId('messages')
        await expect(messages).toContainText('isEven(42) === false')
    })

    test('has incorrect unit test message', async({ page }) => {
        const messages = page.getByTestId('messages')
        await expect(messages).toContainText('I did NOT add the unit test')
    })

    test('has NOT added unit test in unit tests panel', async({ page }) => {
        const unitTestsPanel = page.getByTestId('unit-tests')
        await expect(unitTestsPanel).not.toContainText('isEven(42) === false')
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

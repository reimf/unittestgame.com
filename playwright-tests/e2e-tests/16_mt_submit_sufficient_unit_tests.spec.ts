import { test, expect } from '@playwright/test'

test.describe('mt submit insufficient unit test', () => {
    test.beforeEach(async({ context, page }) => {
        await context.addInitScript(_ => localStorage.setItem('Main - Sidebar Shown', 'Sun, 31 Dec 1899 00:00:00 GMT'))
        await context.addInitScript(_ => localStorage.setItem('Test-Driven Development - Example Seen', 'Sun, 31 Dec 1899 00:00:00 GMT'))
        await context.addInitScript(_ => localStorage.setItem('Test-Driven Development - Voting Age', '100'))
        await context.addInitScript(_ => localStorage.setItem('Mutation Testing - Example Seen', 'Sun, 31 Dec 1899 00:00:00 GMT'))
        await context.addInitScript({ path: './playwright-tests/e2e-tests/init_script.js' })
        await page.goto('http://localhost:5500/')
        await page.getByRole('button', { name: 'I want to play Level 2 - Mutation Testing - Even or Odd' }).click()
        await page.getByRole('button', { name: 'Add unit test' }).click()
        await page.getByLabel('Number').fill('42')
        await page.getByLabel('Is even').check()
        await page.getByRole('button', { name: 'I want to add this unit test' }).click()
        await page.getByRole('button', { name: 'Add unit test' }).click()
        await page.getByLabel('Number').fill('43')
        await page.getByLabel('Is even').uncheck()
        await page.getByRole('button', { name: 'I want to add this unit test' }).click()
        await page.getByRole('button', { name: 'Submit unit tests' }).click()
    })

    test('has end message', async({ page }) => {
        const messages = page.getByTestId('messages')
        await expect(messages).toContainText('I checked The Function and it is indeed fully tested')
    })

    test('has finished levels panel', async({ page }) => {
        const finishedLevels = page.getByTestId('finished-levels')
        await expect(finishedLevels).toContainText('Level 2 - Mutation Testing - Even or Odd')
    })

    test('has level menu message', async({ page }) => {
        const messages = page.getByTestId('messages')
        const button = messages.getByRole('button')
        await expect(button).toHaveText('I want to play Level 3 - Test-Driven Development - FizzBuzz')
    })
})

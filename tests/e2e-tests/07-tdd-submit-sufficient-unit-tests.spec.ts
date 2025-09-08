import { test, expect, Page } from '@playwright/test'

test.describe('tdd submit sufficient unit test', () => {
    let page: Page

    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext()
        await context.addInitScript(_ => localStorage.setItem('Test-Driven Development - Example', '1'))
        await context.addInitScript({ path: './tests/e2e-tests/init-script.js' })
        page = await context.newPage()
        await page.goto('/')
        await page.getByRole('button', { name: 'I want to play Level 2 - Test-Driven Development - Voting Age - 🔓' }).click()

        await page.getByLabel('Age').fill('16')
        await page.getByLabel('false').check()
        await page.getByRole('button', { name: 'I want to add this unit test' }).click()

        await page.getByLabel('Age').fill('17')
        await page.getByLabel('false').check()
        await page.getByRole('button', { name: 'I want to add this unit test' }).click()

        await page.getByLabel('Age').fill('18')
        await page.getByLabel('true').check()
        await page.getByRole('button', { name: 'I want to add this unit test' }).click()

        await page.getByLabel('Age').fill('19')
        await page.getByLabel('true').check()
        await page.getByRole('button', { name: 'I want to add this unit test' }).click()

        await page.getByRole('button', { name: 'I want to submit the unit tests' }).click()
    })

    test('has end message', async () => {
        const messages = page.getByTestId('messages')
        await expect(messages).toContainText('The Current Function is indeed according to the Specification')
    })

    test('has finished levels panel', async () => {
        const finishedLevels = page.getByTestId('finished-levels')
        await expect(finishedLevels).toContainText('Level 2 - Test-Driven Development - Voting Age')
    })

    test('has see example message', async () => {
        const messages = page.getByTestId('messages')
        const button = messages.getByRole('button')
        await expect(button).toHaveText('I want to play Level 3 - Mutation Testing - Example - 🔓')
    })

    test.afterAll(async () => {
        await page.close()
    })
})

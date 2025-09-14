import { test, expect, Page } from '@playwright/test'

test.describe('mt submit sufficient unit test', () => {
    let page: Page

    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext()
        await context.addInitScript(_ => localStorage.setItem('level-test-driven-development-battery-level-finished', '1'))
        await context.addInitScript(_ => localStorage.setItem('level-test-driven-development-voting-age-finished', '1'))
        await context.addInitScript(_ => localStorage.setItem('level-mutation-testing-battery-level-finished', '1'))
        await context.addInitScript({ path: './tests/e2e-tests/init-script.js' })
        page = await context.newPage()
        await page.goto('/')
        await page.getByRole('button', { name: 'I want to play Level 4 of 18 - Mutation Testing - Even or Odd - 🔓' }).click()

        await page.getByLabel('Number').fill('42')
        await page.getByLabel('true').check()
        await page.getByRole('button', { name: 'I want to add this unit test' }).click()

        await page.getByLabel('Number').fill('43')
        await page.getByLabel('false').check()
        await page.getByRole('button', { name: 'I want to add this unit test' }).click()

        await page.getByRole('button', { name: 'I want to submit the unit tests' }).click()
    })

    test('has end message', async () => {
        const messages = page.getByTestId('messages')
        await expect(messages).toContainText('The Function is indeed fully tested')
    })

    test('has finished levels panel', async () => {
        const finishedLevels = page.getByTestId('finished-levels')
        await expect(finishedLevels).toContainText('Level 4 of 18 - Mutation Testing - Even or Odd')
    })

    test('has level menu message', async () => {
        const messages = page.getByTestId('messages')
        const button = messages.getByRole('button')
        await expect(button).toHaveText('I want to play Level 5 of 18 - Test-Driven Development - FizzBuzz - 🔓')
    })

    test.afterAll(async () => {
        await page.close()
    })
})

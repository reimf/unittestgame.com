import { test, expect } from '../fixture/fixture-coverage'

test.describe('submit too many unit tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/?speed=fast&setitem=level-battery-level-finished:1')
        await page.getByRole('button', { name: 'I want to play Level 2 - Voting Age' }).click()

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

        await page.getByLabel('Age').fill('20')
        await page.getByLabel('true').check()
        await page.getByRole('button', { name: 'I want to add this unit test' }).click()

        await page.getByRole('button', { name: 'I want to submit the unit tests' }).click()
    })

    test('has current function matches message', async ({ page }) => {
        const messages = page.getByTestId('messages')
        await expect(messages).toContainText('Well done! The Current Function matches the Specification.')
    })

    test('has tested thoroughly message', async ({ page }) => {
        const messages = page.getByTestId('messages')
        await expect(messages).toContainText('You\'ve tested the Current Function thoroughly, but you wrote 1 more unit test than necessary')
    })

    test('has 2 unit tests in the message', async ({ page }) => {
        const messages = page.getByTestId('messages')
        await expect(messages).toContainText('isAllowedToVote(19) === true')
        await expect(messages).toContainText('isAllowedToVote(20) === true')
    })
})

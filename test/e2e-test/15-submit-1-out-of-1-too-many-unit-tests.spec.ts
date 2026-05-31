import { test, expect } from '../fixture/fixture-coverage'

test.describe('submit 1 out of 1 too many unit tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/?speed=fast&setitem=level-battery-level-finished:1&setitem=level-voting-age-finished:1')
        await page.getByRole('button', { name: 'I want to play Level 3 - Even or Odd' }).click()
        await page.getByLabel('Number').fill('26')
        await page.getByLabel('true').check()
        await page.getByRole('button', { name: 'I want to add this unit test' }).click()
        await page.getByLabel('Number').fill('25')
        await page.getByLabel('false').check()
        await page.getByRole('button', { name: 'I want to add this unit test' }).click()
        await page.getByLabel('Number').fill('4')
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

    test('has 1 unit test in the message', async ({ page }) => {
        const messages = page.getByTestId('messages')
        await expect(messages).toContainText('isEven(4) === true')
    })
})

import { test, expect } from '../fixture/fixture-coverage'

test.describe('immediate submit unit tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/game?speed=fast&setitem=level-battery-level-finished:1')
        await page.getByRole('button', { name: 'I want to play Level 1 - Voting Age', exact: true }).click()
        await page.getByRole('button', { name: 'I want to submit the unit tests', exact: true }).click()
    })

    test('has need message', async ({ page }) => {
        const messages = page.getByTestId('messages')
        await expect(messages).toContainText('The Current Function doesn\'t match the Specification yet. You need at least 4 more unit tests, so write a unit test that matches the Specification and that the Current Function fails.')
    })
})

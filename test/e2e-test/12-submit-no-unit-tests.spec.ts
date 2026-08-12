import { test, expect } from '../fixture/fixture-coverage'

test.describe('submit no unit tests with radio variable unit', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/game-en.html?speed=fast&picker=fixed&setitem=penalties-level-battery-level:0&setitem=penalties-level-voting-age:0&setitem=penalties-level-wind-scale:1')
        await page.getByRole('button', { name: 'I want to play Level 3 - Review', exact: true }).click()
        await page.getByRole('button', { name: 'I want to submit the unit tests', exact: true }).click()
    })

    test('has unit test with undefined result in not according message', async ({ page }) => {
        const messages = page.getByTestId('messages')
        await expect(messages).toContainText('review(10, 4) === "UNKNOWN"')
    })
})

test.describe('submit no unit tests with text variable unit', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/game-en.html?speed=fast&picker=fixed&setitem=penalties-level-battery-level:0&setitem=penalties-level-voting-age:0&setitem=penalties-level-wind-scale:0&setitem=penalties-level-review:0&setitem=penalties-level-discount:0&setitem=penalties-level-fizz-buzz:0&setitem=penalties-level-leap-year:0&setitem=penalties-level-triangle-type:1')
        await page.getByRole('button', { name: 'I want to play Level 8 - Speed Display', exact: true }).click()
        await page.getByRole('button', { name: 'I want to submit the unit tests', exact: true }).click()
    })

    test('has unit test with undefined result in not according message', async ({ page }) => {
        const messages = page.getByTestId('messages')
        await expect(messages).toContainText('display(0) === "UNKNOWN"')
    })
})

import { test, expect } from '../fixture/fixture-coverage'

test.describe('submit no unit tests with radio variable unit', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/?speed=fast&picker=fixed&setitem=level-battery-level-finished:1&setitem=level-voting-age-finished:1&setitem=level-even-or-odd-finished:1')
        await page.getByRole('button', { name: 'I want to play Level 4 - Review' }).click()
        await page.getByRole('button', { name: 'I want to submit the unit tests' }).click()
    })

    test('has unit test with undefined result in not according message', async ({ page }) => {
        const messages = page.getByTestId('messages')
        await expect(messages).toContainText('review(10, 4) === "GOOD"')
    })
})

test.describe('submit no unit tests with text variable unit', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/?speed=fast&picker=fixed&setitem=level-battery-level-finished:1&setitem=level-voting-age-finished:1&setitem=level-even-or-odd-finished:1&setitem=level-review-finished:1&setitem=level-fizz-buzz-finished:1&setitem=level-leap-year-finished:1&setitem=level-triangle-type-finished:1')
        await page.getByRole('button', { name: 'I want to play Level 8 - Speed Display' }).click()
        await page.getByRole('button', { name: 'I want to submit the unit tests' }).click()
    })

    test('has unit test with undefined result in not according message', async ({ page }) => {
        const messages = page.getByTestId('messages')
        await expect(messages).toContainText('display(3) === "START"')
    })
})

import { test, expect } from '../fixture/fixture-coverage'

test.describe('submit insufficient unit tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/?speed=fast&setitem=level-battery-level-finished:1')
        await page.getByRole('button', { name: 'I want to play Level 2 - Voting Age' }).click()
        await page.getByRole('button', { name: 'I want to submit the unit tests' }).click()
    })

    test('has not according message', async ({ page }) => {
        const messages = page.getByTestId('messages')
        await expect(messages).toContainText('The following unit test doesn\'t match the Specification, but the Current Function passes it.')
    })

    test('has unit test in not according message', async ({ page }) => {
        const messages = page.getByTestId('messages')
        await expect(messages).toContainText(/isAllowedToVote\(\d+\) === undefined/)
    })

    test('has age field', async ({ page }) => {
        const age = page.getByRole('textbox', { name: 'Age' })
        await expect(age).toBeVisible()
    })

    test('has allowed to vote true field', async ({ page }) => {
        const isAllowedToVoteTrue = page.getByRole('radio', { name: 'true' })
        await expect(isAllowedToVoteTrue).toBeVisible()
    })

    test('has allowed to vote false field', async ({ page }) => {
        const isAllowedToVoteFalse = page.getByRole('radio', { name: 'false' })
        await expect(isAllowedToVoteFalse).toBeVisible()
    })

    test('has add this unit test button', async ({ page }) => {
        const button = page.getByRole('button', { name: 'I want to add this unit test' })
        await expect(button).toBeVisible()
    })

    test('has submit unit tests button', async ({ page }) => {
        const button = page.getByRole('button', { name: 'I want to submit the unit tests' })
        await expect(button).toBeVisible()
    })
})

import { test, expect } from '../fixture/fixture-coverage'

test.describe('incorrect unit test', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/game?speed=fast&setitem=penalties-level-battery-level:1')
        await page.getByRole('button', { name: 'I want to play Level 1 - Voting Age', exact: true }).click()
        await page.getByLabel('Age').fill('17')
        await page.getByLabel('true').check()
        await page.getByRole('button', { name: 'I want to add this unit test', exact: true }).click()
    })

    test('has unit test message', async ({ page }) => {
        const messages = page.getByTestId('messages')
        await expect(messages).toContainText('isAllowedToVote(17) === true')
    })

    test('has incorrect unit test message', async ({ page }) => {
        const messages = page.getByTestId('messages')
        await expect(messages).toContainText('I didn\'t add the unit test')
    })

    test('has NO unit tests panel', async ({ page }) => {
        const unitTestsPanel = page.getByTestId('unit-tests')
        await expect(unitTestsPanel).not.toBeVisible()
    })

    test('has age field', async ({ page }) => {
        const age = page.getByRole('spinbutton', { name: 'Value of parameter age', exact: true })
        await expect(age).toBeVisible()
    })

    test('has allowed to vote true field', async ({ page }) => {
        const isAllowedToVoteTrue = page.getByRole('radio', { name: 'true', exact: true })
        await expect(isAllowedToVoteTrue).toBeVisible()
    })

    test('has allowed to vote false field', async ({ page }) => {
        const isAllowedToVoteFalse = page.getByRole('radio', { name: 'false', exact: true })
        await expect(isAllowedToVoteFalse).toBeVisible()
    })

    test('has add this unit test button', async ({ page }) => {
        const button = page.getByRole('button', { name: 'I want to add this unit test', exact: true })
        await expect(button).toBeVisible()
    })

    test('has submit unit tests button', async ({ page }) => {
        const button = page.getByRole('button', { name: 'I want to submit the unit tests', exact: true })
        await expect(button).toBeVisible()
    })
})

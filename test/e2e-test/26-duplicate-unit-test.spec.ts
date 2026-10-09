import { test, expect } from '../fixture/fixture-coverage'

test.describe('duplicate unit test', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/en/game?speed=fast&setitem=penalties-level-battery-level:1')
        await page.getByRole('button', { name: 'I want to play Level 1 - Voting Age', exact: true }).click()
        await page.getByLabel('Age').fill('18')
        await page.getByLabel('true').check()
        await page.getByRole('button', { name: 'I want to add this unit test', exact: true }).click()
        await page.getByLabel('Age').fill('18')
        await page.getByLabel('true').check()
        await page.getByRole('button', { name: 'I want to add this unit test', exact: true }).click()
    })

    test('has duplicate unit test message', async ({ page }) => {
        const messages = page.getByTestId('messages')
        await expect(messages).toContainText('You had already added this unit test, so I didn\'t add it again.')
    })

    test('has hint message', async ({ page }) => {
        const messages = page.getByTestId('messages')
        await expect(messages).toContainText('Find an input for which the Current Function returns something other than the Specification says, and write a unit test for that input.')
    })

    test('has NOT added the unit test twice in unit tests panel', async ({ page }) => {
        const unitTestsPanel = page.getByTestId('unit-tests')
        const listItems = unitTestsPanel.getByRole('listitem')
        await expect(listItems).toHaveCount(1)
    })
})

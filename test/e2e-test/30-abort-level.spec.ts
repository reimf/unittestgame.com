import { test, expect } from '../fixture/fixture-coverage'

test.describe('abort level', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/en/game?speed=fast&picker=fixed&store=map')
        await page.getByRole('button', { name: 'I want to play Level 0 - Battery Level', exact: true }).click()
    })

    test('offers aborting as a third choice', async ({ page }) => {
        const message = page.getByTestId('messages').locator('> div').last()
        await expect(message.locator('.or')).toHaveCount(2)
        await expect(message.getByRole('button', { name: 'I want to abort this level', exact: true })).toHaveClass(/secondary/)
    })

    test.describe('after aborting', () => {
        test.beforeEach(async ({ page }) => {
            await page.getByRole('button', { name: 'I want to abort this level', exact: true }).click()
        })

        test('answers the message', async ({ page }) => {
            await expect(page.getByTestId('messages')).toContainText('I want to abort this level.')
        })

        test('shows the level overview', async ({ page }) => {
            await expect(page.getByTestId('level-overview')).toBeVisible()
        })

        test('offers the same level again', async ({ page }) => {
            await expect(page.getByRole('button', { name: 'I want to play Level 0 - Battery Level', exact: true })).toBeVisible()
        })

        test('does not finish the level', async ({ page }) => {
            await expect(page.getByTestId('level-overview').getByRole('button', { name: 'Retry', exact: true })).toHaveCount(0)
        })

        test('restarts the level when played again', async ({ page }) => {
            await page.getByRole('button', { name: 'I want to play Level 0 - Battery Level', exact: true }).click()
            await expect(page.getByTestId('unit-tests')).toHaveCount(0)
            await expect(page.getByRole('button', { name: 'I want to abort this level', exact: true })).toBeVisible()
        })
    })
})

test.describe('abort a retried level', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/en/game?speed=fast&setitem=penalties-level-battery-level:1&store=map')
        await page.getByTestId('level-overview').getByRole('button', { name: 'Retry', exact: true }).click()
        await page.getByRole('button', { name: 'I want to abort this level', exact: true }).click()
    })

    test('keeps the earlier result', async ({ page }) => {
        await expect(page.getByTestId('level-overview')).toContainText('🥈')
    })

    test('keeps the retry button', async ({ page }) => {
        await expect(page.getByTestId('level-overview').getByRole('button', { name: 'Retry', exact: true })).toHaveCount(1)
    })
})

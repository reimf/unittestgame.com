import { test, expect } from '../fixture/fixture-coverage'

test.describe('retry level', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/game-en.html?speed=fast&setitem=penalties-level-battery-level:1&store=map')
    })

    test('has a retry button only for the finished level', async ({ page }) => {
        const levelsPanel = page.getByTestId('level-overview')
        await expect(levelsPanel.getByRole('button', { name: 'Retry', exact: true })).toHaveCount(1)
    })

    test('restarts the finished level', async ({ page }) => {
        await page.getByTestId('level-overview').getByRole('button', { name: 'Retry', exact: true }).click()
        const specificationPanel = page.getByTestId('specification')
        await expect(specificationPanel).toContainText('Specification (Level 0 - Battery Level)')
        const currentFunctionPanel = page.getByTestId('current-function')
        const codeLines = currentFunctionPanel.locator('code > div')
        await expect(codeLines).toContainText(['function powerMode(batteryLevel) {', '    return "UNKNOWN"', '}'])
    })

    test('answers the play next level message', async ({ page }) => {
        const messages = page.getByTestId('messages')
        await expect(messages).toContainText('I want to play Level 1 - Voting Age')
        await page.getByTestId('level-overview').getByRole('button', { name: 'Retry', exact: true }).click()
        await expect(messages).toContainText('I want to retry Level 0 - Battery Level.')
        await expect(messages).not.toContainText('I want to play Level 1 - Voting Age')
    })
})

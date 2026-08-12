import { test, expect } from '../fixture/fixture-coverage'

test.describe('play next level from overview', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/game-en.html?speed=fast')
    })

    test('starts the next level', async ({ page }) => {
        await page.getByTestId('level-overview').getByRole('button', { name: 'Play', exact: true }).click()
        const specificationPanel = page.getByTestId('specification')
        await expect(specificationPanel).toContainText('Specification (Level 0 - Battery Level)')
    })

    test('answers the play next level message', async ({ page }) => {
        const messages = page.getByTestId('messages')
        await expect(messages).toContainText('I want to play Level 0 - Battery Level')
        await page.getByTestId('level-overview').getByRole('button', { name: 'Play', exact: true }).click()
        await expect(messages).toContainText('I want to play Level 0 - Battery Level.')
    })
})

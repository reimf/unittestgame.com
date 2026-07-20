import { test, expect } from '../fixture/fixture-coverage'

test.describe('level emojis', () => {
    test('has level overview panel', async ({ page }) => {
        await page.goto('/?speed=fast&setitem=level-battery-level-finished:1&setitem=level-voting-age-finished:2&setitem=level-wind-scale-finished:3&setitem=level-review-finished:4')
        const levelsPanel = page.getByTestId('level-overview')
        await expect(levelsPanel).toContainText(
            '🥇Level 0 - Battery Level' +
            '🥈Level 1 - Voting Age' +
            '🥉Level 2 - Wind Scale' +
            '💩Level 3 - Review' +
            '▶️Level 4 - FizzBuzz' +
            '🔒Level 5 - Leap Year' +
            '🔒Level 6 - Triangle Type' +
            '🔒Level 7 - Speed Display' +
            '🔒Level 8 - Float Format' +
            '🔒Level 9 - Password Strength')
    })
})

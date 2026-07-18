import { test, expect } from '../fixture/fixture-coverage'

test.describe('level emojis', () => {
    test('has level overview panel', async ({ page }) => {
        await page.goto('/?speed=fast&setitem=level-battery-level-finished:1&setitem=level-voting-age-finished:2&setitem=level-even-or-odd-finished:3&setitem=level-review-finished:4')
        const levelsPanel = page.getByTestId('level-overview')
        await expect(levelsPanel).toContainText(
            '🥇Level 1 - Battery Level' +
            '🥈Level 2 - Voting Age' +
            '🥉Level 3 - Even or Odd' +
            '💩Level 4 - Review' +
            '▶️Level 5 - FizzBuzz' +
            '🔒Level 6 - Leap Year' +
            '🔒Level 7 - Triangle Type' +
            '🔒Level 8 - Speed Display' +
            '🔒Level 9 - Float Format' +
            '🔒Level 10 - Password Strength')
    })
})

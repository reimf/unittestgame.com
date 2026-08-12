import { test, expect } from '../fixture/fixture-coverage'

test.describe('level emojis', () => {
    test('has level overview panel', async ({ page }) => {
        await page.goto('/game-en.html?speed=fast&setitem=penalties-level-battery-level:0&setitem=penalties-level-voting-age:1&setitem=penalties-level-wind-scale:2&setitem=penalties-level-review:3')
        const levelsPanel = page.getByTestId('level-overview')
        await expect(levelsPanel).toContainText(
            '🥇Level 0 - Battery LevelRetry' +
            '🥈Level 1 - Voting AgeRetry' +
            '🥉Level 2 - Wind ScaleRetry' +
            '💩Level 3 - ReviewRetry' +
            '▶️Level 4 - DiscountPlay' +
            '🔒Level 5 - FizzBuzzLocked' +
            '🔒Level 6 - Leap YearLocked' +
            '🔒Level 7 - Triangle TypeLocked' +
            '🔒Level 8 - Speed DisplayLocked' +
            '🔒Level 9 - Parking FeeLocked')
    })
})

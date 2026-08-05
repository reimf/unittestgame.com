import { test, expect } from '../fixture/fixture-coverage'

test.describe('level emojis', () => {
    test('has level overview panel', async ({ page }) => {
        await page.goto('/game?speed=fast&setitem=level-battery-level-finished:1&setitem=level-voting-age-finished:2&setitem=level-wind-scale-finished:3&setitem=level-review-finished:4')
        const levelsPanel = page.getByTestId('level-overview')
        await expect(levelsPanel).toContainText(
            '👍Level 0 - Battery LevelRetry' +
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

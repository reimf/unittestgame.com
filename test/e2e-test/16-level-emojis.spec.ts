import { test, expect } from '../fixture/fixture-coverage'

test.describe('level emojis', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/?speed=fast&setitem=level-battery-level-finished:1&setitem=level-voting-age-finished:2&setitem=level-even-or-odd-finished:3&setitem=level-review-finished:4')
    })

    test('has level overview panel', async ({ page }) => {
        const levelsPanel = page.getByTestId('level-overview')
        await expect(levelsPanel).toContainText('1🥇2🥈3🥉4💩5▶️6🔒7🔒8🔒9🔒10🔒')
    })
})

import { test, expect } from '../fixture/fixture-coverage'
import type { Page } from '@playwright/test'

test.describe('level emojis', () => {
    test.describe.configure({ mode: 'serial' })

    let page: Page

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage()
        await page.goto('/?speed=fast&setitem=level-battery-level-finished:1&setitem=level-voting-age-finished:2&setitem=level-even-or-odd-finished:3&setitem=level-review-finished:4')
    })

    test.afterAll(async () => {
        await page.close()
    })

    test('has level overview panel', async () => {
        const levelsPanel = page.getByTestId('level-overview')
        await expect(levelsPanel).toContainText('1🥇2🥈3🥉4💩5▶️6🔒7🔒8🔒9🔒10🔒')
    })
})

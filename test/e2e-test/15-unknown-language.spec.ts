import { test, expect } from '../fixture/fixture-coverage'

test.describe('unknown language', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/?speed=fast&language=no')
    })

    test('has welcome message in English', async ({ page }) => {
        const messages = page.getByTestId('messages')
        await expect(messages).toContainText('Hi! I\'m an AI bot that writes code. Your job is to guide me using unit tests.')
    })
})

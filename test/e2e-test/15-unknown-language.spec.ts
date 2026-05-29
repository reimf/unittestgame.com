import { test, expect } from '../fixture/fixture-coverage'
import type { Page } from '@playwright/test'

test.describe('unknown language', () => {
    test.describe.configure({ mode: 'serial' })

    let page: Page

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage()
        await page.goto('/?speed=fast&language=no')
    })

    test.afterAll(async () => {
        await page.close()
    })

    test('has welcome message in English', async () => {
        const messages = page.getByTestId('messages')
        await expect(messages).toContainText('Hi! I\'m an AI bot that writes code. Your job is to guide me using unit tests.')
    })
})

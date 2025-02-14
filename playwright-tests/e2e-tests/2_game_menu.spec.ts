import { test, expect } from '@playwright/test'

test.describe('game menu', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5500/')
    page.getByText('I want to have a nice introduction into this game').click()
  })

  test('has game menu message', async ({ page }) => {
    const messages = page.locator('#messages')
    const buttons = messages.locator('button')
    await expect(buttons).toHaveText([
        'I want to write unit tests for a function that checks if a person is allowed to vote based on their age',
    ])
  })
})

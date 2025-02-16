import { test, expect } from '@playwright/test'

test.describe('hint unit test', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5500/')
    await page.getByText('VotingAge: is someone allowed to vote').click()
    await page.getByText('I want to see a hint for a unit test').click()
  })

  test('has hint unit test message', async ({ page }) => {
    const messages = page.locator('#messages')
    await expect(messages).toContainText(/\d+ -> (true|false)/)
  })

  test('has action menu message', async ({ page }) => {
    const messages = page.locator('#messages')
    const buttons = messages.locator('button')
    await expect(buttons).toHaveText([
      'I want to add a unit test',
      'I want to see a hint for a unit test (-10%)',
      'I want to submit the unit tests (-20%?)',
      'I want to end the game (-100%?)',
    ])
  })
})

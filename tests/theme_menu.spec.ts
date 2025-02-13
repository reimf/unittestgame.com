import { test, expect } from '@playwright/test'

test.describe('theme menu', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5500/')
  })

  test('has title', async ({ page }) => {
    await expect(page).toHaveTitle('UnitTestGame.com')
  })

  test('has about panel', async ({ page }) => {
    const aboutPanel = page.locator('#about')
    await expect(aboutPanel).toContainText('About')
  })

  test('has feedback mail address', async ({ page }) => {
    const link = page.locator('a')
    await expect(link).toHaveText('feedback@unittestgame.com')
  })

  test('has high scores panel', async ({ page }) => {
    const highScoresPanel = page.locator('#high-scores')
    await expect(highScoresPanel).toContainText('High Scores')
  })

  test('has no high scores', async ({ page }) => {
    const highScoresPanel = page.locator('#high-scores')
    await expect(highScoresPanel).toContainText('You have not played a game yet.')
  })

  test('has welcome message', async ({ page }) => {
    const messages = page.locator('#messages')
    await expect(messages).toContainText('Welcome to UnitTestGame.com!')
  })

  test('has theme menu message', async ({ page }) => {
    const messages = page.locator('#messages')
    const buttons = messages.locator('button')
    await expect(buttons).toHaveText([
      'I want to have a nice introduction into this game',
      'I want to ensure an AI-bot functions correctly',
      'I want to write better unit tests for student assignments',
      'I want to review the work of an external software company',
    ])
  })
})

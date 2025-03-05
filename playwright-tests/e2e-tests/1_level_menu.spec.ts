import { test, expect } from '@playwright/test'

test.describe('level menu', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5500/')
  })

  test('has title', async ({ page }) => {
    await expect(page).toHaveTitle('UnitTestGame.com')
  })

  test('has about panel', async ({ page }) => {
    const aboutPanel = page.getByTestId('about')
    await expect(aboutPanel).toContainText('About')
  })

  test('has feedback mail address', async ({ page }) => {
    const link = page.getByRole('link')
    await expect(link).toHaveText('feedback@unittestgame.com')
  })

  test('has welcome message', async ({ page }) => {
    const messages = page.getByTestId('messages')
    await expect(messages).toContainText('Welcome to UnitTestGame.com!')
  })

  test('has no high scores panel', async ({ page }) => {
    const highScoresPanel = page.getByTestId('high-scores')
    await expect(highScoresPanel).not.toBeAttached()
  })

  test('has level menu message', async ({ page }) => {
    const messages = page.getByTestId('messages')
    const button = messages.getByRole('button')
    await expect(button).toHaveText('I want to play TestDrivenDevelopment - Level 1 - VotingAge')
  })
})

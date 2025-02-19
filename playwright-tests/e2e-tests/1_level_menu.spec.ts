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

  test('has level menu message', async ({ page }) => {
    const messages = page.getByTestId('messages')
    const buttons = messages.getByRole('button')
    await expect(buttons).toHaveText([
      '👉 Level 1: VotingAge - are you allowed to vote (Play Now)',
      '🔒 Level 2: EvenOdd - separate the numbers (Locked)',
      '🔒 Level 3: FizzBuzz - is it fizz or buzz (Locked)',
      '🔒 Level 4: LeapYear - find the leap years (Locked)',
      '🔒 Level 5: Triangle - name the triangle type (Locked)',
      '🔒 Level 6: Float - check the format (Locked)',
      '🔒 Level 7: Password - see if a password is strong (Locked)',
      '🔒 Level 8: Speed - display the speed of a car (Locked)',
    ])
  })
})

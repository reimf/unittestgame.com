import { test, expect } from '@playwright/test'

test.describe('submit insufficient unit test', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5500/')
    await page.getByText('I want to have a nice introduction into this game').click() 
    await page.getByText('I want to write unit tests for a function that checks if a person is allowed to vote based on their age').click()
    await page.getByText('I want to submit the unit tests').click()
  })

  test('has bug found message', async ({ page }) => {
    const messages = page.locator('#messages')
    await expect(messages).toContainText('There are still bugs in the function.')
  })

  test('has unit test in bug found message', async ({ page }) => {
    const messages = page.locator('#messages')
    await expect(messages).toContainText(/\d+ -> (true|false)/)
  })

  test('has action menu message', async ({ page }) => {
    const messages = page.locator('#messages')
    const buttons = messages.locator('button')
    await expect(buttons).toHaveText([
      'I want to add a unit test',
      'I want to see a hint for a unit test',
      'I want to submit the unit tests',
      'I want to end the game',
    ])
  })
})

import { test, expect } from '@playwright/test'

test.describe('submit insufficient unit test', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5500/')
    await page.getByText('I want to have a nice introduction into this game').click() 
    await page.getByText('I want to write unit tests for a function that checks if a person is allowed to vote based on their age').click()
    await page.getByText('I want to add a unit test').click()
    await page.getByLabel('Age').fill('17')
    await page.getByLabel('Allowed to vote?').uncheck()
    await page.getByText('I want to add this unit test').click()
    await page.getByText('I want to add a unit test').click()
    await page.getByLabel('Age').fill('18')
    await page.getByLabel('Allowed to vote?').check()
    await page.getByText('I want to add this unit test').click()
    await page.getByText('I want to submit the unit tests').click()
  })

  test('has end message', async ({ page }) => {
    const messages = page.locator('#messages')
    await expect(messages).toContainText('Congratulations!')
  })

  test('has action menu message', async ({ page }) => {
    const messages = page.locator('#messages')
    const buttons = messages.locator('button')
    await expect(buttons).toHaveText([
      'Pick another theme and game',
      'Exit UnitTestGame.com',
    ])
  })
})

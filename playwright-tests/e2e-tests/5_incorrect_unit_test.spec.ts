import { test, expect } from '@playwright/test'

test.describe('incorrect unit test', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5500/')
    await page.getByRole('button', { name: /VotingAge/i }).click()
    await page.getByRole('button', { name: 'I want to add a unit test' }).click()
    await page.getByLabel('Age').fill('15')
    await page.getByLabel('Allowed to vote?').check()
    await page.getByRole('button', { name: 'I want to add this unit test' }).click()
  })

  test('has add unit test message', async ({ page }) => {
    const messages = page.getByTestId('messages')
    await expect(messages).toContainText('isAllowedToVote(15) === true')
  })

  test('has incorrect unit test message', async ({ page }) => {
    const messages = page.getByTestId('messages')
    await expect(messages).toContainText('I did NOT add the unit test')
  })

  test('has NOT added unit test in unit tests panel', async ({ page }) => {
    const unitTestsPanel = page.getByTestId('unit-tests')
    await expect(unitTestsPanel).not.toContainText('15 -> true')
  })

  test('has action menu message', async ({ page }) => {
    const messages = page.getByTestId('messages')
    const buttons = messages.getByRole('button')
    await expect(buttons).toHaveText([
      'I want to add a unit test (-5% on error)',
      'I want to see a hint for a unit test (-10%)',
      'I want to submit the unit tests (-20% on error)',
      'I want to exit this level (0% on error)',
    ])
  })
})

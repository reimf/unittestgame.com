import { test, expect } from '@playwright/test'

test.describe('added unit test', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5500/')
    await page.getByRole('button', { name: 'I want to improve my Test Driven Development skills' }).click()
    await page.getByRole('button', { name: 'I want to play Test Driven Development - Level 1 - Voting Age' }).click()
    await page.getByRole('button', { name: 'I want to add a unit test' }).click()
    await page.getByLabel('Age').fill('12')
    await page.getByLabel('Allowed to vote?').uncheck()
    await page.getByRole('button', { name: 'I want to add this unit test' }).click()
  })

  test('has add unit test message', async ({ page }) => {
    const messages = page.getByTestId('messages')
    await expect(messages).toContainText('isAllowedToVote(12) === false')
  })

  test('has added unit test message', async ({ page }) => {
    const messages = page.getByTestId('messages')
    await expect(messages).toContainText('I added the unit test')
  })

  test('has added unit test in unit tests panel', async ({ page }) => {
    const unitTestsPanel = page.getByTestId('unit-tests')
    await expect(unitTestsPanel).toContainText('isAllowedToVote(12) === false')
  })

  test('has another candidate in the current candidate panel', async ({ page }) => {
    const currentCandidatePanel = page.getByTestId('current-function')
    await expect(currentCandidatePanel).toContainText('function isAllowedToVote(age) {  return false}')
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

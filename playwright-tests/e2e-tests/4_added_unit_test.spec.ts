import { test, expect } from '@playwright/test'

test.describe('added unit test', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5500/')
    await page.getByText('VotingAge: is someone allowed to vote').click()
    await page.getByText('I want to add a unit test').click()
    await page.getByLabel('Age').fill('12')
    await page.getByLabel('Allowed to vote?').uncheck()
    await page.getByText('I want to add this unit test').click()
  })

  test('has add unit test message', async ({ page }) => {
    const messages = page.locator('#messages')
    await expect(messages).toContainText('12 -> false')
  })

  test('has added unit test message', async ({ page }) => {
    const messages = page.locator('#messages')
    await expect(messages).toContainText('I added the unit test')
  })

  test('has added unit test in unit tests panel', async ({ page }) => {
    const unitTestsPanel = page.locator('#unit-tests')
    await expect(unitTestsPanel).toContainText('12 -> false')
  })

  test('has another candidate in the current candidate panel', async ({ page }) => {
    const currentCandidatePanel = page.locator('#current-candidate')
    await expect(currentCandidatePanel).toContainText('function isAllowedToVote(age) { return false }')
  })

  test('has action menu message', async ({ page }) => {
    const messages = page.locator('#messages')
    const buttons = messages.locator('button')
    await expect(buttons).toHaveText([
      'I want to add a unit test',
      'I want to see a hint for a unit test (-10)',
      'I want to submit the unit tests (-20?)',
      'I want to end the game (-100?)',
    ])
  })
})

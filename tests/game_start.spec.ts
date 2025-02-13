import { test, expect } from '@playwright/test'

test.describe('game start', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5500/')
    page.getByText('I want to have a nice introduction into this game').click() 
    page.getByText('I want to write unit tests for a function that checks if a person is allowed to vote based on their age').click()
  })

  test('has no about panel', async ({ page }) => {
    const aboutPanel = page.locator('#about')
    await expect(aboutPanel).not.toBeAttached()
  })

  test('has no high scores panel', async ({ page }) => {
    const highScoresPanel = page.locator('#high-scores')
    await expect(highScoresPanel).not.toBeAttached()
  })

  test('has specification panel', async ({ page }) => {
    const specificationPanel = page.locator('#specification')
    await expect(specificationPanel).toContainText('Specification')
  })

  test('has unit tests panel', async ({ page }) => {
    const unitTestsPanel = page.locator('#unit-tests')
    await expect(unitTestsPanel).toContainText('Unit Tests')
  })

  test('has current candidate panel', async ({ page }) => {
    const currentCandidatePanel = page.locator('#current-candidate')
    await expect(currentCandidatePanel).toContainText('Current Function')
  })

  test('has score panel', async ({ page }) => {
    const scorePanel = page.locator('#score')
    await expect(scorePanel).toContainText('Score')
  })

  test('has introduction message', async ({ page }) => {
    const messages = page.locator('#messages')
    await expect(messages).toContainText('A legal voting age is the minimum age that a person is allowed to vote in a democratic process.')
  })

  test('has contract message', async ({ page }) => {
    const messages = page.locator('#messages')
    await expect(messages).toContainText('It is your task to write unit tests for this function.')
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

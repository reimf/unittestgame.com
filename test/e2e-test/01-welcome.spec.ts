import { test, expect } from '../fixture/fixture-coverage'

test.describe('welcome', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/game.html?speed=fast&store=map')
    })

    test('has title', async ({ page }) => {
        await expect(page).toHaveTitle('UnitTestGame.com')
    })

    test('has welcome message', async ({ page }) => {
        const messages = page.getByTestId('messages')
        await expect(messages).toContainText('Hi! I\'m an AI bot that writes code. Your job is to guide me using unit tests.')
    })

    test('has unittestgame panel', async ({ page }) => {
        const unittestgamePanel = page.getByTestId('unittestgame')
        await expect(unittestgamePanel).toContainText('UnitTestGame')
    })

    test('has settings panel', async ({ page }) => {
        const settingsPanel = page.getByTestId('settings')
        await expect(settingsPanel).toContainText('Settings')
    })

    test('has language selector with Dutch as an option', async ({ page }) => {
        const option = page.getByTestId('language-switcher').locator('option[value="nl"]')
        await expect(option).toHaveText('Nederlands')
    })

    test('has link to home page', async ({ page }) => {
        const link = page.getByRole('link', { name: 'Home' })
        expect(await link.getAttribute('href')).toBe('index.html')
    })

    test('has level overview panel', async ({ page }) => {
        const levelsPanel = page.getByTestId('level-overview')
        await expect(levelsPanel).toContainText(
            '▶️Level 0 - Battery Level' +
            '🔒Level 1 - Voting Age' +
            '🔒Level 2 - Wind Scale' +
            '🔒Level 3 - Review' +
            '🔒Level 4 - Discount' +
            '🔒Level 5 - FizzBuzz' +
            '🔒Level 6 - Leap Year' +
            '🔒Level 7 - Triangle Type' +
            '🔒Level 8 - Speed Display' +
            '🔒Level 9 - Parking Fee')
    })

    test('has see example message', async ({ page }) => {
        const messages = page.getByTestId('messages')
        const button = messages.getByRole('button')
        await expect(button).toHaveText('I want to play Level 0 - Battery Level')
    })
})

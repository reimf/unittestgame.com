import { test, expect } from '../fixture/fixture-coverage'

test.describe('welcome', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/en/game?speed=fast&store=map')
    })

    test('has title', async ({ page }) => {
        await expect(page).toHaveTitle('UnitTestGame.com: Play')
    })

    test('has welcome message', async ({ page }) => {
        const messages = page.getByTestId('messages')
        await expect(messages).toContainText('Hi! I\'m an AI bot that writes code, but I don\'t write more than your unit tests force me to. A unit test is an example of an input with the outcome that goes with it. Your job is to guide me using unit tests until the code is right.')
    })

    test('has unittestgame panel', async ({ page }) => {
        const unittestgamePanel = page.getByTestId('unittestgame')
        await expect(unittestgamePanel).toContainText('UnitTestGame')
    })

    test('has no settings panel', async ({ page }) => {
        await expect(page.getByTestId('settings')).toHaveCount(0)
    })

    test('has the programming language in the settings menu', async ({ page }) => {
        await expect(page.getByTestId('settings-menu').getByTestId('programming-language-switcher').locator('summary')).toHaveText('JavaScript')
    })

    test('has no home link in the panel', async ({ page }) => {
        await expect(page.getByTestId('unittestgame').getByRole('link')).toHaveCount(0)
    })

    test('has level overview panel', async ({ page }) => {
        const levelsPanel = page.getByTestId('level-overview')
        await expect(levelsPanel).toContainText(
            '▶️Level 0 - Battery LevelPlay' +
            '🔒Level 1 - Voting AgeLocked' +
            '🔒Level 2 - Wind ScaleLocked' +
            '🔒Level 3 - ReviewLocked' +
            '🔒Level 4 - DiscountLocked' +
            '🔒Level 5 - FizzBuzzLocked' +
            '🔒Level 6 - Leap YearLocked' +
            '🔒Level 7 - Triangle TypeLocked' +
            '🔒Level 8 - Speed DisplayLocked' +
            '🔒Level 9 - Parking FeeLocked')
    })

    test('has see example message', async ({ page }) => {
        const messages = page.getByTestId('messages')
        const button = messages.getByRole('button')
        await expect(button).toHaveText('I want to play Level 0 - Battery Level')
    })
})

import { test, expect } from '../fixture/fixture-coverage'

test.describe('welcome', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/?speed=fast')
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

    test('has link to site in Dutch', async ({ page }) => {
        const link = page.getByRole('option', { name: 'Overschakelen op Nederlands' })
        expect(await link.getAttribute('value')).toBe('nl')
    })

    test('has more info on Test-Driven Development', async ({ page }) => {
        const link = page.getByRole('link', { name: 'Read more about TDD' })
        expect(await link.getAttribute('href')).toBe('https://en.wikipedia.org/wiki/Test-driven_development')
    })

    test('has link to contact mail address', async ({ page }) => {
        const link = page.getByRole('link', { name: 'contact' })
        expect(await link.getAttribute('href')).toBe('mailto:contact@unittestgame.com')
    })

    test('has level overview panel', async ({ page }) => {
        const levelsPanel = page.getByTestId('level-overview')
        await expect(levelsPanel).toContainText('1▶️2🔒3🔒4🔒5🔒6🔒7🔒8🔒9🔒10🔒')
    })

    test('has see example message', async ({ page }) => {
        const messages = page.getByTestId('messages')
        const button = messages.getByRole('button')
        await expect(button).toHaveText('I want to play Level 1 - Battery Level')
    })
})

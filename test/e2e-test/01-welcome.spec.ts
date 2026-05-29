import { test, expect } from '../fixture/fixture-coverage'
import type { Page } from '@playwright/test'

test.describe('welcome', () => {
    test.describe.configure({ mode: 'serial' })

    let page: Page

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage()
        await page.goto('/?speed=fast')
    })

    test.afterAll(async () => {
        await page.close()
    })

    test('has title', async () => {
        await expect(page).toHaveTitle('UnitTestGame.com')
    })

    test('has welcome message', async () => {
        const messages = page.getByTestId('messages')
        await expect(messages).toContainText('Hi! I\'m an AI bot that writes code. Your job is to guide me using unit tests.')
    })

    test('has unittestgame panel', async () => {
        const unittestgamePanel = page.getByTestId('unittestgame')
        await expect(unittestgamePanel).toContainText('UnitTestGame')
    })

    test('has link to site in Dutch', async () => {
        const link = page.getByRole('option', { name: 'Overschakelen op Nederlands' })
        expect(await link.getAttribute('value')).toBe('nl')
    })

    test('has more info on Test-Driven Development', async () => {
        const link = page.getByRole('link', { name: 'Read more about TDD' })
        expect(await link.getAttribute('href')).toBe('https://en.wikipedia.org/wiki/Test-driven_development')
    })

    test('has link to contact mail address', async () => {
        const link = page.getByRole('link', { name: 'contact' })
        expect(await link.getAttribute('href')).toBe('mailto:contact@unittestgame.com')
    })

    test('has level overview panel', async () => {
        const levelsPanel = page.getByTestId('level-overview')
        await expect(levelsPanel).toContainText('1▶️2🔒3🔒4🔒5🔒6🔒7🔒8🔒9🔒10🔒')
    })

    test('has see example message', async () => {
        const messages = page.getByTestId('messages')
        const button = messages.getByRole('button')
        await expect(button).toHaveText('I want to play Level 1 - Battery Level')
    })
})

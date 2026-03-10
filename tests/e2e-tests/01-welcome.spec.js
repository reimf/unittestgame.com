import { test, expect } from '@playwright/test';
test.describe('welcome', () => {
    let page;
    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext();
        await context.addInitScript({ path: './tests/e2e-tests/init-script.js' });
        page = await context.newPage();
        await page.goto('/');
    });
    test('has title', async () => {
        await expect(page).toHaveTitle('UnitTestGame.com');
    });
    test('has welcome message', async () => {
        const messages = page.getByTestId('messages');
        await expect(messages).toContainText('Hi, I am an AI bot and I can write code to make unit tests pass.');
    });
    test('has unittestgame panel', async () => {
        const unittestgamePanel = page.getByTestId('unittestgame');
        await expect(unittestgamePanel).toContainText('UnitTestGame');
    });
    test('has link to site in Dutch', async () => {
        const link = page.getByRole('link', { name: 'Nederlands' });
        expect(await link.getAttribute('href')).toBe('?lng=nl');
    });
    test('has more info on Test-Driven Development', async () => {
        const link = page.getByRole('link', { name: 'TDD on Wikipedia' });
        expect(await link.getAttribute('href')).toBe('https://en.wikipedia.org/wiki/Test-driven_development');
    });
    test('has link to contact mail address', async () => {
        const link = page.getByRole('link', { name: 'contact' });
        expect(await link.getAttribute('href')).toBe('mailto:contact@unittestgame.com');
    });
    test('has level overview panel', async () => {
        const levelsPanel = page.getByTestId('level-overview');
        await expect(levelsPanel).toContainText('1▶️2🔒3🔒4🔒5🔒6🔒7🔒8🔒9🔒10🔒');
    });
    test('has see example message', async () => {
        const messages = page.getByTestId('messages');
        const button = messages.getByRole('button');
        await expect(button).toHaveText('I want to play Level 1 - Battery Level');
    });
    test.afterAll(async () => {
        await page.close();
    });
});

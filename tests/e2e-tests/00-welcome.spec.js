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
        await expect(messages).toContainText('Welcome to UnitTestGame where you can learn to write effective unit tests.');
    });
    test('has no unittestgame panel', async () => {
        const unittestgamePanel = page.getByTestId('unittestgame');
        await expect(unittestgamePanel).not.toBeAttached();
    });
    test('has no levels panel', async () => {
        const levelsPanel = page.getByTestId('levels');
        await expect(levelsPanel).not.toBeAttached();
    });
    test('has show sidebar message', async () => {
        const messages = page.getByTestId('messages');
        const button = messages.getByRole('button');
        await expect(button).toHaveText('I want a sidebar with information on terms with a purple background');
    });
    test.afterAll(async () => {
        await page.close();
    });
});

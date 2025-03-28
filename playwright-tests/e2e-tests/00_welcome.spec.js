import { test, expect } from '@playwright/test';
test.describe('welcome', () => {
    test.beforeEach(async ({ page }) => {
        await page.addInitScript({ path: './playwright-tests/e2e-tests/init_script.js' });
        await page.goto('http://localhost:5500/');
    });
    test('has title', async ({ page }) => {
        await expect(page).toHaveTitle('UnitTestGame.com');
    });
    test('has welcome message', async ({ page }) => {
        const messages = page.getByTestId('messages');
        await expect(messages).toContainText('Welcome to UnitTestGame!');
    });
    test('has no unittestgame panel', async ({ page }) => {
        const unittestgamePanel = page.getByTestId('unittestgame');
        await expect(unittestgamePanel).not.toBeAttached();
    });
    test('has no high scores panel', async ({ page }) => {
        const highScoresPanel = page.getByTestId('high-scores');
        await expect(highScoresPanel).not.toBeAttached();
    });
    test('has show sidebar message', async ({ page }) => {
        const messages = page.getByTestId('messages');
        const button = messages.getByRole('button');
        await expect(button).toHaveText('I want a sidebar for terms with a purple background');
    });
});

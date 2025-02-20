import { test, expect } from '@playwright/test';
test.describe('level menu', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:5500/');
    });
    test('has title', async ({ page }) => {
        await expect(page).toHaveTitle('UnitTestGame.com');
    });
    test('has about panel', async ({ page }) => {
        const aboutPanel = page.getByTestId('about');
        await expect(aboutPanel).toContainText('About');
    });
    test('has feedback mail address', async ({ page }) => {
        const link = page.getByRole('link');
        await expect(link).toHaveText('feedback@unittestgame.com');
    });
    test('has welcome message', async ({ page }) => {
        const messages = page.getByTestId('messages');
        await expect(messages).toContainText('Welcome to UnitTestGame.com!');
    });
    test('has level menu message', async ({ page }) => {
        const messages = page.getByTestId('messages');
        const buttons = messages.getByRole('button');
        await expect(buttons).toHaveText([
            '👉 I want to play Level 1 - VotingAge',
            '🔒 Level 2 - EvenOdd is locked',
            '🔒 Level 3 - FizzBuzz is locked',
            '🔒 Level 4 - LeapYear is locked',
            '🔒 Level 5 - TriangleType is locked',
            '🔒 Level 6 - FloatFormat is locked',
            '🔒 Level 7 - PasswordStrength is locked',
            '🔒 Level 8 - SpeedDisplay is locked',
        ]);
    });
});

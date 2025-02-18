import { test, expect } from '@playwright/test';
test.describe('level menu', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:5500/');
    });
    test('has title', async ({ page }) => {
        await expect(page).toHaveTitle('UnitTestGame.com');
    });
    test('has about panel', async ({ page }) => {
        const aboutPanel = page.locator('#about');
        await expect(aboutPanel).toContainText('About');
    });
    test('has feedback mail address', async ({ page }) => {
        const link = page.locator('a');
        await expect(link).toHaveText('feedback@unittestgame.com');
    });
    test('has welcome message', async ({ page }) => {
        const messages = page.locator('#messages');
        await expect(messages).toContainText('Welcome to UnitTestGame.com!');
    });
    test('has level menu message', async ({ page }) => {
        const messages = page.locator('#messages');
        const buttons = messages.locator('button');
        await expect(buttons).toHaveText([
            '👉 Level 1: VotingAge - are you allowed to vote (Play Now)',
            '🔒 Level 2: EvenOdd - separate the numbers (Locked)',
            '🔒 Level 3: LeapYear - find the leap years (Locked)',
            '🔒 Level 4: Triangle - name the triangle type (Locked)',
            '🔒 Level 5: Float - check the format (Locked)',
            '🔒 Level 6: Password - see if a password is strong (Locked)',
            '🔒 Level 7: Speed - display the speed of a car (Locked)',
        ]);
    });
});

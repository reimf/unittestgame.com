import { test, expect } from '@playwright/test';
test.describe('hint unit test', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:5500/');
        await page.getByRole('button', { name: 'I want to improve my Test Driven Development skills' }).click();
        await page.getByRole('button', { name: 'I want to play Test Driven Development - Level 1 - Voting Age' }).click();
        await page.getByRole('button', { name: 'I want to see a hint for a unit test' }).click();
    });
    test('has hint unit test message', async ({ page }) => {
        const messages = page.getByTestId('messages');
        await expect(messages).toContainText(/isAllowedToVote\(\d+\) === (true|false)/);
    });
    test('has action menu message', async ({ page }) => {
        const messages = page.getByTestId('messages');
        const buttons = messages.getByRole('button');
        await expect(buttons).toHaveText([
            'I want to add a unit test (-5% on error)',
            'I want to see a hint for a unit test (-10%)',
            'I want to submit the unit tests (-20% on error)',
            'I want to exit this level (0% on error)',
        ]);
    });
});

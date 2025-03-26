import { test, expect } from '@playwright/test';
test.describe('tdd hint unit test', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:5500/');
        await page.getByRole('button', { name: 'I want to play Level 1 - Test-Driven Development - Voting Age' }).click();
        await page.getByRole('button', { name: 'Show hint' }).click();
    });
    test('has hint unit test message', async ({ page }) => {
        const messages = page.getByTestId('messages');
        await expect(messages).toContainText(/isAllowedToVote\(\d+\) === (true|false)/);
    });
    test('has action menu message', async ({ page }) => {
        const messages = page.getByTestId('messages');
        const buttons = messages.getByRole('button');
        await expect(buttons).toHaveText([
            'Add unit test',
            'Show hint',
            'Submit unit tests',
            'Exit level',
        ]);
    });
});

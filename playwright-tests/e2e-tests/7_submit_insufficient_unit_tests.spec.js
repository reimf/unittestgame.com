import { test, expect } from '@playwright/test';
test.describe('submit insufficient unit test', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:5500/');
        await page.getByRole('button', { name: /VotingAge/i }).click();
        await page.getByRole('button', { name: 'I want to submit the unit tests' }).click();
    });
    test('has bug found message', async ({ page }) => {
        const messages = page.getByTestId('messages');
        await expect(messages).toContainText('The current function is NOT according to the specification');
    });
    test('has unit test in bug found message', async ({ page }) => {
        const messages = page.getByTestId('messages');
        await expect(messages).toContainText(/isAllowedToVote\(\d+\) === (true|false)/);
    });
    test('has action menu message', async ({ page }) => {
        const messages = page.getByTestId('messages');
        const buttons = messages.getByRole('button');
        await expect(buttons).toHaveText([
            'I want to add a unit test (-10% on error)',
            'I want to see a hint for a unit test (-20%)',
            'I want to submit the unit tests (-30% on error)',
            'I want to exit this level (0% on error)',
        ]);
    });
});

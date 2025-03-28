import { test, expect } from '@playwright/test';
test.describe('hint unit test', () => {
    test.beforeEach(async ({ context, page }) => {
        await context.addInitScript(_ => localStorage.setItem('Test-Driven Development - Voting Age', '100'));
        await context.addInitScript({ path: './playwright-tests/e2e-tests/init_script.js' });
        await page.goto('http://localhost:5500/');
        await page.getByRole('button', { name: 'I want to play Level 2 - Mutation Testing - Even or Odd' }).click();
        await page.getByRole('button', { name: 'Show hint' }).click();
    });
    test('has hint function message', async ({ page }) => {
        const messages = page.getByTestId('messages');
        await expect(messages).toContainText('function isEven(number) {\n  return true\n}');
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

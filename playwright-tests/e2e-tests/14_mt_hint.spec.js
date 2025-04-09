import { test, expect } from '@playwright/test';
test.describe('hint unit test', () => {
    test.beforeEach(async ({ context, page }) => {
        await context.addInitScript(_ => localStorage.setItem('Main - Sidebar Shown', 'Sun, 31 Dec 1899 00:00:00 GMT'));
        await context.addInitScript(_ => localStorage.setItem('Test-Driven Development - Example Seen', 'Sun, 31 Dec 1899 00:00:00 GMT'));
        await context.addInitScript(_ => localStorage.setItem('Test-Driven Development - Voting Age', '100'));
        await context.addInitScript(_ => localStorage.setItem('Mutation Testing - Example Seen', 'Sun, 31 Dec 1899 00:00:00 GMT'));
        await context.addInitScript({ path: './playwright-tests/e2e-tests/init_script.js' });
        await page.goto('http://localhost:5500/');
        await page.getByRole('button', { name: 'I want to play Level 2 - Mutation Testing - Even or Odd' }).click();
        await page.getByRole('button', { name: 'Show hint' }).click();
    });
    test('has hint function message', async ({ page }) => {
        const messages = page.getByTestId('messages');
        const codeLines = messages.locator('code > div');
        await expect(codeLines).toContainText(['function isEven(number) {', '  return true', '}']);
    });
    test('has action menu message', async ({ page }) => {
        const messages = page.getByTestId('messages');
        const buttons = messages.getByRole('button');
        await expect(buttons).toHaveText([
            'Add unit test',
            'Show hint',
            'Submit unit tests',
        ]);
    });
});

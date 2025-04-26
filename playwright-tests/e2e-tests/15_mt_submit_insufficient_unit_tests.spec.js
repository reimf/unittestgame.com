import { test, expect } from '@playwright/test';
test.describe('mt submit insufficient unit test', () => {
    test.beforeEach(async ({ context, page }) => {
        await context.addInitScript(_ => localStorage.setItem('Main - Sidebar Shown', '1'));
        await context.addInitScript(_ => localStorage.setItem('Test-Driven Development - Example', '1'));
        await context.addInitScript(_ => localStorage.setItem('Test-Driven Development - Voting Age', '100'));
        await context.addInitScript(_ => localStorage.setItem('Mutation Testing - Example', '1'));
        await context.addInitScript({ path: './playwright-tests/e2e-tests/init_script.js' });
        await page.goto('http://localhost:3000/');
        await page.getByRole('button', { name: 'I want to play Level 4 - Mutation Testing - Even or Odd' }).click();
        await page.getByRole('button', { name: 'I want to submit the unit tests' }).click();
    });
    test('has bug found message', async ({ page }) => {
        const messages = page.getByTestId('messages');
        await expect(messages).toContainText('The Function is NOT fully tested');
    });
    test('has a function in bug found message', async ({ page }) => {
        const messages = page.getByTestId('messages');
        const codeLines = messages.locator('code > div');
        await expect(codeLines).toContainText(['function isEven(num) {', '  return undefined', '}']);
    });
    test('has action menu message', async ({ page }) => {
        const messages = page.getByTestId('messages');
        const buttons = messages.getByRole('button');
        await expect(buttons).toHaveText([
            'I want to add this unit test',
            'I want to submit the unit tests',
        ]);
    });
});

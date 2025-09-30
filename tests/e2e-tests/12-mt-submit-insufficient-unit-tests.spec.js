import { test, expect } from '@playwright/test';
test.describe('mt submit insufficient unit test', () => {
    let page;
    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext();
        await context.addInitScript(_ => localStorage.setItem('level-test-driven-development-battery-level-finished', '1'));
        await context.addInitScript(_ => localStorage.setItem('level-test-driven-development-voting-age-finished', '1'));
        await context.addInitScript(_ => localStorage.setItem('level-mutation-testing-battery-level-finished', '1'));
        await context.addInitScript({ path: './tests/e2e-tests/init-script.js' });
        page = await context.newPage();
        await page.goto('/');
        await page.getByRole('button', { name: 'I want to play Level 4 of 20 - Even or Odd - Mutation Testing - 🔓' }).click();
        await page.getByRole('button', { name: 'I want to submit the unit tests' }).click();
    });
    test('has bug found message', async () => {
        const messages = page.getByTestId('messages');
        await expect(messages).toContainText('The Function is NOT fully tested');
    });
    test('has a function in bug found message', async () => {
        const messages = page.getByTestId('messages');
        const codeLines = messages.locator('code > div');
        await expect(codeLines).toContainText(['function isEven(num) {', '  return undefined', '}']);
    });
    test('has action menu message', async () => {
        const messages = page.getByTestId('messages');
        const buttons = messages.getByRole('button');
        await expect(buttons).toHaveText([
            'I want to add this unit test',
            'I want to submit the unit tests',
        ]);
    });
    test.afterAll(async () => {
        await page.close();
    });
});

import { test, expect } from '@playwright/test';
test.describe('mt submit insufficient unit test', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:5500/');
        await page.evaluate(_ => localStorage.setItem('Test Driven Development - Voting Age', '100%'));
        await page.goto('http://localhost:5500/');
        await page.getByRole('button', { name: 'I want to play Level 2 - Mutation Testing - Even Odd' }).click();
        await page.getByRole('button', { name: 'I want to submit the unit tests' }).click();
    });
    test('has bug found message', async ({ page }) => {
        const messages = page.getByTestId('messages');
        await expect(messages).toContainText('I checked the function, but it is NOT fully tested');
    });
    test('has a function in bug found message', async ({ page }) => {
        const messages = page.getByTestId('messages');
        await expect(messages).toContainText(/function isEven\(number\) \{\n  return (true|false|undefined)\n\}/);
    });
    test('has action menu message', async ({ page }) => {
        const messages = page.getByTestId('messages');
        const buttons = messages.getByRole('button');
        await expect(buttons).toHaveText([
            'I want to add a unit test',
            'I want to see a hint',
            'I want to submit the unit tests',
            'I want to exit this level',
        ]);
    });
});

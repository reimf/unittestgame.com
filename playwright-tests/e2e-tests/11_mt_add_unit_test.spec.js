import { test, expect } from '@playwright/test';
test.describe('mt add unit test', () => {
    test.beforeEach(async ({ context, page }) => {
        await context.addInitScript(_ => localStorage.setItem('Main - Sidebar Shown', 'Sun, 31 Dec 1899 00:00:00 GMT'));
        await context.addInitScript(_ => localStorage.setItem('Test-Driven Development - Example Seen', 'Sun, 31 Dec 1899 00:00:00 GMT'));
        await context.addInitScript(_ => localStorage.setItem('Test-Driven Development - Voting Age', '100'));
        await context.addInitScript(_ => localStorage.setItem('Mutation Testing - Example Seen', 'Sun, 31 Dec 1899 00:00:00 GMT'));
        await context.addInitScript({ path: './playwright-tests/e2e-tests/init_script.js' });
        await page.goto('http://localhost:5500/');
        await page.getByRole('button', { name: 'I want to play Level 2 - Mutation Testing - Even or Odd' }).click();
        await page.getByRole('button', { name: 'Add unit test' }).click();
    });
    test('has number field', async ({ page }) => {
        const number = page.getByLabel('Number');
        await expect(number).toBeInViewport();
    });
    test('has is even checkbox', async ({ page }) => {
        const isEven = page.getByLabel('Is even');
        await expect(isEven).toBeInViewport();
    });
    test('has submit button', async ({ page }) => {
        const submitButton = page.getByRole('button', { name: 'I want to add this unit test' });
        await expect(submitButton).toBeInViewport();
    });
    test('has cancel button', async ({ page }) => {
        const cancelButton = page.getByRole('button', { name: 'Cancel' });
        await expect(cancelButton).toBeInViewport();
    });
});

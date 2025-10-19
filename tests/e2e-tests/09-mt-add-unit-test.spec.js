import { test, expect } from '@playwright/test';
test.describe('mt I want to add this unit test', () => {
    let page;
    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext();
        await context.addInitScript(_ => localStorage.setItem('level-test-driven-development-battery-level-finished', '1'));
        await context.addInitScript(_ => localStorage.setItem('level-test-driven-development-voting-age-finished', '1'));
        await context.addInitScript(_ => localStorage.setItem('level-mutation-testing-battery-level-finished', '1'));
        await context.addInitScript({ path: './tests/e2e-tests/init-script.js' });
        page = await context.newPage();
        await page.goto('/');
        await page.getByRole('button', { name: 'I want to play Level 4 - Even or Odd - Mutation Testing' }).click();
    });
    test('has number field', async () => {
        const number = page.getByLabel('Number');
        await expect(number).toBeInViewport();
    });
    test('asks is even', async () => {
        const messages = page.getByTestId('messages');
        await expect(messages).toContainText('Is even');
    });
    test('has add this unit test button', async () => {
        const button = page.getByRole('button', { name: 'I want to add this unit test' });
        await expect(button).toBeInViewport();
    });
    test('has submit unit tests button', async () => {
        const button = page.getByRole('button', { name: 'I want to submit the unit tests' });
        await expect(button).toBeInViewport();
    });
    test.afterAll(async () => {
        await page.close();
    });
});

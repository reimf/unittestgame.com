import { test, expect } from '@playwright/test';
test.describe('mt added unit test', () => {
    test.beforeEach(async ({ context, page }) => {
        await context.addInitScript(_ => localStorage.setItem('Main - Sidebar Shown', '1'));
        await context.addInitScript(_ => localStorage.setItem('Test-Driven Development - Example', '1'));
        await context.addInitScript(_ => localStorage.setItem('Test-Driven Development - Voting Age', '100'));
        await context.addInitScript(_ => localStorage.setItem('Mutation Testing - Example', '1'));
        await context.addInitScript({ path: './playwright-tests/e2e-tests/init_script.js' });
        await page.goto('/');
        await page.getByRole('button', { name: 'I want to play Level 4 - Mutation Testing - Even or Odd' }).click();
        await page.getByLabel('Number').fill('42');
        await page.getByLabel('true').check();
        await page.getByRole('button', { name: 'I want to add this unit test' }).click();
    });
    test('has I want to add this unit test message', async ({ page }) => {
        const messages = page.getByTestId('messages');
        await expect(messages).toContainText('isEven(42) === true');
    });
    test('has added unit test message', async ({ page }) => {
        const messages = page.getByTestId('messages');
        await expect(messages).toContainText('I added the unit test');
    });
    test('has added unit test in unit tests panel', async ({ page }) => {
        const unitTestsPanel = page.getByTestId('unit-tests');
        await expect(unitTestsPanel).toContainText('isEven(42) === true');
    });
    test('has at least 3 covered lines in the function panel', async ({ page }) => {
        await page.waitForFunction(() => !document.querySelector('.working'));
        const theFunctionPanel = page.getByTestId('the-function');
        const covered = theFunctionPanel.locator('div.covered');
        expect(await covered.count()).toBeGreaterThanOrEqual(3);
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

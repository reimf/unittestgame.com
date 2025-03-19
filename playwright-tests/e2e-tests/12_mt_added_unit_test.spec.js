import { test, expect } from '@playwright/test';
test.describe('mt added unit test', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:5500/');
        await page.evaluate(_ => localStorage.setItem('Test-Driven Development - Voting Age', '100%'));
        await page.goto('http://localhost:5500/');
        await page.getByRole('button', { name: 'I want to play Level 2 - Mutation Testing - Even or Odd' }).click();
        await page.getByRole('button', { name: 'I want to add a unit test' }).click();
        await page.getByLabel('Number').fill('42');
        await page.getByLabel('Is even').check();
        await page.getByRole('button', { name: 'I want to add this unit test' }).click();
    });
    test('has add unit test message', async ({ page }) => {
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
    test('has covered lines in the function panel', async ({ page }) => {
        const theFunctionPanel = page.getByTestId('the-function');
        const covered = theFunctionPanel.locator('b');
        await expect(covered).toHaveText(['function isEven(number) {', '  return true', '}']);
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

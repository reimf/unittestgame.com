import { test, expect } from '@playwright/test';
test.describe('mt level start', () => {
    let page;
    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext();
        await context.addInitScript(_ => localStorage.setItem('Main - Sidebar Shown', '1'));
        await context.addInitScript(_ => localStorage.setItem('Test-Driven Development - Example', '1'));
        await context.addInitScript(_ => localStorage.setItem('Test-Driven Development - Voting Age', '1'));
        await context.addInitScript({ path: './tests/e2e-tests/init-script.js' });
        page = await context.newPage();
        await page.goto('/');
        await page.getByRole('button', { name: 'I want to play Level 3 - Mutation Testing - Example' }).click();
        await page.getByRole('button', { name: 'I want to add this unit test' }).click();
        await page.getByRole('button', { name: 'I want to add this unit test' }).click();
        await page.getByRole('button', { name: 'I want to submit the unit tests' }).click();
        await page.getByRole('button', { name: 'I want to add this unit test' }).click();
        await page.getByRole('button', { name: 'I want to submit the unit tests' }).click();
        await page.getByRole('button', { name: 'I want to add this unit test' }).click();
        await page.getByRole('button', { name: 'I want to submit the unit tests' }).click();
        await page.getByRole('button', { name: 'I want to play Level 4 - Mutation Testing - Even or Odd' }).click();
    });
    test('has no unittestgame panel', async () => {
        const unittestgamePanel = page.getByTestId('unittestgame');
        await expect(unittestgamePanel).not.toBeAttached();
    });
    test('has no specification panel', async () => {
        const specificationPanel = page.getByTestId('specification');
        await expect(specificationPanel).not.toBeAttached();
    });
    test('has no unit tests in the unit tests panel', async () => {
        const unitTestsPanel = page.getByTestId('unit-tests');
        await expect(unitTestsPanel).toContainText('You have not written any unit tests yet');
    });
    test('has no current function panel', async () => {
        const currentFunctionPanel = page.getByTestId('current-function');
        await expect(currentFunctionPanel).not.toBeAttached();
    });
    test('has the perfect candidate in the function panel', async () => {
        const theFunctionPanel = page.getByTestId('the-function');
        const codeLines = theFunctionPanel.locator('code > div');
        await expect(codeLines).toContainText(['function isEven(num) {', '  if (num % 2 !== 0) return false', '  return true', '}']);
    });
    test('has the current level panel', async () => {
        const levelPanel = page.getByTestId('current-level');
        await expect(levelPanel).toContainText('Mutation Testing - Even or Odd');
    });
    test('has contract message', async () => {
        const messages = page.getByTestId('messages');
        await expect(messages).toContainText('You read The Function and write Unit Tests that pass');
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

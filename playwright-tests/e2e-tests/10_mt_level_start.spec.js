import { test, expect } from '@playwright/test';
test.describe('mt level start', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:5500/');
        await page.evaluate(_ => localStorage.setItem('Test Driven Development - Voting Age', '100%'));
        await page.goto('http://localhost:5500/');
        await page.getByRole('button', { name: 'I want to play Level 2 - Mutation Testing - Even Odd' }).click();
    });
    test('has no about panel', async ({ page }) => {
        const aboutPanel = page.getByTestId('about');
        await expect(aboutPanel).not.toBeAttached();
    });
    test('has no specification panel', async ({ page }) => {
        const specificationPanel = page.getByTestId('specification');
        await expect(specificationPanel).not.toBeAttached();
    });
    test('has no unit tests in the unit tests panel', async ({ page }) => {
        const unitTestsPanel = page.getByTestId('unit-tests');
        await expect(unitTestsPanel).toContainText('You have not written any unit tests yet');
    });
    test('has no current function panel', async ({ page }) => {
        const currentFunctionPanel = page.getByTestId('current-function');
        await expect(currentFunctionPanel).not.toBeAttached();
    });
    test('has the perfect candidate in the function panel', async ({ page }) => {
        const theFunctionPanel = page.getByTestId('the-function');
        await expect(theFunctionPanel).toContainText('function isEven(number) {\n  if (number % 2 !== 0) return false\n  return true\n}');
    });
    test('has 100% in the score panel', async ({ page }) => {
        const scorePanel = page.getByTestId('score');
        await expect(scorePanel).toContainText('100%');
    });
    test('has contract message', async ({ page }) => {
        const messages = page.getByTestId('messages');
        await expect(messages).toContainText('You write Unit Tests that pass The Function');
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

import { test, expect } from '@playwright/test';
test.describe('tdd level start', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:5500/');
        await page.getByRole('button', { name: 'I want to play Level 1 - Test-Driven Development - Voting Age' }).click();
    });
    test('has no about panel', async ({ page }) => {
        const aboutPanel = page.getByTestId('about');
        await expect(aboutPanel).not.toBeAttached();
    });
    test('has specification panel', async ({ page }) => {
        const specificationPanel = page.getByTestId('specification');
        await expect(specificationPanel).toContainText('Return true if the age is 18 years or over and return false if the age is under 18 ');
    });
    test('has no unit tests in the unit tests panel', async ({ page }) => {
        const unitTestsPanel = page.getByTestId('unit-tests');
        await expect(unitTestsPanel).toContainText('You have not written any unit tests yet');
    });
    test('has the simplest candidate in the current function panel', async ({ page }) => {
        const currentFunctionPanel = page.getByTestId('current-function');
        await expect(currentFunctionPanel).toContainText(/function isAllowedToVote\(age\) \{\n  return (undefined|false|true)\n\}/);
    });
    test('has no the function panel', async ({ page }) => {
        const theFunctionPanel = page.getByTestId('the-function');
        await expect(theFunctionPanel).not.toBeAttached();
    });
    test('has 100% in the score panel', async ({ page }) => {
        const scorePanel = page.getByTestId('score');
        await expect(scorePanel).toContainText('100%');
    });
    test('has contract message', async ({ page }) => {
        const messages = page.getByTestId('messages');
        await expect(messages).toContainText('You write Unit Tests according to the Specification');
    });
    test('has action menu message', async ({ page }) => {
        const messages = page.getByTestId('messages');
        const buttons = messages.getByRole('button');
        await expect(buttons).toHaveText([
            'Add unit test',
            'Show hint',
            'Submit unit tests',
            'Exit level',
        ]);
    });
});

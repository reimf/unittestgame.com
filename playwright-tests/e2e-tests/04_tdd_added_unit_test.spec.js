import { test, expect } from '@playwright/test';
test.describe('tdd added unit test', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:5500/');
        await page.getByRole('button', { name: 'I want to play Level 1 - Test Driven Development - Voting Age' }).click();
        await page.getByRole('button', { name: 'I want to add a unit test' }).click();
        await page.getByLabel('Age').fill('12');
        await page.getByLabel('Is allowed to vote').uncheck();
        await page.getByRole('button', { name: 'I want to add this unit test' }).click();
    });
    test('has add unit test message', async ({ page }) => {
        const messages = page.getByTestId('messages');
        await expect(messages).toContainText('isAllowedToVote(12) === false');
    });
    test('has added unit test message', async ({ page }) => {
        const messages = page.getByTestId('messages');
        await expect(messages).toContainText('I added the unit test');
    });
    test('has added unit test in unit tests panel', async ({ page }) => {
        const unitTestsPanel = page.getByTestId('unit-tests');
        await expect(unitTestsPanel).toContainText('isAllowedToVote(12) === false');
    });
    test('has another candidate in the current function panel', async ({ page }) => {
        const currentFunctionPanel = page.getByTestId('current-function');
        await expect(currentFunctionPanel).toContainText('function isAllowedToVote(age) {\n  return false\n}');
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

import { test, expect } from '@playwright/test';
test.describe('tdd submit insufficient unit test', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:5500/');
        await page.getByRole('button', { name: 'I want to play Level 1 - Test-Driven Development - Voting Age' }).click();
        await page.getByRole('button', { name: 'I want to add a unit test' }).click();
        await page.getByLabel('Age').fill('17');
        await page.getByLabel('Is allowed to vote').uncheck();
        await page.getByRole('button', { name: 'I want to add this unit test' }).click();
        await page.getByRole('button', { name: 'I want to add a unit test' }).click();
        await page.getByLabel('Age').fill('18');
        await page.getByLabel('Is allowed to vote').check();
        await page.getByRole('button', { name: 'I want to add this unit test' }).click();
        await page.getByRole('button', { name: 'I want to submit the unit tests' }).click();
    });
    test('has end message', async ({ page }) => {
        const messages = page.getByTestId('messages');
        await expect(messages).toContainText('I checked the current function and it is indeed according to the specification');
    });
    test('has high scores panel', async ({ page }) => {
        const highScores = page.getByTestId('high-scores');
        await expect(highScores).toContainText('Level 1 - Test-Driven Development - Voting Age: 100%');
    });
    test('has level menu message', async ({ page }) => {
        const messages = page.getByTestId('messages');
        const button = messages.getByRole('button');
        await expect(button).toHaveText('I want to play Level 2 - Mutation Testing - Even or Odd');
    });
});

import { test, expect } from '@playwright/test';
test.describe('level start', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:5500/');
        await page.getByRole('button', { name: 'I want to improve my Test Driven Development skills' }).click();
        await page.getByRole('button', { name: 'I want to play Test Driven Development - Level 1 - Voting Age' }).click();
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
    test('has the simplest candidate in the current candidate panel', async ({ page }) => {
        const currentCandidatePanel = page.getByTestId('current-function');
        await expect(currentCandidatePanel).toContainText(/function isAllowedToVote\(age\) \{\}/);
    });
    test('has 100% in the score panel', async ({ page }) => {
        const scorePanel = page.getByTestId('score');
        await expect(scorePanel).toContainText('100%');
    });
    test('has contract message', async ({ page }) => {
        const messages = page.getByTestId('messages');
        await expect(messages).toContainText('In the sidebar you see the specification');
    });
    test('has action menu message', async ({ page }) => {
        const messages = page.getByTestId('messages');
        const buttons = messages.getByRole('button');
        await expect(buttons).toHaveText([
            'I want to add a unit test (-5% on error)',
            'I want to see a hint for a unit test (-10%)',
            'I want to submit the unit tests (-20% on error)',
            'I want to exit this level (0% on error)',
        ]);
    });
});

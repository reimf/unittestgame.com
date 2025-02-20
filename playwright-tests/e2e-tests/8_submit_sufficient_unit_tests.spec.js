import { test, expect } from '@playwright/test';
test.describe('submit insufficient unit test', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:5500/');
        await page.getByRole('button', { name: /VotingAge/i }).click();
        await page.getByRole('button', { name: 'I want to add a unit test' }).click();
        await page.getByLabel('Age').fill('17');
        await page.getByLabel('Allowed to vote?').uncheck();
        await page.getByRole('button', { name: 'I want to add this unit test' }).click();
        await page.getByRole('button', { name: 'I want to add a unit test' }).click();
        await page.getByLabel('Age').fill('18');
        await page.getByLabel('Allowed to vote?').check();
        await page.getByRole('button', { name: 'I want to add this unit test' }).click();
        await page.getByRole('button', { name: 'I want to submit the unit tests' }).click();
    });
    test('has end message', async ({ page }) => {
        const messages = page.getByTestId('messages');
        await expect(messages).toContainText('The function is according to the specification');
    });
    test('has continue menu message', async ({ page }) => {
        const messages = page.getByTestId('messages');
        const buttons = messages.getByRole('button');
        await expect(buttons).toHaveText([
            '🥇 I want to play Level 1 - VotingAge again (100%)',
            '👉 I want to play Level 2 - EvenOdd',
            '🔒 Level 3 - FizzBuzz is locked',
            '🔒 Level 4 - LeapYear is locked',
            '🔒 Level 5 - TriangleType is locked',
            '🔒 Level 6 - FloatFormat is locked',
            '🔒 Level 7 - PasswordStrength is locked',
            '🔒 Level 8 - SpeedDisplay is locked',
        ]);
    });
});

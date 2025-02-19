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
            '🥇 Level 1: VotingAge - are you allowed to vote (100%)',
            '👉 Level 2: EvenOdd - separate the numbers (Play Now)',
            '🔒 Level 3: FizzBuzz - is it fizz or buzz (Locked)',
            '🔒 Level 4: LeapYear - find the leap years (Locked)',
            '🔒 Level 5: Triangle - name the triangle type (Locked)',
            '🔒 Level 6: Float - check the format (Locked)',
            '🔒 Level 7: Password - see if a password is strong (Locked)',
            '🔒 Level 8: Speed - display the speed of a car (Locked)',
        ]);
    });
});

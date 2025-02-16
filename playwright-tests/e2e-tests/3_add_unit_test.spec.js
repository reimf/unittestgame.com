import { test, expect } from '@playwright/test';
test.describe('add unit test', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:5500/');
        await page.getByText('VotingAge: is someone allowed to vote').click();
        await page.getByText('I want to add a unit test').click();
    });
    test('has age number field', async ({ page }) => {
        const age = page.locator('input[name="age"][type="number"]');
        await expect(age).toBeInViewport();
    });
    test('has isAllowedToVote checkbox', async ({ page }) => {
        const isAllowedToVote = page.locator('input[name="isAllowedToVote"][type="checkbox"]');
        await expect(isAllowedToVote).toBeInViewport();
    });
    test('has submit button', async ({ page }) => {
        const submitButton = page.locator('input[type="submit"]');
        await expect(submitButton).toBeInViewport();
    });
    test('has cancel button', async ({ page }) => {
        const cancelButton = page.locator('button');
        await expect(cancelButton).toBeInViewport();
    });
});

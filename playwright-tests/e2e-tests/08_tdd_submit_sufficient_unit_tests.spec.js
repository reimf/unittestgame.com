import { test, expect } from '@playwright/test';
test.describe('tdd submit sufficient unit test', () => {
    test.beforeEach(async ({ context, page }) => {
        await context.addInitScript(_ => localStorage.setItem('Main - Sidebar Shown', '1'));
        await context.addInitScript(_ => localStorage.setItem('Test-Driven Development - Example', '1'));
        await context.addInitScript({ path: './playwright-tests/e2e-tests/init_script.js' });
        await page.goto('http://localhost:5500/');
        await page.getByRole('button', { name: 'I want to play Level 2 - Test-Driven Development - Voting Age' }).click();
        await page.getByLabel('Age').fill('16');
        await page.getByLabel('false').check();
        await page.getByRole('button', { name: 'I want to add this unit test' }).click();
        await page.getByLabel('Age').fill('17');
        await page.getByLabel('false').check();
        await page.getByRole('button', { name: 'I want to add this unit test' }).click();
        await page.getByLabel('Age').fill('18');
        await page.getByLabel('true').check();
        await page.getByRole('button', { name: 'I want to add this unit test' }).click();
        await page.getByLabel('Age').fill('19');
        await page.getByLabel('true').check();
        await page.getByRole('button', { name: 'I want to add this unit test' }).click();
        await page.getByRole('button', { name: 'I want to submit the unit tests' }).click();
    });
    test('has end message', async ({ page }) => {
        const messages = page.getByTestId('messages');
        await expect(messages).toContainText('I checked the Current Function and it is indeed according to the Specification');
    });
    test('has finished levels panel', async ({ page }) => {
        const finishedLevels = page.getByTestId('finished-levels');
        await expect(finishedLevels).toContainText('Level 2 - Test-Driven Development - Voting Age');
    });
    test('has see example message', async ({ page }) => {
        const messages = page.getByTestId('messages');
        const button = messages.getByRole('button');
        await expect(button).toHaveText('I want to play Level 3 - Mutation Testing - Example');
    });
});

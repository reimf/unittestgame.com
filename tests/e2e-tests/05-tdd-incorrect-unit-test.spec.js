import { test, expect } from '@playwright/test';
test.describe('tdd incorrect unit test', () => {
    let page;
    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext();
        await context.addInitScript(_ => localStorage.setItem('Main - Sidebar Shown', '1'));
        await context.addInitScript(_ => localStorage.setItem('Test-Driven Development - Example', '1'));
        await context.addInitScript({ path: './tests/e2e-tests/init-script.js' });
        page = await context.newPage();
        await page.goto('/');
        await page.getByRole('button', { name: 'I want to play Level 2 - Test-Driven Development - Voting Age' }).click();
        await page.getByLabel('Age').fill('15');
        await page.getByLabel('true').check();
        await page.getByRole('button', { name: 'I want to add this unit test' }).click();
    });
    test('has I want to add this unit test message', async () => {
        const messages = page.getByTestId('messages');
        await expect(messages).toContainText('isAllowedToVote(15) === true');
    });
    test('has incorrect unit test message', async () => {
        const messages = page.getByTestId('messages');
        await expect(messages).toContainText('I did NOT add the unit test');
    });
    test('has NOT added unit test in unit tests panel', async () => {
        const unitTestsPanel = page.getByTestId('unit-tests');
        await expect(unitTestsPanel).not.toContainText('isAllowedToVote(15) === true');
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

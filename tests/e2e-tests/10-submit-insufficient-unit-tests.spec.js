import { test, expect } from '@playwright/test';
test.describe('submit insufficient unit tests', () => {
    let page;
    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext();
        await context.addInitScript(_ => localStorage.setItem('level-battery-level-finished', '1'));
        await context.addInitScript({ path: './tests/e2e-tests/init-script.js' });
        page = await context.newPage();
        await page.goto('/');
        await page.getByRole('button', { name: 'I want to play Level 2 - Voting Age' }).click();
        await page.getByRole('button', { name: 'I want to submit the unit tests' }).click();
    });
    test('has not according message', async () => {
        const messages = page.getByTestId('messages');
        await expect(messages).toContainText('The following unit test is NOT according to the Specification, but passes the Current Function.');
    });
    test('has unit test in not according message', async () => {
        const messages = page.getByTestId('messages');
        await expect(messages).toContainText('isAllowedToVote(0) === undefined');
    });
    test('has age field', async () => {
        const age = page.getByRole('textbox', { name: 'Age' });
        await expect(age).toBeVisible();
    });
    test('has allowed to vote true field', async () => {
        const isAllowedToVoteTrue = page.getByRole('radio', { name: 'true' });
        await expect(isAllowedToVoteTrue).toBeVisible();
    });
    test('has allowed to vote false field', async () => {
        const isAllowedToVoteFalse = page.getByRole('radio', { name: 'false' });
        await expect(isAllowedToVoteFalse).toBeVisible();
    });
    test('has add this unit test button', async () => {
        const button = page.getByRole('button', { name: 'I want to add this unit test' });
        await expect(button).toBeVisible();
    });
    test('has submit unit tests button', async () => {
        const button = page.getByRole('button', { name: 'I want to submit the unit tests' });
        await expect(button).toBeVisible();
    });
    test.afterAll(async () => {
        await page.close();
    });
});

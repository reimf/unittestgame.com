import { test, expect } from '@playwright/test';
test.describe('mt submit sufficient unit test', () => {
    let page;
    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext();
        await context.addInitScript(_ => localStorage.setItem('level-test-driven-development-battery-level-finished', '1'));
        await context.addInitScript(_ => localStorage.setItem('level-test-driven-development-even-odd-finished', '1'));
        await context.addInitScript(_ => localStorage.setItem('level-mutation-testing-voting-age-finished', '1'));
        await context.addInitScript({ path: './tests/e2e-tests/init-script.js' });
        page = await context.newPage();
        await page.goto('/');
        await page.getByRole('button', { name: 'I want to play Level 4 - Battery Level - Mutation Testing' }).click();
        await page.getByLabel('Battery Level').fill('20');
        await page.getByLabel('Normal Mode').check();
        await page.getByRole('button', { name: 'I want to add this unit test' }).click();
        await page.getByLabel('Battery Level').fill('19');
        await page.getByLabel('Low Power Mode').check();
        await page.getByRole('button', { name: 'I want to add this unit test' }).click();
        await page.getByLabel('Battery Level').fill('21');
        await page.getByLabel('Normal Mode').check();
        await page.getByRole('button', { name: 'I want to add this unit test' }).click();
        await page.getByLabel('Battery Level').fill('18');
        await page.getByLabel('Low Power Mode').check();
        await page.getByRole('button', { name: 'I want to add this unit test' }).click();
        await page.getByRole('button', { name: 'I want to submit the unit tests' }).click();
    });
    test('has end message', async () => {
        const messages = page.getByTestId('messages');
        await expect(messages).toContainText('The Function is indeed fully tested');
    });
    test('has level overview panel', async () => {
        const levelOverview = page.getByTestId('level-overview');
        await expect(levelOverview).toContainText('1🥇2🥇3🥇4🥇5▶️');
    });
    test('has level menu message', async () => {
        const messages = page.getByTestId('messages');
        const button = messages.getByRole('button');
        await expect(button).toHaveText('I want to play Level 5 - Voting Age - Test-Driven Development');
    });
    test.afterAll(async () => {
        await page.close();
    });
});

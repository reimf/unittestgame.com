import { test, expect } from '@playwright/test';
test.describe('welcome', () => {
    let page;
    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext();
        await context.addInitScript({ path: './tests/e2e-tests/init-script.js' });
        page = await context.newPage();
        await page.goto('/');
    });
    test('has title', async () => {
        await expect(page).toHaveTitle('UnitTestGame.com');
    });
    test('has welcome message', async () => {
        const messages = page.getByTestId('messages');
        await expect(messages).toContainText('Welcome to UnitTestGame where you can learn to write effective unit tests.');
    });
    test('has unittestgame panel', async () => {
        const unittestgamePanel = page.getByTestId('unittestgame');
        await expect(unittestgamePanel).toContainText('UnitTestGame');
    });
    test('has link to feedback mail address', async () => {
        const link = page.getByRole('link', { name: 'feedback' });
        expect(await link.getAttribute('href')).toBe('mailto:feedback@unittestgame.com');
    });
    test('has basics of test-driven development panel', async () => {
        const basicsTestDrivenDevelopmentPanel = page.getByTestId('test-driven-development');
        await expect(basicsTestDrivenDevelopmentPanel).toContainText('Test-Driven Development');
    });
    test('has more info on Test-Driven Development', async () => {
        const link = page.getByTestId('test-driven-development').getByRole('link', { name: 'Read more' });
        expect(await link.getAttribute('href')).toBe('https://en.wikipedia.org/wiki/Test-driven_development');
    });
    test('has level overview panel', async () => {
        const levelsPanel = page.getByTestId('level-overview');
        await expect(levelsPanel).toContainText('1▶️2🔒3🔒4🔒5🔒');
    });
    test('has see example message', async () => {
        const messages = page.getByTestId('messages');
        const button = messages.getByRole('button');
        await expect(button).toHaveText('I want to play Level 1 - Battery Level');
    });
    test.afterAll(async () => {
        await page.close();
    });
});

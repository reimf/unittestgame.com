import { test, expect } from '@playwright/test';
test.describe('level menu', () => {
    test.beforeEach(async ({ context, page }) => {
        await context.addInitScript({ path: './playwright-tests/e2e-tests/init_script.js' });
        await page.goto('http://localhost:3000/');
        await page.getByRole('button', { name: 'I want a sidebar with information on terms with a purple background' }).click();
    });
    test('has unittestgame panel', async ({ page }) => {
        const unittestgamePanel = page.getByTestId('unittestgame');
        await expect(unittestgamePanel).toContainText('UnitTestGame');
    });
    test('has link to feedback mail address', async ({ page }) => {
        const link = page.getByRole('link', { name: 'feedback' });
        expect(await link.getAttribute('href')).toBe('mailto:feedback@unittestgame.com');
    });
    test('has basics of test-driven development panel', async ({ page }) => {
        const basicsTestDrivenDevelopmentPanel = page.getByTestId('test-driven-development');
        await expect(basicsTestDrivenDevelopmentPanel).toContainText('Test-Driven Development');
    });
    test('has more info on Test-Driven Development', async ({ page }) => {
        const link = page.getByTestId('test-driven-development').getByRole('link', { name: 'more' });
        expect(await link.getAttribute('href')).toBe('https://en.wikipedia.org/wiki/Test-driven_development');
    });
    test('has basics of mutation testing panel', async ({ page }) => {
        const basicsMutationTestingPanel = page.getByTestId('mutation-testing');
        await expect(basicsMutationTestingPanel).toContainText('Mutation Testing');
    });
    test('has more info on Mutation Testing', async ({ page }) => {
        const link = page.getByTestId('mutation-testing').getByRole('link', { name: 'more' });
        expect(await link.getAttribute('href')).toBe('https://en.wikipedia.org/wiki/Mutation_testing');
    });
    test('has no levels panel', async ({ page }) => {
        const levelsPanel = page.getByTestId('levels');
        await expect(levelsPanel).not.toBeAttached();
    });
    test('has see example message', async ({ page }) => {
        const messages = page.getByTestId('messages');
        const button = messages.getByRole('button');
        await expect(button).toHaveText('I want to play Level 1 - Test-Driven Development - Example');
    });
});

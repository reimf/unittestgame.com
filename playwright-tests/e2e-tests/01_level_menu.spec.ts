import { test, expect } from '@playwright/test'

test.describe('level menu', () => {
    test.beforeEach(async({ page }) => {
        await page.addInitScript({ path: './playwright-tests/e2e-tests/init_script.js' })
        await page.goto('http://localhost:5500/')
    })

    test('has title', async({ page }) => {
        await expect(page).toHaveTitle('UnitTestGame.com')
    })

    test('has about panel', async({ page }) => {
        const aboutPanel = page.getByTestId('about')
        await expect(aboutPanel).toContainText('About')
    })

    test('has basics of test-driven development panel', async({ page }) => {
        const basicsTestDrivenDevelopmentPanel = page.getByTestId('test-driven-development')
        await expect(basicsTestDrivenDevelopmentPanel).toContainText('Test-Driven Development')
    })

    test('has basics of mutation testing panel', async({ page }) => {
        const basicsMutationTestingPanel = page.getByTestId('mutation-testing')
        await expect(basicsMutationTestingPanel).toContainText('Mutation Testing')
    })

    test('has link to feedback mail address', async({ page }) => {
        const link = page.getByRole('link', { name: 'feedback' })
        expect(await link.getAttribute('href')).toBe('mailto:feedback@unittestgame.com')
    })

    test('has link to website', async({ page }) => {
        const link = page.getByRole('link', { name: 'UnitTestGame.com' })
        expect(await link.getAttribute('href')).toBe('https://unittestgame.com')
    })

    test('has more info on Test-Driven Development', async({ page }) => {
        const link = page.getByRole('link', { name: 'Test-Driven Development' })
        expect(await link.getAttribute('href')).toBe('https://en.wikipedia.org/wiki/Test-driven_development')
    })

    test('has more info on Mutation Testing', async({ page }) => {
        const link = page.getByRole('link', { name: 'Mutation Testing' })
        expect(await link.getAttribute('href')).toBe('https://en.wikipedia.org/wiki/Mutation_testing')
    })

    test('has welcome message', async({ page }) => {
        const messages = page.getByTestId('messages')
        await expect(messages).toContainText('Welcome to UnitTestGame.com!')
    })

    test('has no high scores panel', async({ page }) => {
        const highScoresPanel = page.getByTestId('high-scores')
        await expect(highScoresPanel).not.toBeAttached()
    })

    test('has next level message', async({ page }) => {
        const messages = page.getByTestId('messages')
        const button = messages.getByRole('button')
        await expect(button).toHaveText('I want to play Level 1 - Test-Driven Development - Voting Age')
    })
})

import { test, expect } from '../fixture/fixture-coverage'
import type { Page } from '@playwright/test'

test.describe('incorrect unit test', () => {
    test.describe.configure({ mode: 'serial' })

    let page: Page

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage()
        await page.goto('/?speed=fast&setitem=level-battery-level-finished:1')
        await page.getByRole('button', { name: 'I want to play Level 2 - Voting Age' }).click()
        await page.getByLabel('Age').fill('17')
        await page.getByLabel('true').check()
        await page.getByRole('button', { name: 'I want to add this unit test' }).click()
    })

    test.afterAll(async () => {
        await page.close()
    })

    test('has unit test message', async () => {
        const messages = page.getByTestId('messages')
        await expect(messages).toContainText('isAllowedToVote(17) === true')
    })

    test('has incorrect unit test message', async () => {
        const messages = page.getByTestId('messages')
        await expect(messages).toContainText('I didn\'t add the unit test')
    })

    test('has NO unit tests panel', async () => {
        const unitTestsPanel = page.getByTestId('unit-tests')
        await expect(unitTestsPanel).not.toBeVisible()
    })

    test('has age field', async () => {
        const age = page.getByRole('textbox', { name: 'Age' })
        await expect(age).toBeVisible()
    })

    test('has allowed to vote true field', async () => {
        const isAllowedToVoteTrue = page.getByRole('radio', { name: 'true' })
        await expect(isAllowedToVoteTrue).toBeVisible()
    })

    test('has allowed to vote false field', async () => {
        const isAllowedToVoteFalse = page.getByRole('radio', { name: 'false' })
        await expect(isAllowedToVoteFalse).toBeVisible()
    })

    test('has add this unit test button', async () => {
        const button = page.getByRole('button', { name: 'I want to add this unit test' })
        await expect(button).toBeVisible()
    })

    test('has submit unit tests button', async () => {
        const button = page.getByRole('button', { name: 'I want to submit the unit tests' })
        await expect(button).toBeVisible()
    })
})

import { test, expect } from '../fixture/fixture-coverage'

test.describe('submit 1 out of 1 too many unit tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/game?speed=fast&setitem=penalties-level-battery-level:0&setitem=penalties-level-voting-age:1')
        await page.getByRole('button', { name: 'I want to play Level 2 - Wind Scale', exact: true }).click()
        await page.getByLabel('speed').fill('19')
        await page.getByLabel('"CALM"', { exact: true }).check()
        await page.getByRole('button', { name: 'I want to add this unit test', exact: true }).click()
        await page.getByLabel('speed').fill('20')
        await page.getByLabel('"BREEZE"', { exact: true }).check()
        await page.getByRole('button', { name: 'I want to add this unit test', exact: true }).click()
        await page.getByLabel('speed').fill('49')
        await page.getByLabel('"BREEZE"', { exact: true }).check()
        await page.getByRole('button', { name: 'I want to add this unit test', exact: true }).click()
        await page.getByLabel('speed').fill('50')
        await page.getByLabel('"GALE"', { exact: true }).check()
        await page.getByRole('button', { name: 'I want to add this unit test', exact: true }).click()
        await page.getByLabel('speed').fill('89')
        await page.getByLabel('"GALE"', { exact: true }).check()
        await page.getByRole('button', { name: 'I want to add this unit test', exact: true }).click()
        await page.getByLabel('speed').fill('90')
        await page.getByLabel('"STORM"', { exact: true }).check()
        await page.getByRole('button', { name: 'I want to add this unit test', exact: true }).click()
        await page.getByLabel('speed').fill('0')
        await page.getByLabel('"CALM"', { exact: true }).check()
        await page.getByRole('button', { name: 'I want to add this unit test', exact: true }).click()
        await page.getByRole('button', { name: 'I want to submit the unit tests', exact: true }).click()
    })

    test('has current function matches message', async ({ page }) => {
        const messages = page.getByTestId('messages')
        await expect(messages).toContainText('Well done! The Current Function matches the Specification.')
    })

    test('has tested thoroughly message', async ({ page }) => {
        const messages = page.getByTestId('messages')
        await expect(messages).toContainText('You\'ve tested the Current Function thoroughly, but you wrote 1 more unit test than necessary. The following can be left out.')
    })

    test('has 1 unit test in the message', async ({ page }) => {
        const messages = page.getByTestId('messages')
        await expect(messages).toContainText('windCategory(0) === "CALM"')
    })
})

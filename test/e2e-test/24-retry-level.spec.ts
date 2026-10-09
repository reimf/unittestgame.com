import { test, expect } from '../fixture/fixture-coverage'

test.describe('retry level', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/en/game?speed=fast&setitem=penalties-level-battery-level:1&store=map')
    })

    test('has a retry button only for the finished level', async ({ page }) => {
        const levelsPanel = page.getByTestId('level-overview')
        await expect(levelsPanel.getByRole('button', { name: 'Retry', exact: true })).toHaveCount(1)
    })

    test('restarts the finished level', async ({ page }) => {
        await page.getByTestId('level-overview').getByRole('button', { name: 'Retry', exact: true }).click()
        const specificationPanel = page.getByTestId('specification')
        await expect(specificationPanel).toContainText('Specification (Level 0 - Battery Level)')
        const currentFunctionPanel = page.getByTestId('current-function')
        const codeLines = currentFunctionPanel.locator('code > div')
        await expect(codeLines).toContainText(['function powerMode(batteryLevel) {', '    return "UNKNOWN"', '}'])
    })

    test('answers the play next level message', async ({ page }) => {
        const messages = page.getByTestId('messages')
        await expect(messages).toContainText('I want to play Level 1 - Voting Age')
        await page.getByTestId('level-overview').getByRole('button', { name: 'Retry', exact: true }).click()
        await expect(messages).toContainText('I want to retry Level 0 - Battery Level.')
        await expect(messages).not.toContainText('I want to play Level 1 - Voting Age')
    })
})

test.describe('retry level after playing it', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/en/game?speed=fast&picker=fixed&store=map')
        await page.getByRole('button', { name: 'I want to play Level 0 - Battery Level', exact: true }).click()
        await page.getByLabel('batteryLevel').fill('20')
        await page.getByLabel('"NORMAL MODE"', { exact: true }).check()
        await page.getByRole('button', { name: 'I want to add this unit test', exact: true }).click()
        await page.getByLabel('batteryLevel').fill('19')
        await page.getByLabel('"LOW POWER MODE"', { exact: true }).check()
        await page.getByRole('button', { name: 'I want to add this unit test', exact: true }).click()
        await page.getByRole('button', { name: 'I want to submit the unit tests', exact: true }).click()
        await page.getByLabel('batteryLevel').fill('21')
        await page.getByLabel('"NORMAL MODE"', { exact: true }).check()
        await page.getByRole('button', { name: 'I want to add this unit test', exact: true }).click()
        await page.getByRole('button', { name: 'I want to submit the unit tests', exact: true }).click()
        await page.getByLabel('batteryLevel').fill('18')
        await page.getByLabel('"LOW POWER MODE"', { exact: true }).check()
        await page.getByRole('button', { name: 'I want to add this unit test', exact: true }).click()
        await page.getByRole('button', { name: 'I want to submit the unit tests', exact: true }).click()
        await page.getByTestId('level-overview').getByRole('button', { name: 'Retry', exact: true }).click()
    })

    test('starts with the initial current function', async ({ page }) => {
        const currentFunctionPanel = page.getByTestId('current-function')
        const codeLines = currentFunctionPanel.locator('code > div')
        await expect(codeLines).toContainText(['function powerMode(batteryLevel) {', '    return "UNKNOWN"', '}'])
    })

    test('has no unit tests panel', async ({ page }) => {
        await expect(page.getByTestId('specification')).toContainText('Specification (Level 0 - Battery Level)')
        await expect(page.getByTestId('unit-tests')).toHaveCount(0)
    })

    test('has no difference panel', async ({ page }) => {
        await expect(page.getByTestId('specification')).toContainText('Specification (Level 0 - Battery Level)')
        await expect(page.getByTestId('difference-current-function')).toHaveCount(0)
    })

    test('can be played again', async ({ page }) => {
        await page.getByLabel('batteryLevel').fill('20')
        await page.getByLabel('"NORMAL MODE"', { exact: true }).check()
        await page.getByRole('button', { name: 'I want to add this unit test', exact: true }).click()
        const unitTestsPanel = page.getByTestId('unit-tests')
        await expect(unitTestsPanel.locator('li')).toHaveCount(1)
        await expect(unitTestsPanel).toContainText('powerMode(20) === "NORMAL MODE"')
    })
})

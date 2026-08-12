import { test, expect } from '../fixture/fixture-coverage'

test.describe('example level', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/game-en.html?speed=fast&picker=fixed&store=map')
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
    })

    test('has updated the current function panel', async ({ page }) => {
        const currentFunctionPanel = page.getByTestId('current-function')
        const codeLines = currentFunctionPanel.locator('code > div')
        await expect(codeLines).toContainText(['function powerMode(batteryLevel) {', '    if (batteryLevel >= 20) return "NORMAL MODE"', '    return "LOW POWER MODE"', '}'])
    })

    test('has all unit tests panel', async ({ page }) => {
        const unitTestsPanel = page.getByTestId('unit-tests')
        await expect(unitTestsPanel).toContainText('powerMode(20) === "NORMAL MODE"')
        await expect(unitTestsPanel).toContainText('powerMode(19) === "LOW POWER MODE"')
        await expect(unitTestsPanel).toContainText('powerMode(21) === "NORMAL MODE"')
        await expect(unitTestsPanel).toContainText('powerMode(18) === "LOW POWER MODE"')
    })

    test('has updatedlevel overview panel', async ({ page }) => {
        const levelsPanel = page.getByTestId('level-overview')
        await expect(levelsPanel).toContainText(
            '🥇Level 0 - Battery LevelRetry' +
            '▶️Level 1 - Voting AgePlay' +
            '🔒Level 2 - Wind ScaleLocked' +
            '🔒Level 3 - ReviewLocked' +
            '🔒Level 4 - DiscountLocked' +
            '🔒Level 5 - FizzBuzzLocked' +
            '🔒Level 6 - Leap YearLocked' +
            '🔒Level 7 - Triangle TypeLocked' +
            '🔒Level 8 - Speed DisplayLocked' +
            '🔒Level 9 - Parking FeeLocked')
    })

    test('has play next level message', async ({ page }) => {
        const messages = page.getByTestId('messages')
        const button = messages.getByRole('button')
        await expect(button).toHaveText('I want to play Level 1 - Voting Age')
    })
})

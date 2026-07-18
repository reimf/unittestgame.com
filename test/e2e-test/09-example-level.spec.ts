import { test, expect } from '../fixture/fixture-coverage'

test.describe('example level', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/?speed=fast&picker=fixed&store=map')
        await page.getByRole('button', { name: 'I want to play Level 1 - Battery Level' }).click()
        await page.getByLabel('Battery Level').fill('20')
        await page.getByLabel('NORMAL MODE').check()
        await page.getByRole('button', { name: 'I want to add this unit test' }).click()
        await page.getByLabel('Battery Level').fill('19')
        await page.getByLabel('LOW POWER MODE').check()
        await page.getByRole('button', { name: 'I want to add this unit test' }).click()
        await page.getByRole('button', { name: 'I want to submit the unit tests' }).click()
        await page.getByLabel('Battery Level').fill('21')
        await page.getByLabel('NORMAL MODE').check()
        await page.getByRole('button', { name: 'I want to add this unit test' }).click()
        await page.getByRole('button', { name: 'I want to submit the unit tests' }).click()
        await page.getByLabel('Battery Level').fill('18')
        await page.getByLabel('LOW POWER MODE').check()
        await page.getByRole('button', { name: 'I want to add this unit test' }).click()
        await page.getByRole('button', { name: 'I want to submit the unit tests' }).click()
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
            '🥇Level 1 - Battery Level' +
            '▶️Level 2 - Voting Age' +
            '🔒Level 3 - Even or Odd' +
            '🔒Level 4 - Review' +
            '🔒Level 5 - FIZZBUZZ' +
            '🔒Level 6 - Leap Year' +
            '🔒Level 7 - Triangle Type' +
            '🔒Level 8 - Speed Display' +
            '🔒Level 9 - Float Format' +
            '🔒Level 10 - Password Strength')
    })

    test('has play next level message', async ({ page }) => {
        const messages = page.getByTestId('messages')
        const button = messages.getByRole('button')
        await expect(button).toHaveText('I want to play Level 2 - Voting Age')
    })
})

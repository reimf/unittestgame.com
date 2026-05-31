import { test, expect } from '../fixture/fixture-coverage'

test.describe('unknown parameters', () => {
    test('has error in English', async ({ page }) => {

        page.on('dialog', async (dialog) => {
            expect(dialog.type()).toContain('alert')
            expect(dialog.message()).toContain('Unknown parameters: unknown, other')
            dialog.accept()
        })

        await page.goto('/?speed=fast&unknown=parameter&other=value')
    })
})

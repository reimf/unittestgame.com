import { test, expect } from '../fixture/fixture-coverage'

test.describe('unknown parameters', () => {
    test('handles unknown language', async ({ page }) => {

        page.on('dialog', async (dialog) => {
            expect(dialog.type()).toContain('alert')
            expect(dialog.message()).toContain('Parameter conversation_language=no, but no is not one of en, nl, de, fr, es, it')
            dialog.accept()
        })

        await page.goto('/?speed=fast&conversation_language=no')
    })

    test('has error in English', async ({ page }) => {

        page.on('dialog', async (dialog) => {
            expect(dialog.type()).toContain('alert')
            expect(dialog.message()).toContain('Unknown parameters unknown, other')
            dialog.accept()
        })

        await page.goto('/?speed=fast&unknown=parameter&other=value')
    })
})

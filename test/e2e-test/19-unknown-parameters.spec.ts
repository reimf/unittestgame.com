import { test, expect } from '../fixture/fixture-coverage'

test.describe('unknown parameters', () => {
    test('handles unknown programming language', async ({ page }) => {

        page.on('dialog', async (dialog) => {
            expect(dialog.type()).toContain('alert')
            expect(dialog.message()).toContain('Parameter programming_language=perl, but perl is not one of javascript, typescript, python, csharp, java, php, ruby')
            dialog.accept()
        })

        await page.goto('/game-en.html?speed=fast&programming_language=perl')
    })

    test('has error in English', async ({ page }) => {

        page.on('dialog', async (dialog) => {
            expect(dialog.type()).toContain('alert')
            expect(dialog.message()).toContain('Unknown parameters unknown, other')
            dialog.accept()
        })

        await page.goto('/game-en.html?speed=fast&unknown=parameter&other=value')
    })
})

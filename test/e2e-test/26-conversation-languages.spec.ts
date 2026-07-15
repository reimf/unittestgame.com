import { test, expect } from '../fixture/fixture-coverage'

test.describe('conversation languages', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/')
    })

    test('produces text for every method in every language', async ({ page }) => {
        const texts = await page.evaluate(async () => {
            const { conversationLanguages } = await import('../../src/conversation-languages.js')
            return conversationLanguages.flatMap(conversationLanguage =>
                Object.getOwnPropertyNames(Object.getPrototypeOf(conversationLanguage))
                    .filter(name => name !== 'constructor')
                    .map(name => (conversationLanguage as any)[name](1, 1) as string))
        })
        expect(texts.length).toBeGreaterThan(0)
        for (const text of texts)
            expect(text).not.toBe('')
    })
})

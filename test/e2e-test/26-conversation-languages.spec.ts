import { test, expect } from '../fixture/fixture-coverage'

test.describe('conversation languages', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/')
    })

    test('produces text for every method in every language', async ({ page }) => {
        const texts = await page.evaluate(async () => {
            const { conversationLanguages } = await import('../../src/conversation-languages.js')
            return conversationLanguages.map(conversationLanguage => [
                conversationLanguage.welcome(conversationLanguage.name, 'JavaScript'),
                conversationLanguage.unitTestGameTitle(),
                conversationLanguage.slogan(),
                conversationLanguage.readMoreAboutTDD(),
                conversationLanguage.contact(),
                conversationLanguage.settingsTitle(),
                conversationLanguage.changeLanguage(),
                conversationLanguage.changeProgrammingLanguage(),
                conversationLanguage.invitation(),
                conversationLanguage.level(1, 'Voting Age'),
                conversationLanguage.nextLevelButton('Level 1 - Voting Age'),
                conversationLanguage.allLevels(),
                conversationLanguage.closeTab(),
                conversationLanguage.unitTestsTitle(),
                conversationLanguage.addUnitTestButton(),
                conversationLanguage.submitUnitTestsButton(),
                conversationLanguage.unitTestNotAdded(),
                conversationLanguage.tooManyUnitTests(1, 1),
                conversationLanguage.tooManyUnitTests(2, 2),
                conversationLanguage.readSpecification(),
                conversationLanguage.improveCurrentFunction(),
                conversationLanguage.submitUnitTests(),
                conversationLanguage.specificationTitle('Voting Age'),
                conversationLanguage.currentFunctionTitle(),
                conversationLanguage.differenceTitle(),
                conversationLanguage.currentFunctionNotImproved(),
                conversationLanguage.hint(),
                conversationLanguage.currentFunctionImproved(1),
                conversationLanguage.currentFunctionImproved(2),
                conversationLanguage.invalidUnitTest(),
                conversationLanguage.moreUnitTests(1),
                conversationLanguage.moreUnitTests(2),
                conversationLanguage.currentFunctionCorrect(),
                conversationLanguage.levelOverviewTitle(),
                conversationLanguage.batteryLevelSpecification(),
                conversationLanguage.wrongAction(),
                conversationLanguage.addBatteryLevel20(),
                conversationLanguage.addBatteryLevel19(),
                conversationLanguage.submitUnitTestsFirst(),
                conversationLanguage.addBatteryLevel21(),
                conversationLanguage.submitUnitTestsSecond(),
                conversationLanguage.addBatteryLevel18(),
                conversationLanguage.submitUnitTestsThird(),
                conversationLanguage.windScaleSpecification(),
                conversationLanguage.fizzBuzzSpecification(),
                conversationLanguage.floatFormatSpecification(),
                conversationLanguage.leapYearSpecification(),
                conversationLanguage.passwordStrengthSpecification(),
                conversationLanguage.speedDisplaySpecification(),
                conversationLanguage.triangleTypeSpecification(),
                conversationLanguage.votingAgeSpecification(),
                conversationLanguage.reviewSpecification(),
                conversationLanguage.or(),
            ])
        })
        for (const text of texts)
            expect(text).not.toBe('')
    })
})

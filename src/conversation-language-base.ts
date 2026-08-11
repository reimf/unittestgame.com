declare const __conversation: unique symbol
export type ConversationText = string & { readonly [__conversation]: void }

export abstract class ConversationLanguage {
    public abstract readonly id: string
    public abstract readonly name: string

    public static bless(text: string): ConversationText {
        return text as ConversationText
    }

    public abstract welcome(): ConversationText
    public abstract unitTestGameTitle(): ConversationText
    public abstract slogan(): ConversationText
    public abstract home(): ConversationText
    public abstract settingsTitle(): ConversationText
    public abstract changeLanguage(): ConversationText
    public abstract changeProgrammingLanguage(): ConversationText
    public abstract invitation(): ConversationText
    public abstract level(levelNumber: number, levelName: string): ConversationText
    public abstract nextLevelButton(levelDescription: string): ConversationText
    public abstract playButton(): ConversationText
    public abstract retryButton(): ConversationText
    public abstract retryLevelButton(levelDescription: string): ConversationText
    public abstract lockedButton(): ConversationText
    public abstract allLevels(): ConversationText
    public abstract closeTab(): ConversationText
    public abstract unitTestsTitle(): ConversationText
    public abstract addUnitTestButton(): ConversationText
    public abstract submitUnitTestsButton(): ConversationText
    public abstract unitTestNotAdded(): ConversationText
    public abstract tooManyUnitTests(numberOfUnnecessaryUnitTests: number, numberOfRedundantUnitTests: number): ConversationText
    public abstract readSpecification(): ConversationText
    public abstract improveCurrentFunction(): ConversationText
    public abstract submitUnitTests(): ConversationText
    public abstract specificationTitle(description: string): ConversationText
    public abstract currentFunctionTitle(): ConversationText
    public abstract differenceTitle(): ConversationText
    public abstract currentFunctionNotImproved(): ConversationText
    public abstract hint(): ConversationText
    public abstract currentFunctionImproved(numberOfUnitTests: number): ConversationText
    public abstract invalidUnitTest(): ConversationText
    public abstract moreUnitTests(numberOfUnitTestsStillNeeded: number): ConversationText
    public abstract currentFunctionCorrect(): ConversationText
    public abstract levelOverviewTitle(): ConversationText
    public abstract batteryLevelSpecification(): ConversationText
    public abstract wrongAction(): ConversationText
    public abstract addBatteryLevel20(): ConversationText
    public abstract addBatteryLevel19(): ConversationText
    public abstract submitUnitTestsFirst(): ConversationText
    public abstract addBatteryLevel21(): ConversationText
    public abstract submitUnitTestsSecond(): ConversationText
    public abstract addBatteryLevel18(): ConversationText
    public abstract submitUnitTestsThird(): ConversationText
    public abstract votingAgeSpecification(): ConversationText
    public abstract windScaleSpecification(): ConversationText
    public abstract reviewSpecification(): ConversationText
    public abstract discountSpecification(): ConversationText
    public abstract fizzBuzzSpecification(): ConversationText
    public abstract leapYearSpecification(): ConversationText
    public abstract triangleTypeSpecification(): ConversationText
    public abstract speedDisplaySpecification(): ConversationText
    public abstract parkingFeeSpecification(): ConversationText
    public abstract or(): ConversationText
    public abstract parameterLabel(parameterName: string): ConversationText
    public abstract returnValueLabel(functionCall: string): ConversationText
    public abstract indexMetaDescription(): ConversationText
    public abstract indexPageTitle(): ConversationText
    public abstract navHowItWorks(): ConversationText
    public abstract navLevels(): ConversationText
    public abstract navWhyItWorks(): ConversationText
    public abstract navPlayNow(): ConversationText
    public abstract heroTitleLine1Start(): ConversationText
    public abstract heroTitleLine1Gradient(): ConversationText
    public abstract heroTitleLine2Start(): ConversationText
    public abstract heroTitleLine2Gradient(): ConversationText
    public abstract heroSubtitle(): ConversationText
    public abstract heroCtaPrimary(): ConversationText
    public abstract heroCtaSecondary(): ConversationText
    public abstract humanWantsToAddUnitTest(): ConversationText
    public abstract heroCommentThisIsYou(): ConversationText
    public abstract heroCommentFirstUnitTest(): ConversationText
    public abstract heroCommentThisIsTheAiBot(): ConversationText
    public abstract heroCommentFirstFunctionPasses(): ConversationText
    public abstract heroCommentFirstVerdict(): ConversationText
    public abstract heroCommentThisIsYouAgain(): ConversationText
    public abstract heroCommentSecondUnitTest(): ConversationText
    public abstract heroCommentThisIsTheAiBotAgain(): ConversationText
    public abstract heroCommentSecondFunctionPasses(): ConversationText
    public abstract heroCommentSecondVerdict(): ConversationText
    public abstract howItWorksTitle(): ConversationText
    public abstract howItWorksSubtitle(): ConversationText
    public abstract howItWorksStep1Title(): ConversationText
    public abstract howItWorksStep1Desc(): ConversationText
    public abstract howItWorksStep2Title(): ConversationText
    public abstract howItWorksStep2Desc(): ConversationText
    public abstract howItWorksStep3Title(): ConversationText
    public abstract howItWorksStep3Desc(): ConversationText
    public abstract howItWorksStep4Title(): ConversationText
    public abstract howItWorksStep4Desc(): ConversationText
    public abstract whyItWorksTitle(): ConversationText
    public abstract whyItWorksSubtitle(): ConversationText
    public abstract whyItWorksItem1Title(): ConversationText
    public abstract whyItWorksItem1Desc(): ConversationText
    public abstract whyItWorksItem2Title(): ConversationText
    public abstract whyItWorksItem2Desc(): ConversationText
    public abstract whyItWorksItem3Title(): ConversationText
    public abstract whyItWorksItem3Desc(): ConversationText
    public abstract whyItWorksItem4Title(): ConversationText
    public abstract languagesList(): ConversationText
    public abstract whyItWorksItem5Title(): ConversationText
    public abstract programmingLanguagesList(): ConversationText
    public abstract whyItWorksItem6Title(): ConversationText
    public abstract whyItWorksItem6Desc(): ConversationText
    public abstract levelsTitle(): ConversationText
    public abstract levelsSubtitle(): ConversationText
    public abstract levelsDifficultyEasy(): ConversationText
    public abstract levelsDifficultyMedium(): ConversationText
    public abstract levelsDifficultyHard(): ConversationText
    public abstract levelBlurb0(): ConversationText
    public abstract levelBlurb1(): ConversationText
    public abstract levelBlurb2(): ConversationText
    public abstract levelBlurb3(): ConversationText
    public abstract levelBlurb4(): ConversationText
    public abstract levelBlurb5(): ConversationText
    public abstract levelBlurb6(): ConversationText
    public abstract levelBlurb7(): ConversationText
    public abstract levelBlurb8(): ConversationText
    public abstract levelBlurb9(): ConversationText
    public abstract faqTitle(): ConversationText
    public abstract faqSubtitle(): ConversationText
    public abstract faqQuestion1(): ConversationText
    public abstract faqAnswer1(): ConversationText
    public abstract faqQuestion2(): ConversationText
    public abstract faqQuestion3(): ConversationText
    public abstract faqQuestion4(): ConversationText
    public abstract faqAnswer4(): ConversationText
    public abstract faqQuestion5(): ConversationText
    public abstract faqAnswer5(): ConversationText
    public abstract faqQuestion6(): ConversationText
    public abstract faqAnswer6(): ConversationText
    public abstract faqQuestion7(): ConversationText
    public abstract faqAnswer7(): ConversationText
    public abstract faqQuestion8(): ConversationText
    public abstract faqAnswer8(): ConversationText
    public abstract ctaTitle(): ConversationText
    public abstract ctaSubtitle(): ConversationText
    public abstract ctaButton(): ConversationText
    public abstract footerContact(): ConversationText
}

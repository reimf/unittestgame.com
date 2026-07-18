declare const __conversation: unique symbol
export type ConversationText = string & { readonly [__conversation]: void }

export abstract class ConversationLanguage {
    public abstract readonly id: string
    public abstract readonly name: string

    public static bless(text: string): ConversationText {
        return text as ConversationText
    }

    public abstract welcome(conversationLanguageName: string, programmingLanguageName: string): ConversationText
    public abstract unitTestGameTitle(): ConversationText
    public abstract slogan(): ConversationText
    public abstract readMoreAboutTDD(): ConversationText
    public abstract contact(): ConversationText
    public abstract settingsTitle(): ConversationText
    public abstract changeLanguage(): ConversationText
    public abstract changeProgrammingLanguage(): ConversationText
    public abstract invitation(): ConversationText
    public abstract level(levelNumber: number, levelName: string): ConversationText
    public abstract nextLevelButton(levelDescription: string): ConversationText
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
    public abstract evenOddSpecification(): ConversationText
    public abstract fizzBuzzSpecification(): ConversationText
    public abstract floatFormatSpecification(): ConversationText
    public abstract leapYearSpecification(): ConversationText
    public abstract passwordStrengthSpecification(): ConversationText
    public abstract speedDisplaySpecification(): ConversationText
    public abstract triangleTypeSpecification(): ConversationText
    public abstract votingAgeSpecification(): ConversationText
    public abstract reviewSpecification(): ConversationText
    public abstract or(): ConversationText
}

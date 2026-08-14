declare const __conversation: unique symbol
export type ConversationText = string & { readonly [__conversation]: void }

export interface ConversationStrings {
    welcome: string
    unitTestGameTitle: string
    slogan: string
    home: string
    settingsTitle: string
    invitation: string
    level: string
    nextLevelButton: string
    playButton: string
    retryButton: string
    retryLevelButton: string
    lockedButton: string
    allLevels: string
    closeTab: string
    unitTestsTitle: string
    addUnitTestButton: string
    submitUnitTestsButton: string
    unitTestNotAdded: string
    tooManyUnitTests: string
    readSpecification: string
    improveCurrentFunction: string
    submitUnitTests: string
    specificationTitle: string
    currentFunctionTitle: string
    differenceTitle: string
    currentFunctionNotImproved: string
    hint: string
    currentFunctionImproved: string
    invalidUnitTest: string
    moreUnitTests: string
    currentFunctionCorrect: string
    levelOverviewTitle: string
    batteryLevelSpecification: string
    wrongAction: string
    addBatteryLevel20: string
    addBatteryLevel19: string
    submitUnitTestsFirst: string
    addBatteryLevel21: string
    submitUnitTestsSecond: string
    addBatteryLevel18: string
    submitUnitTestsThird: string
    votingAgeSpecification: string
    windScaleSpecification: string
    reviewSpecification: string
    discountSpecification: string
    fizzBuzzSpecification: string
    leapYearSpecification: string
    triangleTypeSpecification: string
    speedDisplaySpecification: string
    parkingFeeSpecification: string
    or: string
    parameterLabel: string
    returnValueLabel: string
}

export abstract class ConversationLanguage {
    public abstract readonly id: string
    public abstract readonly name: string
    protected abstract readonly strings: ConversationStrings

    public static bless(text: string): ConversationText {
        return text as ConversationText
    }

    protected format(template: string, params: Record<string, string | number> = {}): ConversationText {
        const formatted = template
            .replace(/\{(\w+)\}/g, (_, key: string) => String(params[key]))
            .replace(/\{(\w+) === 1 \? '(.*?)' : '(.*?)'\}/g, (_, key: string, singular: string, plural: string) => Number(params[key]) === 1 ? singular : plural)
        return ConversationLanguage.bless(formatted)
    }

    public welcome(): ConversationText {
        return this.format(this.strings.welcome)
    }

    public unitTestGameTitle(): ConversationText {
        return this.format(this.strings.unitTestGameTitle)
    }

    public slogan(): ConversationText {
        return this.format(this.strings.slogan)
    }

    public home(): ConversationText {
        return this.format(this.strings.home)
    }

    public settingsTitle(): ConversationText {
        return this.format(this.strings.settingsTitle)
    }

    public invitation(): ConversationText {
        return this.format(this.strings.invitation)
    }

    public level(levelNumber: number, levelName: string): ConversationText {
        return this.format(this.strings.level, { levelNumber, levelName })
    }

    public nextLevelButton(levelDescription: string): ConversationText {
        return this.format(this.strings.nextLevelButton, { levelDescription })
    }

    public playButton(): ConversationText {
        return this.format(this.strings.playButton)
    }

    public retryButton(): ConversationText {
        return this.format(this.strings.retryButton)
    }

    public retryLevelButton(levelDescription: string): ConversationText {
        return this.format(this.strings.retryLevelButton, { levelDescription })
    }

    public lockedButton(): ConversationText {
        return this.format(this.strings.lockedButton)
    }

    public allLevels(): ConversationText {
        return this.format(this.strings.allLevels)
    }

    public closeTab(): ConversationText {
        return this.format(this.strings.closeTab)
    }

    public unitTestsTitle(): ConversationText {
        return this.format(this.strings.unitTestsTitle)
    }

    public addUnitTestButton(): ConversationText {
        return this.format(this.strings.addUnitTestButton)
    }

    public submitUnitTestsButton(): ConversationText {
        return this.format(this.strings.submitUnitTestsButton)
    }

    public unitTestNotAdded(): ConversationText {
        return this.format(this.strings.unitTestNotAdded)
    }

    public tooManyUnitTests(numberOfUnnecessaryUnitTests: number, numberOfRedundantUnitTests: number): ConversationText {
        return this.format(this.strings.tooManyUnitTests, { numberOfUnnecessaryUnitTests, numberOfRedundantUnitTests })
    }

    public readSpecification(): ConversationText {
        return this.format(this.strings.readSpecification)
    }

    public improveCurrentFunction(): ConversationText {
        return this.format(this.strings.improveCurrentFunction)
    }

    public submitUnitTests(): ConversationText {
        return this.format(this.strings.submitUnitTests)
    }

    public specificationTitle(description: string): ConversationText {
        return this.format(this.strings.specificationTitle, { description })
    }

    public currentFunctionTitle(): ConversationText {
        return this.format(this.strings.currentFunctionTitle)
    }

    public differenceTitle(): ConversationText {
        return this.format(this.strings.differenceTitle)
    }

    public currentFunctionNotImproved(): ConversationText {
        return this.format(this.strings.currentFunctionNotImproved)
    }

    public hint(): ConversationText {
        return this.format(this.strings.hint)
    }

    public currentFunctionImproved(numberOfUnitTests: number): ConversationText {
        return this.format(this.strings.currentFunctionImproved, { numberOfUnitTests })
    }

    public invalidUnitTest(): ConversationText {
        return this.format(this.strings.invalidUnitTest)
    }

    public moreUnitTests(numberOfUnitTestsStillNeeded: number): ConversationText {
        return this.format(this.strings.moreUnitTests, { numberOfUnitTestsStillNeeded })
    }

    public currentFunctionCorrect(): ConversationText {
        return this.format(this.strings.currentFunctionCorrect)
    }

    public levelOverviewTitle(): ConversationText {
        return this.format(this.strings.levelOverviewTitle)
    }

    public batteryLevelSpecification(): ConversationText {
        return this.format(this.strings.batteryLevelSpecification)
    }

    public wrongAction(): ConversationText {
        return this.format(this.strings.wrongAction)
    }

    public addBatteryLevel20(): ConversationText {
        return this.format(this.strings.addBatteryLevel20)
    }

    public addBatteryLevel19(): ConversationText {
        return this.format(this.strings.addBatteryLevel19)
    }

    public submitUnitTestsFirst(): ConversationText {
        return this.format(this.strings.submitUnitTestsFirst)
    }

    public addBatteryLevel21(): ConversationText {
        return this.format(this.strings.addBatteryLevel21)
    }

    public submitUnitTestsSecond(): ConversationText {
        return this.format(this.strings.submitUnitTestsSecond)
    }

    public addBatteryLevel18(): ConversationText {
        return this.format(this.strings.addBatteryLevel18)
    }

    public submitUnitTestsThird(): ConversationText {
        return this.format(this.strings.submitUnitTestsThird)
    }

    public votingAgeSpecification(): ConversationText {
        return this.format(this.strings.votingAgeSpecification)
    }

    public windScaleSpecification(): ConversationText {
        return this.format(this.strings.windScaleSpecification)
    }

    public reviewSpecification(): ConversationText {
        return this.format(this.strings.reviewSpecification)
    }

    public discountSpecification(): ConversationText {
        return this.format(this.strings.discountSpecification)
    }

    public fizzBuzzSpecification(): ConversationText {
        return this.format(this.strings.fizzBuzzSpecification)
    }

    public leapYearSpecification(): ConversationText {
        return this.format(this.strings.leapYearSpecification)
    }

    public triangleTypeSpecification(): ConversationText {
        return this.format(this.strings.triangleTypeSpecification)
    }

    public speedDisplaySpecification(): ConversationText {
        return this.format(this.strings.speedDisplaySpecification)
    }

    public parkingFeeSpecification(): ConversationText {
        return this.format(this.strings.parkingFeeSpecification)
    }

    public or(): ConversationText {
        return this.format(this.strings.or)
    }

    public parameterLabel(parameterName: string): ConversationText {
        return this.format(this.strings.parameterLabel, { parameterName })
    }

    public returnValueLabel(functionCall: string): ConversationText {
        return this.format(this.strings.returnValueLabel, { functionCall })
    }
}

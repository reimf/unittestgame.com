import { ConversationLanguage, ConversationText } from './conversation-language-base.js'

export class English extends ConversationLanguage {
    public override readonly id = 'en' as const
    public override readonly name = 'English'

    public override welcome(): ConversationText {
        return ConversationLanguage.bless('Hi! I\'m an AI bot that writes code. ' +
            'Your job is to guide me using unit tests.')
    }

    public override unitTestGameTitle(): ConversationText {
        return ConversationLanguage.bless('UnitTestGame')
    }

    public override slogan(): ConversationText {
        return ConversationLanguage.bless('![Logo of UnitTestGame](apple-touch-icon.png)Learn to write unit tests that guide an AI bot.')
    }

    public override home(): ConversationText {
        return ConversationLanguage.bless('[Home](/)')
    }

    public override settingsTitle(): ConversationText {
        return ConversationLanguage.bless('Settings')
    }

    public override changeLanguage(): ConversationText {
        return ConversationLanguage.bless('Conversation Language')
    }

    public override changeProgrammingLanguage(): ConversationText {
        return ConversationLanguage.bless('Programming Language')
    }

    public override invitation(): ConversationText {
        return ConversationLanguage.bless('Which level do you want to play?')
    }

    public override level(levelNumber: number, levelName: string): ConversationText {
        return ConversationLanguage.bless(`Level ${levelNumber} - ${levelName}`)
    }

    public override nextLevelButton(levelDescription: string): ConversationText {
        return ConversationLanguage.bless(`I want to play ${levelDescription}`)
    }

    public override playButton(): ConversationText {
        return ConversationLanguage.bless('Play')
    }

    public override retryButton(): ConversationText {
        return ConversationLanguage.bless('Retry')
    }

    public override retryLevelButton(levelDescription: string): ConversationText {
        return ConversationLanguage.bless(`I want to retry ${levelDescription}`)
    }

    public override lockedButton(): ConversationText {
        return ConversationLanguage.bless('Locked')
    }

    public override allLevels(): ConversationText {
        return ConversationLanguage.bless('I\'ve completed all the levels')
    }

    public override closeTab(): ConversationText {
        return ConversationLanguage.bless('Well done! You\'ve completed all the levels. ' +
            'You can now write unit tests for your own projects.')
    }

    public override unitTestsTitle(): ConversationText {
        return ConversationLanguage.bless('Unit Tests')
    }

    public override addUnitTestButton(): ConversationText {
        return ConversationLanguage.bless('I want to add this unit test')
    }

    public override submitUnitTestsButton(): ConversationText {
        return ConversationLanguage.bless('I want to submit the unit tests')
    }

    public override unitTestNotAdded(): ConversationText {
        return ConversationLanguage.bless('I didn\'t add the unit test, ' +
            'because it doesn\'t match the *Specification*.')
    }

    public override tooManyUnitTests(numberOfUnnecessaryUnitTests: number, numberOfRedundantUnitTests: number): ConversationText {
        return ConversationLanguage.bless(`You've tested the *Current Function* thoroughly, ` +
            `but you wrote ${numberOfUnnecessaryUnitTests} more ${numberOfUnnecessaryUnitTests === 1 ? 'unit test' : 'unit tests'} than necessary. ` +
            `${numberOfRedundantUnitTests === 1 ? 'The following' : 'At least one of the following'} can be left out.`)
    }

    public override readSpecification(): ConversationText {
        return ConversationLanguage.bless('First, read the *Specification*. ' +
            'Then write a unit test that the *Current Function* fails.')
    }

    public override improveCurrentFunction(): ConversationText {
        return ConversationLanguage.bless('After adding a unit test ' +
            'I\'ll improve the *Current Function* so all *Unit Tests* pass again.')
    }

    public override submitUnitTests(): ConversationText {
        return ConversationLanguage.bless('Submit the *Unit Tests* when you think the *Current Function* matches the *Specification*.')
    }

    public override specificationTitle(description: string): ConversationText {
        return ConversationLanguage.bless(`Specification (${description})`)
    }

    public override currentFunctionTitle(): ConversationText {
        return ConversationLanguage.bless('Current Function')
    }

    public override differenceTitle(): ConversationText {
        return ConversationLanguage.bless('Difference')
    }

    public override currentFunctionNotImproved(): ConversationText {
        return ConversationLanguage.bless('I\'ve added the unit test, ' +
            'but the *Current Function* already passes it, ' +
            'so I didn\'t improve the *Current Function*.')
    }

    public override hint(): ConversationText {
        return ConversationLanguage.bless('Write a unit test that the *Current Function* fails.')
    }

    public override currentFunctionImproved(numberOfUnitTests: number): ConversationText {
        return ConversationLanguage.bless(`I've added the unit test to the *Unit Tests* and improved the *Current Function* ` +
            `so the new unit test now passes${numberOfUnitTests === 1 ? '' : ' as well'}.`)
    }

    public override invalidUnitTest(): ConversationText {
        return ConversationLanguage.bless('The following unit test doesn\'t match the *Specification*, ' +
            'but the *Current Function* passes it.')
    }

    public override moreUnitTests(numberOfUnitTestsStillNeeded: number): ConversationText {
        return ConversationLanguage.bless(`The *Current Function* doesn't match the *Specification* yet. ` +
            `You need at least ${numberOfUnitTestsStillNeeded} more ${numberOfUnitTestsStillNeeded === 1 ? 'unit test' : 'unit tests'}, ` +
            `so write a unit test that matches the *Specification* and that the *Current Function* fails.`)
    }

    public override currentFunctionCorrect(): ConversationText {
        return ConversationLanguage.bless('Well done! The *Current Function* matches the *Specification*.')
    }

    public override levelOverviewTitle(): ConversationText {
        return ConversationLanguage.bless('Level Overview')
    }

    public override wrongAction(): ConversationText {
        return ConversationLanguage.bless('Hmm, that\'s not quite right. ' +
            'Try again.')
    }

    public override addBatteryLevel20(): ConversationText {
        return ConversationLanguage.bless('The *Specification* contains the number `20`. ' +
            'That is a good starting point. ' +
            'When the battery level is `20`, the function must return `"NORMAL MODE"`.')
    }

    public override addBatteryLevel19(): ConversationText {
        return ConversationLanguage.bless('The *Current Function* now always returns `"NORMAL MODE"`, ' +
            'but the *Specification* says battery level `19` must return `"LOW POWER MODE"`. ' +
            'Add a unit test for that.')
    }

    public override submitUnitTestsFirst(): ConversationText {
        return ConversationLanguage.bless('The *Current Function* can now return either `"NORMAL MODE"` or `"LOW POWER MODE"`. ' +
            'Submit the *Unit Tests* to check if the *Current Function* matches the *Specification*.')
    }

    public override addBatteryLevel21(): ConversationText {
        return ConversationLanguage.bless('The *Current Function* now returns `"NORMAL MODE"` only for battery level `20`. ' +
            'The *Specification* says `21` must also return `"NORMAL MODE"`. ' +
            'Add a unit test for that.')
    }

    public override submitUnitTestsSecond(): ConversationText {
        return ConversationLanguage.bless('Submit the *Unit Tests* again to check if the *Current Function* matches the *Specification*.')
    }

    public override addBatteryLevel18(): ConversationText {
        return ConversationLanguage.bless('The *Current Function* now returns `"LOW POWER MODE"` only for battery level `19`. ' +
            'The *Specification* says `18` must also return `"LOW POWER MODE"`. ' +
            'Add a unit test for that.')
    }

    public override submitUnitTestsThird(): ConversationText {
        return ConversationLanguage.bless('Submit the *Unit Tests* again to check if the *Current Function* finally matches the *Specification*.')
    }

    public override batteryLevelSpecification(): ConversationText {
        return ConversationLanguage.bless('A smartphone normally operates in `"NORMAL MODE"`, ' +
            'but when the battery level is less than `20`, ' +
            'it operates in `"LOW POWER MODE"`.')
    }

    public override votingAgeSpecification(): ConversationText {
        return ConversationLanguage.bless('You can vote if your age is `18` or over.')
    }

    public override windScaleSpecification(): ConversationText {
        return ConversationLanguage.bless('It\'s `"CALM"` if the wind speed is less than `20`, ' +
            '`"BREEZE"` if less than `50`, ' +
            '`"GALE"` if less than `90`, ' +
            'and `"STORM"` otherwise.')
    }

    public override reviewSpecification(): ConversationText {
        return ConversationLanguage.bless('Your review is `"GOOD"` if the price is less than `20` and the quality is at least `7`, ' +
            '`"BAD"` if the price is `20` or more and the quality is less than `7`, ' +
            'and `"OK"` otherwise.')
    }

    public override discountSpecification(): ConversationText {
        return ConversationLanguage.bless('You get `20`% discount if the total is at least `200` and you have a member card, ' +
            '`10`% if the total is at least `100` or you have a member card, ' +
            'and `0`% otherwise.')
    }

    public override fizzBuzzSpecification(): ConversationText {
        return ConversationLanguage.bless('Say `"FIZZ"` if the number is divisible by 3, ' +
            '`"BUZZ"` if divisible by 5, ' +
            '`"FIZZBUZZ"` if divisible by both 3 and 5, ' +
            'and `"NUMBER"` for any other number.')
    }

    public override leapYearSpecification(): ConversationText {
        return ConversationLanguage.bless('Return `true` if the year is a leap year and `false` otherwise. ' +
            'A year is a leap year if it is divisible by 4. ' +
            'The exception is that years divisible by 100 are not leap years, unless they are also divisible by 400.')
    }

    public override triangleTypeSpecification(): ConversationText {
        return ConversationLanguage.bless('The type of the triangle is `"EQUILATERAL"`, `"ISOSCELES"`, or `"SCALENE"`. ' +
            'A triangle is `"EQUILATERAL"` if all three sides have the same length. ' +
            'A triangle is `"ISOSCELES"` if exactly two sides have the same length. ' +
            'A triangle is `"SCALENE"` if all three sides have different lengths.')
    }

    public override speedDisplaySpecification(): ConversationText {
        return ConversationLanguage.bless('The speed sensor reports the speed in tenths of kilometers per hour (e.g. 131 means 13.1 km/h). ' +
            'Show the speed on the display as `"DECIMAL"` if a decimal fits (e.g. 131 → `"DECIMAL"` because 13.1 fits on the display), ' +
            'or `"INTEGER"` otherwise (e.g. 826 → `"INTEGER"` because 82.6 doesn\'t fit on the display but 83 does). ' +
            'If the car isn\'t moving, it\'s `"START"`. ' +
            'If the speed no longer fits on the display, it\'s `"DANGER"` (e.g. 3000 → `"DANGER"`).\n' +
            'The display looks like this, where every X is a LED light:\n' +
            '+-------------------+\n' +
            '|  X   XXXX   XXXX  |\n' +
            '|  X   X  X   X  X  |\n' +
            '|  X   XXXX   XXXX  |\n' +
            '|  X   X  X   X  X  |\n' +
            '|  X   XXXX X XXXX  |\n' +
            '|                   |\n' +
            '| X START  DANGER X |\n' +
            '+-------------------+')
    }

    public override parkingFeeSpecification(): ConversationText {
        return ConversationLanguage.bless('The parking fee is `0` cents if the car is parked for less than a half hour, or if the customer has shopped on the weekend. ' +
            'It\'s `1000` cents if it\'s a weekend. ' +
            'Otherwise, it\'s 5 cents per minute if the customer hasn\'t shopped, or 3 cents per minute if the customer has shopped.')
    }

    public override or(): ConversationText {
        return ConversationLanguage.bless('or')
    }

    public override parameterLabel(parameterName: string): ConversationText {
        return ConversationLanguage.bless(`Value of parameter ${parameterName}`)
    }

    public override returnValueLabel(functionCall: string): ConversationText {
        return ConversationLanguage.bless(`Result of ${functionCall}`)
    }

    public override indexMetaDescription(): ConversationText {
        return ConversationLanguage.bless('Learn to write effective unit tests with an interactive game where you collaborate with a maliciously compliant AI bot to improve your skills in unit testing.')
    }

    public override indexPageTitle(): ConversationText {
        return ConversationLanguage.bless('UnitTestGame.com: Outsmart the AI bot that cheats on purpose')
    }

    public override navHowItWorks(): ConversationText {
        return ConversationLanguage.bless('How it works')
    }

    public override navLevels(): ConversationText {
        return ConversationLanguage.bless('Levels')
    }

    public override navWhyItWorks(): ConversationText {
        return ConversationLanguage.bless('Why it works')
    }

    public override navPlayNow(): ConversationText {
        return ConversationLanguage.bless('Play now')
    }

    public override heroTitleLine1Start(): ConversationText {
        return ConversationLanguage.bless('The code passes')
    }

    public override heroTitleLine1Gradient(): ConversationText {
        return ConversationLanguage.bless('your unit tests.')
    }

    public override heroTitleLine2Start(): ConversationText {
        return ConversationLanguage.bless('But does it do what')
    }

    public override heroTitleLine2Gradient(): ConversationText {
        return ConversationLanguage.bless('you really want?')
    }

    public override heroSubtitle(): ConversationText {
        return ConversationLanguage.bless('UnitTestGame pairs you with a maliciously compliant AI bot. ' +
            'It writes the laziest code that satisfies your unit tests. ' +
            'And nothing more. ' +
            'Your job: write unit tests until the program is right.')
    }

    public override heroCtaPrimary(): ConversationText {
        return ConversationLanguage.bless('Play for free in your browser →')
    }

    public override heroCtaSecondary(): ConversationText {
        return ConversationLanguage.bless('See how it works')
    }

    public override humanWantsToAddUnitTest(): ConversationText {
        return ConversationLanguage.bless('I want to add this unit test.')
    }

    public override heroCommentThisIsYou(): ConversationText {
        return ConversationLanguage.bless('this is you ↑')
    }

    public override heroCommentFirstUnitTest(): ConversationText {
        return ConversationLanguage.bless('with your first unit test')
    }

    public override heroCommentThisIsTheAiBot(): ConversationText {
        return ConversationLanguage.bless('↑ this is the AI bot')
    }

    public override heroCommentFirstFunctionPasses(): ConversationText {
        return ConversationLanguage.bless('its first function passes your unit test')
    }

    public override heroCommentFirstVerdict(): ConversationText {
        return ConversationLanguage.bless('but it doesn\'t generalize 👎')
    }

    public override heroCommentThisIsYouAgain(): ConversationText {
        return ConversationLanguage.bless('this is you again ↑')
    }

    public override heroCommentSecondUnitTest(): ConversationText {
        return ConversationLanguage.bless('now with your second unit test')
    }

    public override heroCommentThisIsTheAiBotAgain(): ConversationText {
        return ConversationLanguage.bless('↑ this is the AI bot again')
    }

    public override heroCommentSecondFunctionPasses(): ConversationText {
        return ConversationLanguage.bless('its second function passes both unit tests')
    }

    public override heroCommentSecondVerdict(): ConversationText {
        return ConversationLanguage.bless('and now it generalizes 👍')
    }

    public override howItWorksTitle(): ConversationText {
        return ConversationLanguage.bless('Learn to write unit tests by feel')
    }

    public override howItWorksSubtitle(): ConversationText {
        return ConversationLanguage.bless('No lectures. ' +
            'No quizzes. ' +
            'Just an AI bot exploiting every hole in your unit tests.')
    }

    public override howItWorksStep1Title(): ConversationText {
        return ConversationLanguage.bless('Read the spec')
    }

    public override howItWorksStep1Desc(): ConversationText {
        return ConversationLanguage.bless('See what the function is supposed to do, ' +
            'in plain input → output terms.')
    }

    public override howItWorksStep2Title(): ConversationText {
        return ConversationLanguage.bless('Watch it cheat')
    }

    public override howItWorksStep2Desc(): ConversationText {
        return ConversationLanguage.bless('The AI bot ships the laziest code ' +
            'that satisfies exactly what you tested.')
    }

    public override howItWorksStep3Title(): ConversationText {
        return ConversationLanguage.bless('Catch the gap')
    }

    public override howItWorksStep3Desc(): ConversationText {
        return ConversationLanguage.bless('Spot the edge case it dodged, ' +
            'and add a unit test that exposes it.')
    }

    public override howItWorksStep4Title(): ConversationText {
        return ConversationLanguage.bless('Tighten until solid')
    }

    public override howItWorksStep4Desc(): ConversationText {
        return ConversationLanguage.bless('Repeat until there\'s no shortcut left. ' +
            'Level completed!')
    }

    public override whyItWorksTitle(): ConversationText {
        return ConversationLanguage.bless('For developers who want to prevent bugs')
    }

    public override whyItWorksSubtitle(): ConversationText {
        return ConversationLanguage.bless('It plays like a game. ' +
            'It sticks like a habit. ' +
            'It changes your way of testing.')
    }

    public override whyItWorksItem1Title(): ConversationText {
        return ConversationLanguage.bless('A worthy opponent')
    }

    public override whyItWorksItem1Desc(): ConversationText {
        return ConversationLanguage.bless('The AI bot is maliciously compliant. ' +
            'Every move is a lesson about your blind spot.')
    }

    public override whyItWorksItem2Title(): ConversationText {
        return ConversationLanguage.bless('Escalating difficulty')
    }

    public override whyItWorksItem2Desc(): ConversationText {
        return ConversationLanguage.bless('Start with battery levels. ' +
            'End up untangling speed displays and parking fees.')
    }

    public override whyItWorksItem3Title(): ConversationText {
        return ConversationLanguage.bless('Real progression')
    }

    public override whyItWorksItem3Desc(): ConversationText {
        return ConversationLanguage.bless('A level board tracks what you\'ve unlocked, ' +
            'so you always know what\'s next.')
    }

    public override whyItWorksItem4Title(): ConversationText {
        return ConversationLanguage.bless('Six conversation languages')
    }

    public override whyItWorksItem4Desc(): ConversationText {
        return ConversationLanguage.bless('Converse in English, Dutch, German, ' +
            'French, Spanish, or Italian.')
    }

    public override whyItWorksItem5Title(): ConversationText {
        return ConversationLanguage.bless('Seven programming languages')
    }

    public override whyItWorksItem5Desc(): ConversationText {
        return ConversationLanguage.bless('Let the AI bot write programs in ' +
            'JavaScript, TypeScript, Python, Java, C#, PHP, or Ruby.')
    }

    public override whyItWorksItem6Title(): ConversationText {
        return ConversationLanguage.bless('No setup at all')
    }

    public override whyItWorksItem6Desc(): ConversationText {
        return ConversationLanguage.bless('Runs entirely in the browser. ' +
            'No account, no install, no dependencies to fight with.')
    }

    public override levelsTitle(): ConversationText {
        return ConversationLanguage.bless('Ten levels, ten ways to get outsmarted')
    }

    public override levelsSubtitle(): ConversationText {
        return ConversationLanguage.bless('Each one looks simple. ' +
            'Until the AI bot finds another range you forgot to test.')
    }

    public override levelsDifficultyEasy(): ConversationText {
        return ConversationLanguage.bless('easy')
    }

    public override levelsDifficultyMedium(): ConversationText {
        return ConversationLanguage.bless('medium')
    }

    public override levelsDifficultyHard(): ConversationText {
        return ConversationLanguage.bless('hard')
    }

    public override levelBlurb0(): ConversationText {
        return ConversationLanguage.bless('The AI bot shows you first. Then it\'s your turn.')
    }

    public override levelBlurb1(): ConversationText {
        return ConversationLanguage.bless('One birthday. Two possible outcomes.')
    }

    public override levelBlurb2(): ConversationText {
        return ConversationLanguage.bless('Three thresholds stand between calm and storm.')
    }

    public override levelBlurb3(): ConversationText {
        return ConversationLanguage.bless('Price and quality, working against each other.')
    }

    public override levelBlurb4(): ConversationText {
        return ConversationLanguage.bless('A full cart, a member card, or both at once.')
    }

    public override levelBlurb5(): ConversationText {
        return ConversationLanguage.bless('Everyone knows FizzBuzz. The bot doesn\'t.')
    }

    public override levelBlurb6(): ConversationText {
        return ConversationLanguage.bless('An exception to the exception to the rule.')
    }

    public override levelBlurb7(): ConversationText {
        return ConversationLanguage.bless('Every side length changes the verdict.')
    }

    public override levelBlurb8(): ConversationText {
        return ConversationLanguage.bless('The physical display has limits. Find them all.')
    }

    public override levelBlurb9(): ConversationText {
        return ConversationLanguage.bless('Free, flat, or by the minute. What now?')
    }

    public override faqTitle(): ConversationText {
        return ConversationLanguage.bless('Frequently Asked Questions')
    }

    public override faqSubtitle(): ConversationText {
        return ConversationLanguage.bless('No sales pitch. Just answers.')
    }

    public override faqQuestion1(): ConversationText {
        return ConversationLanguage.bless('Is it really free?')
    }

    public override faqAnswer1(): ConversationText {
        return ConversationLanguage.bless('Yes. No ads, no tracking, no paywall. Just a free game.')
    }

    public override faqQuestion2(): ConversationText {
        return ConversationLanguage.bless('What programming languages are supported?')
    }

    public override faqAnswer2(): ConversationText {
        return ConversationLanguage.bless('JavaScript, TypeScript, Python, Java, C#, PHP, and Ruby.')
    }

    public override faqQuestion3(): ConversationText {
        return ConversationLanguage.bless('What conversation languages are supported?')
    }

    public override faqAnswer3(): ConversationText {
        return ConversationLanguage.bless('English, Dutch, German, French, Spanish, and Italian.')
    }

    public override faqQuestion4(): ConversationText {
        return ConversationLanguage.bless('Do I need to install anything?')
    }

    public override faqAnswer4(): ConversationText {
        return ConversationLanguage.bless('Nope. It runs entirely in your browser. Without external libraries.')
    }

    public override faqQuestion5(): ConversationText {
        return ConversationLanguage.bless('Do I need an account?')
    }

    public override faqAnswer5(): ConversationText {
        return ConversationLanguage.bless('Nope. You can only play anonymously.')
    }

    public override faqQuestion6(): ConversationText {
        return ConversationLanguage.bless('What information is stored?')
    }

    public override faqAnswer6(): ConversationText {
        return ConversationLanguage.bless('Your progress is saved in your browser. It doesn\'t leave your computer.')
    }

    public override faqQuestion7(): ConversationText {
        return ConversationLanguage.bless('Is it open source?')
    }

    public override faqAnswer7(): ConversationText {
        return ConversationLanguage.bless('Yes. The source code is available on GitHub.')
    }

    public override faqQuestion8(): ConversationText {
        return ConversationLanguage.bless('Who made this?')
    }

    public override faqAnswer8(): ConversationText {
        return ConversationLanguage.bless('This game is created by a CS teacher. For the love of programming and testing.')
    }

    public override ctaTitle(): ConversationText {
        return ConversationLanguage.bless('The AI bot is waiting for you. Don\'t get fooled.')
    }

    public override ctaSubtitle(): ConversationText {
        return ConversationLanguage.bless('Click the button, follow the instructions, and see what the AI bot tries to get away with.')
    }

    public override ctaButton(): ConversationText {
        return ConversationLanguage.bless('Play UnitTestGame for free →')
    }

    public override footerContact(): ConversationText {
        return ConversationLanguage.bless('Contact')
    }
}

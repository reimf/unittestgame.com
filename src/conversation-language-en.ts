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
        return ConversationLanguage.bless('![Logo of UnitTestGame](apple-touch-icon.png)Learn Test-Driven Development by writing unit tests that guide an AI bot.')
    }

    public override links(): ConversationText {
        return ConversationLanguage.bless('[Read more about TDD on Wikipedia](https://en.wikipedia.org/wiki/Test-driven_development)\n' +
            '[Contact](mailto:contact@unittestgame.com)\n')
    }

    public override settingsTitle(): ConversationText {
        return ConversationLanguage.bless('Settings')
    }

    public override changeLanguage(): ConversationText {
        return ConversationLanguage.bless('Language')
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

    public override allLevels(): ConversationText {
        return ConversationLanguage.bless('I\'ve completed all the levels')
    }

    public override closeTab(): ConversationText {
        return ConversationLanguage.bless('Well done! You\'ve completed all the levels. ' +
            'You can now apply TDD to your own projects.')
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
            'so I didn\'t improve the *Current Function*. ' +
            'Write a unit test that the *Current Function* fails.')
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

    public override batteryLevelSpecification(): ConversationText {
        return ConversationLanguage.bless('A smartphone normally operates in `NORMAL MODE`, ' +
            'but when the battery level is less than `20`, ' +
            'it operates in `LOW POWER MODE`.')
    }

    public override wrongAction(): ConversationText {
        return ConversationLanguage.bless('Hmm, that\'s not quite right. ' +
            'Try again.')
    }

    public override addBatteryLevel20(): ConversationText {
        return ConversationLanguage.bless('The *Specification* contains the number `20`. ' +
            'That is a good starting point. ' +
            'When the battery level is `20`, the function must return `NORMAL MODE`.')
    }

    public override addBatteryLevel19(): ConversationText {
        return ConversationLanguage.bless('The *Current Function* now always returns `NORMAL MODE`, ' +
            'but the *Specification* says battery level `19` must return `LOW POWER MODE`. ' +
            'Add a unit test for that.')
    }

    public override submitUnitTestsFirst(): ConversationText {
        return ConversationLanguage.bless('The *Current Function* can now return either `NORMAL MODE` or `LOW POWER MODE`. ' +
            'Submit the *Unit Tests* to check if the *Current Function* matches the *Specification*.')
    }

    public override addBatteryLevel21(): ConversationText {
        return ConversationLanguage.bless('The *Current Function* now returns `NORMAL MODE` only for battery level `20`. ' +
            'The *Specification* says `21` must also return `NORMAL MODE`. ' +
            'Add a unit test for that.')
    }

    public override submitUnitTestsSecond(): ConversationText {
        return ConversationLanguage.bless('Submit the *Unit Tests* again to check if the *Current Function* matches the *Specification*.')
    }

    public override addBatteryLevel18(): ConversationText {
        return ConversationLanguage.bless('The *Current Function* now returns `LOW POWER MODE` only for battery level `19`. ' +
            'The *Specification* says `18` must also return `LOW POWER MODE`. ' +
            'Add a unit test for that.')
    }

    public override submitUnitTestsThird(): ConversationText {
        return ConversationLanguage.bless('Submit the *Unit Tests* again to check if the *Current Function* finally matches the *Specification*.')
    }

    public override evenOddSpecification(): ConversationText {
        return ConversationLanguage.bless('Return `true` if the number is even and `false` otherwise.')
    }

    public override fizzBuzzSpecification(): ConversationText {
        return ConversationLanguage.bless('Return `FIZZ` if the number is divisible by 3, ' +
            '`BUZZ` if divisible by 5, ' +
            '`FIZZBUZZ` if divisible by both 3 and 5, ' +
            'and the number itself for any other number.')
    }

    public override floatFormatSpecification(): ConversationText {
        return ConversationLanguage.bless('Return `true` if the text represents a float and `false` otherwise. ' +
            'A float may start with a plus or a minus sign. ' +
            'This is followed by one or more digits. ' +
            'If that is followed by a dot, then one or more digits must follow.')
    }

    public override leapYearSpecification(): ConversationText {
        return ConversationLanguage.bless('Return `true` if the year is a leap year and `false` otherwise. ' +
            'A year is a leap year if it is divisible by 4. ' +
            'The exception is that years divisible by 100 are not leap years, unless they are also divisible by 400.')
    }

    public override passwordStrengthSpecification(): ConversationText {
        return ConversationLanguage.bless('Return `true` if the password is strong and `false` otherwise. ' +
            'A password is strong if it contains at least 5 characters, an uppercase letter, a lowercase letter, and a special character (`#` or `@`).')
    }

    public override speedDisplaySpecification(): ConversationText {
        return ConversationLanguage.bless('The speed sensor reports the speed in tenths of kilometers per hour (e.g. 131 means 13.1 km/h). ' +
            'Return the speed as shown on the display. ' +
            'Use one decimal place if it fits on the display (e.g. 131 → `13.1`). ' +
            'Otherwise, show whole kilometers only, dropping the decimal (e.g. 876 → `87`). ' +
            'If the car isn\'t moving, return `START`. ' +
            'If the speed no longer fits on the display, return `DANGER` (e.g. 3000 → `DANGER`).\n' +
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

    public override triangleTypeSpecification(): ConversationText {
        return ConversationLanguage.bless('Return the type of the triangle: `EQUILATERAL`, `ISOSCELES`, or `SCALENE`. ' +
            'A triangle is `EQUILATERAL` if all three sides have the same length. ' +
            'A triangle is `ISOSCELES` if exactly two sides have the same length. ' +
            'A triangle is `SCALENE` if all three sides have different lengths.')
    }

    public override votingAgeSpecification(): ConversationText {
        return ConversationLanguage.bless('Return `true` if the age is `18` or over, and `false` otherwise.')
    }

    public override reviewSpecification(): ConversationText {
        return ConversationLanguage.bless('Return `GOOD` if the price is less than `20` and the quality is at least `7`. ' +
            'Return `BAD` if the price is `20` or more and the quality is less than `7`. ' +
            'Return `OK` in all other cases.')
    }

    public override or(): ConversationText {
        return ConversationLanguage.bless('or')
    }
}

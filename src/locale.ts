type LocalisableText = {
    en: string
    nl: string
}

export class Locale {
    private readonly lng: keyof LocalisableText

    public constructor(lang: string) {
        const lng = ['en', 'nl'].includes(lang) ? lang : 'en'
        this.lng = lng as keyof LocalisableText
    }

    private pick(localisableText: LocalisableText): string {
        return localisableText[this.lng]
    }

    public welcome(): string {
        return this.pick({
            en: 'Hi! I\'m an AI bot that writes code. ' +
                'Your job is to guide me using unit tests.',
            nl: 'Hallo! Ik ben een AI bot die code schrijft. ' +
                'Jouw taak is om mij bij te sturen met unit testen.',
        })
    }

    public unitTestGameTitle(): string {
        return this.pick({
            en: 'UnitTestGame',
            nl: 'UnitTestGame',
        })
    }

    public slogan(): string {
        return this.pick({
            en: 'Learn Test-Driven Development by writing unit tests that guide an AI bot.',
            nl: 'Leer Test-Driven Development door unit testen te schrijven die een AI bot bijsturen.',
        })
    }

    public links(): string {
        return this.pick({
            en: '[Read more about TDD on Wikipedia](https://en.wikipedia.org/wiki/Test-driven_development)\n' +
                '[Overschakelen op Nederlands](?lng=nl)\n' +
                '[Contact](mailto:contact@unittestgame.com)',
            nl: '[Lees meer over TDD op Wikipedia](https://nl.wikipedia.org/wiki/Test-driven_development)\n' +
                '[Switch to English](?lng=en)\n' +
                '[Contact](mailto:contact@unittestgame.com)',
        })
    }

    public invitation(): string {
        return this.pick({
            en: 'Which level do you want to play?',
            nl: 'Welk level wil je spelen?',
        })
    }

    public level(levelNumber: number, levelName: string): string {
        return this.pick({
            en: `Level ${levelNumber} - ${levelName}`,
            nl: `Level ${levelNumber} - ${levelName}`,
        })
    }

    public nextLevelButton(levelDescription: string): string {
        return this.pick({
            en: `I want to play ${levelDescription}`,
            nl: `Ik wil ${levelDescription} spelen`,
        })
    }

    public allLevels(): string {
        return this.pick({
            en: 'I\'ve completed all the levels',
            nl: 'Ik heb alle levels voltooid',
        })
    }

    public closeTab(): string {
        return this.pick({
            en: 'Well done! You\'ve completed all the levels. ' +
                'You can now apply TDD to your own projects.',
            nl: 'Goed gedaan! Je hebt alle levels voltooid. ' +
                'Je kunt TDD nu toepassen op je eigen projecten.',
        })
    }

    public unitTestsTitle(): string {
        return this.pick({
            en: 'Unit Tests (latest highlighted)',
            nl: 'Unit Testen (laatste gemarkeerd)',
        })
    }

    public addUnitTestButton(): string {
        return this.pick({
            en: 'I want to add this unit test',
            nl: 'Ik wil deze unit test toevoegen',
        })
    }

    public submitUnitTestsButton(): string {
        return this.pick({
            en: 'I want to submit the unit tests',
            nl: 'Ik wil de unit testen inleveren',
        })
    }

    public unitTestNotAdded(): string {
        return this.pick({
            en: 'I didn\'t add the unit test, ' +
                'because it doesn\'t match the *Specification*.',
            nl: 'Ik heb de unit test niet toegevoegd, ' +
                'omdat deze niet voldoet aan de *Specificatie*.',
        })
    }

    public tooManyUnitTests(numberOfUnnecessaryUnitTests: number, numberOfRedundantUnitTests: number): string {
        return this.pick({
            en: `You've tested the *Current Function* thoroughly, ` +
                 `but you wrote ${numberOfUnnecessaryUnitTests} more ${numberOfUnnecessaryUnitTests === 1 ? 'unit test' : 'unit tests'} than necessary. ` +
                `${numberOfRedundantUnitTests === 1 ? 'The following' : 'At least one of the following'} can be left out.`,
            nl: `Je hebt de *Huidige Functie* grondig getest, ` +
                 `maar je hebt ${numberOfUnnecessaryUnitTests} ${numberOfUnnecessaryUnitTests === 1 ? 'unit test' : 'unit testen'} meer dan nodig is. ` +
                `${numberOfRedundantUnitTests === 1 ? 'De volgende' : 'Minstens één van de volgende'} kun je weglaten.`,
        })
    }    

    public readSpecification(): string {
        return this.pick({
            en: 'First, read the *Specification*. ' +
                'Then write a unit test that the *Current Function* fails.',
            nl: 'Lees eerst de *Specificatie*. ' +
                'Schrijf daarna een unit test waarvoor de *Huidige Functie* faalt.',
        })
    }


    public improveCurrentFunction(): string {
        return this.pick({
            en: 'After adding a unit test ' +
                'I\'ll improve the *Current Function* so all *Unit Tests* pass again.',
            nl: 'Nadat je een unit test hebt toegevoegd ' +
                'verbeter ik de *Huidige Functie* zodat alle *Unit Testen* weer slagen.',
        })
    }

    public submitUnitTests(): string {
        return this.pick({
            en: 'Submit the *Unit Tests* when you think the *Current Function* matches the *Specification*.',
            nl: 'Lever de *Unit Testen* in als je denkt dat de *Huidige Functie* voldoet aan de *Specificatie*.',
        })
    }

    public specificationTitle(description: string): string {
        return this.pick({
            en: `Specification (${description})`,
            nl: `Specificatie (${description})`,
        })
    }

    public currentFunctionTitle(): string {
        return this.pick({
            en: 'Current Function',
            nl: 'Huidige Functie',
        })
    }

    public differenceTitle(): string {
        return this.pick({
            en: 'Difference',
            nl: 'Verschil',
        })
    }

    public currentFunctionNotImproved(): string {
        return this.pick({
            en: 'I\'ve added the unit test, ' +
                'but the *Current Function* already passes it, ' +
                'so I didn\'t improve the *Current Function*. ' +
                'Write a unit test that the *Current Function* fails.',
            nl: 'Ik heb de unit test toegevoegd, ' +
                'maar de *Huidige Functie* slaagt er al voor, ' +
                'dus heb ik die niet verbeterd. ' +
                'Schrijf een unit test waarvoor de *Huidige Functie* faalt.',
        })
    }

    public hint(): string {
        return this.pick({
            en: 'Write a unit test that the *Current Function* fails.',
            nl: 'Schrijf een unit test waarvoor de *Huidige Functie* faalt.',
        })
    }

    public currentFunctionImproved(numberOfUnitTests: number): string {
        return this.pick({
            en: `I've added the unit test to the *Unit Tests* and improved the *Current Function* ' +
                'so the new unit test now passes${numberOfUnitTests === 1 ? '' : ' as well'}.`,
            nl: `Ik heb de unit test toegevoegd aan de *Unit Testen* en de *Huidige Functie* verbeterd ' +
                'zodat de nieuwe unit test nu${numberOfUnitTests === 1 ? '' : ' ook'} slaagt.`,
        })
    }

    public invalidUnitTest(): string {
        return this.pick({
            en: 'The following unit test doesn\'t match the *Specification*, ' +
                'but the *Current Function* passes it.',
            nl: 'De volgende unit test voldoet niet aan de *Specificatie*, ' +
                'maar de *Huidige Functie* slaagt er wel voor.',
        })
    }

    public moreUnitTests(numberOfUnitTestsStillNeeded: number): string {
        return this.pick({
            en: `The *Current Function* doesn't match the *Specification* yet. ` +
                `You need at least ${numberOfUnitTestsStillNeeded} more ${numberOfUnitTestsStillNeeded === 1 ? 'unit test' : 'unit tests'}, ` +
                `so write a unit test that matches the *Specification* and that the *Current Function* fails.`,
            nl: `De *Huidige Functie* voldoet nog niet aan de *Specificatie*. ` +
                `Je hebt nog minstens ${numberOfUnitTestsStillNeeded} ${numberOfUnitTestsStillNeeded === 1 ? 'unit test' : 'unit testen'} nodig, ` +
                `dus schrijf een unit test die voldoet aan de *Specificatie* en waarvoor de *Huidige Functie* faalt.`,
        })
    }

    public currentFunctionCorrect(): string {
        return this.pick({
            en: 'Well done! The *Current Function* matches the *Specification*.',
            nl: 'Goed gedaan! De *Huidige Functie* voldoet aan de *Specificatie*.',
        })
    }

    public levelOverviewTitle(): string {
        return this.pick({
            en: 'Level Overview',
            nl: 'Level Overzicht',
        })
    }

    public batteryLevelSpecification(): string {
        return this.pick({
            en: 'A smartphone normally operates in `Normal Mode`, ' +
                'but when the battery level is less than `20`, ' +
                'it operates in `Low Power Mode`.',
            nl: 'Een smartphone werkt normaal in `Normal Mode`, ' +
                'maar wanneer het batterijpercentage minder dan `20` is, ' +
                'werkt een smartphone in `Low Power Mode`.',
        })
    }

    public wrongAction(): string {
        return this.pick({
            en: 'Hmm, that\'s not quite right. ' +
                'Try again.',
            nl: 'Hmm, dat klopt niet helemaal. ' +
                'Probeer het opnieuw.',
        })
    }

    public addBatteryLevel20(): string {
        return this.pick({
            en: 'The *Specification* contains the number `20`. ' +
                'That is a good starting point. ' +
                'When the battery level is `20`, the function must return `Normal Mode`.',
            nl: 'De *Specificatie* bevat het getal 20. ' +
                'Dat is een goed startpunt. ' +
                'Wanneer het batterijpercentage `20` is moet de functie `Normal Mode` teruggeven.',
        })
    }

    public addBatteryLevel19(): string {
        return this.pick({
            en: 'The *Current Function* now always returns `Normal Mode`, ' +
                'but the *Specification* says battery level `19` must return `Low Power Mode`. ' +
                'Add a unit test for that.',
            nl: 'De *Huidige Functie* geeft nu altijd `Normal Mode` terug, ' +
                'maar de *Specificatie* zegt dat batterijpercentage `19` `Low Power Mode` moet teruggeven. ' +
                'Voeg daar een unit test voor toe.',
        })
    }

    public submitUnitTestsFirst(): string {
        return this.pick({
            en: 'The *Current Function* can now return either `Normal Mode` or `Low Power Mode`. ' +
                'Submit the unit tests to check if the *Current Function* matches the *Specification*.',
            nl: 'De *Huidige Functie* kan nu `Normal Mode` of `Low Power Mode` teruggeven. ' +
                'Lever de unit testen in om te controleren of de *Huidige Functie* voldoet aan de *Specificatie*.',
        })
    }

    public addBatteryLevel21(): string {
        return this.pick({
            en: 'The *Current Function* now returns `Normal Mode` only for battery level `20`. ' +
                'The *Specification* says `21` must also return `Normal Mode`. ' +
                'Add a unit test for that.',
            nl: 'De *Huidige Functie* geeft nu alleen `Normal Mode` terug voor batterijpercentage `20`. ' +
                'De *Specificatie* zegt dat `21` ook `Normal Mode` moet teruggeven. ' +
                'Voeg daar een unit test voor toe.',
        })
    }

    public submitUnitTestsSecond(): string {
        return this.pick({
            en: 'Submit the unit tests again to check if the *Current Function* matches the *Specification*.',
            nl: 'Lever de unit testen opnieuw in om te controleren of de *Huidige Functie* voldoet aan de *Specificatie*.',
        })
    }

    public addBatteryLevel18(): string {
        return this.pick({
            en: 'The *Current Function* now returns `Low Power Mode` only for battery level `19`. ' +
                'The *Specification* says `18` must also return `Low Power Mode`. ' +
                'Add a unit test for that.',
            nl: 'De *Huidige Functie* geeft nu alleen `Low Power Mode` terug voor batterijpercentage `19`. ' +
                'De *Specificatie* zegt dat `18` ook `Low Power Mode` moet teruggeven. ' +
                'Voeg daar een unit test voor toe.',
        })
    }

    public submitUnitTestsThird(): string {
        return this.pick({
            en: 'Submit the unit tests again to check if the *Current Function* finally matches the *Specification*.',
            nl: 'Lever de unit testen opnieuw in om te controleren of de *Huidige Functie* eindelijk voldoet aan de *Specificatie*.',
        })
    }

    public evenOddSpecification(): string {
        return this.pick({
            en: 'Return `true` if the number is even and `false` otherwise.',
            nl: 'Geef `true` terug als het getal even is en anders `false`.',
        })
    }

    public fizzBuzzSpecification(): string {
        return this.pick({
            en: 'Return `Fizz` if the number is divisible by 3, ' +
                '`Buzz` if divisible by 5, ' +
                '`FizzBuzz` if divisible by both 3 and 5, ' +
                'and `Other` for any other number.',
            nl: 'Geef `Fizz` terug als het getal deelbaar is door 3, ' +
                '`Buzz` als het deelbaar is door 5, ' +
                '`FizzBuzz` als het deelbaar is door zowel 3 als 5, ' +
                'en `Other` voor elk ander getal.',
        })
    }

    public floatFormatSpecification(): string {
        return this.pick({
            en: 'Return `true` if the text represents a float and `false` otherwise. ' +
                'A float may start with a plus or a minus sign. ' +
                'This is followed by one or more digits. ' +
                'If that is followed by a dot, then one or more digits must follow.',
            nl: 'Geef `true` terug als de tekst een gebroken getal voorstelt en `false` als dat niet zo is. ' +
                'Een gebroken getal kan beginnen met een plus- of minteken. ' +
                'Hierna volgen één of meer cijfers. ' +
                'Als dit wordt gevolgd door een punt, dan moeten nog één of meer cijfers volgen.',
        })
    }

    public leapYearSpecification(): string {
        return this.pick({
            en: 'Return `true` if the year is a leap year and `false` otherwise. ' +
                'A year is a leap year if it is divisible by 4. ' +
                'The exception is that years divisible by 100 are not leap years, unless they are also divisible by 400.',
            nl: 'Geef `true` terug als het jaar een schrikkeljaar is en anders `false`. ' +
                'Een jaar is een schrikkeljaar als het deelbaar is door 4. ' +
                'De uitzondering is dat jaren die deelbaar zijn door 100 geen schrikkeljaren zijn, tenzij ze ook deelbaar zijn door 400.',
        })
    }

    public passwordStrengthSpecification(): string {
        return this.pick({
            en: 'Return `true` if the password is strong and `false` otherwise. ' +
                'A password is strong if it contains at least 5 characters, an uppercase letter, a lowercase letter, and a special character (`#` or `@`).',
            nl: 'Geef `true` terug als het wachtwoord sterk is en anders `false`. ' +
                'Een wachtwoord is sterk als het tenminste 5 tekens bevat, een hoofdletter, een kleine letter en een speciaal teken (`#` of `@`).',
        })
    }

    public speedDisplaySpecification(): string {
        const display = (
            '+-------------------+\n' +
            '|  X   XXXX   XXXX  |\n' +
            '|  X   X  X   X  X  |\n' +
            '|  X   XXXX   XXXX  |\n' +
            '|  X   X  X   X  X  |\n' +
            '|  X   XXXX X XXXX  |\n' +
            '|                   |\n' +
            '| X START  DANGER X |\n' +
            '+-------------------+'
        )
        return this.pick({
            en: 'Return the formatted speed in kilometers per hour. ' +
                'Use one decimal place if it fits on the display (e.g. 13 → `13.0`). ' +
                'Otherwise, round to an integer (e.g. 87.6 → `88`). ' +
                'If the car isn\'t moving, return `START`. ' +
                'If the speed no longer fits on the display, return `DANGER` (e.g. 300 → `DANGER`).\n' +
                'The display looks like this, where every X is a LED light:\n' +
                display,
            nl: 'Geef de geformatteerde snelheid in kilometers per uur. ' +
                'Gebruik één decimaal als het op het scherm past (bijvoorbeeld 13 → `13.0`). ' +
                'Rond anders af op een geheel getal (bijvoorbeeld 87.6 → `88`). ' +
                'Als de auto niet beweegt, geef `START` terug. ' +
                'Als de snelheid niet meer op het scherm past, geef `DANGER` terug (bijvoorbeeld 300 → `DANGER`).\n' +
                'Het scherm ziet er zo uit, waarbij elke X een LED-lampje is:\n' +
                display,
        })
    }

    public triangleTypeSpecification(): string {
        return this.pick({
            en: 'Return the type of the triangle: `equilateral`, `isosceles`, or `scalene`. ' +
                'A triangle is `equilateral` if all three sides have the same length. ' +
                'A triangle is `isosceles` if exactly two sides have the same length. ' +
                'A triangle is `scalene` if all three sides have different lengths.',
            nl: 'Geef het type van de driehoek terug: `equilateral` (gelijkzijdig), `isosceles` (gelijkbenig) of `scalene` (ongelijkzijdig). ' +
                'Een driehoek is gelijkzijdig als alle drie de zijden even lang zijn. ' +
                'Een driehoek is gelijkbenig als precies twee zijden even lang zijn. ' +
                'Een driehoek is ongelijkzijdig als alle drie de zijden verschillende lengtes hebben.',
        })
    }

    public votingAgeSpecification(): string {
        return this.pick({
            en: 'Return `true` if the age is `18` or over, and `false` otherwise.',
            nl: 'Geef `true` terug als de leeftijd `18` jaar of hoger is, en anders `false`.',
        })
    }

    public reviewSpecification(): string {
        return this.pick({
            en: 'Return `Good` if the price is less than `20` and the quality is at least `7`. ' +
                'Return `Bad` if the price is `20` or more and the quality is less than `7`. ' +
                'Return `Ok` in all other cases.',
            nl: 'Geef `Good` terug als de prijs minder dan `20` is en de kwaliteit ten minste `7` is. ' +
                'Geef `Bad` terug als de prijs `20` of meer is en de kwaliteit minder dan `7` is. ' +
                'Geef `Ok` terug in alle andere gevallen.',
        })
    }

    public or(): string {
        return this.pick({
            en: 'or',
            nl: 'of',
        })
    }
}

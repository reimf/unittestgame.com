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
            en: 'Hi, I am an AI bot and I can write code to make unit tests pass.',
            nl: 'Hallo, ik ben een AI bot en ik kan code schrijven om unit testen te laten slagen.',
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
            en: 'Controlling an AI bot with Test-Driven Development.',
            nl: 'Beteugel een AI bot met Test-Driven Development.',
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
            en: 'What do you want to do?',
            nl: 'Wat wil je doen?',
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
            en: 'I played all the levels',
            nl: 'Ik heb alle levels gespeeld',
        })
    }

    public closeTab(): string {
        return this.pick({
            en: 'Well done! You can close this browser tab now and start writing effective unit tests for your real-world projects.',
            nl: 'Goed gedaan! Je kunt deze browser tab nu sluiten en beginnen met het schrijven van effectieve unit testen voor je echte projecten.',
        })
    }

    public unitTestsTitle(): string {
        return this.pick({
            en: 'Unit Tests (last one in color)',
            nl: 'Unit Testen (laatste in kleur)',
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
            en: 'I did NOT add the unit test, because it is NOT according to the *Specification*.',
            nl: 'Ik heb de unit test NIET toegevoegd, omdat deze NIET volgens de *Specificatie* is.',
        })
    }

    public tooManyUnitTests(numberOfUnnecessaryUnitTests: number, numberOfRedundantUnitTests: number): string {
        return this.pick({
            en: `You have written ${numberOfUnnecessaryUnitTests} more ${numberOfUnnecessaryUnitTests === 1 ? 'unit test' : 'unit tests'} than necessary. ` +
                `${numberOfRedundantUnitTests === 1 ? 'The following' : 'At least one of the following'} can be removed without consequences.`,
            nl: `Je hebt ${numberOfUnnecessaryUnitTests} ${numberOfUnnecessaryUnitTests === 1 ? 'unit test' : 'unit testen'} meer geschreven dan nodig. ` +
                `${numberOfRedundantUnitTests === 1 ? 'De volgende' : 'Minstens één van de volgende'} kan worden weggelaten zonder gevolgen.`,
        })
    }    

    public readSpecification(): string {
        return this.pick({
            en: 'First, you read the *Specification* and then you write a unit test that does NOT pass the *Current Function*.',
            nl: 'Eerst lees je de *Specificatie* en daarna schrijf je een unit test die NIET slaagt voor de *Huidige Functie*.',
        })
    }


    public improveCurrentFunction(): string {
        return this.pick({
            en: 'After adding a unit test I will improve the *Current Function* such that all *Unit Tests* pass.',
            nl: 'Na het toevoegen van een unit test zal ik de *Huidige Functie* verbeteren zodat alle *Unit Testen* slagen.',
        })
    }

    public submitUnitTests(): string {
        return this.pick({
            en: 'When you think the *Current Function* is according to the *Specification*, you submit the *Unit Tests*.',
            nl: 'Wanneer je denkt dat de *Huidige Functie* aan de *Specificatie* voldoet, lever je de *Unit Testen* in.',
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
            en: 'Difference (from the previous function)',
            nl: 'Verschil (met de vorige functie)',
        })
    }

    public currentFunctionNotImproved(): string {
        return this.pick({
            en: 'I added the unit test to the *Unit Tests*, but the *Current Function* already passed this unit test, so I did NOT improve the *Current Function*.',
            nl: 'Ik heb de unit test toegevoegd aan de *Unit Testen*, maar de *Huidige Functie* slaagde al voor deze unit test, dus ik heb de *Huidige Functie* NIET verbeterd.',
        })
    }

    public hint(): string {
        return this.pick({
            en: 'Try to write unit tests that do NOT pass the *Current Function*.',
            nl: 'Probeer unit testen te schrijven die NIET slagen voor de *Huidige Functie*.',
        })
    }

    public currentFunctionImproved(): string {
        return this.pick({
            en: 'I added the unit test to the *Unit Tests* and I improved the *Current Function* such that the new unit test also passes.',
            nl: 'Ik heb de unit test toegevoegd aan de *Unit Testen* en ik heb de *Huidige Functie* zo verbeterd dat de nieuwe unit test ook slaagt.',
        })
    }

    public invalidUnitTest(): string {
        return this.pick({
            en: 'The following unit test is NOT according to the *Specification*, but passes the *Current Function*.',
            nl: 'De volgende unit test voldoet NIET aan de *Specificatie*, maar slaagt voor de *Huidige Functie*.',
        })
    }

    public writeValidUnitTest(): string {
        return this.pick({
            en: 'Write a unit test that is according to the *Specification* and does NOT pass the *Current Function*.',
            nl: 'Schrijf een unit test die aan de *Specificatie* voldoet en NIET slaagt voor de *Huidige Functie*.',
        })
    }

    public moreUnitTests(numberOfUnitTestsStillNeeded: number): string {
        return this.pick({
            en: `You need at least ${numberOfUnitTestsStillNeeded} more ${numberOfUnitTestsStillNeeded === 1 ? 'unit test' : 'unit tests'} to make the *Current Function* according to the *Specification*.`,
            nl: `Je hebt nog minstens ${numberOfUnitTestsStillNeeded} meer ${numberOfUnitTestsStillNeeded === 1 ? 'unit test' : 'unit testen'} nodig hebt om de *Huidige Functie* volgens de *Specificatie* te maken.`,
        })
    }

    public currentFunctionCorrect(): string {
        return this.pick({
            en: 'Well done! The *Current Function* is indeed according to the *Specification*.',
            nl: 'Goed gedaan! De *Huidige Functie* voldoet inderdaad aan de *Specificatie*.',
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
            en: 'A smartphone normally operates in "Normal Mode", but when the battery level is less than 20%, it operates in "Low Power Mode".',
            nl: 'Een smartphone werkt normaal in "Normal Mode", maar wanneer het batterijpercentage minder dan 20% is, werkt hij in "Low Power Mode".',
        })
    }

    public wrongAction(): string {
        return this.pick({
            en: 'That is NOT what I asked for!',
            nl: 'Dat is NIET wat ik vroeg!',
        })
    }

    public addBatteryLevel20(): string {
        return this.pick({
            en: 'The *Specification* contains the number 20. That is a good starting point for a unit test. When the battery level is 20%, the function should return "Normal Mode".',
            nl: 'De *Specificatie* bevat het getal 20. Dat is een goed startpunt voor een unit test. Wanneer het batterijpercentage 20% is, zou de functie "Normal Mode" terug moeten geven.',
        })
    }

    public addBatteryLevel19(): string {
        return this.pick({
            en: 'The *Current Function* now always returns "Normal Mode". The *Specification* says that when the battery level is less than 20%, the function should return "Low Power Mode". So, add a unit test for a battery level less than 20%, say 19%.',
            nl: 'De *Huidige Functie* geeft nu altijd "Normal Mode" terug. De *Specificatie* zegt dat wanneer het batterijpercentage minder dan 20% is, de functie "Low Power Mode" terug zou moeten geven. Voeg dus een unit test toe voor een batterijpercentage van minder dan 20%, bijvoorbeeld 19%.',
        })
    }

    public submitUnitTestsFirst(): string {
        return this.pick({
            en: 'The *Current Function* now sometimes returns "Normal Mode" and sometimes "Low Power Mode". Submit the unit tests to see if the *Current Function* is according to the *Specification*.',
            nl: 'De *Huidige Functie* geeft nu soms "Normal Mode" terug en soms "Low Power Mode". Lever de unit testen in om te zien of de *Huidige Functie* aan de *Specificatie* voldoet.',
        })
    }

    public addBatteryLevel21(): string {
        return this.pick({
            en: 'The *Current Function* now returns "Normal Mode" only for battery level 20%. Add a unit test for another battery level, say 21%, because the *Specification* says it should return "Normal Mode" for battery level 21% as well.',
            nl: 'De *Huidige Functie* geeft nu alleen "Normal Mode" terug voor een batterijpercentage van 20%. Voeg een unit test toe voor een ander batterijpercentage, bijvoorbeeld 21%, omdat de *Specificatie* zegt dat het ook "Normal Mode" terug zou moeten geven voor een batterijpercentage van 21%.',
        })
    }

    public submitUnitTestsSecond(): string {
        return this.pick({
            en: 'Submit the unit tests again to see if the *Current Function* is according to the *Specification*.',
            nl: 'Lever de unit testen opnieuw in om te zien of de *Huidige Functie* aan de *Specificatie* voldoet.',
        })
    }

    public addBatteryLevel18(): string {
        return this.pick({
            en: 'The *Current Function* now returns "Low Power Mode" only for battery level 19%. Add a unit test for another battery level, say 18%, because the *Specification* says it should return "Low Power Mode" for battery level 18% as well.',
            nl: 'De *Huidige Functie* geeft nu alleen "Low Power Mode" terug voor een batterijpercentage van 19%. Voeg een unit test toe voor een ander batterijpercentage, bijvoorbeeld 18%, omdat de *Specificatie* zegt dat het ook "Low Power Mode" terug zou moeten geven voor een batterijpercentage van 18%.',
        })
    }

    public submitUnitTestsThird(): string {
        return this.pick({
            en: 'Submit the unit tests again to see if the *Current Function* is finally according to the *Specification*.',
            nl: 'Lever de unit testen opnieuw in om te zien of de *Huidige Functie* eindelijk aan de *Specificatie* voldoet.',
        })
    }

    public evenOddSpecification(): string {
        return this.pick({
            en: 'Return true if the number is even and false if it is odd.',
            nl: 'Geef true terug als het getal even is en false als het oneven is.',
        })
    }

    public fizzBuzzSpecification(): string {
        return this.pick({
            en: 'Return "Fizz" if the number is divisible by 3, "Buzz" if the number is divisible by 5, "FizzBuzz" if the number is divisible by both 3 and 5, and "Other" for all other numbers.',
            nl: 'Geef "Fizz" terug als het getal deelbaar is door 3, "Buzz" als het getal deelbaar is door 5, "FizzBuzz" als het getal deelbaar is door zowel 3 als 5, en "Other" voor alle andere getallen.',
        })
    }

    public floatFormatSpecification(): string {
        return this.pick({
            en: 'Return true if the text represents a float and returns false if it doesn\'t. A float may start with a plus or a minus sign. This is followed by one or more digits. If that is followed by a dot, then one or more digits follow.',
            nl: 'Geef true terug als de tekst een gebroken getal voorstelt en return false als dat niet zo is. Een gebroken getal kan beginnen met een plus- of minteken. Hierna volgen één of meer cijfers. Als dit wordt gevolgd door een punt, dan volgen nog één of meer cijfers.',
        })
    }

    public leapYearSpecification(): string {
        return this.pick({
            en: 'Return true if the year is a leap year and false if the year is not a leap year. A year is a leap year if it is divisible by 4. The exception is that years that are divisible by 100 are not leap years, unless they are also divisible by 400.',
            nl: 'Geef true terug als het jaar een schrikkeljaar is en false als het jaar geen schrikkeljaar is. Een jaar is een schrikkeljaar als het deelbaar is door 4. De uitzondering is dat jaren die deelbaar zijn door 100 geen schrikkeljaren zijn, tenzij ze ook deelbaar zijn door 400.',
        })
    }

    public passwordStrengthSpecification(): string {
        return this.pick({
            en: 'Return true if the password is strong and false if the password is not strong. A password is strong if it contains at least 5 characters, an uppercase letter, a lowercase letter and a special character ("#" or "@").',
            nl: 'Geef true terug als het wachtwoord sterk is en false als het wachtwoord niet sterk is. Een wachtwoord is sterk als het ten minste 5 tekens bevat, een hoofdletter, een kleine letter en een speciaal teken ("#" of "@").',
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
            en: 'Return the formatted speed in kilometers per hour with at most one decimal. Return one decimal if that is possible (e.g. 13 returns "13.0"). Otherwise, round to an integer (e.g. 87.6 returns "88"). If the car isn\'t moving, then return "START". If the speed no longer fits on the display, then return "DANGER" (e.g. 300 returns "DANGER").\nThe display looks like this, where every X is a LED light:\n' + display,
            nl: 'Geef de geformatteerde snelheid in kilometers per uur met maximaal één decimaal. Geef één decimaal terug als dat mogelijk is (bijv. 13 geeft "13.0"). Rond anders af op een geheel getal (bijv. 87.6 geeft "88"). Als de auto niet beweegt, geef dan "START" terug. Als de snelheid niet meer op het scherm past, geef dan "DANGER" terug (bijv. 300 geeft "DANGER").\nHet scherm ziet er zo uit, waarbij elke X een LED-lampje is:\n' + display,
        })
    }

    public triangleTypeSpecification(): string {
        return this.pick({
            en: 'Return the type of the triangle: equilateral, isosceles or scalene. A triangle is equilateral if all three sides have the same length. A triangle is isosceles if two sides have the same length and a third side has a different length. A triangle is scalene if all three sides have different lengths.',
            nl: 'Geef het type van de driehoek terug: gelijkzijdig, gelijkbenig of ongelijkzijdig. Een driehoek is gelijkzijdig als alle drie de zijden even lang zijn. Een driehoek is gelijkbenig als twee zijden even lang zijn en een derde zijde een andere lengte heeft. Een driehoek is ongelijkzijdig als alle drie de zijden verschillende lengtes hebben.',
        })
    }

    public votingAgeSpecification(): string {
        return this.pick({
            en: 'Return true if the age is 18 years or over and return false if the age is under 18.',
            nl: 'Geef true terug als de leeftijd 18 jaar of hoger is en geef false terug als de leeftijd onder de 18 is.',
        })
    }

    public reviewSpecification(): string {
        return this.pick({
            en: 'Return "Good" if the price is less than 20 and the quality is at least 7. Return "Bad" if the price is 20 or more and the quality is less than 7. In all other cases return "Ok".',
            nl: 'Geef "Good" terug als de prijs minder dan 20 is en de kwaliteit ten minste 7 is. Geef "Bad" terug als de prijs 20 of meer is en de kwaliteit minder dan 7 is. Geef in alle andere gevallen "Ok" terug.',
        })
    }

    public or(): string {
        return this.pick({
            en: 'or',
            nl: 'of',
        })
    }
}

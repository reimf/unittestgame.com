type LocalisableText = {
    en: string
    nl: string
    de: string
}

declare const __brand: unique symbol
export type LocalizedText = string & { readonly [__brand]: void }

export class Locale {
    private readonly lang: keyof LocalisableText

    public static bless(text: string): LocalizedText {
        return text as LocalizedText
    }

    public constructor(language: string) {
        const lang = ['en', 'nl', 'de'].includes(language) ? language : 'en'
        this.lang = lang as keyof LocalisableText
    }

    private localize(localisableText: LocalisableText): LocalizedText {
        return Locale.bless(localisableText[this.lang])
    }

    public welcome(): LocalizedText {
        return this.localize({
            en: 'Hi! I\'m an AI bot that writes code. ' +
                'Your job is to guide me using unit tests.',
            nl: 'Hoi! Ik ben een AI bot die code schrijft. ' +
                'Jouw taak is om mij bij te sturen met unit testen.',
            de: 'Hallo! Ich bin ein KI-Bot, der Code schreibt. ' +
                'Deine Aufgabe ist es, mich mit Unit-Tests zu steuern.',
        })
    }

    public unitTestGameTitle(): LocalizedText {
        return this.localize({
            en: 'UnitTestGame',
            nl: 'UnitTestGame',
            de: 'UnitTestGame',
        })
    }

    public slogan(): LocalizedText {
        return this.localize({
            en: 'Learn Test-Driven Development by writing unit tests that guide an AI bot.',
            nl: 'Leer Test-Driven Development door unit testen te schrijven die een AI bot bijsturen.',
            de: 'Lerne Test-Driven Development, indem du Unit-Tests schreibst, die einen KI-Bot steuern.',
        })
    }

    public links(): LocalizedText {
        return this.localize({
            en: '[Read more about TDD on Wikipedia](https://en.wikipedia.org/wiki/Test-driven_development)\n' +
                '[Overschakelen op Nederlands](?language=nl)\n' +
                '[Auf Deutsch wechseln](?language=de)\n' +
                '[Contact](mailto:contact@unittestgame.com)',
            nl: '[Lees meer over TDD op Wikipedia](https://nl.wikipedia.org/wiki/Test-driven_development)\n' +
                '[Switch to English](?language=en)\n' +
                '[Auf Deutsch wechseln](?language=de)\n' +
                '[Contact](mailto:contact@unittestgame.com)',
            de: '[Mehr über TDD auf Wikipedia lesen](https://de.wikipedia.org/wiki/Testgetriebene_Entwicklung)\n' +
                '[Switch to English](?language=en)\n' +
                '[Overschakelen op Nederlands](?language=nl)\n' +
                '[Kontakt](mailto:contact@unittestgame.com)',
        })
    }

    public invitation(): LocalizedText {
        return this.localize({
            en: 'Which level do you want to play?',
            nl: 'Welk level wil je spelen?',
            de: 'Welches Level möchtest du spielen?',
        })
    }

    public level(levelNumber: number, levelName: string): LocalizedText {
        return this.localize({
            en: `Level ${levelNumber} - ${levelName}`,
            nl: `Level ${levelNumber} - ${levelName}`,
            de: `Level ${levelNumber} - ${levelName}`,
        })
    }

    public nextLevelButton(levelDescription: string): LocalizedText {
        return this.localize({
            en: `I want to play ${levelDescription}`,
            nl: `Ik wil ${levelDescription} spelen`,
            de: `Ich möchte ${levelDescription} spielen`,
        })
    }

    public allLevels(): LocalizedText {
        return this.localize({
            en: 'I\'ve completed all the levels',
            nl: 'Ik heb alle levels voltooid',
            de: 'Ich habe alle Levels abgeschlossen',
        })
    }

    public closeTab(): LocalizedText {
        return this.localize({
            en: 'Well done! You\'ve completed all the levels. ' +
                'You can now apply TDD to your own projects.',
            nl: 'Goed gedaan! Je hebt alle levels voltooid. ' +
                'Je kunt TDD nu toepassen op je eigen projecten.',
            de: 'Gut gemacht! Du hast alle Levels abgeschlossen. ' +
                'Du kannst TDD jetzt auf deine eigenen Projekte anwenden.',
        })
    }

    public unitTestsTitle(): LocalizedText {
        return this.localize({
            en: 'Unit Tests (latest highlighted)',
            nl: 'Unit Testen (laatste gemarkeerd)',
            de: 'Unit-Tests (neuester hervorgehoben)',
        })
    }

    public addUnitTestButton(): LocalizedText {
        return this.localize({
            en: 'I want to add this unit test',
            nl: 'Ik wil deze unit test toevoegen',
            de: 'Ich möchte diesen Unit-Test hinzufügen',
        })
    }

    public submitUnitTestsButton(): LocalizedText {
        return this.localize({
            en: 'I want to submit the unit tests',
            nl: 'Ik wil de unit testen inleveren',
            de: 'Ich möchte die Unit-Tests einreichen',
        })
    }

    public unitTestNotAdded(): LocalizedText {
        return this.localize({
            en: 'I didn\'t add the unit test, ' +
                'because it doesn\'t match the *Specification*.',
            nl: 'Ik heb de unit test niet toegevoegd, ' +
                'omdat deze niet voldoet aan de *Specificatie*.',
            de: 'Ich habe den Unit-Test nicht hinzugefügt, ' +
                'weil er nicht der *Spezifikation* entspricht.',
        })
    }

    public tooManyUnitTests(numberOfUnnecessaryUnitTests: number, numberOfRedundantUnitTests: number): LocalizedText {
        return this.localize({
            en: `You've tested the *Current Function* thoroughly, ` +
                 `but you wrote ${numberOfUnnecessaryUnitTests} more ${numberOfUnnecessaryUnitTests === 1 ? 'unit test' : 'unit tests'} than necessary. ` +
                `${numberOfRedundantUnitTests === 1 ? 'The following' : 'At least one of the following'} can be left out.`,
            nl: `Je hebt de *Huidige Functie* grondig getest, ` +
                 `maar je hebt ${numberOfUnnecessaryUnitTests} ${numberOfUnnecessaryUnitTests === 1 ? 'unit test' : 'unit testen'} meer dan nodig is. ` +
                `${numberOfRedundantUnitTests === 1 ? 'De volgende' : 'Minstens één van de volgende'} kun je weglaten.`,
            de: `Du hast die *Aktuelle Funktion* gründlich getestet, ` +
                 `aber du hast ${numberOfUnnecessaryUnitTests} ${numberOfUnnecessaryUnitTests === 1 ? 'Unit-Test' : 'Unit-Tests'} mehr als nötig geschrieben. ` +
                `${numberOfRedundantUnitTests === 1 ? 'Der folgende' : 'Mindestens einer der folgenden'} kann weggelassen werden.`,
        })
    }

    public readSpecification(): LocalizedText {
        return this.localize({
            en: 'First, read the *Specification*. ' +
                'Then write a unit test that the *Current Function* fails.',
            nl: 'Lees eerst de *Specificatie*. ' +
                'Schrijf daarna een unit test waarvoor de *Huidige Functie* faalt.',
            de: 'Lies zuerst die *Spezifikation*. ' +
                'Schreibe dann einen Unit-Test, den die *Aktuelle Funktion* nicht besteht.',
        })
    }


    public improveCurrentFunction(): LocalizedText {
        return this.localize({
            en: 'After adding a unit test ' +
                'I\'ll improve the *Current Function* so all *Unit Tests* pass again.',
            nl: 'Nadat je een unit test hebt toegevoegd ' +
                'verbeter ik de *Huidige Functie* zodat alle *Unit Testen* weer slagen.',
            de: 'Nachdem du einen Unit-Test hinzugefügt hast, ' +
                'verbessere ich die *Aktuelle Funktion*, damit alle *Unit-Tests* wieder bestehen.',
        })
    }

    public submitUnitTests(): LocalizedText {
        return this.localize({
            en: 'Submit the *Unit Tests* when you think the *Current Function* matches the *Specification*.',
            nl: 'Lever de *Unit Testen* in als je denkt dat de *Huidige Functie* voldoet aan de *Specificatie*.',
            de: 'Reiche die *Unit-Tests* ein, wenn du denkst, dass die *Aktuelle Funktion* der *Spezifikation* entspricht.',
        })
    }

    public specificationTitle(description: string): LocalizedText {
        return this.localize({
            en: `Specification (${description})`,
            nl: `Specificatie (${description})`,
            de: `Spezifikation (${description})`,
        })
    }

    public currentFunctionTitle(): LocalizedText {
        return this.localize({
            en: 'Current Function',
            nl: 'Huidige Functie',
            de: 'Aktuelle Funktion',
        })
    }

    public differenceTitle(): LocalizedText {
        return this.localize({
            en: 'Difference',
            nl: 'Verschil',
            de: 'Unterschied',
        })
    }

    public currentFunctionNotImproved(): LocalizedText {
        return this.localize({
            en: 'I\'ve added the unit test, ' +
                'but the *Current Function* already passes it, ' +
                'so I didn\'t improve the *Current Function*. ' +
                'Write a unit test that the *Current Function* fails.',
            nl: 'Ik heb de unit test toegevoegd, ' +
                'maar de *Huidige Functie* slaagt er al voor, ' +
                'dus heb ik die niet verbeterd. ' +
                'Schrijf een unit test waarvoor de *Huidige Functie* faalt.',
            de: 'Ich habe den Unit-Test hinzugefügt, ' +
                'aber die *Aktuelle Funktion* besteht ihn bereits, ' +
                'also habe ich die *Aktuelle Funktion* nicht verbessert. ' +
                'Schreibe einen Unit-Test, den die *Aktuelle Funktion* nicht besteht.',
        })
    }

    public hint(): LocalizedText {
        return this.localize({
            en: 'Write a unit test that the *Current Function* fails.',
            nl: 'Schrijf een unit test waarvoor de *Huidige Functie* faalt.',
            de: 'Schreibe einen Unit-Test, den die *Aktuelle Funktion* nicht besteht.',
        })
    }

    public currentFunctionImproved(numberOfUnitTests: number): LocalizedText {
        return this.localize({
            en: `I've added the unit test to the *Unit Tests* and improved the *Current Function* ` +
                `so the new unit test now passes${numberOfUnitTests === 1 ? '' : ' as well'}.`,
            nl: `Ik heb de unit test toegevoegd aan de *Unit Testen* en de *Huidige Functie* verbeterd ` +
                `zodat de nieuwe unit test nu${numberOfUnitTests === 1 ? '' : ' ook'} slaagt.`,
            de: `Ich habe den Unit-Test zu den *Unit-Tests* hinzugefügt und die *Aktuelle Funktion* verbessert, ` +
                `damit der neue Unit-Test jetzt${numberOfUnitTests === 1 ? '' : ' auch'} besteht.`,
        })
    }

    public invalidUnitTest(): LocalizedText {
        return this.localize({
            en: 'The following unit test doesn\'t match the *Specification*, ' +
                'but the *Current Function* passes it.',
            nl: 'De volgende unit test voldoet niet aan de *Specificatie*, ' +
                'maar de *Huidige Functie* slaagt er wel voor.',
            de: 'Der folgende Unit-Test entspricht nicht der *Spezifikation*, ' +
                'aber die *Aktuelle Funktion* besteht ihn.',
        })
    }

    public moreUnitTests(numberOfUnitTestsStillNeeded: number): LocalizedText {
        return this.localize({
            en: `The *Current Function* doesn't match the *Specification* yet. ` +
                `You need at least ${numberOfUnitTestsStillNeeded} more ${numberOfUnitTestsStillNeeded === 1 ? 'unit test' : 'unit tests'}, ` +
                `so write a unit test that matches the *Specification* and that the *Current Function* fails.`,
            nl: `De *Huidige Functie* voldoet nog niet aan de *Specificatie*. ` +
                `Je hebt nog minstens ${numberOfUnitTestsStillNeeded} ${numberOfUnitTestsStillNeeded === 1 ? 'unit test' : 'unit testen'} nodig, ` +
                `dus schrijf een unit test die voldoet aan de *Specificatie* en waarvoor de *Huidige Functie* faalt.`,
            de: `Die *Aktuelle Funktion* entspricht noch nicht der *Spezifikation*. ` +
                `Du brauchst noch mindestens ${numberOfUnitTestsStillNeeded} ${numberOfUnitTestsStillNeeded === 1 ? 'weiteren Unit-Test' : 'weitere Unit-Tests'}, ` +
                `also schreibe einen Unit-Test, der der *Spezifikation* entspricht und den die *Aktuelle Funktion* nicht besteht.`,
        })
    }

    public currentFunctionCorrect(): LocalizedText {
        return this.localize({
            en: 'Well done! The *Current Function* matches the *Specification*.',
            nl: 'Goed gedaan! De *Huidige Functie* voldoet aan de *Specificatie*.',
            de: 'Gut gemacht! Die *Aktuelle Funktion* entspricht der *Spezifikation*.',
        })
    }

    public levelOverviewTitle(): LocalizedText {
        return this.localize({
            en: 'Level Overview',
            nl: 'Level-Overzicht',
            de: 'Level-Übersicht',
        })
    }

    public batteryLevelSpecification(): LocalizedText {
        return this.localize({
            en: 'A smartphone normally operates in `Normal Mode`, ' +
                'but when the battery level is less than `20`, ' +
                'it operates in `Low Power Mode`.',
            nl: 'Een smartphone werkt normaal in `Normal Mode`, ' +
                'maar wanneer het batterijpercentage minder dan `20` is, ' +
                'werkt een smartphone in `Low Power Mode`.',
            de: 'Ein Smartphone funktioniert normalerweise im `Normal Mode`, ' +
                'aber wenn der Akkustand unter `20` liegt, ' +
                'funktioniert es im `Low Power Mode`.',
        })
    }

    public wrongAction(): LocalizedText {
        return this.localize({
            en: 'Hmm, that\'s not quite right. ' +
                'Try again.',
            nl: 'Hmm, dat klopt niet helemaal. ' +
                'Probeer het opnieuw.',
            de: 'Hmm, das ist nicht ganz richtig. ' +
                'Versuche es erneut.',
        })
    }

    public addBatteryLevel20(): LocalizedText {
        return this.localize({
            en: 'The *Specification* contains the number `20`. ' +
                'That is a good starting point. ' +
                'When the battery level is `20`, the function must return `Normal Mode`.',
            nl: 'De *Specificatie* bevat het getal 20. ' +
                'Dat is een goed startpunt. ' +
                'Wanneer het batterijpercentage `20` is moet de functie `Normal Mode` teruggeven.',
            de: 'Die *Spezifikation* enthält die Zahl `20`. ' +
                'Das ist ein guter Ausgangspunkt. ' +
                'Wenn der Akkustand `20` ist, muss die Funktion `Normal Mode` zurückgeben.',
        })
    }

    public addBatteryLevel19(): LocalizedText {
        return this.localize({
            en: 'The *Current Function* now always returns `Normal Mode`, ' +
                'but the *Specification* says battery level `19` must return `Low Power Mode`. ' +
                'Add a unit test for that.',
            nl: 'De *Huidige Functie* geeft nu altijd `Normal Mode` terug, ' +
                'maar de *Specificatie* zegt dat batterijpercentage `19` `Low Power Mode` moet teruggeven. ' +
                'Voeg daar een unit test voor toe.',
            de: 'Die *Aktuelle Funktion* gibt jetzt immer `Normal Mode` zurück, ' +
                'aber die *Spezifikation* sagt, dass Akkustand `19` `Low Power Mode` zurückgeben muss. ' +
                'Füge dafür einen Unit-Test hinzu.',
        })
    }

    public submitUnitTestsFirst(): LocalizedText {
        return this.localize({
            en: 'The *Current Function* can now return either `Normal Mode` or `Low Power Mode`. ' +
                'Submit the unit tests to check if the *Current Function* matches the *Specification*.',
            nl: 'De *Huidige Functie* kan nu `Normal Mode` of `Low Power Mode` teruggeven. ' +
                'Lever de unit testen in om te controleren of de *Huidige Functie* voldoet aan de *Specificatie*.',
            de: 'Die *Aktuelle Funktion* kann jetzt entweder `Normal Mode` oder `Low Power Mode` zurückgeben. ' +
                'Reiche die Unit-Tests ein, um zu prüfen, ob die *Aktuelle Funktion* der *Spezifikation* entspricht.',
        })
    }

    public addBatteryLevel21(): LocalizedText {
        return this.localize({
            en: 'The *Current Function* now returns `Normal Mode` only for battery level `20`. ' +
                'The *Specification* says `21` must also return `Normal Mode`. ' +
                'Add a unit test for that.',
            nl: 'De *Huidige Functie* geeft nu alleen `Normal Mode` terug voor batterijpercentage `20`. ' +
                'De *Specificatie* zegt dat `21` ook `Normal Mode` moet teruggeven. ' +
                'Voeg daar een unit test voor toe.',
            de: 'Die *Aktuelle Funktion* gibt jetzt `Normal Mode` nur für Akkustand `20` zurück. ' +
                'Die *Spezifikation* sagt, dass `21` auch `Normal Mode` zurückgeben muss. ' +
                'Füge dafür einen Unit-Test hinzu.',
        })
    }

    public submitUnitTestsSecond(): LocalizedText {
        return this.localize({
            en: 'Submit the unit tests again to check if the *Current Function* matches the *Specification*.',
            nl: 'Lever de unit testen opnieuw in om te controleren of de *Huidige Functie* voldoet aan de *Specificatie*.',
            de: 'Reiche die Unit-Tests erneut ein, um zu prüfen, ob die *Aktuelle Funktion* der *Spezifikation* entspricht.',
        })
    }

    public addBatteryLevel18(): LocalizedText {
        return this.localize({
            en: 'The *Current Function* now returns `Low Power Mode` only for battery level `19`. ' +
                'The *Specification* says `18` must also return `Low Power Mode`. ' +
                'Add a unit test for that.',
            nl: 'De *Huidige Functie* geeft nu alleen `Low Power Mode` terug voor batterijpercentage `19`. ' +
                'De *Specificatie* zegt dat `18` ook `Low Power Mode` moet teruggeven. ' +
                'Voeg daar een unit test voor toe.',
            de: 'Die *Aktuelle Funktion* gibt jetzt `Low Power Mode` nur für Akkustand `19` zurück. ' +
                'Die *Spezifikation* sagt, dass `18` auch `Low Power Mode` zurückgeben muss. ' +
                'Füge dafür einen Unit-Test hinzu.',
        })
    }

    public submitUnitTestsThird(): LocalizedText {
        return this.localize({
            en: 'Submit the unit tests again to check if the *Current Function* finally matches the *Specification*.',
            nl: 'Lever de unit testen opnieuw in om te controleren of de *Huidige Functie* eindelijk voldoet aan de *Specificatie*.',
            de: 'Reiche die Unit-Tests erneut ein, um zu prüfen, ob die *Aktuelle Funktion* endlich der *Spezifikation* entspricht.',
        })
    }

    public evenOddSpecification(): LocalizedText {
        return this.localize({
            en: 'Return `true` if the number is even and `false` otherwise.',
            nl: 'Geef `true` terug als het getal even is en anders `false`.',
            de: 'Gib `true` zurück, wenn die Zahl gerade ist, und sonst `false`.',
        })
    }

    public fizzBuzzSpecification(): LocalizedText {
        return this.localize({
            en: 'Return `Fizz` if the number is divisible by 3, ' +
                '`Buzz` if divisible by 5, ' +
                '`FizzBuzz` if divisible by both 3 and 5, ' +
                'and `Other` for any other number.',
            nl: 'Geef `Fizz` terug als het getal deelbaar is door 3, ' +
                '`Buzz` als het deelbaar is door 5, ' +
                '`FizzBuzz` als het deelbaar is door zowel 3 als 5, ' +
                'en `Other` voor elk ander getal.',
            de: 'Gib `Fizz` zurück, wenn die Zahl durch 3 teilbar ist, ' +
                '`Buzz` wenn sie durch 5 teilbar ist, ' +
                '`FizzBuzz` wenn sie durch 3 und 5 teilbar ist, ' +
                'und `Other` für jede andere Zahl.',
        })
    }

    public floatFormatSpecification(): LocalizedText {
        return this.localize({
            en: 'Return `true` if the text represents a float and `false` otherwise. ' +
                'A float may start with a plus or a minus sign. ' +
                'This is followed by one or more digits. ' +
                'If that is followed by a dot, then one or more digits must follow.',
            nl: 'Geef `true` terug als de tekst een gebroken getal voorstelt en `false` als dat niet zo is. ' +
                'Een gebroken getal kan beginnen met een plus- of minteken. ' +
                'Hierna volgen één of meer cijfers. ' +
                'Als dit wordt gevolgd door een punt, dan moeten nog één of meer cijfers volgen.',
            de: 'Gib `true` zurück, wenn der Text eine Gleitkommazahl darstellt, und sonst `false`. ' +
                'Eine Gleitkommazahl kann mit einem Plus- oder Minuszeichen beginnen. ' +
                'Danach folgen eine oder mehrere Ziffern. ' +
                'Wenn danach ein Punkt folgt, müssen noch eine oder mehrere Ziffern folgen.',
        })
    }

    public leapYearSpecification(): LocalizedText {
        return this.localize({
            en: 'Return `true` if the year is a leap year and `false` otherwise. ' +
                'A year is a leap year if it is divisible by 4. ' +
                'The exception is that years divisible by 100 are not leap years, unless they are also divisible by 400.',
            nl: 'Geef `true` terug als het jaar een schrikkeljaar is en anders `false`. ' +
                'Een jaar is een schrikkeljaar als het deelbaar is door 4. ' +
                'De uitzondering is dat jaren die deelbaar zijn door 100 geen schrikkeljaren zijn, tenzij ze ook deelbaar zijn door 400.',
            de: 'Gib `true` zurück, wenn das Jahr ein Schaltjahr ist, und sonst `false`. ' +
                'Ein Jahr ist ein Schaltjahr, wenn es durch 4 teilbar ist. ' +
                'Die Ausnahme ist, dass Jahre, die durch 100 teilbar sind, keine Schaltjahre sind, es sei denn, sie sind auch durch 400 teilbar.',
        })
    }

    public passwordStrengthSpecification(): LocalizedText {
        return this.localize({
            en: 'Return `true` if the password is strong and `false` otherwise. ' +
                'A password is strong if it contains at least 5 characters, an uppercase letter, a lowercase letter, and a special character (`#` or `@`).',
            nl: 'Geef `true` terug als het wachtwoord sterk is en anders `false`. ' +
                'Een wachtwoord is sterk als het tenminste 5 tekens bevat, een hoofdletter, een kleine letter en een speciaal teken (`#` of `@`).',
            de: 'Gib `true` zurück, wenn das Passwort stark ist, und sonst `false`. ' +
                'Ein Passwort ist stark, wenn es mindestens 5 Zeichen, einen Großbuchstaben, einen Kleinbuchstaben und ein Sonderzeichen (`#` oder `@`) enthält.',
        })
    }

    public speedDisplaySpecification(): LocalizedText {
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
        return this.localize({
            en: 'Return the formatted speed in kilometers per hour. ' +
                'Use one decimal place if it fits on the display (e.g. 13 → `13.0`). ' +
                'Otherwise, round to an integer (e.g. 87.6 → `88`). ' +
                'If the car isn\'t moving, return `START`. ' +
                'If the speed no longer fits on the display, return `DANGER` (e.g. 300 → `DANGER`).\n' +
                'The display looks like this, where every X is a LED light:\n' +
                display,
            nl: 'Geef de geformatteerde snelheid in kilometer per uur. ' +
                'Gebruik één decimaal als het op het scherm past (bijvoorbeeld 13 → `13.0`). ' +
                'Rond anders af op een geheel getal (bijvoorbeeld 87.6 → `88`). ' +
                'Als de auto niet beweegt, geef `START` terug. ' +
                'Als de snelheid niet meer op het scherm past, geef `DANGER` terug (bijvoorbeeld 300 → `DANGER`).\n' +
                'Het scherm ziet er zo uit, waarbij elke X een LED-lampje is:\n' +
                display,
            de: 'Gib die formatierte Geschwindigkeit in Kilometern pro Stunde zurück. ' +
                'Verwende eine Dezimalstelle, wenn sie auf das Display passt (z.B. 13 → `13.0`). ' +
                'Runde sonst auf eine ganze Zahl (z.B. 87.6 → `88`). ' +
                'Wenn das Auto nicht fährt, gib `START` zurück. ' +
                'Wenn die Geschwindigkeit nicht mehr auf das Display passt, gib `DANGER` zurück (z.B. 300 → `DANGER`).\n' +
                'Das Display sieht so aus, wobei jedes X eine LED-Leuchte ist:\n' +
                display,
        })
    }

    public triangleTypeSpecification(): LocalizedText {
        return this.localize({
            en: 'Return the type of the triangle: `equilateral`, `isosceles`, or `scalene`. ' +
                'A triangle is `equilateral` if all three sides have the same length. ' +
                'A triangle is `isosceles` if exactly two sides have the same length. ' +
                'A triangle is `scalene` if all three sides have different lengths.',
            nl: 'Geef het type van de driehoek terug: `equilateral` (gelijkzijdig), `isosceles` (gelijkbenig) of `scalene` (ongelijkzijdig). ' +
                'Een driehoek is gelijkzijdig als alle drie de zijden even lang zijn. ' +
                'Een driehoek is gelijkbenig als precies twee zijden even lang zijn. ' +
                'Een driehoek is ongelijkzijdig als alle drie de zijden verschillende lengtes hebben.',
            de: 'Gib den Typ des Dreiecks zurück: `equilateral` (gleichseitig), `isosceles` (gleichschenklig) oder `scalene` (ungleichseitig). ' +
                'Ein Dreieck ist gleichseitig, wenn alle drei Seiten gleich lang sind. ' +
                'Ein Dreieck ist gleichschenklig, wenn genau zwei Seiten gleich lang sind. ' +
                'Ein Dreieck ist ungleichseitig, wenn alle drei Seiten unterschiedliche Längen haben.',
        })
    }

    public votingAgeSpecification(): LocalizedText {
        return this.localize({
            en: 'Return `true` if the age is `18` or over, and `false` otherwise.',
            nl: 'Geef `true` terug als de leeftijd `18` jaar of hoger is, en anders `false`.',
            de: 'Gib `true` zurück, wenn das Alter `18` oder älter ist, und sonst `false`.',
        })
    }

    public reviewSpecification(): LocalizedText {
        return this.localize({
            en: 'Return `Good` if the price is less than `20` and the quality is at least `7`. ' +
                'Return `Bad` if the price is `20` or more and the quality is less than `7`. ' +
                'Return `Ok` in all other cases.',
            nl: 'Geef `Good` terug als de prijs minder dan `20` is en de kwaliteit ten minste `7` is. ' +
                'Geef `Bad` terug als de prijs `20` of meer is en de kwaliteit minder dan `7` is. ' +
                'Geef `Ok` terug in alle andere gevallen.',
            de: 'Gib `Good` zurück, wenn der Preis weniger als `20` ist und die Qualität mindestens `7` beträgt. ' +
                'Gib `Bad` zurück, wenn der Preis `20` oder mehr ist und die Qualität weniger als `7` beträgt. ' +
                'Gib `Ok` in allen anderen Fällen zurück.',
        })
    }

    public or(): LocalizedText {
        return this.localize({
            en: 'or',
            nl: 'of',
            de: 'oder',
        })
    }
}

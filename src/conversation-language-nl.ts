import { ConversationLanguage, ConversationText } from './conversation-language-base.js'

export class Dutch extends ConversationLanguage {
    public override readonly id = 'nl' as const
    public override readonly name = 'Nederlands'

    public override welcome(conversationLanguageName: string, programmingLanguageName: string): ConversationText {
        return ConversationLanguage.bless(`Hoi! Ik ben een ${conversationLanguageName} sprekende AI bot die ${programmingLanguageName} code schrijft. ` +
            'Jouw taak is om mij bij te sturen met unit testen.')
    }

    public override unitTestGameTitle(): ConversationText {
        return ConversationLanguage.bless('UnitTestGame')
    }

    public override slogan(): ConversationText {
        return ConversationLanguage.bless('![Logo van UnitTestGame](apple-touch-icon.png)Leer Test-Driven Development door unit testen te schrijven die een AI bot bijsturen.')
    }

    public override readMoreAboutTDD(): ConversationText {
        return ConversationLanguage.bless('[Lees meer over TDD op Wikipedia](https://nl.wikipedia.org/wiki/Test-driven_development)')
    }

    public override contact(): ConversationText {
        return ConversationLanguage.bless('[Contact](mailto:contact@unittestgame.com)')
    }

    public override settingsTitle(): ConversationText {
        return ConversationLanguage.bless('Instellingen')
    }

    public override changeLanguage(): ConversationText {
        return ConversationLanguage.bless('Taal')
    }

    public override changeProgrammingLanguage(): ConversationText {
        return ConversationLanguage.bless('Programmeertaal')
    }

    public override invitation(): ConversationText {
        return ConversationLanguage.bless('Welk level wil je spelen?')
    }

    public override level(levelNumber: number, levelName: string): ConversationText {
        return ConversationLanguage.bless(`Level ${levelNumber} - ${levelName}`)
    }

    public override nextLevelButton(levelDescription: string): ConversationText {
        return ConversationLanguage.bless(`Ik wil ${levelDescription} spelen`)
    }

    public override allLevels(): ConversationText {
        return ConversationLanguage.bless('Ik heb alle levels voltooid')
    }

    public override closeTab(): ConversationText {
        return ConversationLanguage.bless('Goed gedaan! Je hebt alle levels voltooid. ' +
            'Je kunt TDD nu toepassen op je eigen projecten.')
    }

    public override unitTestsTitle(): ConversationText {
        return ConversationLanguage.bless('Unit Testen')
    }

    public override addUnitTestButton(): ConversationText {
        return ConversationLanguage.bless('Ik wil deze unit test toevoegen')
    }

    public override submitUnitTestsButton(): ConversationText {
        return ConversationLanguage.bless('Ik wil de unit testen inleveren')
    }

    public override unitTestNotAdded(): ConversationText {
        return ConversationLanguage.bless('Ik heb de unit test niet toegevoegd, ' +
            'omdat deze niet voldoet aan de *Specificatie*.')
    }

    public override tooManyUnitTests(numberOfUnnecessaryUnitTests: number, numberOfRedundantUnitTests: number): ConversationText {
        return ConversationLanguage.bless(`Je hebt de *Huidige Functie* grondig getest, ` +
            `maar je hebt ${numberOfUnnecessaryUnitTests} ${numberOfUnnecessaryUnitTests === 1 ? 'unit test' : 'unit testen'} meer dan nodig is. ` +
            `${numberOfRedundantUnitTests === 1 ? 'De volgende' : 'Minstens één van de volgende'} kun je weglaten.`)
    }

    public override readSpecification(): ConversationText {
        return ConversationLanguage.bless('Lees eerst de *Specificatie*. ' +
            'Schrijf daarna een unit test waarvoor de *Huidige Functie* faalt.')
    }

    public override improveCurrentFunction(): ConversationText {
        return ConversationLanguage.bless('Nadat je een unit test hebt toegevoegd ' +
            'verbeter ik de *Huidige Functie* zodat alle *Unit Testen* weer slagen.')
    }

    public override submitUnitTests(): ConversationText {
        return ConversationLanguage.bless('Lever de *Unit Testen* in als je denkt dat de *Huidige Functie* voldoet aan de *Specificatie*.')
    }

    public override specificationTitle(description: string): ConversationText {
        return ConversationLanguage.bless(`Specificatie (${description})`)
    }

    public override currentFunctionTitle(): ConversationText {
        return ConversationLanguage.bless('Huidige Functie')
    }

    public override differenceTitle(): ConversationText {
        return ConversationLanguage.bless('Verschil')
    }

    public override currentFunctionNotImproved(): ConversationText {
        return ConversationLanguage.bless('Ik heb de unit test toegevoegd, ' +
            'maar de *Huidige Functie* slaagt er al voor, ' +
            'dus heb ik die niet verbeterd. ' +
            'Schrijf een unit test waarvoor de *Huidige Functie* faalt.')
    }

    public override hint(): ConversationText {
        return ConversationLanguage.bless('Schrijf een unit test waarvoor de *Huidige Functie* faalt.')
    }

    public override currentFunctionImproved(numberOfUnitTests: number): ConversationText {
        return ConversationLanguage.bless(`Ik heb de unit test toegevoegd aan de *Unit Testen* en de *Huidige Functie* verbeterd ` +
            `zodat de nieuwe unit test nu${numberOfUnitTests === 1 ? '' : ' ook'} slaagt.`)
    }

    public override invalidUnitTest(): ConversationText {
        return ConversationLanguage.bless('De volgende unit test voldoet niet aan de *Specificatie*, ' +
            'maar de *Huidige Functie* slaagt er wel voor.')
    }

    public override moreUnitTests(numberOfUnitTestsStillNeeded: number): ConversationText {
        return ConversationLanguage.bless(`De *Huidige Functie* voldoet nog niet aan de *Specificatie*. ` +
            `Je hebt nog minstens ${numberOfUnitTestsStillNeeded} ${numberOfUnitTestsStillNeeded === 1 ? 'unit test' : 'unit testen'} nodig, ` +
            `dus schrijf een unit test die voldoet aan de *Specificatie* en waarvoor de *Huidige Functie* faalt.`)
    }

    public override currentFunctionCorrect(): ConversationText {
        return ConversationLanguage.bless('Goed gedaan! De *Huidige Functie* voldoet aan de *Specificatie*.')
    }

    public override levelOverviewTitle(): ConversationText {
        return ConversationLanguage.bless('Level Overzicht')
    }

    public override batteryLevelSpecification(): ConversationText {
        return ConversationLanguage.bless('Een smartphone werkt normaal in `NORMAL MODE`, ' +
            'maar wanneer het batterijpercentage minder dan `20` is, ' +
            'werkt een smartphone in `LOW POWER MODE`.')
    }

    public override wrongAction(): ConversationText {
        return ConversationLanguage.bless('Hmm, dat klopt niet helemaal. ' +
            'Probeer het opnieuw.')
    }

    public override addBatteryLevel20(): ConversationText {
        return ConversationLanguage.bless('De *Specificatie* bevat het getal 20. ' +
            'Dat is een goed startpunt. ' +
            'Wanneer het batterijpercentage `20` is moet de functie `NORMAL MODE` teruggeven.')
    }

    public override addBatteryLevel19(): ConversationText {
        return ConversationLanguage.bless('De *Huidige Functie* geeft nu altijd `NORMAL MODE` terug, ' +
            'maar de *Specificatie* zegt dat batterijpercentage `19` `LOW POWER MODE` moet teruggeven. ' +
            'Voeg daar een unit test voor toe.')
    }

    public override submitUnitTestsFirst(): ConversationText {
        return ConversationLanguage.bless('De *Huidige Functie* kan nu `NORMAL MODE` of `LOW POWER MODE` teruggeven. ' +
            'Lever de *Unit Testen* in om te controleren of de *Huidige Functie* voldoet aan de *Specificatie*.')
    }

    public override addBatteryLevel21(): ConversationText {
        return ConversationLanguage.bless('De *Huidige Functie* geeft nu alleen `NORMAL MODE` terug voor batterijpercentage `20`. ' +
            'De *Specificatie* zegt dat `21` ook `NORMAL MODE` moet teruggeven. ' +
            'Voeg daar een unit test voor toe.')
    }

    public override submitUnitTestsSecond(): ConversationText {
        return ConversationLanguage.bless('Lever de *Unit Testen* opnieuw in om te controleren of de *Huidige Functie* voldoet aan de *Specificatie*.')
    }

    public override addBatteryLevel18(): ConversationText {
        return ConversationLanguage.bless('De *Huidige Functie* geeft nu alleen `LOW POWER MODE` terug voor batterijpercentage `19`. ' +
            'De *Specificatie* zegt dat `18` ook `LOW POWER MODE` moet teruggeven. ' +
            'Voeg daar een unit test voor toe.')
    }

    public override submitUnitTestsThird(): ConversationText {
        return ConversationLanguage.bless('Lever de *Unit Testen* opnieuw in om te controleren of de *Huidige Functie* eindelijk voldoet aan de *Specificatie*.')
    }

    public override evenOddSpecification(): ConversationText {
        return ConversationLanguage.bless('Geef `true` terug als het getal even is en anders `false`.')
    }

    public override fizzBuzzSpecification(): ConversationText {
        return ConversationLanguage.bless('Geef `FIZZ` terug als het getal deelbaar is door 3, ' +
            '`BUZZ` als het deelbaar is door 5, ' +
            '`FIZZBUZZ` als het deelbaar is door zowel 3 als 5, ' +
            'en het getal zelf voor elk ander getal.')
    }

    public override floatFormatSpecification(): ConversationText {
        return ConversationLanguage.bless('Geef `true` terug als de tekst een gebroken getal voorstelt en `false` als dat niet zo is. ' +
            'Een gebroken getal kan beginnen met een plus- of minteken. ' +
            'Hierna volgen één of meer cijfers. ' +
            'Als dit wordt gevolgd door een punt, dan moeten nog één of meer cijfers volgen.')
    }

    public override leapYearSpecification(): ConversationText {
        return ConversationLanguage.bless('Geef `true` terug als het jaar een schrikkeljaar is en anders `false`. ' +
            'Een jaar is een schrikkeljaar als het deelbaar is door 4. ' +
            'De uitzondering is dat jaren die deelbaar zijn door 100 geen schrikkeljaren zijn, tenzij ze ook deelbaar zijn door 400.')
    }

    public override passwordStrengthSpecification(): ConversationText {
        return ConversationLanguage.bless('Geef `true` terug als het wachtwoord sterk is en anders `false`. ' +
            'Een wachtwoord is sterk als het tenminste 5 tekens bevat, een hoofdletter, een kleine letter en een speciaal teken (`#` of `@`).')
    }

    public override speedDisplaySpecification(): ConversationText {
        return ConversationLanguage.bless('De snelheidssensor geeft de snelheid in tienden van kilometers per uur (bijvoorbeeld 131 betekent 13.1 km/u). ' +
            'Geef de snelheid terug zoals die op het scherm wordt getoond. ' +
            'Gebruik één decimaal als het op het scherm past (bijvoorbeeld 131 → `13.1`). ' +
            'Toon anders alleen hele kilometers, zonder de decimaal (bijvoorbeeld 876 → `87`). ' +
            'Als de auto niet beweegt, geef `START` terug. ' +
            'Als de snelheid niet meer op het scherm past, geef `DANGER` terug (bijvoorbeeld 3000 → `DANGER`).\n' +
            'Het scherm ziet er zo uit, waarbij elke X een LED-lampje is:\n' +
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
        return ConversationLanguage.bless('Geef het type van de driehoek terug: `EQUILATERAL` (gelijkzijdig), `ISOSCELES` (gelijkbenig) of `SCALENE` (ongelijkzijdig). ' +
            'Een driehoek is gelijkzijdig als alle drie de zijden even lang zijn. ' +
            'Een driehoek is gelijkbenig als precies twee zijden even lang zijn. ' +
            'Een driehoek is ongelijkzijdig als alle drie de zijden verschillende lengtes hebben.')
    }

    public override votingAgeSpecification(): ConversationText {
        return ConversationLanguage.bless('Geef `true` terug als de leeftijd `18` jaar of hoger is, en anders `false`.')
    }

    public override reviewSpecification(): ConversationText {
        return ConversationLanguage.bless('Geef `GOOD` terug als de prijs minder dan `20` is en de kwaliteit ten minste `7` is. ' +
            'Geef `BAD` terug als de prijs `20` of meer is en de kwaliteit minder dan `7` is. ' +
            'Geef `OK` terug in alle andere gevallen.')
    }

    public override or(): ConversationText {
        return ConversationLanguage.bless('of')
    }
}

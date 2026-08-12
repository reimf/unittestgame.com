import { ConversationLanguage, ConversationText } from './conversation-language-base.js'

export class Dutch extends ConversationLanguage {
    public override readonly id = 'nl' as const
    public override readonly name = 'Nederlands'

    public override welcome(): ConversationText {
        return ConversationLanguage.bless('Hoi! Ik ben een AI bot die code schrijft. ' +
            'Jouw taak is om mij bij te sturen met unit testen.')
    }

    public override unitTestGameTitle(): ConversationText {
        return ConversationLanguage.bless('UnitTestGame')
    }

    public override slogan(): ConversationText {
        return ConversationLanguage.bless('![Logo van UnitTestGame](apple-touch-icon.png)Leer unit testen schrijven die een AI bot bijsturen.')
    }

    public override home(): ConversationText {
        return ConversationLanguage.bless('[Startpagina](index)')
    }

    public override settingsTitle(): ConversationText {
        return ConversationLanguage.bless('Instellingen')
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

    public override playButton(): ConversationText {
        return ConversationLanguage.bless('Spelen')
    }

    public override retryButton(): ConversationText {
        return ConversationLanguage.bless('Opnieuw')
    }

    public override retryLevelButton(levelDescription: string): ConversationText {
        return ConversationLanguage.bless(`Ik wil ${levelDescription} opnieuw spelen`)
    }

    public override lockedButton(): ConversationText {
        return ConversationLanguage.bless('Vergrendeld')
    }

    public override allLevels(): ConversationText {
        return ConversationLanguage.bless('Ik heb alle levels voltooid')
    }

    public override closeTab(): ConversationText {
        return ConversationLanguage.bless('Goed gedaan! Je hebt alle levels voltooid. ' +
            'Je kunt nu unit testen schrijven voor je eigen projecten.')
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
            'dus heb ik die niet verbeterd.')
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
        return ConversationLanguage.bless('Een smartphone werkt normaal in `"NORMAL MODE"`, ' +
            'maar wanneer het batterijpercentage minder dan `20` is, ' +
            'werkt een smartphone in `"LOW POWER MODE"`.')
    }

    public override wrongAction(): ConversationText {
        return ConversationLanguage.bless('Hmm, dat klopt niet helemaal. ' +
            'Probeer het opnieuw.')
    }

    public override addBatteryLevel20(): ConversationText {
        return ConversationLanguage.bless('De *Specificatie* bevat het getal 20. ' +
            'Dat is een goed startpunt. ' +
            'Wanneer het batterijpercentage `20` is moet de functie `"NORMAL MODE"` teruggeven.')
    }

    public override addBatteryLevel19(): ConversationText {
        return ConversationLanguage.bless('De *Huidige Functie* geeft nu altijd `"NORMAL MODE"` terug, ' +
            'maar de *Specificatie* zegt dat batterijpercentage `19` `"LOW POWER MODE"` moet teruggeven. ' +
            'Voeg daar een unit test voor toe.')
    }

    public override submitUnitTestsFirst(): ConversationText {
        return ConversationLanguage.bless('De *Huidige Functie* kan nu `"NORMAL MODE"` of `"LOW POWER MODE"` teruggeven. ' +
            'Lever de *Unit Testen* in om te controleren of de *Huidige Functie* voldoet aan de *Specificatie*.')
    }

    public override addBatteryLevel21(): ConversationText {
        return ConversationLanguage.bless('De *Huidige Functie* geeft nu alleen `"NORMAL MODE"` terug voor batterijpercentage `20`. ' +
            'De *Specificatie* zegt dat `21` ook `"NORMAL MODE"` moet teruggeven. ' +
            'Voeg daar een unit test voor toe.')
    }

    public override submitUnitTestsSecond(): ConversationText {
        return ConversationLanguage.bless('Lever de *Unit Testen* opnieuw in om te controleren of de *Huidige Functie* voldoet aan de *Specificatie*.')
    }

    public override addBatteryLevel18(): ConversationText {
        return ConversationLanguage.bless('De *Huidige Functie* geeft nu alleen `"LOW POWER MODE"` terug voor batterijpercentage `19`. ' +
            'De *Specificatie* zegt dat `18` ook `"LOW POWER MODE"` moet teruggeven. ' +
            'Voeg daar een unit test voor toe.')
    }

    public override submitUnitTestsThird(): ConversationText {
        return ConversationLanguage.bless('Lever de *Unit Testen* opnieuw in om te controleren of de *Huidige Functie* eindelijk voldoet aan de *Specificatie*.')
    }

    public override votingAgeSpecification(): ConversationText {
        return ConversationLanguage.bless('Je mag stemmen als je leeftijd `18` jaar of hoger is.')
    }

    public override windScaleSpecification(): ConversationText {
        return ConversationLanguage.bless('Het is `"CALM"` als de windsnelheid minder dan `20` is, ' +
            '`"BREEZE"` als deze minder dan `50` is, ' +
            '`"GALE"` als deze minder dan `90` is, ' +
            'en anders `"STORM"`.')
    }

    public override reviewSpecification(): ConversationText {
        return ConversationLanguage.bless('Jouw recensie is `"GOOD"` als de prijs minder dan `20` is en de kwaliteit ten minste `7` is, ' +
            '`"BAD"` als de prijs `20` of meer is en de kwaliteit minder dan `7` is, ' +
            'en anders `"OK"`.')
    }

    public override discountSpecification(): ConversationText {
        return ConversationLanguage.bless('Je krijgt `20`% korting als het totaalbedrag ten minste `200` is en je een lidmaatschapskaart hebt, ' +
            '`10`% als het totaalbedrag ten minste `100` is of je een lidmaatschapskaart hebt, ' +
            'en anders `0`%.')
    }

    public override fizzBuzzSpecification(): ConversationText {
        return ConversationLanguage.bless('Zeg `"FIZZ"` als het getal deelbaar is door 3, ' +
            '`"BUZZ"` als het deelbaar is door 5, ' +
            '`"FIZZBUZZ"` als het deelbaar is door zowel 3 als 5, ' +
            'en `"NUMBER"` voor elk ander getal.')
    }

    public override leapYearSpecification(): ConversationText {
        return ConversationLanguage.bless('Geef `true` terug als het jaar een schrikkeljaar is en anders `false`. ' +
            'Een jaar is een schrikkeljaar als het deelbaar is door 4. ' +
            'De uitzondering is dat jaren die deelbaar zijn door 100 geen schrikkeljaren zijn, tenzij ze ook deelbaar zijn door 400.')
    }

    public override triangleTypeSpecification(): ConversationText {
        return ConversationLanguage.bless('Het type van de driehoek is `"EQUILATERAL"` (gelijkzijdig), `"ISOSCELES"` (gelijkbenig) of `"SCALENE"` (ongelijkzijdig). ' +
            'Een driehoek is gelijkzijdig als alle drie de zijden even lang zijn. ' +
            'Een driehoek is gelijkbenig als precies twee zijden even lang zijn. ' +
            'Een driehoek is ongelijkzijdig als alle drie de zijden verschillende lengtes hebben.')
    }

    public override speedDisplaySpecification(): ConversationText {
        return ConversationLanguage.bless('De snelheidssensor geeft de snelheid in tienden van kilometers per uur (bijvoorbeeld 131 betekent 13.1 km/u). ' +
            'Toon op het scherm `"DECIMAL"` als er een decimaal op past (bijvoorbeeld 131 → `"DECIMAL"` want 13.1 past op het scherm), ' +
            'of anders `"INTEGER"` (bijvoorbeeld 826 → `"INTEGER"` want 82.6 past niet op het scherm en 83 wel). ' +
            'Als de auto stil staat, is het `"START"`. ' +
            'Als de snelheid niet meer op het scherm past, is het `"DANGER"` (bijvoorbeeld 3000 → `"DANGER"`).\n' +
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

    public override parkingFeeSpecification(): ConversationText {
        return ConversationLanguage.bless('De parkeerkosten zijn `0` cent als de auto minder dan een half uur geparkeerd staat, of als de klant heeft gewinkeld in het weekend. ' +
            'Ze zijn `1000` cent als het weekend is. ' +
            'Anders zijn ze 5 cent per minuut als de klant niet heeft gewinkeld, of 3 cent per minuut als de klant heeft gewinkeld.')
    }

    public override or(): ConversationText {
        return ConversationLanguage.bless('of')
    }

    public override parameterLabel(parameterName: string): ConversationText {
        return ConversationLanguage.bless(`Waarde van parameter ${parameterName}`)
    }

    public override returnValueLabel(functionCall: string): ConversationText {
        return ConversationLanguage.bless(`Resultaat van ${functionCall}`)
    }
}

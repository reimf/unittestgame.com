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
        return ConversationLanguage.bless('[Startpagina](/)')
    }

    public override settingsTitle(): ConversationText {
        return ConversationLanguage.bless('Instellingen')
    }

    public override changeLanguage(): ConversationText {
        return ConversationLanguage.bless('Gesprekstaal')
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

    public override indexMetaDescription(): ConversationText {
        return ConversationLanguage.bless('Leer effectieve unit tests schrijven met een interactief spel waarin je samenwerkt met een sluw meewerkende AI bot om je vaardigheden in unit testen te verbeteren.')
    }

    public override indexPageTitle(): ConversationText {
        return ConversationLanguage.bless('UnitTestGame.com: Versla de AI bot die expres vals speelt')
    }

    public override navHowItWorks(): ConversationText {
        return ConversationLanguage.bless('Hoe het werkt')
    }

    public override navLevels(): ConversationText {
        return ConversationLanguage.bless('Levels')
    }

    public override navWhyItWorks(): ConversationText {
        return ConversationLanguage.bless('Waarom het werkt')
    }

    public override navPlayNow(): ConversationText {
        return ConversationLanguage.bless('Nu spelen')
    }

    public override heroTitleLine1Start(): ConversationText {
        return ConversationLanguage.bless('De code doorstaat')
    }

    public override heroTitleLine1Gradient(): ConversationText {
        return ConversationLanguage.bless('jouw unit tests.')
    }

    public override heroTitleLine2Start(): ConversationText {
        return ConversationLanguage.bless('Maar doet het ook wat')
    }

    public override heroTitleLine2Gradient(): ConversationText {
        return ConversationLanguage.bless('jij eigenlijk wilt?')
    }

    public override heroSubtitle(): ConversationText {
        return ConversationLanguage.bless('UnitTestGame koppelt je aan een sluw meewerkende AI bot. ' +
            'Hij schrijft de luiste code die aan jouw unit tests voldoet. ' +
            'En niets meer. ' +
            'Jouw taak: schrijf unit tests totdat het programma klopt.')
    }

    public override heroCtaPrimary(): ConversationText {
        return ConversationLanguage.bless('Speel gratis in je browser →')
    }

    public override heroCtaSecondary(): ConversationText {
        return ConversationLanguage.bless('Bekijk hoe het werkt')
    }

    public override humanWantsToAddUnitTest(): ConversationText {
        return ConversationLanguage.bless('Ik wil deze unit test toevoegen.')
    }

    public override heroCommentThisIsYou(): ConversationText {
        return ConversationLanguage.bless('dit ben jij ↑')
    }

    public override heroCommentFirstUnitTest(): ConversationText {
        return ConversationLanguage.bless('met je eerste unit test')
    }

    public override heroCommentThisIsTheAiBot(): ConversationText {
        return ConversationLanguage.bless('↑ dit is de AI bot')
    }

    public override heroCommentFirstFunctionPasses(): ConversationText {
        return ConversationLanguage.bless('zijn eerste functie doorstaat jouw unit test')
    }

    public override heroCommentFirstVerdict(): ConversationText {
        return ConversationLanguage.bless('maar hij generaliseert niet 👎')
    }

    public override heroCommentThisIsYouAgain(): ConversationText {
        return ConversationLanguage.bless('dit ben jij weer ↑')
    }

    public override heroCommentSecondUnitTest(): ConversationText {
        return ConversationLanguage.bless('nu met je tweede unit test')
    }

    public override heroCommentThisIsTheAiBotAgain(): ConversationText {
        return ConversationLanguage.bless('↑ dit is de AI bot weer')
    }

    public override heroCommentSecondFunctionPasses(): ConversationText {
        return ConversationLanguage.bless('zijn tweede functie doorstaat beide unit tests')
    }

    public override heroCommentSecondVerdict(): ConversationText {
        return ConversationLanguage.bless('en nu generaliseert hij wel 👍')
    }

    public override howItWorksTitle(): ConversationText {
        return ConversationLanguage.bless('Leer unit tests schrijven op gevoel')
    }

    public override howItWorksSubtitle(): ConversationText {
        return ConversationLanguage.bless('Geen colleges. ' +
            'Geen quizzen. ' +
            'Gewoon een AI bot die elk gat in jouw unit tests uitbuit.')
    }

    public override howItWorksStep1Title(): ConversationText {
        return ConversationLanguage.bless('Lees de spec')
    }

    public override howItWorksStep1Desc(): ConversationText {
        return ConversationLanguage.bless('Bekijk wat de functie moet doen, ' +
            'in simpele input → output termen.')
    }

    public override howItWorksStep2Title(): ConversationText {
        return ConversationLanguage.bless('Zie hem vals spelen')
    }

    public override howItWorksStep2Desc(): ConversationText {
        return ConversationLanguage.bless('De AI bot levert de luiste code ' +
            'die precies voldoet aan wat jij hebt getest.')
    }

    public override howItWorksStep3Title(): ConversationText {
        return ConversationLanguage.bless('Vind het gat')
    }

    public override howItWorksStep3Desc(): ConversationText {
        return ConversationLanguage.bless('Spot het randgeval dat hij ontweek, ' +
            'en voeg een unit test toe die dat blootlegt.')
    }

    public override howItWorksStep4Title(): ConversationText {
        return ConversationLanguage.bless('Verstevig tot het klopt')
    }

    public override howItWorksStep4Desc(): ConversationText {
        return ConversationLanguage.bless('Herhaal tot er geen kortere weg meer over is. ' +
            'Level voltooid!')
    }

    public override whyItWorksTitle(): ConversationText {
        return ConversationLanguage.bless('Voor developers die bugs willen voorkomen')
    }

    public override whyItWorksSubtitle(): ConversationText {
        return ConversationLanguage.bless('Het speelt als een spel. ' +
            'Het beklijft als een gewoonte. ' +
            'Het verandert hoe jij test.')
    }

    public override whyItWorksItem1Title(): ConversationText {
        return ConversationLanguage.bless('Een waardige tegenstander')
    }

    public override whyItWorksItem1Desc(): ConversationText {
        return ConversationLanguage.bless('De AI bot is sluw meewerkend. ' +
            'Elke zet is een les over jouw blinde vlek.')
    }

    public override whyItWorksItem2Title(): ConversationText {
        return ConversationLanguage.bless('Oplopende moeilijkheidsgraad')
    }

    public override whyItWorksItem2Desc(): ConversationText {
        return ConversationLanguage.bless('Begin met batterijniveaus. ' +
            'Eindig met het ontrafelen van snelheidsdisplays en parkeerkosten.')
    }

    public override whyItWorksItem3Title(): ConversationText {
        return ConversationLanguage.bless('Echte progressie')
    }

    public override whyItWorksItem3Desc(): ConversationText {
        return ConversationLanguage.bless('Een levelbord houdt bij wat je hebt ontgrendeld, ' +
            'zodat je altijd weet wat je te wachten staat.')
    }

    public override whyItWorksItem4Title(): ConversationText {
        return ConversationLanguage.bless('Zes gesprekstalen')
    }

    public override whyItWorksItem4Desc(): ConversationText {
        return ConversationLanguage.bless('Converseer in het Engels, Nederlands, Duits, ' +
            'Frans, Spaans of Italiaans.')
    }

    public override whyItWorksItem5Title(): ConversationText {
        return ConversationLanguage.bless('Zeven programmeertalen')
    }

    public override whyItWorksItem5Desc(): ConversationText {
        return ConversationLanguage.bless('Laat de AI bot programma\'s schrijven in ' +
            'JavaScript, TypeScript, Python, Java, C#, PHP of Ruby.')
    }

    public override whyItWorksItem6Title(): ConversationText {
        return ConversationLanguage.bless('Helemaal geen installatie')
    }

    public override whyItWorksItem6Desc(): ConversationText {
        return ConversationLanguage.bless('Draait volledig in de browser. ' +
            'Geen account, geen installatie, geen dependencies om mee te vechten.')
    }

    public override levelsTitle(): ConversationText {
        return ConversationLanguage.bless('Tien levels, tien manieren om te worden overtroefd')
    }

    public override levelsSubtitle(): ConversationText {
        return ConversationLanguage.bless('Elk level lijkt simpel. ' +
            'Tot de AI bot weer een bereik vindt dat jij vergat te testen.')
    }

    public override levelsDifficultyEasy(): ConversationText {
        return ConversationLanguage.bless('makkelijk')
    }

    public override levelsDifficultyMedium(): ConversationText {
        return ConversationLanguage.bless('gemiddeld')
    }

    public override levelsDifficultyHard(): ConversationText {
        return ConversationLanguage.bless('moeilijk')
    }

    public override levelBlurb0(): ConversationText {
        return ConversationLanguage.bless('De AI bot doet het je eerst voor. Daarna ben jij aan de beurt.')
    }

    public override levelBlurb1(): ConversationText {
        return ConversationLanguage.bless('Eén verjaardag. Twee mogelijke uitkomsten.')
    }

    public override levelBlurb2(): ConversationText {
        return ConversationLanguage.bless('Drie grenswaarden tussen kalm en storm.')
    }

    public override levelBlurb3(): ConversationText {
        return ConversationLanguage.bless('Prijs en kwaliteit, tegen elkaar in.')
    }

    public override levelBlurb4(): ConversationText {
        return ConversationLanguage.bless('Een volle winkelwagen, een ledenkaart, of allebei tegelijk.')
    }

    public override levelBlurb5(): ConversationText {
        return ConversationLanguage.bless('Iedereen kent FizzBuzz. De bot niet.')
    }

    public override levelBlurb6(): ConversationText {
        return ConversationLanguage.bless('Een uitzondering op de uitzondering op de regel.')
    }

    public override levelBlurb7(): ConversationText {
        return ConversationLanguage.bless('Elke zijlengte verandert de uitkomst.')
    }

    public override levelBlurb8(): ConversationText {
        return ConversationLanguage.bless('Het fysieke scherm heeft grenzen. Vind ze allemaal.')
    }

    public override levelBlurb9(): ConversationText {
        return ConversationLanguage.bless('Gratis, vast bedrag, of per minuut. En nu?')
    }

    public override faqTitle(): ConversationText {
        return ConversationLanguage.bless('Veelgestelde vragen')
    }

    public override faqSubtitle(): ConversationText {
        return ConversationLanguage.bless('Geen verkooppraatje. Gewoon antwoorden.')
    }

    public override faqQuestion1(): ConversationText {
        return ConversationLanguage.bless('Is het echt gratis?')
    }

    public override faqAnswer1(): ConversationText {
        return ConversationLanguage.bless('Ja. Geen advertenties, geen tracking, geen betaalmuur. Gewoon een gratis spel.')
    }

    public override faqQuestion2(): ConversationText {
        return ConversationLanguage.bless('Welke programmeertalen worden ondersteund?')
    }

    public override faqAnswer2(): ConversationText {
        return ConversationLanguage.bless('JavaScript, TypeScript, Python, Java, C#, PHP en Ruby.')
    }

    public override faqQuestion3(): ConversationText {
        return ConversationLanguage.bless('Welke gesprekstalen worden ondersteund?')
    }

    public override faqAnswer3(): ConversationText {
        return ConversationLanguage.bless('Engels, Nederlands, Duits, Frans, Spaans en Italiaans.')
    }

    public override faqQuestion4(): ConversationText {
        return ConversationLanguage.bless('Moet ik iets installeren?')
    }

    public override faqAnswer4(): ConversationText {
        return ConversationLanguage.bless('Nee. Het draait volledig in je browser. Zonder externe libraries.')
    }

    public override faqQuestion5(): ConversationText {
        return ConversationLanguage.bless('Heb ik een account nodig?')
    }

    public override faqAnswer5(): ConversationText {
        return ConversationLanguage.bless('Nee. Je kunt alleen anoniem spelen.')
    }

    public override faqQuestion6(): ConversationText {
        return ConversationLanguage.bless('Welke informatie wordt opgeslagen?')
    }

    public override faqAnswer6(): ConversationText {
        return ConversationLanguage.bless('Je voortgang wordt opgeslagen in je browser. Het verlaat nooit je computer.')
    }

    public override faqQuestion7(): ConversationText {
        return ConversationLanguage.bless('Is het open source?')
    }

    public override faqAnswer7(): ConversationText {
        return ConversationLanguage.bless('Ja. De broncode is beschikbaar op GitHub.')
    }

    public override faqQuestion8(): ConversationText {
        return ConversationLanguage.bless('Wie heeft dit gemaakt?')
    }

    public override faqAnswer8(): ConversationText {
        return ConversationLanguage.bless('Dit spel is gemaakt door een informaticadocent. Uit liefde voor programmeren en testen.')
    }

    public override ctaTitle(): ConversationText {
        return ConversationLanguage.bless('De AI bot wacht op je. Laat je niet beetnemen.')
    }

    public override ctaSubtitle(): ConversationText {
        return ConversationLanguage.bless('Klik op de knop, volg de instructies, en zie wat de AI bot probeert uit te halen.')
    }

    public override ctaButton(): ConversationText {
        return ConversationLanguage.bless('Speel UnitTestGame gratis →')
    }

    public override footerContact(): ConversationText {
        return ConversationLanguage.bless('Contact')
    }
}

type LocalizedText = {
    en: string
    nl: string
}

export class Locale {
    private readonly lng: keyof LocalizedText

    public constructor(lang: string) {
        const lng = ['en', 'nl'].includes(lang) ? lang : 'en'
        this.lng = lng as keyof LocalizedText
    }

    private pick(options: LocalizedText): string {
        return options[this.lng]
    }

    public welcomeToUnittestgame(): string {
        return this.pick({
            en: 'Welcome to *UnitTestGame* where you can learn to write effective unit tests.',
            nl: 'Welkom bij *UnitTestGame* waar je leert effectieve unit testen te schrijven.',
        })
    }

    public iAmAnAiBot(): string {
        return this.pick({
            en: 'I am an AI bot specialized in *Test-Driven Development* and *Mutation Testing*.',
            nl: 'Ik ben een AI-bot gespecialiseerd in *Test-Driven Development* en *Mutation Testing*.',
        })
    }

    public about(): string {
        return this.pick({
            en: 'UnitTestGame',
            nl: 'UnitTestGame',
        })
    }

    public learnToWriteEffectiveUnitTests(): string {
        return this.pick({
            en: 'Learn to write effective unit tests using Test-Driven Development and Mutation Testing. ' +
                '[Liever Nederlands?](?lng=nl)\n' +
                '\n' +
                'This game is written by a developer who wants better software. ' +
                'Good software is at least thoroughly tested by the developers. ' +
                'Testing software is a skill and this game helps you learn just that. ' +
                '[Contact](mailto:contact@unittestgame.com) [Feedback](mailto:feedback@unittestgame.com)',
            nl: 'Leer effectieve unit testen te schrijven met Test-Driven Development en Mutation Testing. ' +
                '[Prefer English?](?lng=en)\n' +
                '\n' +
                'Deze game is geschreven door een ontwikkelaar die betere software wil. ' +
                'Goede software is op zijn minst grondig getest door de ontwikkelaars. ' +
                'Testen van software is een kunst en deze game helpt je om juist dat te leren. ' +
                '[Contact](mailto:contact@unittestgame.com) [Terugkoppeling](mailto:feedback@unittestgame.com)',
        })
    }

    public whatDoYouWantToDo(): string {
        return this.pick({
            en: 'What do you want to do?',
            nl: 'Wat wil je doen?',
        })
    }

    public level(levelNumber: number, totalNumberOfLevels: number, levelName: string, useCaseName: string, emoji: string): string {
        return this.pick({
            en: `Level ${levelNumber} of ${totalNumberOfLevels} - ${levelName} - ${useCaseName} - ${emoji}`,
            nl: `Level ${levelNumber} van ${totalNumberOfLevels} - ${levelName} - ${useCaseName} - ${emoji}`,
        })
    }

    public iWantToPlayTheNextLevel(levelDescription: string): string {
        return this.pick({
            en: `I want to play ${levelDescription}`,
            nl: `Ik wil ${levelDescription} spelen`,
        })
    }

    public iPlayedAllTheLevels(): string {
        return this.pick({
            en: 'I played all the levels',
            nl: 'Ik heb alle levels gespeeld',
        })
    }

    public wellDoneYouCanCloseThisTab(): string {
        return this.pick({
            en: 'Well done! You can close this tab now and start writing effective unit tests for your real-world projects.',
            nl: 'Goed gedaan! Je kunt deze tab nu sluiten en beginnen met het schrijven van effectieve unit testen voor je echte projecten.',
        })
    }

    public currentLevel(): string {
        return this.pick({
            en: 'Current Level',
            nl: 'Huidige Level',
        })
    }

    public unitTests(): string {
        return this.pick({
            en: 'Unit Tests',
            nl: 'Unit Testen',
        })
    }

    public youHaveNotWrittenAnyUnitTestsYet(): string {
        return this.pick({
            en: 'You have not written any unit tests yet.',
            nl: 'Je hebt nog geen unit testen geschreven.',
        })
    }

    public iWantToAddThisUnitTest(): string {
        return this.pick({
            en: 'I want to add this unit test',
            nl: 'Ik wil deze unit test toevoegen',
        })
    }

    public iWantToSubmitTheUnitTests(): string {
        return this.pick({
            en: 'I want to submit the unit tests',
            nl: 'Ik wil de unit testen inleveren',
        })
    }

    public checkingTheNewUnitTest(): string {
        return this.pick({
            en: 'Checking the new unit test',
            nl: 'De nieuwe unit test wordt gecontroleerd',
        })
    }

    public iCheckedTheNewUnitTest(): string {
        return this.pick({
            en: 'I checked the new unit test',
            nl: 'Ik heb de nieuwe unit test gecontroleerd',
        })
    }

    public checkingTheUnitTests(): string {
        return this.pick({
            en: 'Checking the unit tests',
            nl: 'De unit testen worden gecontroleerd',
        })
    }

    public iCheckedTheUnitTests(): string {
        return this.pick({
            en: 'I checked the unit tests',
            nl: 'Ik heb de unit testen gecontroleerd',
        })
    }

    public iDidNotAddTheUnitTest(): string {
        return this.pick({
            en: 'I did NOT add the unit test, because it is NOT correct.',
            nl: 'Ik heb de unit test NIET toegevoegd, omdat deze NIET correct is.',
        })
    }

    public wellDone(): string {
        return this.pick({
            en: 'Well done!',
            nl: 'Goed gedaan!',
        })
    }

    public testDrivenDevelopment(): string {
        return this.pick({
            en: 'Test-Driven Development',
            nl: 'Test-Driven Development',
        })
    }

    public definitionTDD(): string {
        return this.pick({
            en: 'Write a unit test that does NOT pass, then write just enough code to make the unit test pass. Repeat until the code is according to the specification. [Read more](https://en.wikipedia.org/wiki/Test-driven_development)',
            nl: 'Schrijf een unit test die niet slaagt, schrijf dan net genoeg code om de unit test te laten slagen. Herhaal dit totdat de code aan de specificatie voldoet. [Lees meer](https://nl.wikipedia.org/wiki/Test-driven_development)',
        })
    }

    public step1TDD(): string {
        return this.pick({
            en: 'You read the *Specification* and write *Unit Tests* that do NOT pass the *Current Function*.',
            nl: 'Je leest de *Specificatie* en schrijft *Unit Testen* die niet slagen voor de *Huidige Functie*.',
        })
    }


    public step2TDD(): string {
        return this.pick({
            en: 'After adding a unit test I (the AI bot) rewrite the *Current Function* such that the *Unit Tests* pass.',
            nl: 'Na het toevoegen van een unit test herschrijf ik (de AI-bot) de *Huidige Functie* zodat de *Unit Testen* slagen.',
        })
    }

    public step3TDD(): string {
        return this.pick({
            en: 'When you think the *Current Function* is according to the *Specification*, you submit the *Unit Tests*.',
            nl: 'Wanneer je denkt dat de *Huidige Functie* aan de *Specificatie* voldoet, dien je de *Unit Testen* in.',
        })
    }

    public specification(): string {
        return this.pick({
            en: 'Specification',
            nl: 'Specificatie',
        })
    }

    public currentFunction(): string {
        return this.pick({
            en: 'Current Function',
            nl: 'Huidige Functie',
        })
    }

    public diffFunction(): string {
        return this.pick({
            en: 'Comparison (with the previous function)',
            nl: 'Vergelijking (met de vorige functie)',
        })
    }

    public noPreviousFunction(): string {
        return this.pick({
            en: 'Above is the first function that I wrote',
            nl: 'Hierboven staat de eerste functie die ik schreef',
        })
    }

    public iAddedTheUnitTestButTheCurrentFunctionAlreadyPassedThisUnitTest(): string {
        return this.pick({
            en: 'I added the unit test to the *Unit Tests*, but the *Current Function* already passed this unit test, so I did NOT improve the *Current Function*.',
            nl: 'Ik heb de unit test toegevoegd aan de *Unit Testen*, maar de *Huidige Functie* slaagde al voor deze unit test, dus ik heb de *Huidige Functie* NIET verbeterd.',
            })
    }

    public tryToWriteUnitTestsThatDoNotPass(): string {
        return this.pick({
            en: 'Try to write unit tests that do NOT pass for the *Current Function*.',
            nl: 'Probeer unit testen te schrijven die niet slagen voor de *Huidige Functie*.',
            })
    }

    public iAddedTheUnitTestAnd(): string {
        return this.pick({
            en: 'I added the unit test to the *Unit Tests* and I improved the *Current Function* such that the new unit test passes.',
            nl: 'Ik heb de unit test toegevoegd aan de *Unit Testen* en ik heb de *Huidige Functie* zo verbeterd dat de nieuwe unit test slaagt.',
        })
    }

    public theCurrentFunctionIsNotAccordingToTheSpecification(): string {
        return this.pick({
            en: 'The *Current Function* is NOT according to the *Specification*.',
            nl: 'De *Huidige Functie* voldoet NIET aan de *Specificatie*.',
        })
    }

    public itProducesTheFollowingIncorrectResult(): string {
        return this.pick({
            en: 'It produces the following incorrect result.',
            nl: 'Het produceert de volgende onjuiste uitkomst.',
        })
    }

    public tryToWriteAUnitTestThatIsAccordingToTheSpecification(numberOfUnitTestsStillNeeded: number): string {
        return this.pick({
            en: `Try to write a unit test that is according to the *Specification* and does NOT pass for the *Current Function*. I think you need at least ${numberOfUnitTestsStillNeeded} more ${numberOfUnitTestsStillNeeded === 1 ? 'unit test' : 'unit tests'} to make the *Current Function* according to the *Specification*.`,
            nl: `Probeer een unit test te schrijven die aan de *Specificatie* voldoet en niet slaagt voor de *Huidige Functie*. Ik denk dat je nog minstens ${numberOfUnitTestsStillNeeded} meer ${numberOfUnitTestsStillNeeded === 1 ? 'unit test' : 'unit testen'} nodig hebt om de *Huidige Functie* volgens de *Specificatie* te maken.`,
        })
    }
    public theCurrentFunctionIsIndeedAccordingToTheSpecification(): string {
        return this.pick({
            en: 'The *Current Function* is indeed according to the *Specification*.',
            nl: 'De *Huidige Functie* voldoet inderdaad aan de *Specificatie*.',
        })
    }

    public mutationTesting(): string {
        return this.pick({
            en: 'Mutation Testing',
            nl: 'Mutation Testing',
        })
    }

    public definitionMT(): string {
        return this.pick({
            en: 'Each mutation of a fully tested function should make at least one unit test NOT pass. Mutations are simplifications of the code, e.g. by replacing "n % 4 === 0" with "n === 4". [Read more](https://en.wikipedia.org/wiki/Mutation_testing)',
            nl: 'Elke mutatie van een volledig geteste functie zou ten minste één unit test niet moeten slagen. Mutaties zijn vereenvoudigingen van de code, bijvoorbeeld door "n % 4 === 0" te vervangen door "n === 4". [Lees meer](https://en.wikipedia.org/wiki/Mutation_testing)',
        })
    }

    public step1MT(): string {
        return this.pick({
            en: 'You read *The Function* and write *Unit Tests* that pass.',
            nl: 'Je leest *De Functie* en schrijft *Unit Testen* die slagen.',
        })
    }

    public step2MT(): string {
        return this.pick({
            en: 'After adding a unit test, I show which lines of *The Function* are tested.',
            nl: 'Na het toevoegen van een unit test, laat ik zien welke regels van *De Functie* zijn getest.',
        })
    }

    public step3MT(): string {
        return this.pick({
            en: 'When you think *The Function* is fully tested, you submit the *Unit Tests*.',
            nl: 'Wanneer je denkt dat *De Functie* volledig getest is, dien je de *Unit Testen* in.',
        })
    }

    public theFunction(): string {
        return this.pick({
            en: 'The Function',
            nl: 'De Functie',
        })
    }

    public finishedLevels(): string {
        return this.pick({
            en: 'Finished levels',
            nl: 'Voltooide levels',
        })
    }

    public iAddedTheUnitTestButNoExtraLinesOfTheFunctionAreTested(): string {
        return this.pick({
            en: 'I added the unit test to the *Unit Tests*, but NO extra lines of *The Function* are tested.',
            nl: 'Ik heb de unit test toegevoegd aan de *Unit Testen*, maar er zijn NIET meer regels van *De Functie* getest.',
        })
    }

    public tryToWriteUnitTestsThatTestSomeCode(): string {
        return this.pick({
            en: 'Try to write unit tests that test some code that is not yet tested by other unit tests.',
            nl: 'Probeer unit testen te schrijven die wat code testen die nog niet door andere unit testen wordt getest.',
        })
    }

    public iAddedTheUnitTestAndIShowedWhichLines(): string {
        return this.pick({
            en: 'I added the unit test to the *Unit Tests* and I showed which lines of *The Function* are tested.',
            nl: 'Ik heb de unit test toegevoegd aan de *Unit Testen* en ik heb laten zien welke regels in *De Functie* zijn getest.',
        })
    }

    public theFunctionIsNotFullyTested(): string {
        return this.pick({
            en: 'The *Function* is NOT fully tested.',
            nl: 'De *Functie* is NIET volledig getest.',
        })
    }

    public aMutationOfTheFunction(): string {
        return this.pick({
            en: 'A mutation of *The Function* that is NOT correct, but still makes your unit tests pass, is the following.',
            nl: 'Een mutatie van *De Functie* die NIET correct is, maar nog steeds je unit testen laat slagen, is de volgende.',
        })
    }

    public tryToWriteAUnitTestThatPasses(numberOfUnitTestsStillNeeded: number): string {
        return this.pick({
            en: `Try to write a unit test that passes *The Function* and does NOT pass for this mutation. I think you need at least ${numberOfUnitTestsStillNeeded} more ${numberOfUnitTestsStillNeeded === 1 ? 'unit test' : 'unit tests'} to fully test *The Function*.`,
            nl: `Probeer een unit test te schrijven die slaagt voor *De Functie* en niet slaagt voor deze mutatie. Ik denk dat je nog minstens ${numberOfUnitTestsStillNeeded} meer ${numberOfUnitTestsStillNeeded === 1 ? 'unit test' : 'unit testen'} nodig hebt om *De Functie* volledig te testen.`,
        })
    }

    public theFunctionIsIndeedFullyTested(): string {
        return this.pick({
            en: 'The *Function* is indeed fully tested.',
            nl: 'De *Functie* is inderdaad volledig getest.',
        })
    }

    public aSmartphoneNormallyOperatesInNormalMode(): string {
        return this.pick({
            en: 'A smartphone normally operates in Normal Mode, but when the battery level is less than 20%, it operates in Low Power Mode.',
            nl: 'Een smartphone werkt normaal in Normal Mode, maar wanneer het batterijpercentage minder dan 20% is, werkt hij in Low Power Mode.',
        })
    }

    public inThisExampleYouOnlyHaveToClickTheGreenButton(): string {
        return this.pick({
            en: 'In this example you only have to click the green button.',
            nl: 'In dit voorbeeld hoef je alleen maar op de groene knop te klikken.',
        })
    }

    public meanwhileKeepAnEyeOnTheYellowMarkedChangesInTheSidebar(): string {
        return this.pick({
            en: 'Meanwhile, keep an eye on the yellow marked changes in the sidebar.',
            nl: 'Houd ondertussen de geel gemarkeerde wijzigingen in de zijbalk in de gaten.',
        })
    }

    public theSpecificationContainsTheNumber20(): string {
        return this.pick({
            en: 'The *Specification* contains the number 20. That is a good starting point for a unit test. When the battery level is 20%, the function should return Normal Mode.',
            nl: 'De *Specificatie* bevat het getal 20. Dat is een goed startpunt voor een unit test. Wanneer het batterijpercentage 20% is, zou de functie Normal Mode terug moeten geven.',
        })
    }

    public theCurrentFunctionNowAlwaysReturnsNormalMode(): string {
        return this.pick({
            en: 'The *Current Function* now always returns Normal Mode. The *Specification* says that when the battery level is less than 20%, the function should return Low Power Mode. So, add a unit test for a battery level less than 20%, say 19%.',
            nl: 'De *Huidige Functie* geeft nu altijd Normal Mode terug. De *Specificatie* zegt dat wanneer het batterijpercentage minder dan 20% is, de functie Low Power Mode terug zou moeten geven. Voeg dus een unit test toe voor een batterijpercentage van minder dan 20%, bijvoorbeeld 19%.',
        })
    }

    public theCurrentFunctionNowSometimesReturnsNormalModeAndSometimesLowPowerMode(): string {
        return this.pick({
            en: 'The *Current Function* now sometimes returns Normal Mode and sometimes Low Power Mode. Submit the unit tests to see if the *Current Function* is according to the *Specification*.',
            nl: 'De *Huidige Functie* geeft nu soms Normal Mode terug en soms Low Power Mode. Dien de unit testen in om te zien of de *Huidige Functie* aan de *Specificatie* voldoet.',
        })
    }

    public theCurrentFunctionNowReturnsNormalModeOnlyForBatteryLevel20Percent(): string {
        return this.pick({
            en: 'The *Current Function* now returns Normal Mode only for battery level 20%. Add a unit test for another battery level, say 21%, because the *Specification* says it should return Normal Mode for battery level 21% as well.',
            nl: 'De *Huidige Functie* geeft nu alleen Normal Mode terug voor een batterijpercentage van 20%. Voeg een unit test toe voor een ander batterijpercentage, bijvoorbeeld 21%, omdat de *Specificatie* zegt dat het ook Normal Mode terug zou moeten geven voor een batterijpercentage van 21%.',
        })
    }

    public submitTheUnitTestsAgainToSeeIfTheCurrentFunctionIsAccordingToTheSpecification(): string {
        return this.pick({
            en: 'Submit the unit tests again to see if the *Current Function* is according to the *Specification*.',
            nl: 'Dien de unit testen opnieuw in om te zien of de *Huidige Functie* aan de *Specificatie* voldoet.',
        })
    }

    public theCurrentFunctionNowReturnsLowPowerModeOnlyForBatteryLevel19Percent(): string {
        return this.pick({
            en: 'The *Current Function* now returns Low Power Mode only for battery level 19%. Add a unit test for another battery level, say 18%, because the *Specification* says it should return Low Power Mode for battery level 18% as well.',
            nl: 'De *Huidige Functie* geeft nu alleen Low Power Mode terug voor een batterijpercentage van 19%. Voeg een unit test toe voor een ander batterijpercentage, bijvoorbeeld 18%, omdat de *Specificatie* zegt dat het ook Low Power Mode terug zou moeten geven voor een batterijpercentage van 18%.',
        })
    }

    public submitTheUnitTestsAgainToSeeIfTheCurrentFunctionIsFinallyAccordingToTheSpecification(): string {
        return this.pick({
            en: 'Submit the unit tests again to see if the *Current Function* is finally according to the *Specification*.',
            nl: 'Dien de unit testen opnieuw in om te zien of de *Huidige Functie* eindelijk aan de *Specificatie* voldoet.',
        })
    }

    public congratulationsNowYouUnderstandTheBasicsOfTestDrivenDevelopment(): string {
        return this.pick({
            en: 'Congratulations, now you understand the basics of Test-Driven Development.',
            nl: 'Gefeliciteerd, nu begrijp je de basis van Test-Driven Development.',
        })
    }

    public theFunctionContainsTheNumber20(): string {
        return this.pick({
            en: '*The Function* contains the number 20. That is a good starting point for a unit test. When the battery level is 20%, the function returns Normal Mode.',
            nl: '*De Functie* bevat het getal 20. Dat is een goed startpunt voor een unit test. Wanneer het batterijpercentage 20% is, geeft de functie Normal Mode terug.',
        })
    }

    public theFunctionDoesNotAlwaysReturnNormalMode(): string {
        return this.pick({
            en: '*The Function* does NOT always return Normal Mode. When the battery level is less than 20%, the function returns Low Power Mode. So, add a unit test for a battery level less than 20%, say 19%.',
            nl: '*De Functie* geeft niet altijd Normal Mode terug. Wanneer het batterijpercentage minder dan 20% is, geeft de functie Low Power Mode terug. Voeg dus een unit test toe voor een batterijpercentage van minder dan 20%, bijvoorbeeld 19%.',
        })
    }

    public allLinesInTheFunctionAreTestedNow(): string {
        return this.pick({
            en: 'All lines in *The Function* are tested now. Submit the unit tests to see if *The Function* is fully tested.',
            nl: 'Alle regels in *De Functie* zijn nu getest. Dien de unit testen in om te zien of *De Functie* volledig getest is.',
        })
    }

    public thisMutationOnlyReturnsNormalModeIfTheBatteryLevelIsExactly20Percent(): string {
        return this.pick({
            en: 'This mutation only returns Normal Mode if the battery level is exactly 20%. Add a unit test for another battery level *The Function* returns Normal Mode for, say 21%.',
            nl: 'Deze mutatie geeft alleen Normal Mode terug als het batterijpercentage precies 20% is. Voeg een unit test toe voor een ander batterijpercentage waarvoor *De Functie* Normal Mode terug geeft, bijvoorbeeld 21%.',
        })
    }

    public submitTheUnitTestsAgainToSeeIfTheFunctionIsFullyTestedNow(): string {
        return this.pick({
            en: 'Submit the unit tests again to see if *The Function* is fully tested now.',
            nl: 'Dien de unit testen opnieuw in om te zien of *De Functie* nu volledig getest is.',
        })
    }

    public thisMutationOnlyReturnsLowPowerModeIfTheBatteryLevelIsExactly19Percent(): string {
        return this.pick({
            en: 'This mutation only returns Low Power Mode if the battery level is exactly 19%. Add a unit test for another battery level *The Function* returns Low Power Mode for, say 18%.',
            nl: 'Deze mutatie geeft alleen Low Power Mode terug als het batterijpercentage precies 19% is. Voeg een unit test toe voor een ander batterijpercentage waarvoor *De Functie* Low Power Mode terug geeft, bijvoorbeeld 18%.',
        })
    }

    public submitTheUnitTestsAgainToSeeIfTheFunctionIsFinallyFullyTestedNow(): string {
        return this.pick({
            en: 'Submit the unit tests again to see if *The Function* is finally fully tested.',
            nl: 'Dien de unit testen opnieuw in om te zien of *De Functie* eindelijk volledig getest is.',
        })
    }

    public congratulationsNowYouUnderstandTheBasicsOfMutationTesting(): string {
        return this.pick({
            en: 'Congratulations, now you understand the basics of Mutation Testing.',
            nl: 'Gefeliciteerd, nu begrijp je de basis van Mutation Testing.',
        })
    }

    public returnTrueIfTheNumberIsEvenAndFalseIfItIsOdd(): string {
        return this.pick({
            en: 'Return true if the number is even and false if it is odd.',
            nl: 'Geef true terug als het getal even is en false als het oneven is.',
        })
    }

    public returnFizzIfTheNumberIsDivisibleBy3(): string {
        return this.pick({
            en: 'Return "Fizz" if the number is divisible by 3, "Buzz" if the number is divisible by 5, "FizzBuzz" if the number is divisible by both 3 and 5, and a string containing the number otherwise.',
            nl: 'Geef "Fizz" terug als het getal deelbaar is door 3, "Buzz" als het getal deelbaar is door 5, "FizzBuzz" als het getal deelbaar is door zowel 3 als 5, en een string die het getal anders bevat.',
        })
    }

    public returnTrueIfTheTextRepresentsAFloatAndFalseIfItDoesnt(): string {
        return this.pick({
            en: 'Return true if the text represents a float and returns false if it doesn\'t. A float may start with a plus or a minus sign. This is followed by one or more digits. If that is followed by a dot, then one or more digits follow.',
            nl: 'Geef true terug als de tekst een gebroken getal voorstelt en return false als dat niet zo is. Een gebroken getal kan beginnen met een plus- of minteken. Hierna volgen één of meer cijfers. Als dit wordt gevolgd door een punt, dan volgen één of meer cijfers.',
        })
    }

    public returnTrueIfTheYearIsALeapYearAndFalseIfItIsNot(): string {
        return this.pick({
            en: 'Return true if the year is a leap year and false if the year is NOT a leap year. A year is a leap year if it is divisible by 4. The exception is that years that are divisible by 100 are NOT leap years, unless they are also divisible by 400.',
            nl: 'Geef true terug als het jaar een schrikkeljaar is en false als het jaar geen schrikkeljaar is. Een jaar is een schrikkeljaar als het deelbaar is door 4. De uitzondering is dat jaren die deelbaar zijn door 100 geen schrikkeljaren zijn, tenzij ze ook deelbaar zijn door 400.',
        })
    }

    public returnTrueIfThePasswordIsStrongAndFalseIfItIsNot(): string {
        return this.pick({
            en: 'Return true if the password is strong and false if the password is NOT strong. A password is strong if it contains at least 5 characters, an uppercase letter, a lowercase letter and a special character ("#" or "@").',
            nl: 'Geef true terug als het wachtwoord sterk is en false als het wachtwoord niet sterk is. Een wachtwoord is sterk als het ten minste 5 tekens bevat, een hoofdletter, een kleine letter en een speciaal teken ("#" of "@").',
        })
    }

    public theFunctionReceivesTheSpeedInKilometersPerHourWithAtMostOneDecimal(): string {
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
            en: 'The function receives the speed in kilometers per hour with at most one decimal. If possible, show one decimal (e.g. 13 displays "13.0"). Otherwise, round to an integer (e.g. 87.6 displays "88"). Instead of "0.0" display "START". If the speed no longer fits on the display, then display "DANGER" (e.g. 300 displays "DANGER").\nThe display looks like this, where every X is a LED light:\n' + display,
            nl: 'De functie ontvangt de snelheid in kilometers per uur met maximaal één decimaal. Indien mogelijk, toon één decimaal (bijv. 13 toont "13.0"). Rond anders af op een geheel getal (bijv. 87.6 toont "88"). In plaats van "0.0" toon "START". Als de snelheid niet meer op het scherm past, toon dan "DANGER" (bijv. 300 toont "DANGER").\nHet scherm ziet er zo uit, waarbij elke X een LED-lampje is:\n' + display,
        })
    }

    public returnTheTypeOfTheTriangle(): string {
        return this.pick({
            en: 'Return the type of the triangle: equilateral, isosceles or scalene. A triangle is equilateral if all three sides have the same length. A triangle is isosceles if two sides have the same length and a third side has a different length. A triangle is scalene if all three sides have different lengths.',
            nl: 'Geef het type van de driehoek terug: gelijkzijdig, gelijkbenig of ongelijkzijdig. Een driehoek is gelijkzijdig als alle drie de zijden even lang zijn. Een driehoek is gelijkbenig als twee zijden even lang zijn en een derde zijde een andere lengte heeft. Een driehoek is ongelijkzijdig als alle drie de zijden verschillende lengtes hebben.',
        })
    }

    public returnTrueIfTheAgeIs18YearsOrOverAndFalseIfTheAgeIsUnder18(): string {
        return this.pick({
            en: 'Return true if the age is 18 years or over and return false if the age is under 18.',
            nl: 'Geef true terug als de leeftijd 18 jaar of ouder is en geef false terug als de leeftijd onder de 18 is.',
        })
    }

    public returnGoodIfThePriceIsGoodAndTheQualityIsGood(): string {
        return this.pick({
            en: 'Return "Good" if the price is less than 20 and the quality is at least 7. Return "Bad" if the price is 20 or more and the quality is less than 7. In all other cases return "Ok".',
            nl: 'Geef "Goed" terug als de prijs minder dan 20 is en de kwaliteit ten minste 7 is. Geef "Slecht" terug als de prijs 20 of meer is en de kwaliteit minder dan 7 is. Geef in alle andere gevallen "Ok" terug.',
        })
    }

    public or(): string {
        return this.pick({
            en: 'OR',
            nl: 'OF',
        })
    }
}

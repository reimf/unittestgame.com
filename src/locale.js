export class Locale {
    lng;
    constructor(lang) {
        const lng = ['en', 'nl'].includes(lang) ? lang : 'en';
        this.lng = lng;
    }
    pick(localisedText) {
        return localisedText[this.lng];
    }
    welcomeToUnittestgame() {
        return this.pick({
            en: 'Welcome to *UnitTestGame* where you can learn to write effective unit tests.',
            nl: 'Welkom bij *UnitTestGame* waar je leert effectieve unit testen te schrijven.',
        });
    }
    iAmAnAiBot() {
        return this.pick({
            en: 'I am an AI bot specialised in *Test-Driven Development* and *Mutation Testing*.',
            nl: 'Ik ben een AI-bot gespecialiseerd in *Test-Driven Development* en *Mutation Testing*.',
        });
    }
    about() {
        return this.pick({
            en: 'UnitTestGame',
            nl: 'UnitTestGame',
        });
    }
    learnToWriteEffectiveUnitTests() {
        return this.pick({
            en: 'Learn to write effective unit tests using Test-Driven Development and Mutation Testing. ' +
                '\n' +
                '[Liever Nederlands?](?lng=nl)\n' +
                '\n' +
                'This game is written by a developer who wants better software. ' +
                'Good software is at least thoroughly tested by the developers. ' +
                'Testing software is a skill and this game helps you learn just that. ' +
                '[Contact](mailto:contact@unittestgame.com) [Feedback](mailto:feedback@unittestgame.com)',
            nl: 'Leer effectieve unit testen te schrijven met Test-Driven Development en Mutation Testing. ' +
                '\n' +
                '[Prefer English?](?lng=en)\n' +
                '\n' +
                'Deze game is geschreven door een ontwikkelaar die betere software wil. ' +
                'Goede software is op zijn minst grondig getest door de ontwikkelaars. ' +
                'Testen van software is een kunst en deze game helpt je om juist dat te leren. ' +
                '[Contact](mailto:contact@unittestgame.com) [Terugkoppeling](mailto:feedback@unittestgame.com)',
        });
    }
    whatDoYouWantToDo() {
        return this.pick({
            en: 'What do you want to do?',
            nl: 'Wat wil je doen?',
        });
    }
    level(levelNumber, totalNumberOfLevels, levelName, useCaseName, emoji) {
        return this.pick({
            en: `Level ${levelNumber} of ${totalNumberOfLevels} - ${useCaseName} - ${levelName} - ${emoji}`,
            nl: `Level ${levelNumber} van ${totalNumberOfLevels} - ${useCaseName} - ${levelName} - ${emoji}`,
        });
    }
    iWantToPlayTheNextLevel(levelDescription) {
        return this.pick({
            en: `I want to play ${levelDescription}`,
            nl: `Ik wil ${levelDescription} spelen`,
        });
    }
    iPlayedAllTheLevels() {
        return this.pick({
            en: 'I played all the levels',
            nl: 'Ik heb alle levels gespeeld',
        });
    }
    wellDoneYouCanCloseThisTab() {
        return this.pick({
            en: 'Well done! You can close this tab now and start writing effective unit tests for your real-world projects.',
            nl: 'Goed gedaan! Je kunt deze tab nu sluiten en beginnen met het schrijven van effectieve unit testen voor je echte projecten.',
        });
    }
    currentLevel() {
        return this.pick({
            en: 'Current Level',
            nl: 'Huidige Level',
        });
    }
    unitTests() {
        return this.pick({
            en: 'Unit Tests',
            nl: 'Unit Testen',
        });
    }
    youHaveNotWrittenAnyUnitTestsYet() {
        return this.pick({
            en: 'You have not written any unit tests yet.',
            nl: 'Je hebt nog geen unit testen geschreven.',
        });
    }
    iWantToAddThisUnitTest() {
        return this.pick({
            en: 'I want to add this unit test',
            nl: 'Ik wil deze unit test toevoegen',
        });
    }
    iWantToSubmitTheUnitTests() {
        return this.pick({
            en: 'I want to submit the unit tests',
            nl: 'Ik wil de unit testen inleveren',
        });
    }
    checkingTheNewUnitTest() {
        return this.pick({
            en: 'Checking the new unit test',
            nl: 'De nieuwe unit test wordt gecontroleerd',
        });
    }
    iCheckedTheNewUnitTest() {
        return this.pick({
            en: 'I checked the new unit test',
            nl: 'Ik heb de nieuwe unit test gecontroleerd',
        });
    }
    checkingTheUnitTests() {
        return this.pick({
            en: 'Checking the unit tests',
            nl: 'De unit testen worden gecontroleerd',
        });
    }
    iCheckedTheUnitTests() {
        return this.pick({
            en: 'I checked the unit tests',
            nl: 'Ik heb de unit testen gecontroleerd',
        });
    }
    iDidNotAddTheUnitTest() {
        return this.pick({
            en: 'I did NOT add the unit test, because it is NOT correct.',
            nl: 'Ik heb de unit test NIET toegevoegd, omdat deze NIET correct is.',
        });
    }
    wellDone() {
        return this.pick({
            en: 'Well done!',
            nl: 'Goed gedaan!',
        });
    }
    testDrivenDevelopment() {
        return this.pick({
            en: 'Test-Driven Development',
            nl: 'Test-Driven Development',
        });
    }
    definitionTDD() {
        return this.pick({
            en: 'Write a unit test that does NOT pass, then write just enough code to make the unit test pass. Repeat until the code is according to the specification. [Read more](https://en.wikipedia.org/wiki/Test-driven_development)',
            nl: 'Schrijf een unit test die niet slaagt, schrijf dan net genoeg code om de unit test te laten slagen. Herhaal dit totdat de code aan de specificatie voldoet. [Lees meer](https://nl.wikipedia.org/wiki/Test-driven_development)',
        });
    }
    step1TDD() {
        return this.pick({
            en: 'First, you read the *Specification* and then you write *Unit Tests* that do NOT pass the *Current Function*.',
            nl: 'Eerst lees je de *Specificatie* en daarna schrijf je *Unit Testen* die niet slagen voor de *Huidige Functie*.',
        });
    }
    step2TDD() {
        return this.pick({
            en: 'After adding a unit test I (the AI bot) improve the *Current Function* such that the *Unit Tests* pass.',
            nl: 'Na het toevoegen van een unit test verbeter ik (de AI-bot) de *Huidige Functie* zodat de *Unit Testen* slagen.',
        });
    }
    step3TDD() {
        return this.pick({
            en: 'When you think the *Current Function* is according to the *Specification*, you submit the *Unit Tests*.',
            nl: 'Wanneer je denkt dat de *Huidige Functie* aan de *Specificatie* voldoet, lever je de *Unit Testen* in.',
        });
    }
    specification() {
        return this.pick({
            en: 'Specification',
            nl: 'Specificatie',
        });
    }
    currentFunction() {
        return this.pick({
            en: 'Current Function',
            nl: 'Huidige Functie',
        });
    }
    diffFunction() {
        return this.pick({
            en: 'Difference (from the previous function)',
            nl: 'Verschil (met de vorige functie)',
        });
    }
    noPreviousFunction() {
        return this.pick({
            en: 'Above is the first function that I wrote',
            nl: 'Hierboven staat de eerste functie die ik schreef',
        });
    }
    iAddedTheUnitTestButTheCurrentFunctionAlreadyPassedThisUnitTest() {
        return this.pick({
            en: 'I added the unit test to the *Unit Tests*, but the *Current Function* already passed this unit test, so I did NOT improve the *Current Function*.',
            nl: 'Ik heb de unit test toegevoegd aan de *Unit Testen*, maar de *Huidige Functie* slaagde al voor deze unit test, dus ik heb de *Huidige Functie* NIET verbeterd.',
        });
    }
    tryToWriteUnitTestsThatDoNotPass() {
        return this.pick({
            en: 'Try to write unit tests that do NOT pass for the *Current Function*.',
            nl: 'Probeer unit testen te schrijven die niet slagen voor de *Huidige Functie*.',
        });
    }
    iAddedTheUnitTestAnd() {
        return this.pick({
            en: 'I added the unit test to the *Unit Tests* and I improved the *Current Function* such that the new unit test passes.',
            nl: 'Ik heb de unit test toegevoegd aan de *Unit Testen* en ik heb de *Huidige Functie* zo verbeterd dat de nieuwe unit test slaagt.',
        });
    }
    theCurrentFunctionIsNotAccordingToTheSpecification() {
        return this.pick({
            en: 'The *Current Function* is NOT according to the *Specification*.',
            nl: 'De *Huidige Functie* voldoet NIET aan de *Specificatie*.',
        });
    }
    itProducesTheFollowingIncorrectResult() {
        return this.pick({
            en: 'It produces the following incorrect result.',
            nl: 'Het produceert de volgende onjuiste uitkomst.',
        });
    }
    tryToWriteAUnitTestThatIsAccordingToTheSpecification(numberOfUnitTestsStillNeeded) {
        return this.pick({
            en: `Try to write a unit test that is according to the *Specification* and does NOT pass for the *Current Function*. I think you need at least ${numberOfUnitTestsStillNeeded} more ${numberOfUnitTestsStillNeeded === 1 ? 'unit test' : 'unit tests'} to make the *Current Function* according to the *Specification*.`,
            nl: `Probeer een unit test te schrijven die aan de *Specificatie* voldoet en niet slaagt voor de *Huidige Functie*. Ik denk dat je nog minstens ${numberOfUnitTestsStillNeeded} meer ${numberOfUnitTestsStillNeeded === 1 ? 'unit test' : 'unit testen'} nodig hebt om de *Huidige Functie* volgens de *Specificatie* te maken.`,
        });
    }
    theCurrentFunctionIsIndeedAccordingToTheSpecification() {
        return this.pick({
            en: 'The *Current Function* is indeed according to the *Specification*.',
            nl: 'De *Huidige Functie* voldoet inderdaad aan de *Specificatie*.',
        });
    }
    mutationTesting() {
        return this.pick({
            en: 'Mutation Testing',
            nl: 'Mutation Testing',
        });
    }
    definitionMT() {
        return this.pick({
            en: 'Each mutation of a fully tested function should make at least one unit test NOT pass. Mutations are small changes of the code, e.g. by replacing "n % 4 === 0" with "n === 4". [Read more](https://en.wikipedia.org/wiki/Mutation_testing)',
            nl: 'Elke mutatie van een volledig geteste functie zou ten minste één unit test niet moeten slagen. Mutaties zijn kleine veranderingen van de code, bijvoorbeeld door "n % 4 === 0" te vervangen door "n === 4". [Lees meer](https://en.wikipedia.org/wiki/Mutation_testing)',
        });
    }
    step1MT() {
        return this.pick({
            en: 'You read *The Function* and write *Unit Tests* that pass.',
            nl: 'Je leest *De Functie* en schrijft *Unit Testen* die slagen.',
        });
    }
    step2MT() {
        return this.pick({
            en: 'After adding a unit test, I show which lines of *The Function* are tested.',
            nl: 'Na het toevoegen van een unit test, laat ik zien welke regels van *De Functie* zijn getest.',
        });
    }
    step3MT() {
        return this.pick({
            en: 'When you think *The Function* is fully tested, you submit the *Unit Tests*.',
            nl: 'Wanneer je denkt dat *De Functie* volledig getest is, lever je de *Unit Testen* in.',
        });
    }
    theFunction() {
        return this.pick({
            en: 'The Function',
            nl: 'De Functie',
        });
    }
    finishedLevels() {
        return this.pick({
            en: 'Finished levels',
            nl: 'Gespeelde levels',
        });
    }
    iAddedTheUnitTestButNoExtraLinesOfTheFunctionAreTested() {
        return this.pick({
            en: 'I added the unit test to the *Unit Tests*, but NO extra lines of *The Function* are tested.',
            nl: 'Ik heb de unit test toegevoegd aan de *Unit Testen*, maar er zijn NIET meer regels van *De Functie* getest.',
        });
    }
    tryToWriteUnitTestsThatTestSomeCode() {
        return this.pick({
            en: 'Try to write unit tests that test some code that is not yet tested by other unit tests.',
            nl: 'Probeer unit testen te schrijven die wat code testen die nog niet door andere unit testen wordt getest.',
        });
    }
    iAddedTheUnitTestAndIShowedWhichLines() {
        return this.pick({
            en: 'I added the unit test to the *Unit Tests* and I showed which lines of *The Function* are tested.',
            nl: 'Ik heb de unit test toegevoegd aan de *Unit Testen* en ik heb laten zien welke regels in *De Functie* zijn getest.',
        });
    }
    theFunctionIsNotFullyTested() {
        return this.pick({
            en: 'The *Function* is NOT fully tested.',
            nl: 'De *Functie* is NIET volledig getest.',
        });
    }
    aMutationOfTheFunction() {
        return this.pick({
            en: 'A mutation of *The Function* that is NOT correct, but still makes your unit tests pass, is the following.',
            nl: 'Een mutatie van *De Functie* die NIET correct is, maar nog steeds je unit testen laat slagen, is de volgende.',
        });
    }
    tryToWriteAUnitTestThatPasses(numberOfUnitTestsStillNeeded) {
        return this.pick({
            en: `Try to write a unit test that passes *The Function* and does NOT pass for this mutation. I think you need at least ${numberOfUnitTestsStillNeeded} more ${numberOfUnitTestsStillNeeded === 1 ? 'unit test' : 'unit tests'} to fully test *The Function*.`,
            nl: `Probeer een unit test te schrijven die slaagt voor *De Functie* en niet slaagt voor deze mutatie. Ik denk dat je nog minstens ${numberOfUnitTestsStillNeeded} meer ${numberOfUnitTestsStillNeeded === 1 ? 'unit test' : 'unit testen'} nodig hebt om *De Functie* volledig te testen.`,
        });
    }
    theFunctionIsIndeedFullyTested() {
        return this.pick({
            en: 'The *Function* is indeed fully tested.',
            nl: 'De *Functie* is inderdaad volledig getest.',
        });
    }
    aSmartphoneNormallyOperatesInNormalMode() {
        return this.pick({
            en: 'A smartphone normally operates in Normal Mode, but when the battery level is less than 20%, it operates in Low Power Mode.',
            nl: 'Een smartphone werkt normaal in Normal Mode, maar wanneer het batterijpercentage minder dan 20% is, werkt hij in Low Power Mode.',
        });
    }
    inThisExampleYouOnlyHaveToClickTheGreenButton() {
        return this.pick({
            en: 'In this example you only have to click the green button.',
            nl: 'In dit voorbeeld hoef je alleen maar op de groene knop te klikken.',
        });
    }
    meanwhileKeepAnEyeOnTheChangesInTheSidebar() {
        return this.pick({
            en: 'Meanwhile, keep an eye on the changes in the sidebar.',
            nl: 'Houd ondertussen de wijzigingen in de zijbalk in de gaten.',
        });
    }
    theSpecificationContainsTheNumber20() {
        return this.pick({
            en: 'The *Specification* contains the number 20. That is a good starting point for a unit test. When the battery level is 20%, the function should return Normal Mode.',
            nl: 'De *Specificatie* bevat het getal 20. Dat is een goed startpunt voor een unit test. Wanneer het batterijpercentage 20% is, zou de functie Normal Mode terug moeten geven.',
        });
    }
    theCurrentFunctionNowAlwaysReturnsNormalMode() {
        return this.pick({
            en: 'The *Current Function* now always returns Normal Mode. The *Specification* says that when the battery level is less than 20%, the function should return Low Power Mode. So, add a unit test for a battery level less than 20%, say 19%.',
            nl: 'De *Huidige Functie* geeft nu altijd Normal Mode terug. De *Specificatie* zegt dat wanneer het batterijpercentage minder dan 20% is, de functie Low Power Mode terug zou moeten geven. Voeg dus een unit test toe voor een batterijpercentage van minder dan 20%, bijvoorbeeld 19%.',
        });
    }
    theCurrentFunctionNowSometimesReturnsNormalModeAndSometimesLowPowerMode() {
        return this.pick({
            en: 'The *Current Function* now sometimes returns Normal Mode and sometimes Low Power Mode. Submit the unit tests to see if the *Current Function* is according to the *Specification*.',
            nl: 'De *Huidige Functie* geeft nu soms Normal Mode terug en soms Low Power Mode. Lever de unit testen in om te zien of de *Huidige Functie* aan de *Specificatie* voldoet.',
        });
    }
    theCurrentFunctionNowReturnsNormalModeOnlyForBatteryLevel20Percent() {
        return this.pick({
            en: 'The *Current Function* now returns Normal Mode only for battery level 20%. Add a unit test for another battery level, say 21%, because the *Specification* says it should return Normal Mode for battery level 21% as well.',
            nl: 'De *Huidige Functie* geeft nu alleen Normal Mode terug voor een batterijpercentage van 20%. Voeg een unit test toe voor een ander batterijpercentage, bijvoorbeeld 21%, omdat de *Specificatie* zegt dat het ook Normal Mode terug zou moeten geven voor een batterijpercentage van 21%.',
        });
    }
    submitTheUnitTestsAgainToSeeIfTheCurrentFunctionIsAccordingToTheSpecification() {
        return this.pick({
            en: 'Submit the unit tests again to see if the *Current Function* is according to the *Specification*.',
            nl: 'Lever de unit testen opnieuw in om te zien of de *Huidige Functie* aan de *Specificatie* voldoet.',
        });
    }
    theCurrentFunctionNowReturnsLowPowerModeOnlyForBatteryLevel19Percent() {
        return this.pick({
            en: 'The *Current Function* now returns Low Power Mode only for battery level 19%. Add a unit test for another battery level, say 18%, because the *Specification* says it should return Low Power Mode for battery level 18% as well.',
            nl: 'De *Huidige Functie* geeft nu alleen Low Power Mode terug voor een batterijpercentage van 19%. Voeg een unit test toe voor een ander batterijpercentage, bijvoorbeeld 18%, omdat de *Specificatie* zegt dat het ook Low Power Mode terug zou moeten geven voor een batterijpercentage van 18%.',
        });
    }
    submitTheUnitTestsAgainToSeeIfTheCurrentFunctionIsFinallyAccordingToTheSpecification() {
        return this.pick({
            en: 'Submit the unit tests again to see if the *Current Function* is finally according to the *Specification*.',
            nl: 'Lever de unit testen opnieuw in om te zien of de *Huidige Functie* eindelijk aan de *Specificatie* voldoet.',
        });
    }
    congratulationsNowYouUnderstandTheBasicsOfTestDrivenDevelopment() {
        return this.pick({
            en: 'Congratulations, now you understand the basics of Test-Driven Development.',
            nl: 'Gefeliciteerd, nu begrijp je de basis van Test-Driven Development.',
        });
    }
    theFunctionContainsTheNumber20() {
        return this.pick({
            en: '*The Function* contains the number 20. That is a good starting point for a unit test. When the battery level is 20%, the function returns Normal Mode.',
            nl: '*De Functie* bevat het getal 20. Dat is een goed startpunt voor een unit test. Wanneer het batterijpercentage 20% is, geeft de functie Normal Mode terug.',
        });
    }
    theFunctionDoesNotAlwaysReturnNormalMode() {
        return this.pick({
            en: '*The Function* does NOT always return Normal Mode. When the battery level is less than 20%, the function returns Low Power Mode. So, add a unit test for a battery level less than 20%, say 19%.',
            nl: '*De Functie* geeft niet altijd Normal Mode terug. Wanneer het batterijpercentage minder dan 20% is, geeft de functie Low Power Mode terug. Voeg dus een unit test toe voor een batterijpercentage van minder dan 20%, bijvoorbeeld 19%.',
        });
    }
    allLinesInTheFunctionAreTestedNow() {
        return this.pick({
            en: 'All lines in *The Function* are tested now. Submit the unit tests to see if *The Function* is fully tested.',
            nl: 'Alle regels in *De Functie* zijn nu getest. Lever de unit testen in om te zien of *De Functie* volledig getest is.',
        });
    }
    thisMutationOnlyReturnsNormalModeIfTheBatteryLevelIsExactly20Percent() {
        return this.pick({
            en: 'This mutation only returns Normal Mode if the battery level is exactly 20%. Add a unit test for another battery level *The Function* returns Normal Mode for, say 21%.',
            nl: 'Deze mutatie geeft alleen Normal Mode terug als het batterijpercentage precies 20% is. Voeg een unit test toe voor een ander batterijpercentage waarvoor *De Functie* Normal Mode terug geeft, bijvoorbeeld 21%.',
        });
    }
    submitTheUnitTestsAgainToSeeIfTheFunctionIsFullyTestedNow() {
        return this.pick({
            en: 'Submit the unit tests again to see if *The Function* is fully tested now.',
            nl: 'Lever de unit testen opnieuw in om te zien of *De Functie* nu volledig getest is.',
        });
    }
    thisMutationOnlyReturnsLowPowerModeIfTheBatteryLevelIsExactly19Percent() {
        return this.pick({
            en: 'This mutation only returns Low Power Mode if the battery level is exactly 19%. Add a unit test for another battery level *The Function* returns Low Power Mode for, say 18%.',
            nl: 'Deze mutatie geeft alleen Low Power Mode terug als het batterijpercentage precies 19% is. Voeg een unit test toe voor een ander batterijpercentage waarvoor *De Functie* Low Power Mode terug geeft, bijvoorbeeld 18%.',
        });
    }
    submitTheUnitTestsAgainToSeeIfTheFunctionIsFinallyFullyTestedNow() {
        return this.pick({
            en: 'Submit the unit tests again to see if *The Function* is finally fully tested.',
            nl: 'Lever de unit testen opnieuw in om te zien of *De Functie* eindelijk volledig getest is.',
        });
    }
    congratulationsNowYouUnderstandTheBasicsOfMutationTesting() {
        return this.pick({
            en: 'Congratulations, now you understand the basics of Mutation Testing.',
            nl: 'Gefeliciteerd, nu begrijp je de basis van Mutation Testing.',
        });
    }
    returnTrueIfTheNumberIsEvenAndFalseIfItIsOdd() {
        return this.pick({
            en: 'Return true if the number is even and false if it is odd.',
            nl: 'Geef true terug als het getal even is en false als het oneven is.',
        });
    }
    returnFizzIfTheNumberIsDivisibleBy3() {
        return this.pick({
            en: 'Return "Fizz" if the number is divisible by 3, "Buzz" if the number is divisible by 5, "FizzBuzz" if the number is divisible by both 3 and 5, and "Other" for all other numbers.',
            nl: 'Geef "Fizz" terug als het getal deelbaar is door 3, "Buzz" als het getal deelbaar is door 5, "FizzBuzz" als het getal deelbaar is door zowel 3 als 5, en "Other" voor alle andere getallen.',
        });
    }
    returnTrueIfTheTextRepresentsAFloatAndFalseIfItDoesnt() {
        return this.pick({
            en: 'Return true if the text represents a float and returns false if it doesn\'t. A float may start with a plus or a minus sign. This is followed by one or more digits. If that is followed by a dot, then one or more digits follow.',
            nl: 'Geef true terug als de tekst een gebroken getal voorstelt en return false als dat niet zo is. Een gebroken getal kan beginnen met een plus- of minteken. Hierna volgen één of meer cijfers. Als dit wordt gevolgd door een punt, dan volgen één of meer cijfers.',
        });
    }
    returnTrueIfTheYearIsALeapYearAndFalseIfItIsNot() {
        return this.pick({
            en: 'Return true if the year is a leap year and false if the year is NOT a leap year. A year is a leap year if it is divisible by 4. The exception is that years that are divisible by 100 are NOT leap years, unless they are also divisible by 400.',
            nl: 'Geef true terug als het jaar een schrikkeljaar is en false als het jaar geen schrikkeljaar is. Een jaar is een schrikkeljaar als het deelbaar is door 4. De uitzondering is dat jaren die deelbaar zijn door 100 geen schrikkeljaren zijn, tenzij ze ook deelbaar zijn door 400.',
        });
    }
    returnTrueIfThePasswordIsStrongAndFalseIfItIsNot() {
        return this.pick({
            en: 'Return true if the password is strong and false if the password is NOT strong. A password is strong if it contains at least 5 characters, an uppercase letter, a lowercase letter and a special character ("#" or "@").',
            nl: 'Geef true terug als het wachtwoord sterk is en false als het wachtwoord niet sterk is. Een wachtwoord is sterk als het ten minste 5 tekens bevat, een hoofdletter, een kleine letter en een speciaal teken ("#" of "@").',
        });
    }
    theFunctionReceivesTheSpeedInKilometersPerHourWithAtMostOneDecimal() {
        const display = ('+-------------------+\n' +
            '|  X   XXXX   XXXX  |\n' +
            '|  X   X  X   X  X  |\n' +
            '|  X   XXXX   XXXX  |\n' +
            '|  X   X  X   X  X  |\n' +
            '|  X   XXXX X XXXX  |\n' +
            '|                   |\n' +
            '| X START  DANGER X |\n' +
            '+-------------------+');
        return this.pick({
            en: 'The function receives the speed in kilometers per hour with at most one decimal. If possible, show one decimal (e.g. 13 displays "13.0"). Otherwise, round to an integer (e.g. 87.6 displays "88"). Instead of "0.0" display "START". If the speed no longer fits on the display, then display "DANGER" (e.g. 300 displays "DANGER").\nThe display looks like this, where every X is a LED light:\n' + display,
            nl: 'De functie ontvangt de snelheid in kilometers per uur met maximaal één decimaal. Indien mogelijk, toon één decimaal (bijv. 13 toont "13.0"). Rond anders af op een geheel getal (bijv. 87.6 toont "88"). In plaats van "0.0" toon "START". Als de snelheid niet meer op het scherm past, toon dan "DANGER" (bijv. 300 toont "DANGER").\nHet scherm ziet er zo uit, waarbij elke X een LED-lampje is:\n' + display,
        });
    }
    returnTheTypeOfTheTriangle() {
        return this.pick({
            en: 'Return the type of the triangle: equilateral, isosceles or scalene. A triangle is equilateral if all three sides have the same length. A triangle is isosceles if two sides have the same length and a third side has a different length. A triangle is scalene if all three sides have different lengths.',
            nl: 'Geef het type van de driehoek terug: gelijkzijdig, gelijkbenig of ongelijkzijdig. Een driehoek is gelijkzijdig als alle drie de zijden even lang zijn. Een driehoek is gelijkbenig als twee zijden even lang zijn en een derde zijde een andere lengte heeft. Een driehoek is ongelijkzijdig als alle drie de zijden verschillende lengtes hebben.',
        });
    }
    returnTrueIfTheAgeIs18YearsOrOverAndFalseIfTheAgeIsUnder18() {
        return this.pick({
            en: 'Return true if the age is 18 years or over and return false if the age is under 18.',
            nl: 'Geef true terug als de leeftijd 18 jaar of ouder is en geef false terug als de leeftijd onder de 18 is.',
        });
    }
    returnGoodIfThePriceIsGoodAndTheQualityIsGood() {
        return this.pick({
            en: 'Return "Good" if the price is less than 20 and the quality is at least 7. Return "Bad" if the price is 20 or more and the quality is less than 7. In all other cases return "Ok".',
            nl: 'Geef "Goed" terug als de prijs minder dan 20 is en de kwaliteit ten minste 7 is. Geef "Slecht" terug als de prijs 20 of meer is en de kwaliteit minder dan 7 is. Geef in alle andere gevallen "Ok" terug.',
        });
    }
    or() {
        return this.pick({
            en: 'OR',
            nl: 'OF',
        });
    }
}

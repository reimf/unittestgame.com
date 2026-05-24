type LocalisableText = {
    en: string
    nl: string
    de: string
    fr: string
    es: string
    it: string
}

declare const __brand: unique symbol
export type LocalizedText = string & { readonly [__brand]: void }

export class Locale {
    private readonly lang: keyof LocalisableText

    public static bless(text: string): LocalizedText {
        return text as LocalizedText
    }

    public constructor(language: string) {
        const lang = ['en', 'nl', 'de', 'fr', 'es', 'it'].includes(language) ? language : 'en'
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
            fr: 'Bonjour! Je suis un bot IA qui écrit du code. ' +
                'Ton rôle est de me guider avec des tests unitaires.',
            es: '¡Hola! Soy un bot de IA que escribe código. ' +
                'Tu trabajo es guiarme con tests unitarios.',
            it: 'Ciao! Sono un bot IA che scrive codice. ' +
                'Il tuo compito è guidarmi con i test unitari.',
        })
    }

    public unitTestGameTitle(): LocalizedText {
        return this.localize({
            en: 'UnitTestGame',
            nl: 'UnitTestGame',
            de: 'UnitTestGame',
            fr: 'UnitTestGame',
            es: 'UnitTestGame',
            it: 'UnitTestGame',
        })
    }

    public slogan(): LocalizedText {
        return this.localize({
            en: 'Learn Test-Driven Development by writing unit tests that guide an AI bot.',
            nl: 'Leer Test-Driven Development door unit testen te schrijven die een AI bot bijsturen.',
            de: 'Lerne Test-Driven Development, indem du Unit-Tests schreibst, die einen KI-Bot steuern.',
            fr: 'Apprends le Test-Driven Development en écrivant des tests unitaires qui guident un bot IA.',
            es: 'Aprende el desarrollo guiado por tests escribiendo tests unitarios que guían a un bot de IA.',
            it: 'Impara il Test-Driven Development scrivendo test unitari che guidano un bot IA.',
        })
    }

    public links(): LocalizedText {
        return this.localize({
            en: '[Read more about TDD on Wikipedia](https://en.wikipedia.org/wiki/Test-driven_development)\n' +
                '[Contact](mailto:contact@unittestgame.com)\n',
            nl: '[Lees meer over TDD op Wikipedia](https://nl.wikipedia.org/wiki/Test-driven_development)\n' +
                '[Contact](mailto:contact@unittestgame.com)\n',
            de: '[Mehr über TDD auf Wikipedia lesen](https://de.wikipedia.org/wiki/Testgetriebene_Entwicklung)\n' +
                '[Kontakt](mailto:contact@unittestgame.com)\n',
            fr: '[En savoir plus sur TDD sur Wikipédia](https://fr.wikipedia.org/wiki/Test_driven_development)\n' +
                '[Contact](mailto:contact@unittestgame.com)\n',
            es: '[Más información sobre TDD en Wikipedia](https://es.wikipedia.org/wiki/Desarrollo_guiado_por_pruebas)\n' +
                '[Contacto](mailto:contact@unittestgame.com)\n',
            it: '[Leggi di più sul TDD su Wikipedia](https://it.wikipedia.org/wiki/Test_driven_development)\n' +
                '[Contatto](mailto:contact@unittestgame.com)\n',
        })
    }

    public switchLanguage(): LocalizedText {
        return this.localize({
            en: '[Overschakelen op Nederlands](?language=nl)\n' +
                '[Auf Deutsch wechseln](?language=de)\n' +
                '[Passer en Français](?language=fr)\n' +
                '[Cambiar al Español](?language=es)\n' +
                '[Passa all\'Italiano](?language=it)\n',
            nl: '[Switch to English](?language=en)\n' +
                '[Auf Deutsch wechseln](?language=de)\n' +
                '[Passer en Français](?language=fr)\n' +
                '[Cambiar al Español](?language=es)\n' +
                '[Passa all\'Italiano](?language=it)\n',
            de: '[Switch to English](?language=en)\n' +
                '[Overschakelen op Nederlands](?language=nl)\n' +
                '[Passer en Français](?language=fr)\n' +
                '[Cambiar al Español](?language=es)\n' +
                '[Passa all\'Italiano](?language=it)\n',
            fr: '[Switch to English](?language=en)\n' +
                '[Overschakelen op Nederlands](?language=nl)\n' +
                '[Auf Deutsch wechseln](?language=de)\n' +
                '[Cambiar al Español](?language=es)\n' +
                '[Passa all\'Italiano](?language=it)\n',
            es: '[Switch to English](?language=en)\n' +
                '[Overschakelen op Nederlands](?language=nl)\n' +
                '[Auf Deutsch wechseln](?language=de)\n' +
                '[Passer en Français](?language=fr)\n' +
                '[Passa all\'Italiano](?language=it)\n',
            it: '[Switch to English](?language=en)\n' +
                '[Overschakelen op Nederlands](?language=nl)\n' +
                '[Auf Deutsch wechseln](?language=de)\n' +
                '[Passer en Français](?language=fr)\n' +
                '[Cambiar al Español](?language=es)\n',
        })
    }

    public invitation(): LocalizedText {
        return this.localize({
            en: 'Which level do you want to play?',
            nl: 'Welk level wil je spelen?',
            de: 'Welches Level möchtest du spielen?',
            fr: 'Quel niveau veux-tu jouer ?',
            es: '¿Qué nivel quieres jugar?',
            it: 'Quale livello vuoi giocare?',
        })
    }

    public level(levelNumber: number, levelName: string): LocalizedText {
        return this.localize({
            en: `Level ${levelNumber} - ${levelName}`,
            nl: `Level ${levelNumber} - ${levelName}`,
            de: `Level ${levelNumber} - ${levelName}`,
            fr: `Niveau ${levelNumber} - ${levelName}`,
            es: `Nivel ${levelNumber} - ${levelName}`,
            it: `Livello ${levelNumber} - ${levelName}`,
        })
    }

    public nextLevelButton(levelDescription: string): LocalizedText {
        return this.localize({
            en: `I want to play ${levelDescription}`,
            nl: `Ik wil ${levelDescription} spelen`,
            de: `Ich möchte ${levelDescription} spielen`,
            fr: `Je veux jouer ${levelDescription}`,
            es: `Quiero jugar ${levelDescription}`,
            it: `Voglio giocare ${levelDescription}`,
        })
    }

    public allLevels(): LocalizedText {
        return this.localize({
            en: 'I\'ve completed all the levels',
            nl: 'Ik heb alle levels voltooid',
            de: 'Ich habe alle Levels abgeschlossen',
            fr: 'J\'ai terminé tous les niveaux',
            es: 'He completado todos los niveles',
            it: 'Ho completato tutti i livelli',
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
            fr: 'Bravo! Tu as terminé tous les niveaux. ' +
                'Tu peux maintenant appliquer le TDD à tes propres projets.',
            es: '¡Bien hecho! Has completado todos los niveles. ' +
                'Ahora puedes aplicar TDD a tus propios proyectos.',
            it: 'Bravo! Hai completato tutti i livelli. ' +
                'Ora puoi applicare il TDD ai tuoi progetti.',
        })
    }

    public unitTestsTitle(): LocalizedText {
        return this.localize({
            en: 'Unit Tests (latest highlighted)',
            nl: 'Unit Testen (laatste gemarkeerd)',
            de: 'Unit-Tests (neuester hervorgehoben)',
            fr: 'Tests Unitaires (dernier mis en évidence)',
            es: 'Tests Unitarios (último resaltado)',
            it: 'Test Unitari (ultimo evidenziato)',
        })
    }

    public addUnitTestButton(): LocalizedText {
        return this.localize({
            en: 'I want to add this unit test',
            nl: 'Ik wil deze unit test toevoegen',
            de: 'Ich möchte diesen Unit-Test hinzufügen',
            fr: 'Je veux ajouter ce test unitaire',
            es: 'Quiero añadir este test unitario',
            it: 'Voglio aggiungere questo test unitario',
        })
    }

    public submitUnitTestsButton(): LocalizedText {
        return this.localize({
            en: 'I want to submit the unit tests',
            nl: 'Ik wil de unit testen inleveren',
            de: 'Ich möchte die Unit-Tests einreichen',
            fr: 'Je veux soumettre les tests unitaires',
            es: 'Quiero enviar los tests unitarios',
            it: 'Voglio inviare i test unitari',
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
            fr: 'Je n\'ai pas ajouté le test unitaire, ' +
                'car il ne correspond pas à la *Spécification*.',
            es: 'No he añadido el test unitario, ' +
                'porque no coincide con la *Especificación*.',
            it: 'Non ho aggiunto il test unitario, ' +
                'perché non corrisponde alla *Specifica*.',
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
            fr: `Tu as testé la *Fonction Actuelle* de manière approfondie, ` +
                 `mais tu as écrit ${numberOfUnnecessaryUnitTests} ${numberOfUnnecessaryUnitTests === 1 ? 'test unitaire' : 'tests unitaires'} de plus que nécessaire. ` +
                `${numberOfRedundantUnitTests === 1 ? 'Le suivant' : 'Au moins un des suivants'} peut être omis.`,
            es: `Has probado la *Función Actual* exhaustivamente, ` +
                 `pero has escrito ${numberOfUnnecessaryUnitTests} ${numberOfUnnecessaryUnitTests === 1 ? 'test unitario' : 'tests unitarios'} más de lo necesario. ` +
                `${numberOfRedundantUnitTests === 1 ? 'El siguiente' : 'Al menos uno de los siguientes'} puede omitirse.`,
            it: `Hai testato la *Funzione Attuale* in modo approfondito, ` +
                 `ma hai scritto ${numberOfUnnecessaryUnitTests} ${numberOfUnnecessaryUnitTests === 1 ? 'test unitario' : 'test unitari'} in più del necessario. ` +
                `${numberOfRedundantUnitTests === 1 ? 'Il seguente' : 'Almeno uno dei seguenti'} può essere omesso.`,
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
            fr: 'Lis d\'abord la *Spécification*. ' +
                'Écris ensuite un test unitaire que la *Fonction Actuelle* ne réussit pas.',
            es: 'Primero, lee la *Especificación*. ' +
                'Luego escribe un test unitario que la *Función Actual* no supere.',
            it: 'Prima, leggi la *Specifica*. ' +
                'Poi scrivi un test unitario che la *Funzione Attuale* non supera.',
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
            fr: 'Après avoir ajouté un test unitaire, ' +
                'j\'améliorerai la *Fonction Actuelle* pour que tous les *Test Unitaires* réussissent à nouveau.',
            es: 'Después de añadir un test unitario, ' +
                'mejoraré la *Función Actual* para que todos los *Tests Unitarios* vuelvan a pasar.',
            it: 'Dopo aver aggiunto un test unitario, ' +
                'migliorerò la *Funzione Attuale* in modo che tutti i *Test Unitari* superino di nuovo.',
        })
    }

    public submitUnitTests(): LocalizedText {
        return this.localize({
            en: 'Submit the *Unit Tests* when you think the *Current Function* matches the *Specification*.',
            nl: 'Lever de *Unit Testen* in als je denkt dat de *Huidige Functie* voldoet aan de *Specificatie*.',
            de: 'Reiche die *Unit-Tests* ein, wenn du denkst, dass die *Aktuelle Funktion* der *Spezifikation* entspricht.',
            fr: 'Soumets les *Test Unitaires* quand tu penses que la *Fonction Actuelle* correspond à la *Spécification*.',
            es: 'Envía los *Tests Unitarios* cuando creas que la *Función Actual* coincide con la *Especificación*.',
            it: 'Invia i *Test Unitari* quando pensi che la *Funzione Attuale* corrisponda alla *Specifica*.',
        })
    }

    public specificationTitle(description: string): LocalizedText {
        return this.localize({
            en: `Specification (${description})`,
            nl: `Specificatie (${description})`,
            de: `Spezifikation (${description})`,
            fr: `Spécification (${description})`,
            es: `Especificación (${description})`,
            it: `Specifica (${description})`,
        })
    }

    public currentFunctionTitle(): LocalizedText {
        return this.localize({
            en: 'Current Function',
            nl: 'Huidige Functie',
            de: 'Aktuelle Funktion',
            fr: 'Fonction Actuelle',
            es: 'Función Actual',
            it: 'Funzione Attuale',
        })
    }

    public differenceTitle(): LocalizedText {
        return this.localize({
            en: 'Difference',
            nl: 'Verschil',
            de: 'Unterschied',
            fr: 'Différence',
            es: 'Diferencia',
            it: 'Differenza',
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
            fr: 'J\'ai ajouté le test unitaire, ' +
                'mais la *Fonction Actuelle* le réussit déjà, ' +
                'donc je n\'ai pas amélioré la *Fonction Actuelle*. ' +
                'Écris un test unitaire que la *Fonction Actuelle* ne réussit pas.',
            es: 'He añadido el test unitario, ' +
                'pero la *Función Actual* ya lo supera, ' +
                'así que no he mejorado la *Función Actual*. ' +
                'Escribe un test unitario que la *Función Actual* no supere.',
            it: 'Ho aggiunto il test unitario, ' +
                'ma la *Funzione Attuale* lo supera già, ' +
                'quindi non ho migliorato la *Funzione Attuale*. ' +
                'Scrivi un test unitario che la *Funzione Attuale* non supera.',
        })
    }

    public hint(): LocalizedText {
        return this.localize({
            en: 'Write a unit test that the *Current Function* fails.',
            nl: 'Schrijf een unit test waarvoor de *Huidige Functie* faalt.',
            de: 'Schreibe einen Unit-Test, den die *Aktuelle Funktion* nicht besteht.',
            fr: 'Écris un test unitaire que la *Fonction Actuelle* ne réussit pas.',
            es: 'Escribe un test unitario que la *Función Actual* no supere.',
            it: 'Scrivi un test unitario che la *Funzione Attuale* non supera.',
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
            fr: `J'ai ajouté le test unitaire aux *Test Unitaires* et amélioré la *Fonction Actuelle* ` +
                `pour que le nouveau test unitaire réussisse maintenant${numberOfUnitTests === 1 ? '' : ' aussi'}.`,
            es: `He añadido el test unitario a los *Tests Unitarios* y mejorado la *Función Actual* ` +
                `para que el nuevo test unitario ahora pase${numberOfUnitTests === 1 ? '' : ' también'}.`,
            it: `Ho aggiunto il test unitario ai *Test Unitari* e migliorato la *Funzione Attuale* ` +
                `in modo che il nuovo test unitario ora superi${numberOfUnitTests === 1 ? '' : ' anche'}.`,
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
            fr: 'Le test unitaire suivant ne correspond pas à la *Spécification*, ' +
                'mais la *Fonction Actuelle* le réussit.',
            es: 'El siguiente test unitario no coincide con la *Especificación*, ' +
                'pero la *Función Actual* lo supera.',
            it: 'Il seguente test unitario non corrisponde alla *Specifica*, ' +
                'ma la *Funzione Attuale* lo supera.',
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
            fr: `La *Fonction Actuelle* ne correspond pas encore à la *Spécification*. ` +
                `Tu as besoin d'au moins ${numberOfUnitTestsStillNeeded} ${numberOfUnitTestsStillNeeded === 1 ? 'test unitaire' : 'tests unitaires'} supplémentaire${numberOfUnitTestsStillNeeded === 1 ? '' : 's'}, ` +
                `donc écris un test unitaire qui correspond à la *Spécification* et que la *Fonction Actuelle* ne réussit pas.`,
            es: `La *Función Actual* todavía no coincide con la *Especificación*. ` +
                `Necesitas al menos ${numberOfUnitTestsStillNeeded} ${numberOfUnitTestsStillNeeded === 1 ? 'test unitario' : 'tests unitarios'} más, ` +
                `así que escribe un test unitario que coincida con la *Especificación* y que la *Función Actual* no supere.`,
            it: `La *Funzione Attuale* non corrisponde ancora alla *Specifica*. ` +
                `Hai bisogno di almeno ${numberOfUnitTestsStillNeeded} ${numberOfUnitTestsStillNeeded === 1 ? 'test unitario' : 'test unitari'} in più, ` +
                `quindi scrivi un test unitario che corrisponda alla *Specifica* e che la *Funzione Attuale* non superi.`,
        })
    }

    public currentFunctionCorrect(): LocalizedText {
        return this.localize({
            en: 'Well done! The *Current Function* matches the *Specification*.',
            nl: 'Goed gedaan! De *Huidige Functie* voldoet aan de *Specificatie*.',
            de: 'Gut gemacht! Die *Aktuelle Funktion* entspricht der *Spezifikation*.',
            fr: 'Bravo! La *Fonction Actuelle* correspond à la *Spécification*.',
            es: '¡Bien hecho! La *Función Actual* coincide con la *Especificación*.',
            it: 'Bravo! La *Funzione Attuale* corrisponde alla *Specifica*.',
        })
    }

    public levelOverviewTitle(): LocalizedText {
        return this.localize({
            en: 'Level Overview',
            nl: 'Level Overzicht',
            de: 'Level-Übersicht',
            fr: 'Aperçu des Niveaux',
            es: 'Resumen de Niveles',
            it: 'Panoramica dei Livelli',
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
            fr: 'Un smartphone fonctionne normalement en `Normal Mode`, ' +
                'mais lorsque le niveau de batterie est inférieur à `20`, ' +
                'il fonctionne en `Low Power Mode`.',
            es: 'Un smartphone normalmente funciona en `Normal Mode`, ' +
                'pero cuando el nivel de batería es inferior a `20`, ' +
                'funciona en `Low Power Mode`.',
            it: 'Uno smartphone normalmente funziona in `Normal Mode`, ' +
                'ma quando il livello della batteria è inferiore a `20`, ' +
                'funziona in `Low Power Mode`.',
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
            fr: 'Hmm, ce n\'est pas tout à fait correct. ' +
                'Réessaie.',
            es: 'Hmm, eso no es del todo correcto. ' +
                'Inténtalo de nuevo.',
            it: 'Hmm, non è del tutto corretto. ' +
                'Riprova.',
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
            fr: 'La *Spécification* contient le nombre `20`. ' +
                'C\'est un bon point de départ. ' +
                'Quand le niveau de batterie est `20`, la fonction doit retourner `Normal Mode`.',
            es: 'La *Especificación* contiene el número `20`. ' +
                'Ese es un buen punto de partida. ' +
                'Cuando el nivel de batería es `20`, la función debe retornar `Normal Mode`.',
            it: 'La *Specifica* contiene il numero `20`. ' +
                'Questo è un buon punto di partenza. ' +
                'Quando il livello della batteria è `20`, la funzione deve restituire `Normal Mode`.',
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
            fr: 'La *Fonction Actuelle* retourne maintenant toujours `Normal Mode`, ' +
                'mais la *Spécification* dit que le niveau de batterie `19` doit retourner `Low Power Mode`. ' +
                'Ajoute un test unitaire pour cela.',
            es: 'La *Función Actual* ahora siempre retorna `Normal Mode`, ' +
                'pero la *Especificación* dice que el nivel de batería `19` debe retornar `Low Power Mode`. ' +
                'Añade un test unitario para eso.',
            it: 'La *Funzione Attuale* ora restituisce sempre `Normal Mode`, ' +
                'ma la *Specifica* dice che il livello della batteria `19` deve restituire `Low Power Mode`. ' +
                'Aggiungi un test unitario per questo.',
        })
    }

    public submitUnitTestsFirst(): LocalizedText {
        return this.localize({
            en: 'The *Current Function* can now return either `Normal Mode` or `Low Power Mode`. ' +
                'Submit the *Unit Tests* to check if the *Current Function* matches the *Specification*.',
            nl: 'De *Huidige Functie* kan nu `Normal Mode` of `Low Power Mode` teruggeven. ' +
                'Lever de *Unit Testen* in om te controleren of de *Huidige Functie* voldoet aan de *Specificatie*.',
            de: 'Die *Aktuelle Funktion* kann jetzt entweder `Normal Mode` oder `Low Power Mode` zurückgeben. ' +
                'Reiche die *Unit-Tests* ein, um zu prüfen, ob die *Aktuelle Funktion* der *Spezifikation* entspricht.',
            fr: 'La *Fonction Actuelle* peut maintenant retourner soit `Normal Mode` soit `Low Power Mode`. ' +
                'Soumets les *Test Unitaires* pour vérifier si la *Fonction Actuelle* correspond à la *Spécification*.',
            es: 'La *Función Actual* ahora puede retornar `Normal Mode` o `Low Power Mode`. ' +
                'Envía los *Tests Unitarios* para comprobar si la *Función Actual* coincide con la *Especificación*.',
            it: 'La *Funzione Attuale* ora può restituire `Normal Mode` o `Low Power Mode`. ' +
                'Invia i *Test Unitari* per verificare se la *Funzione Attuale* corrisponde alla *Specifica*.',
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
            fr: 'La *Fonction Actuelle* retourne maintenant `Normal Mode` uniquement pour le niveau de batterie `20`. ' +
                'La *Spécification* dit que `21` doit aussi retourner `Normal Mode`. ' +
                'Ajoute un test unitaire pour cela.',
            es: 'La *Función Actual* ahora retorna `Normal Mode` solo para el nivel de batería `20`. ' +
                'La *Especificación* dice que `21` también debe retornar `Normal Mode`. ' +
                'Añade un test unitario para eso.',
            it: 'La *Funzione Attuale* ora restituisce `Normal Mode` solo per il livello della batteria `20`. ' +
                'La *Specifica* dice che `21` deve anche restituire `Normal Mode`. ' +
                'Aggiungi un test unitario per questo.',
        })
    }

    public submitUnitTestsSecond(): LocalizedText {
        return this.localize({
            en: 'Submit the *Unit Tests* again to check if the *Current Function* matches the *Specification*.',
            nl: 'Lever de *Unit Testen* opnieuw in om te controleren of de *Huidige Functie* voldoet aan de *Specificatie*.',
            de: 'Reiche die *Unit-Tests* erneut ein, um zu prüfen, ob die *Aktuelle Funktion* der *Spezifikation* entspricht.',
            fr: 'Soumets à nouveau les *Tests Unitaires* pour vérifier si la *Fonction Actuelle* correspond à la *Spécification*.',
            es: 'Envía de nuevo los *Tests Unitarios* para comprobar si la *Función Actual* coincide con la *Especificación*.',
            it: 'Invia di nuovo i *Test Unitari* per verificare se la *Funzione Attuale* corrisponde alla *Specifica*.',
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
            fr: 'La *Fonction Actuelle* retourne maintenant `Low Power Mode` uniquement pour le niveau de batterie `19`. ' +
                'La *Spécification* dit que `18` doit aussi retourner `Low Power Mode`. ' +
                'Ajoute un test unitaire pour cela.',
            es: 'La *Función Actual* ahora retorna `Low Power Mode` solo para el nivel de batería `19`. ' +
                'La *Especificación* dice que `18` también debe retornar `Low Power Mode`. ' +
                'Añade un test unitario para eso.',
            it: 'La *Funzione Attuale* ora restituisce `Low Power Mode` solo per il livello della batteria `19`. ' +
                'La *Specifica* dice che `18` deve anche restituire `Low Power Mode`. ' +
                'Aggiungi un test unitario per questo.',
        })
    }

    public submitUnitTestsThird(): LocalizedText {
        return this.localize({
            en: 'Submit the *Unit Tests* again to check if the *Current Function* finally matches the *Specification*.',
            nl: 'Lever de *Unit Testen* opnieuw in om te controleren of de *Huidige Functie* eindelijk voldoet aan de *Specificatie*.',
            de: 'Reiche die *Unit-Tests* erneut ein, um zu prüfen, ob die *Aktuelle Funktion* endlich der *Spezifikation* entspricht.',
            fr: 'Soumets à nouveau les *Tests Unitaires* pour vérifier si la *Fonction Actuelle* correspond enfin à la *Spécification*.',
            es: 'Envía de nuevo los *Tests Unitarios* para comprobar si la *Función Actual* coincide finalmente con la *Especificación*.',
            it: 'Invia di nuovo i *Test Unitari* per verificare se la *Funzione Attuale* corrisponde finalmente alla *Specifica*.',
        })
    }

    public evenOddSpecification(): LocalizedText {
        return this.localize({
            en: 'Return `true` if the number is even and `false` otherwise.',
            nl: 'Geef `true` terug als het getal even is en anders `false`.',
            de: 'Gib `true` zurück, wenn die Zahl gerade ist, und sonst `false`.',
            fr: 'Retourne `true` si le nombre est pair et `false` sinon.',
            es: 'Retorna `true` si el número es par y `false` en caso contrario.',
            it: 'Restituisci `true` se il numero è pari e `false` altrimenti.',
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
            fr: 'Retourne `Fizz` si le nombre est divisible par 3, ' +
                '`Buzz` s\'il est divisible par 5, ' +
                '`FizzBuzz` s\'il est divisible par 3 et par 5, ' +
                'et `Other` pour tout autre nombre.',
            es: 'Retorna `Fizz` si el número es divisible por 3, ' +
                '`Buzz` si es divisible por 5, ' +
                '`FizzBuzz` si es divisible por 3 y por 5, ' +
                'y `Other` para cualquier otro número.',
            it: 'Restituisci `Fizz` se il numero è divisibile per 3, ' +
                '`Buzz` se è divisibile per 5, ' +
                '`FizzBuzz` se è divisibile per 3 e per 5, ' +
                'e `Other` per qualsiasi altro numero.',
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
            fr: 'Retourne `true` si le texte représente un nombre à virgule flottante et `false` sinon. ' +
                'Un nombre à virgule flottante peut commencer par un signe plus ou moins. ' +
                'Cela est suivi d\'un ou plusieurs chiffres. ' +
                'Si cela est suivi d\'un point, alors un ou plusieurs chiffres doivent suivre.',
            es: 'Retorna `true` si el texto representa un número de punto flotante y `false` en caso contrario. ' +
                'Un número de punto flotante puede comenzar con un signo más o menos. ' +
                'A continuación hay uno o más dígitos. ' +
                'Si a continuación hay un punto, entonces deben seguir uno o más dígitos.',
            it: 'Restituisci `true` se il testo rappresenta un numero in virgola mobile e `false` altrimenti. ' +
                'Un numero in virgola mobile può iniziare con un segno più o meno. ' +
                'Questo è seguito da una o più cifre. ' +
                'Se è seguito da un punto, allora devono seguire una o più cifre.',
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
            fr: 'Retourne `true` si l\'année est une année bissextile et `false` sinon. ' +
                'Une année est une année bissextile si elle est divisible par 4. ' +
                'L\'exception est que les années divisibles par 100 ne sont pas des années bissextiles, sauf si elles sont aussi divisibles par 400.',
            es: 'Retorna `true` si el año es bisiesto y `false` en caso contrario. ' +
                'Un año es bisiesto si es divisible por 4. ' +
                'La excepción es que los años divisibles por 100 no son bisiestos, a menos que también sean divisibles por 400.',
            it: 'Restituisci `true` se l\'anno è bisestile e `false` altrimenti. ' +
                'Un anno è bisestile se è divisibile per 4. ' +
                'L\'eccezione è che gli anni divisibili per 100 non sono bisestili, a meno che non siano anche divisibili per 400.',
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
            fr: 'Retourne `true` si le mot de passe est fort et `false` sinon. ' +
                'Un mot de passe est fort s\'il contient au moins 5 caractères, une lettre majuscule, une lettre minuscule et un caractère spécial (`#` ou `@`).',
            es: 'Retorna `true` si la contraseña es fuerte y `false` en caso contrario. ' +
                'Una contraseña es fuerte si contiene al menos 5 caracteres, una letra mayúscula, una letra minúscula y un carácter especial (`#` o `@`).',
            it: 'Restituisci `true` se la password è forte e `false` altrimenti. ' +
                'Una password è forte se contiene almeno 5 caratteri, una lettera maiuscola, una lettera minuscola e un carattere speciale (`#` o `@`).',
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
            fr: 'Retourne la vitesse formatée en kilomètres par heure. ' +
                'Utilise une décimale si elle tient sur l\'écran (ex. 13 → `13.0`). ' +
                'Sinon, arrondit à un entier (ex. 87.6 → `88`). ' +
                'Si la voiture ne bouge pas, retourne `START`. ' +
                'Si la vitesse ne tient plus sur l\'écran, retourne `DANGER` (ex. 300 → `DANGER`).\n' +
                'L\'écran ressemble à ceci, où chaque X est une LED :\n' +
                display,
            es: 'Retorna la velocidad formateada en kilómetros por hora. ' +
                'Usa un decimal si cabe en la pantalla (ej. 13 → `13.0`). ' +
                'De lo contrario, redondea a un entero (ej. 87.6 → `88`). ' +
                'Si el coche no se mueve, retorna `START`. ' +
                'Si la velocidad ya no cabe en la pantalla, retorna `DANGER` (ej. 300 → `DANGER`).\n' +
                'La pantalla se ve así, donde cada X es una luz LED:\n' +
                display,
            it: 'Restituisci la velocità formattata in chilometri all\'ora. ' +
                'Usa un decimale se entra nel display (es. 13 → `13.0`). ' +
                'Altrimenti, arrotonda a un intero (es. 87.6 → `88`). ' +
                'Se la macchina non si muove, restituisci `START`. ' +
                'Se la velocità non entra più nel display, restituisci `DANGER` (es. 300 → `DANGER`).\n' +
                'Il display è così, dove ogni X è una luce LED:\n' +
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
            fr: 'Retourne le type du triangle : `equilateral` (équilatéral), `isosceles` (isocèle) ou `scalene` (scalène). ' +
                'Un triangle est équilatéral si les trois côtés ont la même longueur. ' +
                'Un triangle est isocèle si exactement deux côtés ont la même longueur. ' +
                'Un triangle est scalène si les trois côtés ont des longueurs différentes.',
            es: 'Retorna el tipo de triángulo: `equilateral` (equilátero), `isosceles` (isósceles) o `scalene` (escaleno). ' +
                'Un triángulo es equilátero si los tres lados tienen la misma longitud. ' +
                'Un triángulo es isósceles si exactamente dos lados tienen la misma longitud. ' +
                'Un triángulo es escaleno si los tres lados tienen longitudes diferentes.',
            it: 'Restituisci il tipo di triangolo: `equilateral` (equilatero), `isosceles` (isoscele) o `scalene` (scaleno). ' +
                'Un triangolo è equilatero se tutti e tre i lati hanno la stessa lunghezza. ' +
                'Un triangolo è isoscele se esattamente due lati hanno la stessa lunghezza. ' +
                'Un triangolo è scaleno se tutti e tre i lati hanno lunghezze diverse.',
        })
    }

    public votingAgeSpecification(): LocalizedText {
        return this.localize({
            en: 'Return `true` if the age is `18` or over, and `false` otherwise.',
            nl: 'Geef `true` terug als de leeftijd `18` jaar of hoger is, en anders `false`.',
            de: 'Gib `true` zurück, wenn das Alter `18` oder älter ist, und sonst `false`.',
            fr: 'Retourne `true` si l\'âge est `18` ou plus, et `false` sinon.',
            es: 'Retorna `true` si la edad es `18` o más, y `false` en caso contrario.',
            it: 'Restituisci `true` se l\'età è `18` o più, e `false` altrimenti.',
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
            fr: 'Retourne `Good` si le prix est inférieur à `20` et la qualité est au moins `7`. ' +
                'Retourne `Bad` si le prix est `20` ou plus et la qualité est inférieure à `7`. ' +
                'Retourne `Ok` dans tous les autres cas.',
            es: 'Retorna `Good` si el precio es inferior a `20` y la calidad es al menos `7`. ' +
                'Retorna `Bad` si el precio es `20` o más y la calidad es inferior a `7`. ' +
                'Retorna `Ok` en todos los demás casos.',
            it: 'Restituisci `Good` se il prezzo è inferiore a `20` e la qualità è almeno `7`. ' +
                'Restituisci `Bad` se il prezzo è `20` o più e la qualità è inferiore a `7`. ' +
                'Restituisci `Ok` in tutti gli altri casi.',
        })
    }

    public or(): LocalizedText {
        return this.localize({
            en: 'or',
            nl: 'of',
            de: 'oder',
            fr: 'ou',
            es: 'o',
            it: 'o',
        })
    }
}

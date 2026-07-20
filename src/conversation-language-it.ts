import { ConversationLanguage, ConversationText } from './conversation-language-base.js'

export class Italian extends ConversationLanguage {
    public override readonly id = 'it' as const
    public override readonly name = 'Italiano'

    public override welcome(conversationLanguageName: string, programmingLanguageName: string): ConversationText {
        return ConversationLanguage.bless(`Ciao! Sono un bot IA che parla ${conversationLanguageName} e scrive codice ${programmingLanguageName}. ` +
            'Il tuo compito è guidarmi con i unit tests.')
    }

    public override unitTestGameTitle(): ConversationText {
        return ConversationLanguage.bless('UnitTestGame')
    }

    public override slogan(): ConversationText {
        return ConversationLanguage.bless('![Logo di UnitTestGame](apple-touch-icon.png)Impara il Test-Driven Development scrivendo unit tests che guidano un bot IA.')
    }

    public override readMoreAboutTDD(): ConversationText {
        return ConversationLanguage.bless('[Leggi di più sul TDD su Wikipedia](https://it.wikipedia.org/wiki/Test_driven_development)')
    }

    public override contact(): ConversationText {
        return ConversationLanguage.bless('[Contatto](mailto:contact@unittestgame.com)')
    }

    public override settingsTitle(): ConversationText {
        return ConversationLanguage.bless('Impostazioni')
    }

    public override changeLanguage(): ConversationText {
        return ConversationLanguage.bless('Lingua')
    }

    public override changeProgrammingLanguage(): ConversationText {
        return ConversationLanguage.bless('Linguaggio di programmazione')
    }

    public override invitation(): ConversationText {
        return ConversationLanguage.bless('Quale livello vuoi giocare?')
    }

    public override level(levelNumber: number, levelName: string): ConversationText {
        return ConversationLanguage.bless(`Livello ${levelNumber} - ${levelName}`)
    }

    public override nextLevelButton(levelDescription: string): ConversationText {
        return ConversationLanguage.bless(`Voglio giocare ${levelDescription}`)
    }

    public override allLevels(): ConversationText {
        return ConversationLanguage.bless('Ho completato tutti i livelli')
    }

    public override closeTab(): ConversationText {
        return ConversationLanguage.bless('Bravo! Hai completato tutti i livelli. ' +
            'Ora puoi applicare il TDD ai tuoi progetti.')
    }

    public override unitTestsTitle(): ConversationText {
        return ConversationLanguage.bless('Unit Tests')
    }

    public override addUnitTestButton(): ConversationText {
        return ConversationLanguage.bless('Voglio aggiungere questo unit test')
    }

    public override submitUnitTestsButton(): ConversationText {
        return ConversationLanguage.bless('Voglio inviare i unit tests')
    }

    public override unitTestNotAdded(): ConversationText {
        return ConversationLanguage.bless('Non ho aggiunto il unit test, ' +
            'perché non corrisponde alla *Specifica*.')
    }

    public override tooManyUnitTests(numberOfUnnecessaryUnitTests: number, numberOfRedundantUnitTests: number): ConversationText {
        return ConversationLanguage.bless(`Hai testato la *Funzione Attuale* in modo approfondito, ` +
            `ma hai scritto ${numberOfUnnecessaryUnitTests} ${numberOfUnnecessaryUnitTests === 1 ? 'unit test' : 'unit tests'} in più del necessario. ` +
            `${numberOfRedundantUnitTests === 1 ? 'Il seguente' : 'Almeno uno dei seguenti'} può essere omesso.`)
    }

    public override readSpecification(): ConversationText {
        return ConversationLanguage.bless('Prima, leggi la *Specifica*. ' +
            'Poi scrivi un unit test che la *Funzione Attuale* non supera.')
    }

    public override improveCurrentFunction(): ConversationText {
        return ConversationLanguage.bless('Dopo aver aggiunto un unit test, ' +
            'migliorerò la *Funzione Attuale* in modo che tutti i *Unit Tests* superino di nuovo.')
    }

    public override submitUnitTests(): ConversationText {
        return ConversationLanguage.bless('Invia i *Unit Tests* quando pensi che la *Funzione Attuale* corrisponda alla *Specifica*.')
    }

    public override specificationTitle(description: string): ConversationText {
        return ConversationLanguage.bless(`Specifica (${description})`)
    }

    public override currentFunctionTitle(): ConversationText {
        return ConversationLanguage.bless('Funzione Attuale')
    }

    public override differenceTitle(): ConversationText {
        return ConversationLanguage.bless('Differenza')
    }

    public override currentFunctionNotImproved(): ConversationText {
        return ConversationLanguage.bless('Ho aggiunto il unit test, ' +
            'ma la *Funzione Attuale* lo supera già, ' +
            'quindi non ho migliorato la *Funzione Attuale*. ' +
            'Scrivi un unit test che la *Funzione Attuale* non supera.')
    }

    public override hint(): ConversationText {
        return ConversationLanguage.bless('Scrivi un unit test che la *Funzione Attuale* non supera.')
    }

    public override currentFunctionImproved(numberOfUnitTests: number): ConversationText {
        return ConversationLanguage.bless(`Ho aggiunto il unit test ai *Unit Tests* e migliorato la *Funzione Attuale* ` +
            `in modo che il nuovo unit test ora superi${numberOfUnitTests === 1 ? '' : ' anche'}.`)
    }

    public override invalidUnitTest(): ConversationText {
        return ConversationLanguage.bless('Il seguente unit test non corrisponde alla *Specifica*, ' +
            'ma la *Funzione Attuale* lo supera.')
    }

    public override moreUnitTests(numberOfUnitTestsStillNeeded: number): ConversationText {
        return ConversationLanguage.bless(`La *Funzione Attuale* non corrisponde ancora alla *Specifica*. ` +
            `Hai bisogno di almeno ${numberOfUnitTestsStillNeeded} ${numberOfUnitTestsStillNeeded === 1 ? 'unit test' : 'unit tests'} in più, ` +
            `quindi scrivi un unit test che corrisponda alla *Specifica* e che la *Funzione Attuale* non superi.`)
    }

    public override currentFunctionCorrect(): ConversationText {
        return ConversationLanguage.bless('Bravo! La *Funzione Attuale* corrisponde alla *Specifica*.')
    }

    public override levelOverviewTitle(): ConversationText {
        return ConversationLanguage.bless('Panoramica dei Livelli')
    }

    public override batteryLevelSpecification(): ConversationText {
        return ConversationLanguage.bless('Uno smartphone normalmente funziona in `NORMAL MODE`, ' +
            'ma quando il livello della batteria è inferiore a `20`, ' +
            'funziona in `LOW POWER MODE`.')
    }

    public override wrongAction(): ConversationText {
        return ConversationLanguage.bless('Hmm, non è del tutto corretto. ' +
            'Riprova.')
    }

    public override addBatteryLevel20(): ConversationText {
        return ConversationLanguage.bless('La *Specifica* contiene il numero `20`. ' +
            'Questo è un buon punto di partenza. ' +
            'Quando il livello della batteria è `20`, la funzione deve restituire `NORMAL MODE`.')
    }

    public override addBatteryLevel19(): ConversationText {
        return ConversationLanguage.bless('La *Funzione Attuale* ora restituisce sempre `NORMAL MODE`, ' +
            'ma la *Specifica* dice che il livello della batteria `19` deve restituire `LOW POWER MODE`. ' +
            'Aggiungi un unit test per questo.')
    }

    public override submitUnitTestsFirst(): ConversationText {
        return ConversationLanguage.bless('La *Funzione Attuale* ora può restituire `NORMAL MODE` o `LOW POWER MODE`. ' +
            'Invia i *Unit Tests* per verificare se la *Funzione Attuale* corrisponde alla *Specifica*.')
    }

    public override addBatteryLevel21(): ConversationText {
        return ConversationLanguage.bless('La *Funzione Attuale* ora restituisce `NORMAL MODE` solo per il livello della batteria `20`. ' +
            'La *Specifica* dice che `21` deve anche restituire `NORMAL MODE`. ' +
            'Aggiungi un unit test per questo.')
    }

    public override submitUnitTestsSecond(): ConversationText {
        return ConversationLanguage.bless('Invia di nuovo i *Unit Tests* per verificare se la *Funzione Attuale* corrisponde alla *Specifica*.')
    }

    public override addBatteryLevel18(): ConversationText {
        return ConversationLanguage.bless('La *Funzione Attuale* ora restituisce `LOW POWER MODE` solo per il livello della batteria `19`. ' +
            'La *Specifica* dice che `18` deve anche restituire `LOW POWER MODE`. ' +
            'Aggiungi un unit test per questo.')
    }

    public override submitUnitTestsThird(): ConversationText {
        return ConversationLanguage.bless('Invia di nuovo i *Unit Tests* per verificare se la *Funzione Attuale* corrisponde finalmente alla *Specifica*.')
    }

    public override windScaleSpecification(): ConversationText {
        return ConversationLanguage.bless('Restituisci `CALM` se la velocità del vento è inferiore a `20`. ' +
            'Restituisci `BREEZE` se la velocità del vento è inferiore a `50`. ' +
            'Restituisci `GALE` se la velocità del vento è inferiore a `90`. ' +
            'Restituisci `STORM` in tutti gli altri casi.')
    }

    public override fizzBuzzSpecification(): ConversationText {
        return ConversationLanguage.bless('Restituisci `FIZZ` se il numero è divisibile per 3, ' +
            '`BUZZ` se è divisibile per 5, ' +
            '`FIZZBUZZ` se è divisibile per 3 e per 5, ' +
            'e il numero stesso per qualsiasi altro numero.')
    }

    public override floatFormatSpecification(): ConversationText {
        return ConversationLanguage.bless('Restituisci `true` se il testo rappresenta un numero in virgola mobile e `false` altrimenti. ' +
            'Un numero in virgola mobile può iniziare con un segno più o meno. ' +
            'Questo è seguito da una o più cifre. ' +
            'Se è seguito da un punto, allora devono seguire una o più cifre.')
    }

    public override leapYearSpecification(): ConversationText {
        return ConversationLanguage.bless('Restituisci `true` se l\'anno è bisestile e `false` altrimenti. ' +
            'Un anno è bisestile se è divisibile per 4. ' +
            'L\'eccezione è che gli anni divisibili per 100 non sono bisestili, a meno che non siano anche divisibili per 400.')
    }

    public override passwordStrengthSpecification(): ConversationText {
        return ConversationLanguage.bless('Restituisci `true` se la password è forte e `false` altrimenti. ' +
            'Una password è forte se contiene almeno 5 caratteri, una lettera maiuscola, una lettera minuscola e un carattere speciale (`#` o `@`).')
    }

    public override speedDisplaySpecification(): ConversationText {
        return ConversationLanguage.bless('Il sensore di velocità indica la velocità in decimi di chilometri all\'ora (es. 131 significa 13.1 km/h). ' +
            'Restituisci la velocità come mostrata sul display. ' +
            'Usa un decimale se entra nel display (es. 131 → `13.1`). ' +
            'Altrimenti, mostra solo i chilometri interi, senza il decimale (es. 876 → `87`). ' +
            'Se la macchina non si muove, restituisci `START`. ' +
            'Se la velocità non entra più nel display, restituisci `DANGER` (es. 3000 → `DANGER`).\n' +
            'Il display è così, dove ogni X è una luce LED:\n' +
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
        return ConversationLanguage.bless('Restituisci il tipo di triangolo: `EQUILATERAL` (equilatero), `ISOSCELES` (isoscele) o `SCALENE` (scaleno). ' +
            'Un triangolo è equilatero se tutti e tre i lati hanno la stessa lunghezza. ' +
            'Un triangolo è isoscele se esattamente due lati hanno la stessa lunghezza. ' +
            'Un triangolo è scaleno se tutti e tre i lati hanno lunghezze diverse.')
    }

    public override votingAgeSpecification(): ConversationText {
        return ConversationLanguage.bless('Restituisci `true` se l\'età è `18` o più, e `false` altrimenti.')
    }

    public override reviewSpecification(): ConversationText {
        return ConversationLanguage.bless('Restituisci `GOOD` se il prezzo è inferiore a `20` e la qualità è almeno `7`. ' +
            'Restituisci `BAD` se il prezzo è `20` o più e la qualità è inferiore a `7`. ' +
            'Restituisci `OK` in tutti gli altri casi.')
    }

    public override or(): ConversationText {
        return ConversationLanguage.bless('o')
    }
}

import { ConversationLanguage, ConversationText } from './conversation-language-base.js'

export class Italian extends ConversationLanguage {
    public override readonly id = 'it' as const
    public override readonly name = 'Italiano'

    public override welcome(): ConversationText {
        return ConversationLanguage.bless('Ciao! Sono un bot IA che scrive codice. ' +
            'Il tuo compito è guidarmi con i unit tests.')
    }

    public override unitTestGameTitle(): ConversationText {
        return ConversationLanguage.bless('UnitTestGame')
    }

    public override slogan(): ConversationText {
        return ConversationLanguage.bless('![Logo di UnitTestGame](apple-touch-icon.png)Impara a scrivere unit tests che guidano un bot IA.')
    }

    public override home(): ConversationText {
        return ConversationLanguage.bless('[Home](/)')
    }

    public override settingsTitle(): ConversationText {
        return ConversationLanguage.bless('Impostazioni')
    }

    public override changeLanguage(): ConversationText {
        return ConversationLanguage.bless('Lingua di conversazione')
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

    public override playButton(): ConversationText {
        return ConversationLanguage.bless('Gioca')
    }

    public override retryButton(): ConversationText {
        return ConversationLanguage.bless('Riprova')
    }

    public override retryLevelButton(levelDescription: string): ConversationText {
        return ConversationLanguage.bless(`Voglio riprovare ${levelDescription}`)
    }

    public override lockedButton(): ConversationText {
        return ConversationLanguage.bless('Bloccato')
    }

    public override allLevels(): ConversationText {
        return ConversationLanguage.bless('Ho completato tutti i livelli')
    }

    public override closeTab(): ConversationText {
        return ConversationLanguage.bless('Bravo! Hai completato tutti i livelli. ' +
            'Ora puoi scrivere unit tests per i tuoi progetti.')
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
            'quindi non ho migliorato la *Funzione Attuale*.')
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
        return ConversationLanguage.bless('Uno smartphone normalmente funziona in `"NORMAL MODE"`, ' +
            'ma quando il livello della batteria è inferiore a `20`, ' +
            'funziona in `"LOW POWER MODE"`.')
    }

    public override wrongAction(): ConversationText {
        return ConversationLanguage.bless('Hmm, non è del tutto corretto. ' +
            'Riprova.')
    }

    public override addBatteryLevel20(): ConversationText {
        return ConversationLanguage.bless('La *Specifica* contiene il numero `20`. ' +
            'Questo è un buon punto di partenza. ' +
            'Quando il livello della batteria è `20`, la funzione deve restituire `"NORMAL MODE"`.')
    }

    public override addBatteryLevel19(): ConversationText {
        return ConversationLanguage.bless('La *Funzione Attuale* ora restituisce sempre `"NORMAL MODE"`, ' +
            'ma la *Specifica* dice che il livello della batteria `19` deve restituire `"LOW POWER MODE"`. ' +
            'Aggiungi un unit test per questo.')
    }

    public override submitUnitTestsFirst(): ConversationText {
        return ConversationLanguage.bless('La *Funzione Attuale* ora può restituire `"NORMAL MODE"` o `"LOW POWER MODE"`. ' +
            'Invia i *Unit Tests* per verificare se la *Funzione Attuale* corrisponde alla *Specifica*.')
    }

    public override addBatteryLevel21(): ConversationText {
        return ConversationLanguage.bless('La *Funzione Attuale* ora restituisce `"NORMAL MODE"` solo per il livello della batteria `20`. ' +
            'La *Specifica* dice che `21` deve anche restituire `"NORMAL MODE"`. ' +
            'Aggiungi un unit test per questo.')
    }

    public override submitUnitTestsSecond(): ConversationText {
        return ConversationLanguage.bless('Invia di nuovo i *Unit Tests* per verificare se la *Funzione Attuale* corrisponde alla *Specifica*.')
    }

    public override addBatteryLevel18(): ConversationText {
        return ConversationLanguage.bless('La *Funzione Attuale* ora restituisce `"LOW POWER MODE"` solo per il livello della batteria `19`. ' +
            'La *Specifica* dice che `18` deve anche restituire `"LOW POWER MODE"`. ' +
            'Aggiungi un unit test per questo.')
    }

    public override submitUnitTestsThird(): ConversationText {
        return ConversationLanguage.bless('Invia di nuovo i *Unit Tests* per verificare se la *Funzione Attuale* corrisponde finalmente alla *Specifica*.')
    }

    public override votingAgeSpecification(): ConversationText {
        return ConversationLanguage.bless('Puoi votare se la tua età è `18` o più.')
    }

    public override windScaleSpecification(): ConversationText {
        return ConversationLanguage.bless('È `"CALM"` se la velocità del vento è inferiore a `20`, ' +
            '`"BREEZE"` se è inferiore a `50`, ' +
            '`"GALE"` se è inferiore a `90`, ' +
            'e `"STORM"` in tutti gli altri casi.')
    }

    public override reviewSpecification(): ConversationText {
        return ConversationLanguage.bless('La tua recensione è `"GOOD"` se il prezzo è inferiore a `20` e la qualità è almeno `7`, ' +
            '`"BAD"` se il prezzo è `20` o più e la qualità è inferiore a `7`, ' +
            'e `"OK"` altrimenti.')
    }

    public override discountSpecification(): ConversationText {
        return ConversationLanguage.bless('Ottieni il `20`% di sconto se il totale è almeno `200` e hai una tessera socio, ' +
            'il `10`% se il totale è almeno `100` o hai una tessera socio, ' +
            'e lo `0`% altrimenti.')
    }

    public override fizzBuzzSpecification(): ConversationText {
        return ConversationLanguage.bless('Di\' `"FIZZ"` se il numero è divisibile per 3, ' +
            '`"BUZZ"` se è divisibile per 5, ' +
            '`"FIZZBUZZ"` se è divisibile per 3 e per 5, ' +
            'e `"NUMBER"` per qualsiasi altro numero.')
    }

    public override leapYearSpecification(): ConversationText {
        return ConversationLanguage.bless('Restituisci `true` se l\'anno è bisestile e `false` altrimenti. ' +
            'Un anno è bisestile se è divisibile per 4. ' +
            'L\'eccezione è che gli anni divisibili per 100 non sono bisestili, a meno che non siano anche divisibili per 400.')
    }

    public override triangleTypeSpecification(): ConversationText {
        return ConversationLanguage.bless('Il tipo di triangolo è `"EQUILATERAL"` (equilatero), `"ISOSCELES"` (isoscele) o `"SCALENE"` (scaleno). ' +
            'Un triangolo è equilatero se tutti e tre i lati hanno la stessa lunghezza. ' +
            'Un triangolo è isoscele se esattamente due lati hanno la stessa lunghezza. ' +
            'Un triangolo è scaleno se tutti e tre i lati hanno lunghezze diverse.')
    }

    public override speedDisplaySpecification(): ConversationText {
        return ConversationLanguage.bless('Il sensore di velocità indica la velocità in decimi di chilometri all\'ora (es. 131 significa 13.1 km/h). ' +
            'Mostra sul display `"DECIMAL"` se un decimale ci entra (es. 131 → `"DECIMAL"` perché 13.1 entra nel display), ' +
            'oppure `"INTEGER"` altrimenti (es. 826 → `"INTEGER"` perché 82.6 non entra nel display ma 83 sì). ' +
            'Se la macchina non si muove, è `"START"`. ' +
            'Se la velocità non entra più nel display, è `"DANGER"` (es. 3000 → `"DANGER"`).\n' +
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

    public override parkingFeeSpecification(): ConversationText {
        return ConversationLanguage.bless('La tariffa di parcheggio è di `0` centesimi se l\'auto è parcheggiata per meno di mezz\'ora, o se il cliente ha fatto acquisti nel weekend. ' +
            'È di `1000` centesimi se è fine settimana. ' +
            'Altrimenti, è di 5 centesimi al minuto se il cliente non ha fatto acquisti, o di 3 centesimi al minuto se il cliente ha fatto acquisti.')
    }

    public override or(): ConversationText {
        return ConversationLanguage.bless('o')
    }

    public override parameterLabel(parameterName: string): ConversationText {
        return ConversationLanguage.bless(`Valore del parametro ${parameterName}`)
    }

    public override returnValueLabel(functionCall: string): ConversationText {
        return ConversationLanguage.bless(`Risultato di ${functionCall}`)
    }

    public override indexMetaDescription(): ConversationText {
        return ConversationLanguage.bless('Impara a scrivere unit test efficaci con un gioco interattivo in cui devi lavorare con un bot IA ostile.')
    }

    public override indexPageTitle(): ConversationText {
        return ConversationLanguage.bless('UnitTestGame.com: Supera il bot IA che gioca contro di te')
    }

    public override navHowItWorks(): ConversationText {
        return ConversationLanguage.bless('Come funziona')
    }

    public override navLevels(): ConversationText {
        return ConversationLanguage.bless('Livelli')
    }

    public override navWhyItWorks(): ConversationText {
        return ConversationLanguage.bless('Perché funziona')
    }

    public override navPlayNow(): ConversationText {
        return ConversationLanguage.bless('[Gioca ora](game?conversation_language=it)')
    }

    public override heroTitleLine1Start(): ConversationText {
        return ConversationLanguage.bless('Il codice supera')
    }

    public override heroTitleLine1Gradient(): ConversationText {
        return ConversationLanguage.bless('i tuoi unit test.')
    }

    public override heroTitleLine2Start(): ConversationText {
        return ConversationLanguage.bless('Ma fa quello che')
    }

    public override heroTitleLine2Gradient(): ConversationText {
        return ConversationLanguage.bless('vuoi davvero?')
    }

    public override heroSubtitle(): ConversationText {
        return ConversationLanguage.bless('UnitTestGame ti abbina a un bot IA ostile. ' +
            'Scrive codice corretto che soddisfa i tuoi unit test. ' +
            'E niente di più. ' +
            'Il tuo compito: scrivere unit test finché il programma non è corretto.')
    }

    public override heroCtaPrimary(): ConversationText {
        return ConversationLanguage.bless('[Gioca gratis nel tuo browser →](game?conversation_language=it)')
    }

    public override heroCtaSecondary(): ConversationText {
        return ConversationLanguage.bless('Scopri come funziona')
    }

    public override humanWantsToAddUnitTest(): ConversationText {
        return ConversationLanguage.bless('Voglio aggiungere questo unit test.')
    }

    public override heroCommentThisIsYou(): ConversationText {
        return ConversationLanguage.bless('questo sei tu ↑')
    }

    public override heroCommentFirstUnitTest(): ConversationText {
        return ConversationLanguage.bless('con il tuo primo unit test')
    }

    public override heroCommentThisIsTheAiBot(): ConversationText {
        return ConversationLanguage.bless('↑ questo è il bot IA')
    }

    public override heroCommentFirstFunctionPasses(): ConversationText {
        return ConversationLanguage.bless('la sua prima funzione supera il tuo unit test')
    }

    public override heroCommentFirstVerdict(): ConversationText {
        return ConversationLanguage.bless('ma non generalizza 👎')
    }

    public override heroCommentThisIsYouAgain(): ConversationText {
        return ConversationLanguage.bless('questo sei di nuovo tu ↑')
    }

    public override heroCommentSecondUnitTest(): ConversationText {
        return ConversationLanguage.bless('ora con il tuo secondo unit test')
    }

    public override heroCommentThisIsTheAiBotAgain(): ConversationText {
        return ConversationLanguage.bless('↑ questo è di nuovo il bot IA')
    }

    public override heroCommentSecondFunctionPasses(): ConversationText {
        return ConversationLanguage.bless('la sua seconda funzione supera entrambi i unit test')
    }

    public override heroCommentSecondVerdict(): ConversationText {
        return ConversationLanguage.bless('e ora generalizza 👍')
    }

    public override howItWorksTitle(): ConversationText {
        return ConversationLanguage.bless('Impara i unit test con la pratica')
    }

    public override howItWorksSubtitle(): ConversationText {
        return ConversationLanguage.bless('Niente video. ' +
            'Niente quiz. ' +
            'Solo un bot IA che sfrutta ogni falla nei tuoi unit test.')
    }

    public override howItWorksStep1Title(): ConversationText {
        return ConversationLanguage.bless('Leggi la spec')
    }

    public override howItWorksStep1Desc(): ConversationText {
        return ConversationLanguage.bless('Scopri cosa dovrebbe fare la funzione, ' +
            'in semplici termini di input → output.')
    }

    public override howItWorksStep2Title(): ConversationText {
        return ConversationLanguage.bless('Guardalo barare')
    }

    public override howItWorksStep2Desc(): ConversationText {
        return ConversationLanguage.bless('Il bot IA scrive codice corretto ' +
            'che soddisfa esattamente quello che hai testato.')
    }

    public override howItWorksStep3Title(): ConversationText {
        return ConversationLanguage.bless('Trova la falla')
    }

    public override howItWorksStep3Desc(): ConversationText {
        return ConversationLanguage.bless('Individua il caso limite che ha evitato, ' +
            'e aggiungi un unit test che lo smascheri.')
    }

    public override howItWorksStep4Title(): ConversationText {
        return ConversationLanguage.bless('Continua finché non è corretto')
    }

    public override howItWorksStep4Desc(): ConversationText {
        return ConversationLanguage.bless('Ripeti finché non c\'è più un altro modo. ' +
            'Livello completato!')
    }

    public override whyItWorksTitle(): ConversationText {
        return ConversationLanguage.bless('Per sviluppatori che vogliono prevenire i bug')
    }

    public override whyItWorksSubtitle(): ConversationText {
        return ConversationLanguage.bless('Si gioca come un gioco. ' +
            'Diventa un\'abitudine. ' +
            'Cambia il tuo modo di testare.')
    }

    public override whyItWorksItem1Title(): ConversationText {
        return ConversationLanguage.bless('Un avversario alla tua altezza')
    }

    public override whyItWorksItem1Desc(): ConversationText {
        return ConversationLanguage.bless('Il bot IA gioca contro di te. ' +
            'Ogni mossa è una lezione sul tuo punto cieco.')
    }

    public override whyItWorksItem2Title(): ConversationText {
        return ConversationLanguage.bless('Difficoltà crescente')
    }

    public override whyItWorksItem2Desc(): ConversationText {
        return ConversationLanguage.bless('Inizia con i livelli batteria. ' +
            'Finisci a districare display di velocità e tariffe di parcheggio.')
    }

    public override whyItWorksItem3Title(): ConversationText {
        return ConversationLanguage.bless('Progressione reale')
    }

    public override whyItWorksItem3Desc(): ConversationText {
        return ConversationLanguage.bless('Un tabellone dei punteggi tiene traccia di cosa hai sbloccato, ' +
            'così sai sempre cosa viene dopo.')
    }

    public override whyItWorksItem4Title(): ConversationText {
        return ConversationLanguage.bless('Sei lingue')
    }

    public override languagesList(): ConversationText {
        return ConversationLanguage.bless('In italiano ovviamente, ma anche in ' +
            '[inglese](index), [olandese](index?conversation_language=nl), [tedesco](index?conversation_language=de), ' +
            '[francese](index?conversation_language=fr) o [spagnolo](index?conversation_language=es).')
    }

    public override whyItWorksItem5Title(): ConversationText {
        return ConversationLanguage.bless('Sette linguaggi di programmazione')
    }

    public override programmingLanguagesList(): ConversationText {
        return ConversationLanguage.bless('Lascia che il bot IA scriva programmi in ' +
            '[JavaScript](game?conversation_language=it&programming_language=javascript), [TypeScript](game?conversation_language=it&programming_language=typescript), ' +
            '[Python](game?conversation_language=it&programming_language=python), [Java](game?conversation_language=it&programming_language=java), ' +
            '[C#](game?conversation_language=it&programming_language=csharp), [PHP](game?conversation_language=it&programming_language=php) ' +
            'o [Ruby](game?conversation_language=it&programming_language=ruby).')
    }

    public override whyItWorksItem6Title(): ConversationText {
        return ConversationLanguage.bless('Nessuna configurazione')
    }

    public override whyItWorksItem6Desc(): ConversationText {
        return ConversationLanguage.bless('Funziona interamente nel browser. ' +
            'Nessun account, nessuna installazione, nessuna dipendenza.')
    }

    public override levelsTitle(): ConversationText {
        return ConversationLanguage.bless('Dieci livelli, dieci modi per essere battuto')
    }

    public override levelsSubtitle(): ConversationText {
        return ConversationLanguage.bless('Ognuno sembra semplice. ' +
            'Finché il bot IA non trova qualcosa che hai dimenticato di testare.')
    }

    public override levelsDifficultyEasy(): ConversationText {
        return ConversationLanguage.bless('facile')
    }

    public override levelsDifficultyMedium(): ConversationText {
        return ConversationLanguage.bless('medio')
    }

    public override levelsDifficultyHard(): ConversationText {
        return ConversationLanguage.bless('difficile')
    }

    public override levelBlurb0(): ConversationText {
        return ConversationLanguage.bless('Il bot IA te lo mostra per primo. Poi tocca a te.')
    }

    public override levelBlurb1(): ConversationText {
        return ConversationLanguage.bless('Puoi votare? Due possibili esiti.')
    }

    public override levelBlurb2(): ConversationText {
        return ConversationLanguage.bless('Tre soglie tra calma e tempesta.')
    }

    public override levelBlurb3(): ConversationText {
        return ConversationLanguage.bless('Prezzo e qualità, l\'uno contro l\'altro.')
    }

    public override levelBlurb4(): ConversationText {
        return ConversationLanguage.bless('Un carrello pieno, una tessera socio, o entrambi insieme.')
    }

    public override levelBlurb5(): ConversationText {
        return ConversationLanguage.bless('Tutti conoscono FizzBuzz. Il bot no.')
    }

    public override levelBlurb6(): ConversationText {
        return ConversationLanguage.bless('Un\'eccezione all\'eccezione della regola.')
    }

    public override levelBlurb7(): ConversationText {
        return ConversationLanguage.bless('Ogni lato cambia il verdetto.')
    }

    public override levelBlurb8(): ConversationText {
        return ConversationLanguage.bless('Il display fisico ha dei limiti. Trovali tutti.')
    }

    public override levelBlurb9(): ConversationText {
        return ConversationLanguage.bless('Gratis, forfettario, o al minuto. E adesso?')
    }

    public override faqTitle(): ConversationText {
        return ConversationLanguage.bless('Domande frequenti')
    }

    public override faqSubtitle(): ConversationText {
        return ConversationLanguage.bless('Niente discorsi di vendita. Solo risposte.')
    }

    public override faqQuestion1(): ConversationText {
        return ConversationLanguage.bless('È davvero gratis?')
    }

    public override faqAnswer1(): ConversationText {
        return ConversationLanguage.bless('Sì. Niente pubblicità, niente tracciamento, nessun paywall. Solo un gioco gratuito.')
    }

    public override faqQuestion2(): ConversationText {
        return ConversationLanguage.bless('Quali linguaggi di programmazione sono supportati?')
    }

    public override faqQuestion3(): ConversationText {
        return ConversationLanguage.bless('Quali lingue sono supportate?')
    }

    public override faqQuestion4(): ConversationText {
        return ConversationLanguage.bless('Devo installare qualcosa?')
    }

    public override faqAnswer4(): ConversationText {
        return ConversationLanguage.bless('No. Funziona interamente nel tuo browser. Senza librerie esterne.')
    }

    public override faqQuestion5(): ConversationText {
        return ConversationLanguage.bless('Ho bisogno di un account?')
    }

    public override faqAnswer5(): ConversationText {
        return ConversationLanguage.bless('No. Puoi giocare solo in modo anonimo.')
    }

    public override faqQuestion6(): ConversationText {
        return ConversationLanguage.bless('Quali informazioni vengono salvate?')
    }

    public override faqAnswer6(): ConversationText {
        return ConversationLanguage.bless('I tuoi progressi vengono salvati nel tuo browser. Non lasciano mai il tuo computer.')
    }

    public override faqQuestion7(): ConversationText {
        return ConversationLanguage.bless('È open source?')
    }

    public override faqAnswer7(): ConversationText {
        return ConversationLanguage.bless('Sì. Il codice sorgente è disponibile su GitHub.')
    }

    public override faqQuestion8(): ConversationText {
        return ConversationLanguage.bless('Chi l\'ha creato?')
    }

    public override faqAnswer8(): ConversationText {
        return ConversationLanguage.bless('Questo gioco è stato creato da un insegnante di informatica. Per amore della programmazione e dei test.')
    }

    public override ctaTitle(): ConversationText {
        return ConversationLanguage.bless('Il bot IA ti aspetta. Non farti fregare.')
    }

    public override ctaSubtitle(): ConversationText {
        return ConversationLanguage.bless('Clicca sul pulsante, segui le istruzioni, e guarda cosa cerca di combinare il bot IA.')
    }

    public override ctaButton(): ConversationText {
        return ConversationLanguage.bless('[Gioca a UnitTestGame gratis →](game?conversation_language=it)')
    }

    public override footerContact(): ConversationText {
        return ConversationLanguage.bless('Contatti')
    }
}

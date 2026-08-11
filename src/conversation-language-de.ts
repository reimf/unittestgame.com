import { ConversationLanguage, ConversationText } from './conversation-language-base.js'

export class German extends ConversationLanguage {
    public override readonly id = 'de' as const
    public override readonly name = 'Deutsch'

    public override welcome(): ConversationText {
        return ConversationLanguage.bless('Hallo! Ich bin ein KI-Bot, der Code schreibt. ' +
            'Deine Aufgabe ist es, mich mit Unit-Tests zu steuern.')
    }

    public override unitTestGameTitle(): ConversationText {
        return ConversationLanguage.bless('UnitTestGame')
    }

    public override slogan(): ConversationText {
        return ConversationLanguage.bless('![Logo von UnitTestGame](apple-touch-icon.png)Lerne, Unit-Tests zu schreiben, die einen KI-Bot steuern.')
    }

    public override home(): ConversationText {
        return ConversationLanguage.bless('[Startseite](/)')
    }

    public override settingsTitle(): ConversationText {
        return ConversationLanguage.bless('Einstellungen')
    }

    public override changeLanguage(): ConversationText {
        return ConversationLanguage.bless('Gesprächssprache')
    }

    public override changeProgrammingLanguage(): ConversationText {
        return ConversationLanguage.bless('Programmiersprache')
    }

    public override invitation(): ConversationText {
        return ConversationLanguage.bless('Welches Level möchtest du spielen?')
    }

    public override level(levelNumber: number, levelName: string): ConversationText {
        return ConversationLanguage.bless(`Level ${levelNumber} - ${levelName}`)
    }

    public override nextLevelButton(levelDescription: string): ConversationText {
        return ConversationLanguage.bless(`Ich möchte ${levelDescription} spielen`)
    }

    public override playButton(): ConversationText {
        return ConversationLanguage.bless('Spielen')
    }

    public override retryButton(): ConversationText {
        return ConversationLanguage.bless('Wiederholen')
    }

    public override retryLevelButton(levelDescription: string): ConversationText {
        return ConversationLanguage.bless(`Ich möchte ${levelDescription} wiederholen`)
    }

    public override lockedButton(): ConversationText {
        return ConversationLanguage.bless('Gesperrt')
    }

    public override allLevels(): ConversationText {
        return ConversationLanguage.bless('Ich habe alle Levels abgeschlossen')
    }

    public override closeTab(): ConversationText {
        return ConversationLanguage.bless('Gut gemacht! Du hast alle Levels abgeschlossen. ' +
            'Du kannst jetzt Unit-Tests für deine eigenen Projekte schreiben.')
    }

    public override unitTestsTitle(): ConversationText {
        return ConversationLanguage.bless('Unit-Tests')
    }

    public override addUnitTestButton(): ConversationText {
        return ConversationLanguage.bless('Ich möchte diesen Unit-Test hinzufügen')
    }

    public override submitUnitTestsButton(): ConversationText {
        return ConversationLanguage.bless('Ich möchte die Unit-Tests einreichen')
    }

    public override unitTestNotAdded(): ConversationText {
        return ConversationLanguage.bless('Ich habe den Unit-Test nicht hinzugefügt, ' +
            'weil er nicht der *Spezifikation* entspricht.')
    }

    public override tooManyUnitTests(numberOfUnnecessaryUnitTests: number, numberOfRedundantUnitTests: number): ConversationText {
        return ConversationLanguage.bless(`Du hast die *Aktuelle Funktion* gründlich getestet, ` +
            `aber du hast ${numberOfUnnecessaryUnitTests} ${numberOfUnnecessaryUnitTests === 1 ? 'Unit-Test' : 'Unit-Tests'} mehr als nötig geschrieben. ` +
            `${numberOfRedundantUnitTests === 1 ? 'Der folgende' : 'Mindestens einer der folgenden'} kann weggelassen werden.`)
    }

    public override readSpecification(): ConversationText {
        return ConversationLanguage.bless('Lies zuerst die *Spezifikation*. ' +
            'Schreibe dann einen Unit-Test, den die *Aktuelle Funktion* nicht besteht.')
    }

    public override improveCurrentFunction(): ConversationText {
        return ConversationLanguage.bless('Nachdem du einen Unit-Test hinzugefügt hast, ' +
            'verbessere ich die *Aktuelle Funktion*, damit alle *Unit-Tests* wieder bestehen.')
    }

    public override submitUnitTests(): ConversationText {
        return ConversationLanguage.bless('Reiche die *Unit-Tests* ein, wenn du denkst, dass die *Aktuelle Funktion* der *Spezifikation* entspricht.')
    }

    public override specificationTitle(description: string): ConversationText {
        return ConversationLanguage.bless(`Spezifikation (${description})`)
    }

    public override currentFunctionTitle(): ConversationText {
        return ConversationLanguage.bless('Aktuelle Funktion')
    }

    public override differenceTitle(): ConversationText {
        return ConversationLanguage.bless('Unterschied')
    }

    public override currentFunctionNotImproved(): ConversationText {
        return ConversationLanguage.bless('Ich habe den Unit-Test hinzugefügt, ' +
            'aber die *Aktuelle Funktion* besteht ihn bereits, ' +
            'also habe ich die *Aktuelle Funktion* nicht verbessert.')
    }

    public override hint(): ConversationText {
        return ConversationLanguage.bless('Schreibe einen Unit-Test, den die *Aktuelle Funktion* nicht besteht.')
    }

    public override currentFunctionImproved(numberOfUnitTests: number): ConversationText {
        return ConversationLanguage.bless(`Ich habe den Unit-Test zu den *Unit-Tests* hinzugefügt und die *Aktuelle Funktion* verbessert, ` +
            `damit der neue Unit-Test jetzt${numberOfUnitTests === 1 ? '' : ' auch'} besteht.`)
    }

    public override invalidUnitTest(): ConversationText {
        return ConversationLanguage.bless('Der folgende Unit-Test entspricht nicht der *Spezifikation*, ' +
            'aber die *Aktuelle Funktion* besteht ihn.')
    }

    public override moreUnitTests(numberOfUnitTestsStillNeeded: number): ConversationText {
        return ConversationLanguage.bless(`Die *Aktuelle Funktion* entspricht noch nicht der *Spezifikation*. ` +
            `Du brauchst noch mindestens ${numberOfUnitTestsStillNeeded} ${numberOfUnitTestsStillNeeded === 1 ? 'weiteren Unit-Test' : 'weitere Unit-Tests'}, ` +
            `also schreibe einen Unit-Test, der der *Spezifikation* entspricht und den die *Aktuelle Funktion* nicht besteht.`)
    }

    public override currentFunctionCorrect(): ConversationText {
        return ConversationLanguage.bless('Gut gemacht! Die *Aktuelle Funktion* entspricht der *Spezifikation*.')
    }

    public override levelOverviewTitle(): ConversationText {
        return ConversationLanguage.bless('Level-Übersicht')
    }

    public override batteryLevelSpecification(): ConversationText {
        return ConversationLanguage.bless('Ein Smartphone funktioniert normalerweise im `"NORMAL MODE"`, ' +
            'aber wenn der Akkustand unter `20` liegt, ' +
            'funktioniert es im `"LOW POWER MODE"`.')
    }

    public override wrongAction(): ConversationText {
        return ConversationLanguage.bless('Hmm, das ist nicht ganz richtig. ' +
            'Versuche es erneut.')
    }

    public override addBatteryLevel20(): ConversationText {
        return ConversationLanguage.bless('Die *Spezifikation* enthält die Zahl `20`. ' +
            'Das ist ein guter Ausgangspunkt. ' +
            'Wenn der Akkustand `20` ist, muss die Funktion `"NORMAL MODE"` zurückgeben.')
    }

    public override addBatteryLevel19(): ConversationText {
        return ConversationLanguage.bless('Die *Aktuelle Funktion* gibt jetzt immer `"NORMAL MODE"` zurück, ' +
            'aber die *Spezifikation* sagt, dass Akkustand `19` `"LOW POWER MODE"` zurückgeben muss. ' +
            'Füge dafür einen Unit-Test hinzu.')
    }

    public override submitUnitTestsFirst(): ConversationText {
        return ConversationLanguage.bless('Die *Aktuelle Funktion* kann jetzt entweder `"NORMAL MODE"` oder `"LOW POWER MODE"` zurückgeben. ' +
            'Reiche die *Unit-Tests* ein, um zu prüfen, ob die *Aktuelle Funktion* der *Spezifikation* entspricht.')
    }

    public override addBatteryLevel21(): ConversationText {
        return ConversationLanguage.bless('Die *Aktuelle Funktion* gibt jetzt `"NORMAL MODE"` nur für Akkustand `20` zurück. ' +
            'Die *Spezifikation* sagt, dass `21` auch `"NORMAL MODE"` zurückgeben muss. ' +
            'Füge dafür einen Unit-Test hinzu.')
    }

    public override submitUnitTestsSecond(): ConversationText {
        return ConversationLanguage.bless('Reiche die *Unit-Tests* erneut ein, um zu prüfen, ob die *Aktuelle Funktion* der *Spezifikation* entspricht.')
    }

    public override addBatteryLevel18(): ConversationText {
        return ConversationLanguage.bless('Die *Aktuelle Funktion* gibt jetzt `"LOW POWER MODE"` nur für Akkustand `19` zurück. ' +
            'Die *Spezifikation* sagt, dass `18` auch `"LOW POWER MODE"` zurückgeben muss. ' +
            'Füge dafür einen Unit-Test hinzu.')
    }

    public override submitUnitTestsThird(): ConversationText {
        return ConversationLanguage.bless('Reiche die *Unit-Tests* erneut ein, um zu prüfen, ob die *Aktuelle Funktion* endlich der *Spezifikation* entspricht.')
    }

    public override votingAgeSpecification(): ConversationText {
        return ConversationLanguage.bless('Du darfst wählen, wenn dein Alter `18` oder älter ist.')
    }

    public override windScaleSpecification(): ConversationText {
        return ConversationLanguage.bless('Es ist `"CALM"`, wenn die Windgeschwindigkeit weniger als `20` beträgt, ' +
            '`"BREEZE"`, wenn sie weniger als `50` beträgt, ' +
            '`"GALE"`, wenn sie weniger als `90` beträgt, ' +
            'und andernfalls `"STORM"`.')
    }

    public override reviewSpecification(): ConversationText {
        return ConversationLanguage.bless('Deine Bewertung ist `"GOOD"`, wenn der Preis weniger als `20` ist und die Qualität mindestens `7` beträgt, ' +
            '`"BAD"`, wenn der Preis `20` oder mehr ist und die Qualität weniger als `7` beträgt, ' +
            'und sonst `"OK"`.')
    }

    public override discountSpecification(): ConversationText {
        return ConversationLanguage.bless('Du bekommst `20`% Rabatt, wenn der Gesamtbetrag mindestens `200` beträgt und du eine Mitgliedskarte hast, ' +
            '`10`%, wenn der Gesamtbetrag mindestens `100` beträgt oder du eine Mitgliedskarte hast, ' +
            'und sonst `0`%.')
    }

    public override fizzBuzzSpecification(): ConversationText {
        return ConversationLanguage.bless('Sage `"FIZZ"`, wenn die Zahl durch 3 teilbar ist, ' +
            '`"BUZZ"`, wenn sie durch 5 teilbar ist, ' +
            '`"FIZZBUZZ"`, wenn sie durch 3 und 5 teilbar ist, ' +
            'und `"NUMBER"` für jede andere Zahl.')
    }

    public override leapYearSpecification(): ConversationText {
        return ConversationLanguage.bless('Gib `true` zurück, wenn das Jahr ein Schaltjahr ist, und sonst `false`. ' +
            'Ein Jahr ist ein Schaltjahr, wenn es durch 4 teilbar ist. ' +
            'Die Ausnahme ist, dass Jahre, die durch 100 teilbar sind, keine Schaltjahre sind, es sei denn, sie sind auch durch 400 teilbar.')
    }

    public override triangleTypeSpecification(): ConversationText {
        return ConversationLanguage.bless('Der Typ des Dreiecks ist `"EQUILATERAL"` (gleichseitig), `"ISOSCELES"` (gleichschenklig) oder `"SCALENE"` (ungleichseitig). ' +
            'Ein Dreieck ist gleichseitig, wenn alle drei Seiten gleich lang sind. ' +
            'Ein Dreieck ist gleichschenklig, wenn genau zwei Seiten gleich lang sind. ' +
            'Ein Dreieck ist ungleichseitig, wenn alle drei Seiten unterschiedliche Längen haben.')
    }

    public override speedDisplaySpecification(): ConversationText {
        return ConversationLanguage.bless('Der Geschwindigkeitssensor meldet die Geschwindigkeit in Zehnteln von Kilometern pro Stunde (z.B. 131 bedeutet 13.1 km/h). ' +
            'Zeige auf dem Display `"DECIMAL"`, wenn eine Dezimalstelle passt (z.B. 131 → `"DECIMAL"`, weil 13.1 auf das Display passt), ' +
            'oder sonst `"INTEGER"` (z.B. 826 → `"INTEGER"`, weil 82.6 nicht auf das Display passt, aber 83 schon). ' +
            'Wenn das Auto nicht fährt, ist es `"START"`. ' +
            'Wenn die Geschwindigkeit nicht mehr auf das Display passt, ist es `"DANGER"` (z.B. 3000 → `"DANGER"`).\n' +
            'Das Display sieht so aus, wobei jedes X eine LED-Leuchte ist:\n' +
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
        return ConversationLanguage.bless('Die Parkgebühr beträgt `0` Cent, wenn das Auto weniger als eine halbe Stunde geparkt ist, oder wenn der Kunde am Wochenende eingekauft hat. ' +
            'Sie beträgt `1000` Cent, wenn es Wochenende ist. ' +
            'Andernfalls beträgt sie 5 Cent pro Minute, wenn der Kunde nicht eingekauft hat, oder 3 Cent pro Minute, wenn der Kunde eingekauft hat.')
    }

    public override or(): ConversationText {
        return ConversationLanguage.bless('oder')
    }

    public override parameterLabel(parameterName: string): ConversationText {
        return ConversationLanguage.bless(`Wert von Parameter ${parameterName}`)
    }

    public override returnValueLabel(functionCall: string): ConversationText {
        return ConversationLanguage.bless(`Ergebnis von ${functionCall}`)
    }
}

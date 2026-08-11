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

    public override indexMetaDescription(): ConversationText {
        return ConversationLanguage.bless('Lerne effektive Unit-Tests zu schreiben mit einem interaktiven Spiel, in dem du mit einem gegnerischen KI-Bot zusammenarbeiten musst.')
    }

    public override indexPageTitle(): ConversationText {
        return ConversationLanguage.bless('UnitTestGame.com: Überliste den KI-Bot, der gegen dich arbeitet')
    }

    public override navHowItWorks(): ConversationText {
        return ConversationLanguage.bless('So funktioniert\'s')
    }

    public override navLevels(): ConversationText {
        return ConversationLanguage.bless('Levels')
    }

    public override navWhyItWorks(): ConversationText {
        return ConversationLanguage.bless('Warum es funktioniert')
    }

    public override navPlayNow(): ConversationText {
        return ConversationLanguage.bless('[Jetzt spielen](game?conversation_language=de)')
    }

    public override heroTitleLine1Start(): ConversationText {
        return ConversationLanguage.bless('Der Code besteht')
    }

    public override heroTitleLine1Gradient(): ConversationText {
        return ConversationLanguage.bless('deine Unit-Tests.')
    }

    public override heroTitleLine2Start(): ConversationText {
        return ConversationLanguage.bless('Aber macht er auch, was')
    }

    public override heroTitleLine2Gradient(): ConversationText {
        return ConversationLanguage.bless('du wirklich willst?')
    }

    public override heroSubtitle(): ConversationText {
        return ConversationLanguage.bless('UnitTestGame stellt dir einen gegnerischen KI-Bot zur Seite. ' +
            'Er schreibt korrekten Code, der deine Unit-Tests besteht. ' +
            'Und nichts weiter. ' +
            'Deine Aufgabe: Schreibe Unit-Tests, bis das Programm stimmt.')
    }

    public override heroCtaPrimary(): ConversationText {
        return ConversationLanguage.bless('[Kostenlos im Browser spielen →](game?conversation_language=de)')
    }

    public override heroCtaSecondary(): ConversationText {
        return ConversationLanguage.bless('Sieh, wie es funktioniert')
    }

    public override humanWantsToAddUnitTest(): ConversationText {
        return ConversationLanguage.bless('Ich möchte diesen Unit-Test hinzufügen.')
    }

    public override heroCommentThisIsYou(): ConversationText {
        return ConversationLanguage.bless('das bist du ↑')
    }

    public override heroCommentFirstUnitTest(): ConversationText {
        return ConversationLanguage.bless('mit deinem ersten Unit-Test')
    }

    public override heroCommentThisIsTheAiBot(): ConversationText {
        return ConversationLanguage.bless('↑ das ist der KI-Bot')
    }

    public override heroCommentFirstFunctionPasses(): ConversationText {
        return ConversationLanguage.bless('seine erste Funktion besteht deinen Unit-Test')
    }

    public override heroCommentFirstVerdict(): ConversationText {
        return ConversationLanguage.bless('aber sie verallgemeinert nicht 👎')
    }

    public override heroCommentThisIsYouAgain(): ConversationText {
        return ConversationLanguage.bless('das bist du wieder ↑')
    }

    public override heroCommentSecondUnitTest(): ConversationText {
        return ConversationLanguage.bless('jetzt mit deinem zweiten Unit-Test')
    }

    public override heroCommentThisIsTheAiBotAgain(): ConversationText {
        return ConversationLanguage.bless('↑ das ist der KI-Bot wieder')
    }

    public override heroCommentSecondFunctionPasses(): ConversationText {
        return ConversationLanguage.bless('seine zweite Funktion besteht beide Unit-Tests')
    }

    public override heroCommentSecondVerdict(): ConversationText {
        return ConversationLanguage.bless('und jetzt verallgemeinert sie 👍')
    }

    public override howItWorksTitle(): ConversationText {
        return ConversationLanguage.bless('Lerne Unit-Tests aus dem Gefühl heraus zu schreiben')
    }

    public override howItWorksSubtitle(): ConversationText {
        return ConversationLanguage.bless('Keine Videos. ' +
            'Keine Quizze. ' +
            'Nur ein KI-Bot, der jede Lücke in deinen Unit-Tests ausnutzt.')
    }

    public override howItWorksStep1Title(): ConversationText {
        return ConversationLanguage.bless('Lies die Spec')
    }

    public override howItWorksStep1Desc(): ConversationText {
        return ConversationLanguage.bless('Sieh dir an, was die Funktion tun soll, ' +
            'in einfachen Input-→-Output-Begriffen.')
    }

    public override howItWorksStep2Title(): ConversationText {
        return ConversationLanguage.bless('Sieh ihm beim Schummeln zu')
    }

    public override howItWorksStep2Desc(): ConversationText {
        return ConversationLanguage.bless('Der KI-Bot schreibt korrekten Code, ' +
            'der genau das erfüllt, was du getestet hast.')
    }

    public override howItWorksStep3Title(): ConversationText {
        return ConversationLanguage.bless('Finde die Lücke')
    }

    public override howItWorksStep3Desc(): ConversationText {
        return ConversationLanguage.bless('Erkenne den Grenzfall, dem er ausgewichen ist, ' +
            'und füge einen Unit-Test hinzu, der ihn aufdeckt.')
    }

    public override howItWorksStep4Title(): ConversationText {
        return ConversationLanguage.bless('Mach weiter, bis es stimmt')
    }

    public override howItWorksStep4Desc(): ConversationText {
        return ConversationLanguage.bless('Wiederhole, bis es keinen anderen Weg mehr gibt. ' +
            'Level geschafft!')
    }

    public override whyItWorksTitle(): ConversationText {
        return ConversationLanguage.bless('Für Entwickler, die Bugs vermeiden wollen')
    }

    public override whyItWorksSubtitle(): ConversationText {
        return ConversationLanguage.bless('Es spielt sich wie ein Spiel. ' +
            'Es wird zur Gewohnheit. ' +
            'Es verändert deine Art zu testen.')
    }

    public override whyItWorksItem1Title(): ConversationText {
        return ConversationLanguage.bless('Ein würdiger Gegner')
    }

    public override whyItWorksItem1Desc(): ConversationText {
        return ConversationLanguage.bless('Der KI-Bot arbeitet gegen dich. ' +
            'Jeder Zug ist eine Lektion über deinen blinden Fleck.')
    }

    public override whyItWorksItem2Title(): ConversationText {
        return ConversationLanguage.bless('Steigender Schwierigkeitsgrad')
    }

    public override whyItWorksItem2Desc(): ConversationText {
        return ConversationLanguage.bless('Beginne mit Batteriestufen. ' +
            'Ende beim Entwirren von Geschwindigkeitsanzeigen und Parkgebühren.')
    }

    public override whyItWorksItem3Title(): ConversationText {
        return ConversationLanguage.bless('Echter Fortschritt')
    }

    public override whyItWorksItem3Desc(): ConversationText {
        return ConversationLanguage.bless('Ein Scoreboard zeigt, was du freigeschaltet hast, ' +
            'sodass du immer weißt, was als Nächstes kommt.')
    }

    public override whyItWorksItem4Title(): ConversationText {
        return ConversationLanguage.bless('Sechs Sprachen')
    }

    public override languagesList(): ConversationText {
        return ConversationLanguage.bless('Auf Deutsch natürlich, aber auch auf ' +
            '[Englisch](index), [Niederländisch](index?conversation_language=nl), [Französisch](index?conversation_language=fr), ' +
            '[Spanisch](index?conversation_language=es) oder [Italienisch](index?conversation_language=it).')
    }

    public override whyItWorksItem5Title(): ConversationText {
        return ConversationLanguage.bless('Sieben Programmiersprachen')
    }

    public override programmingLanguagesList(): ConversationText {
        return ConversationLanguage.bless('Lass den KI-Bot Programme schreiben in ' +
            '[JavaScript](game?conversation_language=de&programming_language=javascript), [TypeScript](game?conversation_language=de&programming_language=typescript), ' +
            '[Python](game?conversation_language=de&programming_language=python), [Java](game?conversation_language=de&programming_language=java), ' +
            '[C#](game?conversation_language=de&programming_language=csharp), [PHP](game?conversation_language=de&programming_language=php) ' +
            'oder [Ruby](game?conversation_language=de&programming_language=ruby).')
    }

    public override whyItWorksItem6Title(): ConversationText {
        return ConversationLanguage.bless('Gar keine Einrichtung')
    }

    public override whyItWorksItem6Desc(): ConversationText {
        return ConversationLanguage.bless('Läuft komplett im Browser. ' +
            'Kein Konto, keine Installation, keine Abhängigkeiten.')
    }

    public override levelsTitle(): ConversationText {
        return ConversationLanguage.bless('Zehn Levels, zehn Arten, ausgetrickst zu werden')
    }

    public override levelsSubtitle(): ConversationText {
        return ConversationLanguage.bless('Jedes wirkt einfach. ' +
            'Bis der KI-Bot etwas findet, das du zu testen vergessen hast.')
    }

    public override levelsDifficultyEasy(): ConversationText {
        return ConversationLanguage.bless('leicht')
    }

    public override levelsDifficultyMedium(): ConversationText {
        return ConversationLanguage.bless('mittel')
    }

    public override levelsDifficultyHard(): ConversationText {
        return ConversationLanguage.bless('schwer')
    }

    public override levelBlurb0(): ConversationText {
        return ConversationLanguage.bless('Der KI-Bot macht es dir zuerst vor. Dann bist du dran.')
    }

    public override levelBlurb1(): ConversationText {
        return ConversationLanguage.bless('Darfst du wählen? Zwei mögliche Ergebnisse.')
    }

    public override levelBlurb2(): ConversationText {
        return ConversationLanguage.bless('Drei Schwellenwerte zwischen Flaute und Sturm.')
    }

    public override levelBlurb3(): ConversationText {
        return ConversationLanguage.bless('Preis und Qualität, gegeneinander.')
    }

    public override levelBlurb4(): ConversationText {
        return ConversationLanguage.bless('Ein voller Warenkorb, eine Mitgliedskarte, oder beides zugleich.')
    }

    public override levelBlurb5(): ConversationText {
        return ConversationLanguage.bless('Jeder kennt FizzBuzz. Der Bot nicht.')
    }

    public override levelBlurb6(): ConversationText {
        return ConversationLanguage.bless('Eine Ausnahme von der Ausnahme von der Regel.')
    }

    public override levelBlurb7(): ConversationText {
        return ConversationLanguage.bless('Jede Seite verändert das Urteil.')
    }

    public override levelBlurb8(): ConversationText {
        return ConversationLanguage.bless('Die physische Anzeige hat Grenzen. Finde sie alle.')
    }

    public override levelBlurb9(): ConversationText {
        return ConversationLanguage.bless('Kostenlos, pauschal, oder pro Minute. Was jetzt?')
    }

    public override faqTitle(): ConversationText {
        return ConversationLanguage.bless('Häufig gestellte Fragen')
    }

    public override faqSubtitle(): ConversationText {
        return ConversationLanguage.bless('Keine Verkaufsmasche. Nur Antworten.')
    }

    public override faqQuestion1(): ConversationText {
        return ConversationLanguage.bless('Ist es wirklich kostenlos?')
    }

    public override faqAnswer1(): ConversationText {
        return ConversationLanguage.bless('Ja. Keine Werbung, kein Tracking, keine Bezahlschranke. Einfach ein kostenloses Spiel.')
    }

    public override faqQuestion2(): ConversationText {
        return ConversationLanguage.bless('Welche Programmiersprachen werden unterstützt?')
    }

    public override faqQuestion3(): ConversationText {
        return ConversationLanguage.bless('Welche Sprachen werden unterstützt?')
    }

    public override faqQuestion4(): ConversationText {
        return ConversationLanguage.bless('Muss ich etwas installieren?')
    }

    public override faqAnswer4(): ConversationText {
        return ConversationLanguage.bless('Nein. Es läuft komplett in deinem Browser. Ohne externe Bibliotheken.')
    }

    public override faqQuestion5(): ConversationText {
        return ConversationLanguage.bless('Brauche ich ein Konto?')
    }

    public override faqAnswer5(): ConversationText {
        return ConversationLanguage.bless('Nein. Du kannst nur anonym spielen.')
    }

    public override faqQuestion6(): ConversationText {
        return ConversationLanguage.bless('Welche Informationen werden gespeichert?')
    }

    public override faqAnswer6(): ConversationText {
        return ConversationLanguage.bless('Dein Fortschritt wird in deinem Browser gespeichert. Er verlässt nie deinen Computer.')
    }

    public override faqQuestion7(): ConversationText {
        return ConversationLanguage.bless('Ist es Open Source?')
    }

    public override faqAnswer7(): ConversationText {
        return ConversationLanguage.bless('Ja. Der Quellcode ist auf GitHub verfügbar.')
    }

    public override faqQuestion8(): ConversationText {
        return ConversationLanguage.bless('Wer hat das gemacht?')
    }

    public override faqAnswer8(): ConversationText {
        return ConversationLanguage.bless('Dieses Spiel wurde von einem Informatiklehrer erstellt. Aus Liebe zum Programmieren und Testen.')
    }

    public override ctaTitle(): ConversationText {
        return ConversationLanguage.bless('Der KI-Bot wartet auf dich. Lass dich nicht reinlegen.')
    }

    public override ctaSubtitle(): ConversationText {
        return ConversationLanguage.bless('Klicke auf den Button, folge den Anweisungen, und sieh, womit der KI-Bot davonkommen will.')
    }

    public override ctaButton(): ConversationText {
        return ConversationLanguage.bless('[UnitTestGame kostenlos spielen →](game?conversation_language=de)')
    }

    public override footerContact(): ConversationText {
        return ConversationLanguage.bless('Kontakt')
    }
}

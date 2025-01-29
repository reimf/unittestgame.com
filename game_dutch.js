"use strict";
class Dutch extends Game {
    constructor() {
        super();
    }
    language() {
        return 'Nederlands';
    }
    menuTemplate(penaltyHint, penaltyBug, penaltyEnd, form) {
        return new Template([
            'Menu\n',
            '[1] Ik wil het Contract zien\n' +
                '[2] Ik wil de specificatie zien\n' +
                '[3] Ik wil een unit test toevoegen\n' +
                `[4] Ik wil een hint voor een unit test zien (-${this.formatScore(penaltyHint)})\n` +
                `[5] Ik wil de unit testen inleveren (-${this.formatScore(penaltyBug)} bij foutmelding)\n` +
                `[0] Ik wil het spel beëindigen (-${this.formatScore(penaltyEnd)} bij foutmelding)\n`,
            form,
        ]);
    }
    option1Template() {
        return new Template([
            'Optie 1\n',
            'Ik wil het contract zien.',
        ]);
    }
    option2Template() {
        return new Template([
            'Optie 2\n',
            'Ik wil de specificatie zien.',
        ]);
    }
    option4Template() {
        return new Template([
            'Optie 4\n',
            'Ik wil een hint voor een unit test zien.',
        ]);
    }
    option5Template() {
        return new Template([
            'Optie 5\n',
            'Ik wil de unit testen inleveren.',
        ]);
    }
    option0Template() {
        return new Template([
            'Optie 0\n',
            'Ik wil het spel beëindigen.',
        ]);
    }
    choiceLabel() {
        return 'Keuze';
    }
    noUnitTestsTemplate() {
        return new Template([
            'Unit testen\n',
            'Je hebt nog geen unit test geschreven.',
        ]);
    }
    unitTestsTemplate(unitTests) {
        return new Template([
            'Unit testen\n',
            ...unitTests
        ]);
    }
    currentCandidateTemplate(candidate) {
        return new Template([
            'Huidige functie\n',
            candidate,
        ]);
    }
    scoreTemplate(score) {
        return new Template([
            'Verdiensten\n',
            `${this.formatScore(score)}`,
        ]);
    }
    contractTemplate(initialScore, penaltyBug) {
        return new Template([
            'Contract\n',
            'Wij laten een nieuwe functie ontwikkelen door een extern softwarebedrijf.',
            'We hebben jou ingehuurd om te zorgen dat die functie ALTIJD het juiste resultaat geeft.',
            'Wat goede resultaten zijn staat beschreven in de specificatie.',
            'Jouw taak is om voldoende unit testen te schrijven voor die functie,',
            'zodat de functie geen foute resultaten meer kan geven.',
            `Voor het hele traject krijg je ${this.formatScore(initialScore)}.`,
            'In het menu staan bij sommige acties kosten vermeld voor jou.',
            'Als een gebruiker bijvoorbeeld een fout constateert in een functie die slaagt voor al jouw unit testen,',
            `dan betaal jij een boete van ${this.formatScore(penaltyBug)}.`,
        ]);
    }
    addUnitTestTemplate(form) {
        return new Template([
            'Unit test toevoegen\n',
            'Ik wil een unit test toevoegen.',
            form
        ]);
    }
    hintUnitTestTemplate(unitTest, penaltyHint) {
        return new Template([
            'Hint voor unit test\n',
            'Een unit test die nu niet slaagt is bijvoorbeeld de volgende.',
            unitTest,
            `De kosten voor deze hint zijn ${this.formatScore(penaltyHint)}.`,
        ]);
    }
    bugFoundTemplate(testResult, penaltyBug) {
        return new Template([
            'Unit testen inleveren\n',
            'Bedankt!',
            'We hebben de laatste versie van de functie in productie gebracht.',
            'Een klant heeft een fout in de functie gemeld.',
            'De functie gaf namelijk het volgende foutieve resultaat.',
            testResult,
            `Jouw bijdrage in de kosten om dat te herstellen is ${this.formatScore(penaltyBug)}.`,
        ]);
    }
    endWithBugTemplate() {
        return new Template([
            'Einde\n',
            'Er zitten nog fouten in de functie,',
            'dus we betalen je niets uit.',
            'Jammer!',
            'We hopen dat het de volgende keer beter gaat.',
            'Bedankt voor het spelen!',
        ]);
    }
    endPerfectTemplate(score) {
        return new Template([
            'Einde\n',
            'Gefeliciteerd!',
            'De functie is dankzij jouw unit testen helemaal foutloos.',
            `In totaal heb je de maximale ${this.formatScore(score)} verdiend.`,
            'Super!',
            'Bedankt voor het spelen!',
        ]);
    }
    endPositiveTemplate(score) {
        return new Template([
            'Einde\n',
            'Gefeliciteerd!',
            'De functie is dankzij jouw unit testen helemaal foutloos.',
            `In totaal heb je ${this.formatScore(score)} verdiend.`,
            'Goed gedaan!',
            'We denken dat je het de volgende keer nog beter gaat doen.',
            'Bedankt voor het spelen!',
        ]);
    }
    endNegativeTemplate(score) {
        return new Template([
            'Einde\n',
            'Gefeliciteerd!',
            'De functie is dankzij jouw unit testen helemaal foutloos.',
            `In totaal heb je ${this.formatScore(score)} verlies geleden.`,
            'Jammer!',
            'We hopen dat het de volgende keer beter gaat.',
            'Bedankt voor het spelen!',
        ]);
    }
    uselessUnitTestTemplate() {
        return new Template([
            'Unit test toegevoegd\n',
            'We hebben deze unit test toegevoegd.',
            'Je unit test lijkt erg veel op een eerdere unit test.',
            'We denken daarom dat deze unit test niet zo zinvol is.',
        ]);
    }
    usefulUnitTestTemplate() {
        return new Template([
            'Unit test toegevoegd\n',
            'We hebben deze unit test toegevoegd.',
            'De functie die het externe softwarebedrijf had geschreven bleek inderdaad niet de specificatie te volgen.',
            'Zij hebben de functie verbeterd en nu zou het beter moeten zijn.',
        ]);
    }
    incorrectUnitTestTemplate() {
        return new Template([
            'Unit test NIET toegevoegd\n',
            'We hebben je unit test naast de specificatie gelegd.',
            'Je unit test blijkt niet correct te zijn.',
            'We hebben de unit test dus niet toegevoegd aan onze code.',
        ]);
    }
    formatScore(score) {
        return `${score < 0 ? '-' : ''}€${Math.round(Math.abs(score) * 10)}`;
    }
}

abstract class Dutch extends Game {
    protected constructor() {
        super()
    }

    public language(): string {
        return 'Nederlands'
    }

    protected choiceLabel(): string {
        return 'Keuze'
    }

    protected buttonText(): string {
        return 'Ga!'
    }

    protected menuMessage(penaltyHint: number, penaltyBug: number, penaltyEnd: number, form: Form): Section {
        return new Section([
            new Paragraph('Ik wil…'),
            new Paragraph('[1] …het contract zien'),
            new Paragraph('[2] …de specificatie zien'),
            new Paragraph('[3] …een unit test toevoegen'),
            new Paragraph(`[4] …een hint voor een unit test zien (-${this.formatScore(penaltyHint)})`),
            new Paragraph(`[5] …de unit testen inleveren (-${this.formatScore(penaltyBug)} bij foutmelding)`),
            new Paragraph(`[0] …het spel beëindigen (-${this.formatScore(penaltyEnd)} bij foutmelding)`),
            form.toHtml(),
        ])
    }

    protected optionSeeContractMessage(): Section {
        return new Section([
            new Paragraph('Ik wil het contract zien.'),
        ])
    }

    protected optionSeeProblemDescriptionMessage(): Section {
        return new Section([
            new Paragraph('Ik wil de specificatie zien.'),
        ])
    }

    protected optionSeeHintMessage(): Section {
        return new Section([
            new Paragraph('Ik wil een hint voor een unit test zien.'),
        ])
    }

    protected optionSubmitMessage(): Section {
        return new Section([
            new Paragraph('Ik wil de unit testen inleveren.'),
        ])
    }

    protected optionEndMessage(): Section {
        return new Section([
            new Paragraph('Ik wil het spel beëindigen.'),
        ])
    }

    protected unitTestsPanel(unitTests: UnitTest[]): Section {
        const list = unitTests.length === 0
            ? [new Paragraph('Je hebt nog geen unit test geschreven.')]
            : unitTests.map(unitTest => unitTest.toHtml())
        return new Section([
            new Header('Unit testen\n'),
            ...list,
        ])
    }

    protected currentCandidatePanel(candidate: Candidate): Section {
        return new Section([
            new Header('Huidige functie\n'),
            candidate.toHtml(),
        ])
    }

    protected scorePanel(score: number): Section {
        return new Section([
            new Header('Verdiensten\n'),
            new Paragraph(`${this.formatScore(score)}`),
        ])
    }

    protected contractMessage(initialScore: number, penaltyBug: number): Section {
        return new Section([
            new Paragraph(
                'Wij laten een nieuwe functie ontwikkelen door een extern softwarebedrijf. ' +
                'We hebben jou ingehuurd om te zorgen dat die functie ALTIJD het juiste resultaat geeft. ' +
                'Wat goede resultaten zijn staat beschreven in de specificatie. ' +
                'Jouw taak is om voldoende unit testen te schrijven voor die functie, ' +
                'zodat de functie geen foute resultaten meer kan geven. ' +
                `Voor het hele traject krijg je ${this.formatScore(initialScore)}. ` +
                'In het menu staan bij sommige acties kosten vermeld voor jou. ' +
                'Als een gebruiker bijvoorbeeld een fout constateert in een functie die slaagt voor al jouw unit testen, ' +
                `dan betaal jij een boete van ${this.formatScore(penaltyBug)}.`
            ),
        ])
    }

    protected addUnitTestFormMessage(form: Form): Section {
        return new Section([
            new Paragraph('Ik wil een unit test toevoegen.'),
            form.toHtml(),
        ])
    }

    protected addUnitTestTextMessage(unitTest: UnitTest): Section {
        return new Section([
            new Paragraph('Ik wil de volgende unit test toevoegen:'),
            unitTest.toHtml(),
        ])
    }

    protected hintUnitTestMessage(unitTest: UnitTest, penaltyHint: number): Section {
        return new Section([
            new Paragraph('Een unit test die nu niet slaagt is bijvoorbeeld de volgende.'),
            unitTest.toHtml(),
            new Paragraph(`De kosten voor deze hint zijn ${this.formatScore(penaltyHint)}.`),
        ])
    }

    protected bugFoundMessage(testResult: TestResult, penaltyBug: number): Section {
        return new Section([
            new Paragraph(
                'Bedankt! ' +
                'We hebben de laatste versie van de functie in productie gebracht. ' +
                'Een klant heeft een fout in de functie gemeld. ' +
                'De functie gaf namelijk het volgende foutieve resultaat.'
            ),
            testResult.toHtml(),
            new Paragraph(`Jouw bijdrage in de kosten om dat te herstellen is ${this.formatScore(penaltyBug)}.`),
        ])
    }

    protected endWithBugMessage(): Section {
        return new Section([
            new Paragraph(
                'Er zitten nog fouten in de functie, ' +
                'dus we betalen je niets uit. ' +
                'Jammer! ' +
                'We hopen dat het de volgende keer beter gaat. ' +
                'Bedankt voor het spelen!'
            ),
        ])
    }

    protected endPerfectMessage(score: number): Section {
        return new Section([
            new Paragraph(
                'Gefeliciteerd! ' +
                'De functie is dankzij jouw unit testen helemaal foutloos. ' +
                `In totaal heb je de maximale ${this.formatScore(score)} verdiend. ` +
                'Super! ' +
                'Bedankt voor het spelen!'
            ),
        ])
    }

    protected endPositiveMessage(score: number): Section {
        return new Section([
            new Paragraph(
                'Gefeliciteerd! ' +
                'De functie is dankzij jouw unit testen helemaal foutloos. ' +
                `In totaal heb je ${this.formatScore(score)} verdiend. ` +
                'Goed gedaan! ' +
                'We denken dat je het de volgende keer nog beter gaat doen. ' +
                'Bedankt voor het spelen!'
            ),
        ])
    }

    protected endNegativeMessage(score: number): Section {
        return new Section([
            new Paragraph(
                'Gefeliciteerd! ' +
                'De functie is dankzij jouw unit testen helemaal foutloos. ' +
                `In totaal heb je ${this.formatScore(score)} verlies geleden. ` +
                'Jammer! ' +
                'We hopen dat het de volgende keer beter gaat. ' +
                'Bedankt voor het spelen!'
            ),
        ])
    }

    protected uselessUnitTestMessage(): Section {
        return new Section([
            new Paragraph(
                'We hebben deze unit test toegevoegd. ' +
                'De huidige functie slaagde al voor deze unit test. ' +
                'We denken daarom dat deze unit test niet zo zinvol is.'
            ),
        ])
    }

    protected usefulUnitTestMessage(): Section {
        return new Section([
            new Paragraph(
                'Gedaan.'
            ),
        ])
    }

    protected incorrectUnitTestMessage(): Section {
        return new Section([
            new Paragraph(
                'We hebben je unit test naast de specificatie gelegd. ' +
                'Je unit test blijkt niet correct te zijn. ' +
                'We hebben de unit test dus niet toegevoegd aan onze code.'
            ),
        ])
    }

    private formatScore(score: number): string {
        return `${score < 0 ? '-' : ''}€${Math.round(Math.abs(score) * 10)}`
    }
}

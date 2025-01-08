from game import Game
from template import Template


class Dutch(Game):
    def __init__(self):
        super().__init__()
        self.lang = 'nl'
        self.menu_template = Template(
            'Menu',
            '[1] Specificatie tonen        (gratis)\n',
            '[2] Contract tonen            (gratis)\n',
            '[3] Unit test toevoegen       (-€200)\n',
            '[4] Huidige functie tonen     (-€700)\n',
            '[5] Hint voor unit test tonen (-€200)\n',
            '[6] Perfecte functie tonen    (-€5000)\n',
            '[7] Unit testen inleveren     (-€1000 bij foutmelding, anders +€10000)\n',
            '[0] Einde',
        )
        self.choice_template = Template(
            '',
            'Keuze',
        )
        self.contract_template = Template(
            'Contract',
            'Jij moet unit testen schrijven zodat de functie NOOIT foute test resultaten geeft.',
            'Wat goede test resultaten zijn staat beschreven in de specificatie.',
            'Voor het hele traject krijg je €10000 achteraf.',
            'In het menu staan bij sommige acties kosten vermeld voor jou.',
            'Als een gebruiker bijvoorbeeld een fout constateert in de functie die slaagt voor al jouw unit testen,',
            'dan betaal jij €1000 als bijdrage aan de kosten die wij vervolgens moeten maken om dat te herstellen.',
        )
        self.earnings_template = Template(
            'Verdiensten tot nu toe',
            '{sign_value}€{absolute_value}',
        )
        self.unit_tests_template = Template(
            'Unit testen',
            '{unit_tests}',
        )
        self.early_payout_template = Template(
            'Eerdere uitbetaling',
            'Het gaat goed met het schrijven van unit testen!',
            'We betalen je daarom alvast €5000 van de beloofde €10000 uit.',
            'Gefeliciteerd!',
        )
        self.perfect_function_template = Template(
            'Perfecte functie',
            '{perfect_function}',
            'De kosten voor het tonen van de perfecte functie zijn €5000.',
        )
        self.current_function_template = Template(
            'Huidige functie',
            'Het externe softwarebedrijf heeft de volgende functie geschreven waarbij alle unit testen slagen.',
            '{worst_passing_function}',
            'De kosten voor het tonen van de functie zijn €700.',
        )
        self.hint_unit_test_template = Template(
            'Hint voor unit test',
            'Een unit test die nu niet slaagt is bijvoorbeeld de volgende.',
            '{failing_unit_test}',
            'De kosten voor deze hint zijn €200.',
        )
        self.add_unit_test_template = Template(
            'Unit test toevoegen',
        )
        self.useless_unit_test_template = Template(
            'Unit test toegevoegd',
            'We hebben deze unit test toegevoegd aan onze code.',
            'Je unit test lijkt erg veel op een eerdere unit test.',
            'We denken daarom dat deze unit test niet zo zinvol is.',
        )
        self.useful_unit_test_template = Template(
            'Unit test toegevoegd',
            'We hebben deze unit test toegevoegd aan onze code.',
            'We hebben geconstateerd dat er een fout zat in de functie die het externe softwarebedrijf had geschreven.',
            'We hebben de fout laten oplossen en nu slagen alle unit testen weer!',
        )
        self.incorrect_unit_test_template = Template(
            'Unit test NIET toegevoegd',
            'We hebben je unit test naast de specificatie gelegd.',
            'Je unit test blijkt niet correct te zijn.',
            'We hebben de unit test dus niet toegevoegd aan onze code.',
        )
        self.hand_in_unit_tests_template = Template(
            'Unit testen inleveren',
            'Bedankt!',
            'We hebben de laatste versie van de functie in productie gebracht.',
        )
        self.bug_found_template = Template(
            'Foutmelding van een klant',
            'Een klant heeft een fout in de functie gemeld.',
            'De functie gaf namelijk het volgende foutieve resultaat.',
            '{test_result}',
            'Jouw bijdrage in de kosten om dat te herstellen is €1000.',
        )
        self.no_bug_found_template = Template(
            'Geen foutmeldingen meer',
            'Klanten melden geen fouten meer in de functie.',
            'Bedankt daarvoor!',
        )
        self.end_negative_template = Template(
            'Einde',
            'Er zitten nog fouten in de functie,',
            'dus we betalen verder niets aan je uit.',
        )
        self.end_positive_template = Template(
            'Einde',
            'Gefeliciteerd! De functie is dankzij jouw unit testen helemaal foutloos.',
            'We betalen je dan ook met plezier de laatste €5000 uit.',
        )
        self.total_negative_template = Template(
            'Einde',
            'In totaal heb je €{absolute_value} verlies geleden.',
            'Jammer!',
            'We hopen dat het de volgende keer beter gaat.',
            'Bedankt voor het spelen!',
        )
        self.total_positive_template = Template(
            'Einde',
            'In totaal heb je €{absolute_value} verdiend.',
            'Super!',
            'We denken dat je het de volgende keer nog beter gaat doen.',
            'Bedankt voor het spelen!',
        )
        self.invalid_choice_template = Template(
            'Ongeldige keuze',
            'Je hebt ongeldige keuze "{choice}" ingevoerd.',
        )

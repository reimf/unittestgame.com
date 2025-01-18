from game import Game
from template import Template


class Dutch(Game):
    def __init__(self):
        super().__init__()
        self.lang = 'nl'
        self.menu_template = Template(
            'Menu\n',
            '----\n',
            '[1] Specificatie tonen\n',
            '[2] Contract tonen\n',
            '[3] Unit test toevoegen\n',
            '[4] Huidige functie tonen\n',
            '[5] Hint voor unit test tonen (-€200)\n',
            '[6] Perfecte functie tonen    (-€5000)\n',
            '[7] Unit testen inleveren     (-€1000 bij foutmelding, anders +€10000)\n',
            '[0] Einde',
        )
        self.choice_template = Template(
            'Keuze',
        )
        self.contract_template = Template(
            'Contract\n',
            '--------\n',
            'Wij laten een nieuwe functie ontwikkelen door een extern softwarebedrijf.',
            'We hebben jou ingehuurd om te zorgen dat die functie ALTIJD het juiste resultaat geeft.',
            'Wat goede resultaten zijn staat beschreven in de specificatie.',
            'Jouw taak is om voldoende unit testen te schrijven voor die functie,',
            'zodat de functie geen foute resultaten meer kan geven.',
            'Voor het hele traject krijg je €10000 achteraf.',
            'In het menu staan bij sommige acties kosten vermeld voor jou.',
            'Als een gebruiker bijvoorbeeld een fout constateert in een functie die slaagt voor al jouw unit testen,',
            'dan betaal jij een boete van €1000.',
        )
        self.earnings_template = Template(
            'Verdiensten tot nu toe\n',
            '----------------------\n',
            '{sign_value}€{absolute_value}',
        )
        self.no_unit_tests_template = Template(
            'Unit testen\n',
            '-----------\n',
            '(Je hebt nog geen unit test geschreven)',
        )
        self.unit_tests_template = Template(
            'Unit testen\n',
            '-----------\n',
            '{unit_tests}',
        )
        self.early_payout_template = Template(
            'Eerdere uitbetaling\n',
            '-------------------\n',
            'Het gaat goed met het schrijven van unit testen!',
            'We betalen je daarom alvast €5000 van de beloofde €10000 uit.',
            'Gefeliciteerd!',
        )
        self.perfect_function_template = Template(
            'Perfecte functie\n',
            '----------------\n',
            '{perfect_function}',
            'De kosten voor het tonen van de perfecte functie zijn €5000.',
        )
        self.current_function_template = Template(
            'Huidige functie\n',
            '---------------\n',
            '{worst_passing_function}',
        )
        self.hint_unit_test_template = Template(
            'Hint voor unit test\n',
            '-------------------\n',
            'Een unit test die nu niet slaagt is bijvoorbeeld de volgende.',
            '{failing_unit_test}',
            'De kosten voor deze hint zijn €200.',
        )
        self.add_unit_test_template = Template(
            'Unit test toevoegen\n',
            '-------------------',
        )
        self.useless_unit_test_template = Template(
            'Unit test toegevoegd\n',
            '--------------------\n',
            'We hebben deze unit test toegevoegd.',
            'Je unit test lijkt erg veel op een eerdere unit test.',
            'We denken daarom dat deze unit test niet zo zinvol is.',
        )
        self.useful_unit_test_template = Template(
            'Unit test toegevoegd\n',
            '--------------------\n',
            'We hebben deze unit test toegevoegd.',
            'De functie die het externe softwarebedrijf had geschreven bleek inderdaad niet de specificatie te volgen.',
            'Zij hebben de functie verbeterd en nu zou het beter moeten zijn.',
        )
        self.incorrect_unit_test_template = Template(
            'Unit test NIET toegevoegd\n',
            '-------------------------\n',
            'We hebben je unit test naast de specificatie gelegd.',
            'Je unit test blijkt niet correct te zijn.',
            'We hebben de unit test dus niet toegevoegd aan onze code.',
        )
        self.hand_in_unit_tests_template = Template(
            'Unit testen inleveren\n',
            '---------------------\n',
            'Bedankt!',
            'We hebben de laatste versie van de functie in productie gebracht.',
        )
        self.bug_found_template = Template(
            'Foutmelding van een klant\n',
            '-------------------------\n',
            'Een klant heeft een fout in de functie gemeld.',
            'De functie gaf namelijk het volgende foutieve resultaat.',
            '{test_result}',
            'Jouw bijdrage in de kosten om dat te herstellen is €1000.',
        )
        self.no_bug_found_template = Template(
            'Geen foutmeldingen meer\n',
            '-----------------------\n',
            'Klanten melden geen fouten meer in de functie.',
            'Bedankt daarvoor!',
        )
        self.end_negative_template = Template(
            'Einde\n',
            '-----\n',
            'Er zitten nog fouten in de functie,',
            'dus we betalen verder niets aan je uit.',
        )
        self.end_positive_template = Template(
            'Einde\n',
            '-----\n',
            'Gefeliciteerd! De functie is dankzij jouw unit testen helemaal foutloos.',
            'We betalen je dan ook met plezier de laatste €5000 uit.',
        )
        self.total_negative_template = Template(
            'Totaal\n',
            '------\n',
            'In totaal heb je €{absolute_value} verlies geleden.',
            'Jammer!',
            'We hopen dat het de volgende keer beter gaat.',
            'Bedankt voor het spelen!',
        )
        self.total_positive_template = Template(
            'Totaal\n',
            '------\n',
            'In totaal heb je €{absolute_value} verdiend.',
            'Super!',
            'We denken dat je het de volgende keer nog beter gaat doen.',
            'Bedankt voor het spelen!',
        )
        self.invalid_choice_template = Template(
            'Ongeldige keuze\n',
            '---------------\n',
            'Je hebt ongeldige keuze "{choice}" ingevoerd.',
        )

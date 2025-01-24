from game import Game
from template import Template


class Dutch(Game):
    def __init__(self):
        super().__init__()
        self.context = 'Nederlands'
        self.multiplier = 10
        self.menu_template = Template(
            'Menu\n',
            '----\n',
            '[1] Contract tonen\n',
            '[2] Specificatie tonen\n',
            '[3] Unit test toevoegen\n',
            '[4] Hint voor unit test tonen (-{penalty_hint})\n',
            '[5] Unit testen inleveren (-{penalty_bug} bij foutmelding)\n',
            '[0] Einde (-{penalty_end} bij foutmelding)\n',
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
            'Voor het hele traject krijg je {initial_score}.',
            'In het menu staan bij sommige acties kosten vermeld voor jou.',
            'Als een gebruiker bijvoorbeeld een fout constateert in een functie die slaagt voor al jouw unit testen,',
            'dan betaal jij een boete van {penalty_bug}.',
        )
        self.score_template = Template(
            'Verdiensten\n',
            '-----------\n',
            '{score}',
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
            'De kosten voor deze hint zijn {penalty_hint}.',
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
            'Jouw bijdrage in de kosten om dat te herstellen is {penalty_bug}.',
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
            'dus we betalen je niets uit.',
        )
        self.end_positive_template = Template(
            'Einde\n',
            '-----\n',
            'Gefeliciteerd! De functie is dankzij jouw unit testen helemaal foutloos.',
            'We betalen je dan ook met plezier {score} uit.',
        )
        self.total_negative_template = Template(
            'Totaal\n',
            '------\n',
            'In totaal heb je {score} verlies geleden.',
            'Jammer!',
            'We hopen dat het de volgende keer beter gaat.',
            'Bedankt voor het spelen!',
        )
        self.total_positive_template = Template(
            'Totaal\n',
            '------\n',
            'In totaal heb je {score} verdiend.',
            'Super!',
            'We denken dat je het de volgende keer nog beter gaat doen.',
            'Bedankt voor het spelen!',
        )
        self.invalid_choice_template = Template(
            'Ongeldige keuze\n',
            '---------------\n',
            'Je hebt ongeldige keuze "{choice}" ingevoerd.',
        )

    def format_score(self, score):
        return f'{"" if score >= 0.0 else "-"}€{round(abs(score) * 10000)}'
    
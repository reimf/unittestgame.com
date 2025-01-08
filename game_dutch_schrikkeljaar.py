from template import Template
from game_dutch import Dutch
from variable import Variable
from unit_test import UnitTest


class Schrikkeljaar(Dutch):
    def __init__(self):
        super().__init__()
        self.description = 'SCHRIKKELJAAR - Bepaal of een jaar een schrikkeljaar is of niet.'
        self.introduction_template = Template(
            'Introductie',
            'Een uitgever van kalenders laat een nieuwe functie ontwikkelen door een extern softwarebedrijf.',
            'Als die eenmaal gedrukt zijn kan er niks meer aan veranderd worden dus mogen er geen fouten in zitten.',
            'Daarom hebben ze jou ingehuurd om unit testen te schrijven voor de functie om te bepalen of een jaar een schrikkeljaar is of niet.',
            'In het contract vind je wat je moet doen en hoeveel je daarvoor betaald krijgt.',
            'In de specificatie staat wat de functie precies moet doen.',
        )
        self.specification_template = Template(
            'Specificatie',
            'De functie moet aangeven of een jaar een schrikkeljaar is of niet.',
            'In het eerste geval moet de functie True teruggeven, in het tweede geval False.',
        )
        self.parameters = [
            Variable(
                'year',
                'int',
                Template('', 'Jaar')
            )
        ]
        self.unit = Variable(
            'is_leapyear',
            'bool',
            Template('', 'Is het een schrikkeljaar?')
        )
        self.function_elements = [
            [
                'if year % 400 == 0: return True',
                ''
            ],
            [
                'if year % 100 == 0: return False',
                ''
            ],
            [
                'return year % 2 == 0',
                'return year % 2 != 0 or year % 4 == 0',
                'return year % 4 != 0',
                'return year % 4 == 0',
                'return True',
                'return False'
            ],
        ]
        self.special_unit_tests = [
            UnitTest([2000], True),
            UnitTest([2001], False),
            UnitTest([2002], False),
            UnitTest([2004], True),
            UnitTest([1900], False),

        ]

    def general_arguments_generator(self):
        years = list(range(2001, 2030)) + list(range(1600, 2401, 100))
        for year in years:
            yield [year]

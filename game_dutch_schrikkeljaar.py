from template import Template
from game_dutch import Dutch
from variable import Variable
from unit_test import UnitTest


class Schrikkeljaar(Dutch):
    def __init__(self):
        super().__init__()
        self.description = 'SCHRIKKELJAAR - Bepaal of een jaar een schrikkeljaar is of niet'
        self.introduction_template = Template(
            'Introductie\n',
            '-----------\n',
            'Een uitgever van kalenders laat een nieuwe functie ontwikkelen door een extern softwarebedrijf.',
            'Als kalenders eenmaal gedrukt zijn kan er niks meer aan veranderd worden dus mogen er geen fouten in zitten.',
            'Daarom hebben ze jou ingehuurd om unit testen te schrijven voor de functie om te bepalen of een jaar een schrikkeljaar is of niet.',
        )
        self.specification_template = Template(
            'Specificatie\n',
            '------------\n',
            'De functie moet aangeven of een jaar een schrikkeljaar is of niet.',
            'In het eerste geval moet de functie True teruggeven, in het tweede geval False.',
        )
        self.parameters = [
            Variable(
                'year',
                'int',
                Template('Jaar')
            )
        ]
        self.unit = Variable(
            'is_leapyear',
            'bool',
            Template('Schrikkeljaar (True/False)')
        )
        self.function_elements = [
            [
                'if year % 400 == 0: return True',
                'if year % 200 == 0: return True',
                'if year == 2000: return True',
                '',
            ],
            [
                'if year % 100 == 0: return False',
                'if year == 1900: return False',
                'if year == 2100: return False',
                '',
            ],
            [
                'return year % 2 == 0',
                'return year % 2 != 0 or year % 4 == 0',
                'return year % 4 != 0',
                'return year % 4 == 0',
                'return True',
                'return False',
                'return None',
            ],
        ]
        self.special_unit_tests = [
            UnitTest([2001], False),
            UnitTest([2002], False),
            UnitTest([2004], True),
            UnitTest([1800], False),
            UnitTest([1600], True),
        ]

    def general_arguments_generator(self):
        years = list(range(2001, 2030)) + list(range(1600, 2401, 100))
        for year in years:
            yield [year]

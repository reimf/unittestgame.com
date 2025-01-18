import random

from template import Template
from game_dutch import Dutch
from variable import Variable
from unit_test import UnitTest


class Kommagetal(Dutch):
    def __init__(self):
        super().__init__()
        self.description = 'KOMMAGETAL - Stel vast of een tekst een kommagetal voorstelt.'
        self.introduction_template = Template(
            'Introductie\n',
            '-----------\n',
            'Een laboratorium laat een nieuwe functie ontwikkelen door een extern softwarebedrijf.',
            'De functie wordt gebruikt om te bekijken of meetwaardes wel correct zijn ingevoerd.',
            'De laboranten gaan er daarna verder mee rekenen en er mogen dus geen fouten in zitten.',
            'Daarom hebben ze jou ingehuurd om unit testen te schrijven voor die functie.',
        )
        self.specification_template = Template(
            'Specificatie\n',
            '------------\n',
            'De functie moet aangeven of een tekst een kommagetal voorstelt en dus True of False teruggeven.',
            'Een kommagetal kan beginnen met een plus-teken of een min-teken.',
            'Daarna volgen één of meer cijfers.',
            'Als er daarna een komma staat, dan moet er minstens één cijfer volgen.',
        )
        self.parameters = [
            Variable(
                'text',
                'str',
                Template('Tekst')
            )
        ]
        self.unit = Variable(
            'is_float',
            'bool',
            Template('Is het een kommagetal?')
        )
        self.function_elements = [
            [
                'return bool(re.match(r"^[+-]?[0-9]+(,[0-9]+)?$", text))',
                'return bool(re.match(r"^[+]?[0-9]+(,[0-9]+)?$", text))',
                'return bool(re.match(r"^[-]?[0-9]+(,[0-9]+)?$", text))',
                'return bool(re.match(r"^[0-9]+(,[0-9]+)?$", text))',
                'return bool(re.match(r"^[0-9]*(,[0-9]*)?$", text))',
                'return bool(re.match(r"^[0-9]+,[0-9]+$", text))',
                'return bool(re.match(r"^[0-9]*,[0-9]*$", text))',
                'return bool(re.match(r"^[0-9]+$", text))',
                'return bool(re.match(r"^[0-9]*$", text))',
                'return bool(re.match(r"^[+-][0-9]+(,[0-9]+)?$", text))',
                'return bool(re.match(r"^[+-]?[0-9]+(.[0-9]+)?$", text))',
                'return bool(re.match(r"^[+-]?[0-9]+(,[0-9]+)*$", text))',
                'return bool(re.match(r"^[+-]?[0-9]*(,[0-9]+)?$", text))',
                'return bool(re.match(r"^[+-]?[0-9]+(,[0-9]*)?$", text))',
                'return bool(re.match(r"^[+-]?[0-9]*(,[0-9]*)?$", text))',
                'return True',
                'return False',
                'return None',
            ]
        ]
        self.special_unit_tests = [
            UnitTest(['+123,45'], True),
            UnitTest(['-123,45'], True),
            UnitTest(['123,45'], True),
            UnitTest(['123,'], False),
            UnitTest([',45'], False),
            UnitTest(['12,3,45'], False),
            UnitTest(['123-45'], False),
        ]

    def general_arguments_generator(self):
        for _ in range(100):
            number = random.uniform(0, 1000)
            precision = random.randint(0, 3)
            sign = random.choice(['-', '+', ''])
            rounded = round(number) if precision == 0 else round(number, precision)
            text1 = sign + str(rounded).replace('.', ',')
            yield [text1]
            pos = random.randint(0, len(text1) - 1)
            text2 = text1[:pos] + random.choice('0+-,.') + text1[pos + 1:]
            yield [text2]

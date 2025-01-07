from template import Template
from dutch import Dutch
from variable import Variable
from unit_test import UnitTest

class Kommagetal(Dutch):
    def __init__(self):
        super().__init__()

    @property
    def description(self):
        return 'KOMMAGETAL - Stel vast of een tekst een kommagetal voorstelt.'

    @property
    def introduction_template(self):
        return Template(
            'Introductie',
            'Een laboratorium laat een nieuwe functie ontwikkelen door een extern softwarebedrijf.',
            'De functie wordt gebruikt om te bekijken of meetwaardes wel correct zijn ingevoerd.',
            'De laboranten gaan er daarna verder mee rekenen en er mogen dus geen fouten in zitten.',
            'Daarom hebben ze jou ingehuurd om unit testen te schrijven voor die functie.',
            'In het contract vind je wat je moet doen en hoeveel je daarvoor betaald krijgt.',
            'In de specificatie staat wat de functie precies moet doen.'
        )
    
    def specification_template(self):
        return Template(
            'Specificatie',
            'De functie moet aangeven of een tekst een kommagetal voorstelt en dus True of False teruggeven.',
            'Een kommagetal kan beginnen met een plus-teken of een min-teken.',
            'Daarna volgen één of meer cijfers.',
            'Als er daarna een komma staat, dan moet er minstens één cijfer volgen.'
        )

    @property 
    def parameters(self):
        return [
            Variable(
                'text',
                'str',
                Template('', 'Tekst')
            )
        ]

    @property
    def unit(self):
        return Variable(
            'is_float',
            'bool',
            Template('', 'Is het een kommagetal?')
        )

    @property
    def function_generator(self):
        return [
            [
                'return bool(re.match(r"^[+-]?\d+(,\d+)?$", text))',
                'return bool(re.match(r"^\+?\d+(,\d+)?$", text))',
                'return bool(re.match(r"^-?\d+(,\d+)?$", text))',
                'return bool(re.match(r"^\d+(,\d+)?$", text))',
                'return bool(re.match(r"^\d*(,\d*)?$", text))',
                'return bool(re.match(r"^[+-]\d+(,\d+)?$", text))',
                'return bool(re.match(r"^[+-]?\d+(.\d+)?$", text))',
                'return bool(re.match(r"^[+-]?\d+(,\d+)*$", text))',
                'return bool(re.match(r"^[+-]?\d*(,\d+)?$", text))',
                'return bool(re.match(r"^[+-]?\d+(,\d*)?$", text))',
                'return bool(re.match(r"^[+-]?\d*(,\d*)?$", text))',
                'return True',
                'return False',
            ]
        ]
    
    @property
    def special_unit_tests(self):
        return [
            UnitTest(['+123,45'], True),
            UnitTest(['-123,45'], True),
            UnitTest(['123,45'], True),
            UnitTest(['123,'], False),
            UnitTest([',45'], False),
            UnitTest(['12,3,45'], False),
            UnitTest(['123-45'], False),
        ]
    
    def general_arguments_generator(self):
        yield ['0']

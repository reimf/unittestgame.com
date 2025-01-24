from game_dutch import Dutch
from template import Template
from variable import Variable
from unit_test import UnitTest


class Snelheid(Dutch):
    def __init__(self):
        super().__init__()
        self.description = 'Laat de snelheid van een auto zien'
        self.introduction_template = Template(
            'Introductie\n',
            '-----------\n',
            'Een Chinese gadgetmaker laat een nieuwe functie ontwikkelen door een extern softwarebedrijf.',
            'De gadget laat de gemiddelde snelheid zien op een klein display.\n',
            '+-------------------+\n',
            '|  X   XXXX   XXXX  |\n',
            '|  X   X  X   X  X  |\n',
            '|  X   XXXX   XXXX  |\n',
            '|  X   X  X   X  X  |\n',
            '|  X   XXXX X XXXX  |\n',
            '+-------------------+\n',
            'Gebruikers rekenen erop dat de getoonde informatie correct is en er mogen dus geen fouten in zitten.',
            'Daarom hebben ze jou ingehuurd om unit testen te schrijven voor die functie.',
        )
        self.specification_template = Template(
            'Specificatie\n',
            '------------\n',
            'De functie ontvangt de snelheid in meter per uur en moet de snelheid weergeven in kilometer per uur.\n',
            '+-------------------+\n',
            '|  X   XXXX   XXXX  |\n',
            '|  X   X  X   X  X  |\n',
            '|  X   XXXX   XXXX  |\n',
            '|  X   X  X   X  X  |\n',
            '|  X   XXXX X XXXX  |\n',
            '+-------------------+\n',
            'Als er iets mis is met de snelheid (negatief bijvoorbeeld),',
            'dan moet de functie "ERROR" teruggeven, want dan gaat het display langzaam knipperen.',
            'Als het mogelijk is, laat dan 1 decimaal zien, bijvoorbeeld "12.3".',
            'Rond anders af op hele kilometers per uur, dus bijvoorbeeld "49".',
            'Als de snelheid niet meer op het display past,',
            'dan moet de functie "DANGER" teruggeven, want dan gaat het display snel knipperen.',
        )
        self.parameters = [
            Variable(
                'speed',
                'int',
                Template('Snelheid in meter per uur')
            )
        ]
        self.unit = Variable(
            'display',
            'str',
            Template('Verwachte weergave op het display')
        )
        self.function_elements = [
            [
                'if speed < 0: return "ERROR"',
                'if speed <= 0: return "ERROR"',
                '',
            ],
            [
                'if speed <= 19900: return str(round(speed / 1000, 1))',
                'if speed < 19950: return str(round(speed / 1000, 1))',
                'if speed <= 19950: return str(round(speed / 1000, 1))',
                'if speed < 20000: return str(round(speed / 1000, 1))',
                '',
            ],
            [
                'if speed >= 200000: return "DANGER"',
                'if speed > 199500: return "DANGER"',
                'if speed >= 199500: return "DANGER"',
                'if speed > 199000: return "DANGER"',
                '',
            ],
            [
                'return str(round(speed / 1000))',
                'return str(round(speed / 1000, 1))',
                'return str(speed / 1000)',
                'return ""',
            ],
        ]
        self.special_unit_tests = [
            UnitTest([-1], 'ERROR'),
            UnitTest([0], '0.0'),
            UnitTest([19950], '19.9'),
            UnitTest([19951], '20'),
            UnitTest([199499], '199'),
            UnitTest([199500], 'DANGER'),
        ]

    def general_arguments_generator(self):
        speeds = [-1000] \
            + list(range(0, 27001, 900)) \
            + list(range(30000, 220001, 10000))
        for speed in speeds:
            yield [speed]

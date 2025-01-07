from dutch import Dutch
from template import Template
from variable import Variable
from unit_test import UnitTest


class Snelheid(Dutch):
    def __init__(self):
        super().__init__()

    @property
    def description(self):
        return 'SNELHEID - Toon de snelheid van een auto.'

    @property
    def introduction_template(self):
        return Template(
            'Introductie',
            'Een Chinese gadgetmaker laat een nieuwe functie ontwikkelen door een extern softwarebedrijf.',
            'De gadget laat de gemiddelde snelheid zien op een klein display.',
            '+-------------------+\n',
            '|  X   XXXX   XXXX  |\n',
            '|  X   X  X   X  X  |\n',
            '|  X   XXXX   XXXX  |\n',
            '|  X   X  X   X  X  |\n',
            '|  X   XXXX X XXXX  |\n',
            '+-------------------+\n',
            'Gebruikers rekenen erop dat de getoonde informatie correct is en er mogen dus geen fouten in zitten.',
            'Daarom hebben ze jou ingehuurd om unit testen te schrijven voor die functie.',
            'In het contract vind je wat je moet doen en hoeveel je daarvoor betaald krijgt.',
            'In de specificatie staat wat de functie precies moet doen.'
        )

    @property
    def specification_template(self):
        return Template(
            'Specificatie',
            'De functie ontvangt de snelheid in meter per uur en moet de snelheid weergeven in kilometer per uur.',
            'Als er iets mis is met de snelheid (negatief bijvoorbeeld),',
            'dan moet de functie "ERROR" teruggeven, want dan gaat het display langzaam knipperen.',
            'Als het mogelijk is, laat dan 1 decimaal zien, bijvoorbeeld "12.3".',
            'Rond anders af op hele kilometers per uur, dus bijvoorbeeld "49".',
            'Als de snelheid niet meer op het display past,',
            'dan moet de functie "DANGER" teruggeven, want dan gaat het display snel knipperen.'
        )

    @property
    def parameters(self):
        return [
            Variable(
                'speed',
                'int',
                Template('', 'Snelheid in meter per uur'),
            )
        ]

    @property
    def unit(self):
        return Variable(
            'display',
            'str',
            Template('', 'Verwachte weergave op het display'),
        )

    @property
    def function_generator(self):
        return [
            [
                'if speed < 0: return "ERROR"',
                'if speed <= 0: return "ERROR"',
                ''
            ],
            [
                'if speed <= 19900: return str(round(speed / 1000, 1))',
                'if speed < 19950: return str(round(speed / 1000, 1))',
                'if speed <= 19950: return str(round(speed / 1000, 1))',
                'if speed < 20000: return str(round(speed / 1000, 1))',
                ''
            ],
            [
                'if speed >= 200000: return "DANGER"',
                'if speed > 199500: return "DANGER"',
                'if speed >= 199500: return "DANGER"',
                'if speed > 199000: return "DANGER"',
                ''
            ],
            [
                'return str(round(speed / 1000))',
                'return str(round(speed / 1000, 1))',
                'return str(speed / 1000)'
            ]
        ]

    @property
    def special_unit_tests(self):
        return [
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

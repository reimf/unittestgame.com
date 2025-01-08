import random

from template import Template
from game_dutch import Dutch
from variable import Variable
from unit_test import UnitTest


class Wachtwoord(Dutch):
    def __init__(self):
        super().__init__()
        self.description = 'WACHTWOORD - Bekijk of een wachtwoord voldoende sterk is.'
        self.introduction_template = Template(
            'Introductie',
            'Een webshop laat een nieuwe functie ontwikkelen door een extern softwarebedrijf.',
            'De functie wordt gebruikt om wachtwoorden te controleren voor de webshop.',
            'Gebruikers moeten erop kunnen rekenen dat de getoonde vereisten correct zijn en er mogen dus geen fouten in zitten.',
            'Daarom hebben ze jou ingehuurd om unit testen te schrijven voor die functie.',
            'In het contract vind je wat je moet doen en hoeveel je daarvoor betaald krijgt.',
            'In de specificatie staat wat de functie precies moet doen.',
        )
        self.specification_template = Template(
            'Specificatie',
            'Regel 1: Het wachtwoord bestaat uit minstens 5 karakters.\n',
            'Regel 2: Het wachtwoord bevat een hoofdletter.\n',
            'Regel 3: Het wachtwoord bevat een speciaal teken (#@).\n',
            'Regel 4: De cijfers in het wachtwoord tellen op tot 13.\n',
        )
        self.parameters = [
            Variable(
                'password',
                'str',
                Template('', 'Wachtwoord')
            )
        ]
        self.unit = Variable(
            'is_strong_password',
            'bool',
            Template('', 'Is het een sterk wachtwoord?')
        )
        self.function_elements = [
            [
                'if len(password) < 5: return False',
                'if len(password) <= 5: return False',
                'if len(password) < 8: return False',
                'if len(password) >= 5: return True',
                ''
            ],
            [
                'if not password.isupper(): return False',
                'if password.isupper(): return True',
                ''
            ],
            [
                'if not any(char in "#@" for char in password): return False',
                'if all(char != "#" for char in password): return False',
                'if all(char != "@" for char in password): return False',
                'if not password in "#@": return False',
                'if password and password[0] not in "#@": return False',
                'if password and password[-1] not in "#@": return False',
                'if password and password[0] in "#@": return True',
                'if password and password[-1] in "#@": return True',
                ''
            ],
            [
                'if sum([int(char) for char in password if char.isdigit()]) != 13: return False',
                'if sum([int(char) for char in password if char.isdigit()]) > 13: return False',
                'if sum([int(char) for char in password if char.isdigit()]) < 13: return False',
                'if sum([int(char) for char in password if char.isdigit()]) == 13: return True',
                ''
            ],
            [
                'return True',
            ],
        ]
        self.special_unit_tests = [
            UnitTest(['A346#'], True),
            UnitTest(['@2551B'], True),
            UnitTest(['@34D52'], False),
            UnitTest(['1#236D0'], False),
            UnitTest(['85EFG'], False),
            UnitTest(['@9#4@'], False),
            UnitTest(['@67B'], False),
        ]

    def __generate_digits(self):
        for d1 in range(10):
            for d2 in range(d1, 10):
                if d1 + d2 == 13:
                    yield [d1, d2]
                for d3 in range(d2, 10):
                    if d1 + d2 + d3 == 13:
                        yield [d1, d2, d3]
                    for d4 in range(d3, 10):
                        if d1 + d2 + d3 + d4 == 13:
                            yield [d1, d2, d3, d4]

    def __generate_letters(self):
        for u1 in 'ABCDEFGHIJKLMNOPQRSTUVWXYZ':
            yield [u1]
            for u2 in 'ABCDEFGHIJKLMNOPQRSTUVWXYZ':
                yield []
                yield [u1, u2]

    def __generate_special_characters(self):
        for s1 in '@#!':
            yield [s1]
            for s2 in '@#!':
                yield []
                yield [s1, s2]

    def general_arguments_generator(self):
        digits = list(self.__generate_digits())
        letters = list(self.__generate_letters())
        special_characters = list(self.__generate_special_characters())
        for _ in range(100):
            ds = random.choice(digits)
            us = random.choice(letters)
            scs = random.choice(special_characters)
            chars = [str(d) for d in ds] + us + scs
            random.shuffle(chars)
            yield [''.join(chars)]

            pos = random.randint(0, len(chars) - 1)
            chars[pos] = random.choice('0123456789')
            yield [''.join(chars)]

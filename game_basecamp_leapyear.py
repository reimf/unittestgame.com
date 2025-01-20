from template import Template
from game_basecamp import Basecamp
from variable import Variable
from unit_test import UnitTest


class Leapyear(Basecamp):
    def __init__(self):
        super().__init__()
        self.description = 'A1W2P2 leapyearcalculator.py'
        self.introduction_template = Template(
            'Introduction\n',
            '------------\n',
            'Basecamp students are instructed to write a function that determines whether or not a year is a leap year.',
            'You are hired to write the CodeGrade autotests for this function.',
        )
        self.specification_template = Template(
            'Problem description\n',
            '-------------------\n',
            'Most years have 365 days.',
            'However, the time required for the Earth to orbit the Sun is actually slightly more than that.',
            'As a result, an extra day, February 29, is included in some years to correct for this difference.',
            'Such years are referred to as leap years.',
            'The ruls for determining whether or not a year is a leap year follow:\n',
            '- Any year that is divisible by 400 is a leap year.\n',
            '- Of the remaining years, any year that is divisible by 100 is not a leap year.\n',
            '- Of the remaining years, any year that is divisible by 4 is a leap year.\n',
            '- All other years are not leap years.\n',
        )
        self.parameters = [
            Variable(
                'year',
                'int',
                Template('Year')
            )
        ]
        self.unit = Variable(
            'is_leapyear',
            'bool',
            Template('Leap year (True/False)')
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
                'if year % 4 != 0: return True',
                'if year % 4 == 0: return True',
                '',
            ],
            [
                'return year % 2 == 0',
                'return year % 2 != 0',
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

from template import Template
from game_basecamp import Basecamp
from variable import Variable
from unit_test import UnitTest


class Triangletypechecker(Basecamp):
    def __init__(self):
        super().__init__()
        self.description = 'A1W2P4 triangletypechecker.py'
        self.introduction_template = Template(
            'Introduction\n',
            '------------\n',
            'Basecamp students are instructed to write a function that determines the type of a triangle.',
            'You are hired to write the CodeGrade autotests for this function.',
        )
        self.specification_template = Template(
            'Problem description\n',
            '-------------------\n',
            'A triangle can be classified based on the lengths of its sides as equilateral, isosceles or scalene.',
            'All three sides of an equilateral triangle have the same length.',
            'An isosceles triangle has two sides that are the same length, an a third side that is a different length.',
            'If all of the sides have different lengths then the triangle is scalene.',
        )
        self.parameters = [
            Variable(
                'a', 
                'int', 
                Template('Side A')
            ),
            Variable(
                'b', 
                'int', 
                Template('Side B')
            ),
            Variable(
                'c', 
                'int', 
                Template('Side C')
            ),
        ]
        self.unit = Variable(
            'triangle_type',
            'str',
            Template('Type of triangle')
        )
        self.function_elements = [
            [
                'if a == b == c: return "equilateral"',
                'if a == b or b == c or a == c: return "equilateral"',
                'if a == b: return "equilateral"',
                'if b == c: return "equilateral"',
                'if a == c: return "equilateral"',
                '',
            ],
            [
                'if a == b or b == c or a == c: return "isosceles"',
                'if a == b or b == c: return "isosceles"',
                'if a == b or a == c: return "isosceles"',
                'if b == c or a == c: return "isosceles"',
                'if a == b: return "isosceles"',
                'if a == c: return "isosceles"',
                'if b == c: return "isosceles"',
                '',
            ],
            [
                'return "equilateral"',
                'return "isosceles"',
                'return "scalene"',
                'return None',
            ],
        ]
        self.special_unit_tests = [
            UnitTest([5, 5, 5], 'equilateral'),
            UnitTest([3, 5, 5], 'isosceles'),
            UnitTest([5, 3, 5], 'isosceles'),
            UnitTest([5, 5, 3], 'isosceles'),
            UnitTest([3, 4, 5], 'scalene'),
        ]

    def general_arguments_generator(self):
        for a in range(6, 9):
            for b in range(6, 9):
                for c in range(6, 9):
                    yield [a, b, c]

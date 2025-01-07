from template import Template
from dutch import Dutch
from variable import Variable
from unit_test import UnitTest


class Driehoeksvorm(Dutch):
    def __init__(self):
        super().__init__()

    @property
    def description(self):
        return 'DRIEHOEKVORM - Beschrijf de vorm van een driehoek.'
    
    @property
    def introduction_template(self):
        return Template(
            'Introductie',
            'Een architect laat een nieuwe functie ontwikkelen door een extern softwarebedrijf.',
            'Die functie wordt daarna gebruikt om ontwerpen mee door te rekenen,',
            'dus mogen er geen fouten in zitten.',
            'Daarom hebben ze jou ingehuurd om unit testen te schrijven voor de functie om te bepalen wat de vorm van een driehoek is.',
            'In het contract vind je wat je moet doen en hoeveel je daarvoor betaald krijgt.',
            'In de specificatie staat wat de functie precies moet doen.'
        )
    
    @property
    def specification_template(self):
        return Template(
            'Specificatie',
            'De functie moet aangeven of een driehoek gelijkzijdig (equilateral), gelijkbenig (isosceles) of ongelijkzijdig (scalene).'
        )
    
    @property
    def parameters(self):
        return [
            Variable('a', 'int', Template('', 'Zijde A')),
            Variable('b', 'int', Template('', 'Zijde B')),
            Variable('c', 'int', Template('', 'Zijde C'))
        ]
    
    @property
    def unit(self):
        return Variable(
            'triangle_shape',
            'str',
            Template('', 'Vorm van de driehoek')
        )
    
    @property
    def function_generator(self):
        return [
        [
            'if a == b == c: return "equilateral"',
            'if a == b or b == c or a == c: return "equilateral"',
            'if a == b: return "equilateral"',
            'if b == c: return "equilateral"',
            'if a == c: return "equilateral"',
            ''
        ],
        [
            'if a == b or b == c or a == c: return "isosceles"',
            'if a == b or b == c: return "isosceles"',
            'if a == b or a == c: return "isosceles"',
            'if b == c or a == c: return "isosceles"',
            'if a == b: return "isosceles"',
            'if a == c: return "isosceles"',
            'if b == c: return "isosceles"',
            ''
        ],
        [
            'return "equilateral"',
            'return "isosceles"',
            'return "scalene"'
        ]
    ]

    @property
    def special_unit_tests(self):
        return [
            UnitTest([5, 5, 5], 'equilateral'),
            UnitTest([3, 5, 5], 'isosceles'),
            UnitTest([5, 3, 5], 'isosceles'),
            UnitTest([5, 5, 3], 'isosceles'),
            UnitTest([3, 4, 5], 'scalene')
        ]
    
    def general_arguments_generator(self):
        for a in range(6, 9):
            for b in range(6, 9):
                for c in range(6, 9):
                    yield [a, b, c]

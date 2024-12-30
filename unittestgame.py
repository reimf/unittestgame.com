import random
import json
import glob

from candidate import Candidate
from unittest import UnitTest
from testresult import TestResult
from block import Block


class UnitTestGame:
    def __init__(self, parameters, function, generator, special_unit_tests, general_unit_tests, introduction, specification, description):
        self.parameters = parameters
        self.function = function
        self.all_candidates = list(self.generate_candidates(generator, ''))
        self.special_unit_tests = list(self.generate_unit_tests(special_unit_tests))
        self.general_unit_tests = list(self.generate_unit_tests(general_unit_tests))
        self.introduction = introduction
        self.specification = specification
        self.perfect_candidate = self.find_perfect_candidate()
        self.check_unit_tests_are_correct(self.special_unit_tests)
        self.check_unit_tests_are_correct(self.general_unit_tests)
        self.check_unit_tests_are_needed(self.special_unit_tests)

    def generate_candidates(self, generator, identifier):
        index = len(identifier)
        if index < len(generator):
            options = generator[index]
            for choice, option in enumerate(options):
                new_generator = generator.copy()
                new_generator[index] = option
                yield from self.generate_candidates(new_generator, identifier + chr(ord('a') + choice))
        else:
            name = f'{self.function["name"]}_{identifier}'
            parameterlist = ', '.join([parameter['name'] for parameter in self.parameters])
            definition = f'def {name}({parameterlist}):'
            lines = [definition] + [f'    {line}' for line in generator if line]
            code = '\n'.join(lines)
            candidate = Candidate(name, code)
            yield candidate

    def generate_unit_tests(self, unit_tests):
        for unittest in unit_tests:
            arguments = [unittest[parameter['name']] for parameter in self.parameters]
            expected = unittest[self.function['name']]
            yield UnitTest(arguments, expected)

    def find_passing_candidates(self, unit_tests):
        return [candidate for candidate in self.all_candidates if candidate.fail_count(unit_tests) == 0]

    def find_perfect_candidate(self):
        perfect_candidates = self.find_passing_candidates(self.special_unit_tests)
        if len(perfect_candidates) != 1:
            Block.show(
                'Perfecte kandidaten',
                f'Er zijn {len(perfect_candidates)} perfecte kandidaten.',
                perfect_candidates
            )
            raise ValueError(f'Er zijn {len(perfect_candidates)} perfecte kandidaten in plaats van 1.')
        perfect_candidate = perfect_candidates.pop()
        Block.show(
            'Perfecte kandidaat',
            f'Dit is de perfecte kandidaat uit {len(self.all_candidates)} kandidaten.',
            perfect_candidate,
        )
        return perfect_candidate

    def check_unit_tests_are_correct(self, unit_tests):
        for unit_test in unit_tests:
            test_result = TestResult(self.perfect_candidate, unit_test)
            if not test_result.passes:
                raise ValueError(f'Unit test {unit_test} is niet correct, want de uitkomst zou "{test_result.value}" moeten zijn.')

    def check_unit_tests_are_needed(self, unit_tests):
        for unit_test in unit_tests:
            all_minus_one_unit_tests = [other_unit_test for other_unit_test in unit_tests if other_unit_test != unit_test]
            almost_perfect_candidates = self.find_passing_candidates(all_minus_one_unit_tests)
            if len(almost_perfect_candidates) == 1:
                raise ValueError(f'Unit test {unit_test} is onnodig.')

    def find_minimal_passing_candidate(self, unit_tests):
        candidates = self.find_passing_candidates(unit_tests)
        return min(candidates, key=lambda c: (-len(c.failing_test_results(self.general_unit_tests)), -len(c.failing_test_results(self.special_unit_tests)), c.code_length()))

    def convert_to(self, value, type):
        CONVERSIONS = {
            'bool': lambda val: val.lower() in ['true', 'ja', 'yes', '1', 'waar'],
            'int': int,
            'float': float,
            'str': str,
        }
        return CONVERSIONS.get(type, lambda val: val)(value)

    def ask_unit_test(self):
        arguments = []
        for parameter in self.parameters:
            answer = input(Block.indent(f'{parameter["question"]}: '))
            argument = self.convert_to(answer, parameter['type'])
            arguments.append(argument)
        answer = input(Block.indent(f'{self.function["question"]}: '))
        expected = self.convert_to(answer, self.function['type'])
        unit_test = UnitTest(arguments, expected)
        test_result = TestResult(self.perfect_candidate, unit_test)
        return unit_test if test_result.passes else None

    def show_contract(self):
        Block.show(
            'Contract',
            'Jij moet unit testen schrijven zodat de functie NOOIT foute test_resultaten geeft.',
            'Wat goede test_resultaten zijn staat beschreven in de specificatie.',
            'Voor het hele traject krijg je €10000 achteraf.',
            'Er zijn wel wat kosten die jij moet betalen tijdens het traject.',
            'Het toevoegen van een unit test kost je €200.',
            'Als een klant een fout constateert in de functie, dan hebben wij daar veel werk aan.',
            'Jij betaalt dan €500 als bijdrage aan de gemaakte kosten.'
        )

    def show_earnings(self, earnings):
        Block.show('Verdiensten', f'€{earnings}')

    def show_unit_tests(self, unit_tests):
        if unit_tests:
            Block.show('Unit testen', unit_tests)

    def play(self):
        Block.show(*self.introduction)
        earnings = 0
        all_general_unit_tests_passed_before = False
        number_of_failing_test_results_before = None
        userdefined_unit_tests = []
        failing_test_result = None
        while True:
            self.show_earnings(earnings)
            self.show_unit_tests(userdefined_unit_tests)

            passing_candidates = self.find_passing_candidates(userdefined_unit_tests)
            shortest_passing_candidate = self.find_minimal_passing_candidate(userdefined_unit_tests)
            failing_general_test_results = shortest_passing_candidate.failing_test_results(self.general_unit_tests)
            failing_special_test_results = shortest_passing_candidate.failing_test_results(self.special_unit_tests)
            if failing_general_test_results:
                failing_test_result = random.choice(failing_general_test_results)
            elif failing_special_test_results:
                failing_test_result = random.choice(failing_special_test_results)
            else:
                failing_test_result = None

            if not all_general_unit_tests_passed_before and not failing_general_test_results:
                Block.show(
                    'Eerdere uitbetaling',
                    'Het gaat goed met het schrijven van unit testen!',
                    'We betalen je daarom alvast €5000 van de beloofde €10000 uit.',
                    'Gefeliciteerd!'
                )
                earnings += 5000
                all_general_unit_tests_passed_before = True

            Block.show(
                'Geheime informatie',
                f'Ik kan {len(passing_candidates)} kandidaten bedenken waarbij alle {len(userdefined_unit_tests)} unit testen slagen.',
                'De kortste kanididaat waarbij alle unit testen slagen is de volgende.',
                shortest_passing_candidate,
                f'Bij bovenstaande kandidaat slagen nog {len(failing_general_test_results)} algemene unit testen niet.',
                f'Bij bovenstaande kandidaat slagen nog {len(failing_special_test_results)} speciale unit testen niet.',
                [
                    f'Een unit test die nog niet slaagt is bijvoorbeeld de volgende.',
                    failing_test_result.unit_test,
                ] if failing_test_result else [],
            )

            Block.show(
                'Menu',
                '[S]pecificatie tonen\n',
                '[C]ontract tonen\n',
                '[V]oeg unit test toe (-€200)\n',
                '[L]ever unit testen in (-€500 / +€10000)\n',
                '[E]inde\n'
            )
            answer = input(Block.indent('Keuze: ')).upper()

            if answer == 'S':
                Block.show(self.specification)
            elif answer == 'C':
                self.show_contract()
            elif answer == 'V':
                Block.show('Voeg unit test toe')
                unit_test = self.ask_unit_test()
                if unit_test:
                    userdefined_unit_tests.append(unit_test)
                    number_of_failing_test_results = len(failing_general_test_results) + len(failing_special_test_results)
                    if number_of_failing_test_results_before != None and number_of_failing_test_results == number_of_failing_test_results_before:
                        Block.show(
                            'Unit test toegevoegd',
                            'We hebben deze unit test toegevoegd aan onze code.',
                            'Je unit test lijkt erg veel op een eerdere unit test.',
                            'Daarom is die niet zo zinvol voor ons.',
                        )
                    else:
                        Block.show(
                            'Unit test toegevoegd',
                            'We hebben deze unit test toegevoegd aan onze code.',
                            'We hebben geconstateerd dat er een fout zat in de functie die het externe softwarebedrijf had geschreven.',
                            'We hebben de fout laten oplossen en nu slagen alle unit testen weer!',
                        )
                    number_of_failing_test_results_before = number_of_failing_test_results
                else:
                    Block.show(
                        'Unit test NIET toegevoegd',
                        'We hebben je unit test naast de specificatie gelegd.',
                        'Je unit test blijkt niet correct te zijn.',
                        'We hebben de unit test dus niet toegevoegd aan onze code.',
                    )
                earnings -= 200
            elif answer == 'L':
                Block.show(
                    'Lever unit testen in',
                    'Bedankt!',
                    'We hebben de laatste versie van de functie in productie gebracht.',
                )
                if failing_test_result:
                    Block.show(
                        'Foutmelding van een klant',
                        'Een klant heeft een fout in de functie gemeld.',
                        f'De functie geeft "{failing_test_result.value}" voor {failing_test_result.arguments}.',
                        'Jouw bijdrag in de kosten om dat te herstellen is €500.',
                    )
                    earnings -= 500
            elif answer == 'E':
                if failing_test_result:
                    Block.show(
                        'Einde',
                        'Er zitten nog fouten in de functie,',
                        'dus we betalen de €10000 niet aan je uit.'
                    )
                else:
                    Block.show(
                        'Einde',
                        'Gefeliciteerd! De functie is dankzij jouw unit testen helemaal foutloos.',
                        'We betalen je dan ook met plezier de laatste €5000 uit.',
                    )
                    earnings += 5000
                break
        self.show_earnings(earnings)

    @staticmethod
    def choose_game():
        cases = []
        for case_file in glob.glob('cases/*.json'):
            with open(case_file) as json_file:
                cases.append(json.load(json_file))
        Block.show(
            'Spellen',
            [f'[{index + 1}] {case["description"]}\n' for index, case in enumerate(cases)],
            '[0] Einde\n',
        )
        answer = input(Block.indent('Keuze: '))
        if answer == '0':
            return
        case = cases[int(answer) - 1]
        game = UnitTestGame(**case)
        game.play()


if __name__ == '__main__':
    UnitTestGame.choose_game()

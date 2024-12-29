import random
import json

from candidate import Candidate
from unittest import UnitTest
from testresult import TestResult
from block import Block


class UnitTestGame:
    def __init__(self, case_file):
        with open(case_file) as json_file:
            case = json.load(json_file)
        self.parameters = case['parameters']
        self.function = case['function']
        self.all_candidates = list(self.generate_candidates(case['generator'], []))
        self.edgecase_unit_tests = list(self.generate_unit_tests(case['edgecase_unit_tests']))
        self.giveaway_unit_tests = list(self.generate_unit_tests(case['giveaway_unit_tests']))
        self.introduction = case['introduction']
        self.specification = case['specification']

        perfect_candidates = self.find_passing_candidates(self.edgecase_unit_tests)
        if len(perfect_candidates) != 1:
            Block.show(
                'Perfecte kandidaten',
                f'Er zijn {len(perfect_candidates)} perfecte kandidaten.',
                perfect_candidates
            )
            raise ValueError(f'Niet 1 perfecte kandidaat, maar {len(perfect_candidates)} perfecte kandidaten.')
        self.perfect_candidate = perfect_candidates.pop()

        for unit_test in self.edgecase_unit_tests:
            all_minus_one_edgecase_unit_tests = [other_unit_test for other_unit_test in self.edgecase_unit_tests if other_unit_test != unit_test]
            almost_perfect_candidates = self.find_passing_candidates(all_minus_one_edgecase_unit_tests)
            if len(almost_perfect_candidates) == 1:
                print(f'Onnodige speciale unit test: {unit_test}.')

        for unit_test in self.giveaway_unit_tests:
            test_result = TestResult(self.perfect_candidate, unit_test)
            if not test_result.passes:
                raise ValueError(f'Algemene unit test {unit_test} is niet correct; uitkomst zou "{test_result.value}" moeten zijn.')

        edgecase_failing_candidates = [candidate for candidate in self.all_candidates if candidate.fail_count(self.giveaway_unit_tests) == 0 and candidate.fail_count(self.edgecase_unit_tests) > 0]
        Block.show(
            'Perfecte kandidaat',
            f'Dit is de perfecte kandidaat uit {len(self.all_candidates)} kandidaten.',
            self.perfect_candidate,
            f'Er zijn {len(edgecase_failing_candidates)} kandidaten die slagen voor de algemene unit testen en falen voor de speciale unit testen.',
        )

    def generate_candidates(self, generator, choices):
        index = len(choices)
        if index < len(generator):
            options = generator[index]
            for choice, option in enumerate(options):
                new_generator = [elem for elem in generator]
                new_generator[index] = option
                new_choices = choices + [str(choice)]
                yield from self.generate_candidates(new_generator, new_choices)
        else:
            identifier = '_'.join(choices)
            name = f'{self.function["name"]}_{identifier}'
            parameterlist = ', '.join([parameter['name'] for parameter in self.parameters])
            definition = f'def {name}({parameterlist}):'
            lines = [definition] + ['    ' + line for line in generator if line]
            code = '\n'.join(lines)
            candidate = Candidate(name, code)
            yield candidate

    def generate_unit_tests(self, unittests):
        for unittest in unittests:
            arguments = tuple([unittest[parameter['name']] for parameter in self.parameters])
            expected = unittest[self.function['name']]
            yield UnitTest(arguments, expected)

    def find_passing_candidates(self, unit_tests):
        return [candidate for candidate in self.all_candidates if candidate.fail_count(unit_tests) == 0]

    def find_shortest_passing_candidate(self, unit_tests):
        candidates = self.find_passing_candidates(unit_tests)
        return min(candidates, key=lambda c: c.code_length())

    def find_one_failing_test_result(self, unit_tests):
        all_failing_test_results = []
        for candidate in self.find_passing_candidates(unit_tests):
            all_failing_test_results += candidate.failing_test_results(self.edgecase_unit_tests)
        if not all_failing_test_results:
            return None
        return random.choice(all_failing_test_results)

    def convert_type(self, value, type):
        CONVERSIONS = {
            'bool': lambda val: val.lower() in ['true', 'ja', 'yes', '1'],
            'int': int,
            'float': float,
            'str': str,
        }
        return CONVERSIONS.get(type, lambda val: val)(value)

    def ask_unit_test(self):
        arguments = []
        for parameter in self.parameters:
            answer = input(Block.indent(f'{parameter["question"]}: '))
            argument = self.convert_type(answer, parameter['type'])
            arguments.append(argument)
        answer = input(Block.indent(f'{self.function["question"]}: '))
        expected = self.convert_type(answer, self.function['type'])
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
        Block.show(
            'Verdiensten',
            f'€{earnings}'
        )

    def show_unit_tests(self, unit_tests):
        if unit_tests:
            Block.show(
                'Unit testen',
                [str(unit_test) for unit_test in unit_tests],
            )

    def show_secret_information(self, unit_tests):
        passing_candidates = self.find_passing_candidates(unit_tests)
        shortest_passing_candidate = self.find_shortest_passing_candidate(unit_tests)
        failing_giveaway_test_results = shortest_passing_candidate.failing_test_results(self.giveaway_unit_tests)
        failing_edgecase_test_results = shortest_passing_candidate.failing_test_results(self.edgecase_unit_tests)
        if failing_giveaway_test_results:
            failing_test_result = random.choice(failing_giveaway_test_results)
        elif failing_edgecase_test_results:
            failing_test_result = random.choice(failing_edgecase_test_results)
        else:
            failing_test_result = None
        Block.show(
            'Geheime informatie',
            f'Ik kan {len(passing_candidates)} kandidaten bedenken waarbij alle {len(unit_tests)} unit testen slagen.',
            'De kortste kanididaat waarbij alle unit testen slagen is de volgende.',
            shortest_passing_candidate,
            f'Bij bovenstaande kandidaat slagen nog {len(failing_giveaway_test_results)} algemene unit testen niet.',
            f'Bij bovenstaande kandidaat slagen nog {len(failing_edgecase_test_results)} speciale unit testen niet.',
            [
                f'Een unit test die nog niet slaagt is bijvoorbeeld de volgende.',
                f'| {failing_test_result.unit_test}',
            ] if failing_test_result else [],
        )
        return failing_test_result

    def play(self):
        Block.show(self.introduction)
        earnings = 0
        userdefined_unit_tests = []
        failing_test_result = None
        while True:
            self.show_earnings(earnings)
            self.show_unit_tests(userdefined_unit_tests)
            failing_test_result = self.show_secret_information(userdefined_unit_tests)

            Block.show(
                'Menu',
                '[S]pecificatie tonen',
                '[C]ontract tonen',
                '[V]oeg unit test toe (-€200)',
                '[L]ever unit testen in (-€500 / +€10000)',
                '[E]inde'
            )

            Block.show('Keuze')
            answer = input(Block.indent('Antwoord: ')).upper()

            if answer == 'S':
                Block.show(self.specification)
            elif answer == 'C':
                self.show_contract()
            elif answer == 'V':
                Block.show('Voeg unit test toe')
                unit_test = self.ask_unit_test()
                if unit_test:
                    # TODO: is de unit test wel zinvol?
                    userdefined_unit_tests.append(unit_test)
                    Block.show(
                        'Unit test toegevoegd',
                        'We hebben deze unit test toegevoegd aan onze code.',
                        'We hebben geconstateerd dat er een fout zat in de functie.',
                        'We hebben de fout laten oplossen en nu slagen alle unit testen weer!',
                    )
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
                failing_test_result = self.find_one_failing_test_result(userdefined_unit_tests)
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
                        'We betalen je dan ook met plezier €10000 uit.',
                    )
                    earnings += 10000
                break
        Block.show(
            'Totale verdiensten',
            f'€{earnings}',
        )

    @staticmethod
    def generate_cases():
        for case_file in ['case_leapyear.json', 'case_tesla.json']:
            with open(case_file) as json_file:
                case = json.load(json_file)
            yield (case_file, case['description'])

    @staticmethod
    def choose_game():
        cases = list(UnitTestGame.generate_cases())
        Block.show(
            'Spellen',
            [f'[{index + 1}] {description}' for index, (_, description) in enumerate(cases)],
            '[0] Einde',
        )
        Block.show('Keuze')
        answer = input(Block.indent('Spel: '))
        if answer == '0':
            return None
        case_file, _ = cases[int(answer) - 1]
        return UnitTestGame(case_file)

if __name__ == '__main__':
    game = UnitTestGame.choose_game()
    if game:
        game.play()

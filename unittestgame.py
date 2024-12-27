import random
import json

from candidate import Candidate
from unittest import UnitTest
from testresult import TestResult


class UnitTestGame:
    def __init__(self, case_name):
        with open(f'case_{case_name}.json') as json_file:
            case = json.load(json_file)
        self.arguments = case['arguments']
        self.function = case['function']
        self.all_candidates = list(self.generate_candidates(case['generator'], []))
        self.minimal_unit_tests = list(self.generate_unit_tests(case['minimal_unit_tests']))
        self.giveaway_unit_tests = list(self.generate_unit_tests(case['giveaway_unit_tests']))
        self.introduction = case['introduction']
        self.contract = case['contract']
        self.specification = case['specification']

        print(f'Er zijn {len(self.all_candidates)} kandidaten.')
        perfect_candidates = self.find_passing_candidates(self.minimal_unit_tests)
        if len(perfect_candidates) != 1:
            for candidate in perfect_candidates:
                print(candidate.code)
            raise ValueError(f'Er zijn {len(perfect_candidates)} perfecte kandidaten.')
        self.perfect_candidate = perfect_candidates.pop()
        print(self.perfect_candidate.code)

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
            argument_names = ', '.join([argument['name'] for argument in self.arguments])
            definition = f'def {name}({argument_names}):'
            lines_with_code = [definition] + [line for line in generator if line]
            code = '\n'.join(lines_with_code).replace('\n', '\n    ')
            candidate = Candidate(name, code)
            yield candidate

    def generate_unit_tests(self, unittests):
        for unittest in unittests:
            values = tuple([unittest[argument['name']] for argument in self.arguments])
            expected = unittest[self.function["name"]]
            yield UnitTest(values, expected)

    def find_passing_candidates(self, unit_tests):
        return [candidate for candidate in self.all_candidates if candidate.fail_count(unit_tests) == 0]

    def find_shortest_passing_candidate(self, unit_tests):
        candidates = self.find_passing_candidates(unit_tests)
        return min(candidates, key=lambda c: c.code_length())

    def find_one_failing_test_result(self, unit_tests):
        all_failing_test_results = []
        for candidate in self.find_passing_candidates(unit_tests):
            all_failing_test_results += candidate.failing_test_results(self.minimal_unit_tests)
        if not all_failing_test_results:
            return None
        return random.choice(all_failing_test_results)

    def find_failing_minimal_unit_tests(self, unit_tests):
        all_failing_unit_tests = set()
        for candidate in self.find_passing_candidates(unit_tests):
            failing_test_results = candidate.failing_test_results(self.minimal_unit_tests)
            failing_unit_tests = set([test_result.unit_test for test_result in failing_test_results])
            all_failing_unit_tests |= failing_unit_tests
        return all_failing_unit_tests

    def check_unit_tests(self):
        for unit_test in self.minimal_unit_tests:
            test_result = TestResult(self.perfect_candidate, unit_test)
            if not test_result.passes:
                raise ValueError(f'Unit test {unit_test} is niet correct; uitkomst zou "{test_result.value}" moeten zijn.')
        if self.perfect_candidate.fail_count(self.giveaway_unit_tests) > 0:
            raise ValueError(f'De perfecte kandidaat slaagt niet voor alle weg te geven unit testen.')
        complex_failing_candidates = [candidate for candidate in self.all_candidates if candidate.fail_count(self.giveaway_unit_tests) == 0 and candidate.fail_count(self.minimal_unit_tests) > 0]
        print(f'Er zijn {len(complex_failing_candidates)} kandidaten die falen voor de minimale unit testen en slagen voor de weg te geven unit testen.')

    def ask_unit_test(self):
        values = []
        for argument in self.arguments:
            answer = int(input(f'  {argument["question"]}: '))
            values.append(answer)
        expected = input(f'  {self.function["question"]}: ')
        unit_test = UnitTest(values, expected)
        test_result = TestResult(self.perfect_candidate, unit_test)
        return unit_test if test_result.passes else None
    
    def show_block(self, block):
        print()
        print(block['title'])
        for line in block['body']:
            print(f'  {line}')


    def show_earnings(self, earnings):
        print()
        print(f'Verdiensten')
        print(f'  €{earnings}')

    def show_unit_tests(self, unit_tests):
        if unit_tests:
            print()
            print('Unit testen')
            for unit_test in unit_tests:
                print(f'  {unit_test}')

    def show_secret_information(self, unit_tests):
        print()
        print('Geheime informatie')
        passing_candidates = self.find_passing_candidates(unit_tests)
        print(f'  Ik kan {len(passing_candidates)} kandidate bedenken waarbij alle {len(unit_tests)} unit testen slagen.')

        shortest_passing_candidate = self.find_shortest_passing_candidate(unit_tests)
        print('  De kortste kanididaat waarbij alle unit testen slagen is de volgende.')
        print('  | ' + shortest_passing_candidate.code.replace('\n', '\n  | '))

        failing_minimal_unit_tests = self.find_failing_minimal_unit_tests(unit_tests)
        print(f'  Er zijn nog minstens {len(failing_minimal_unit_tests)} unit testen nodig.')

        failing_giveaway_test_results = shortest_passing_candidate.failing_test_results(self.giveaway_unit_tests)
        print(f'  Bij bovenstaande kandidaat slagen nog {len(failing_giveaway_test_results)} weg te geven unit testen niet.')
        failing_test_result = random.choice(failing_giveaway_test_results)
        if not failing_test_result:
            failing_minimal_test_results = shortest_passing_candidate.failing_test_results(self.minimal_unit_tests)
            print(f'  Bij bovenstaande kandidaat slagen nog {len(failing_minimal_test_results)} minimale unit testen niet.')
            failing_test_result = random.choice(failing_minimal_test_results)
        if failing_test_result:
            print(f'  Een unit test die nog niet slaagt is bijvoorbeeld de volgende.')
            print(f'  | {failing_test_result.unit_test}')
        return failing_test_result

    def play(self):
        self.check_unit_tests()
        self.show_block(self.introduction)
        earnings = 0
        userdefined_unit_tests = []
        failing_test_result = None
        while True:
            self.show_earnings(earnings)
            self.show_unit_tests(userdefined_unit_tests)
            failing_test_result = self.show_secret_information(userdefined_unit_tests)

            print()
            print('Menu')
            print('  [S]pecificatie tonen')
            print('  [C]ontract tonen')
            print('  [V]oeg unit test toe (-€200)')
            print('  [L]ever unit testen in (-€500 / +€10000)')
            print('  [E]inde')

            print()
            answer = input('Keuze: ').upper()

            if answer == 'S':
                self.show_block(self.specification)
            elif answer == 'C':
                self.show_block(self.contract)
            elif answer == 'V':
                print()
                print('Voeg unit test toe')
                unit_test = self.ask_unit_test()
                if unit_test:
                    # TODO: is de unit test wel zinvol?
                    userdefined_unit_tests.append(unit_test)
                    print()
                    print('  We hebben deze unit test toegevoegd aan onze code.')
                    print('  We hebben geconstateerd dat er een fout zat in de functie.')
                    print('  We hebben de fout laten oplossen en nu slagen alle unit testen weer!')
                else:
                    print()
                    print('  We hebben je unit test naast de specificatie gelegd.')
                    print('  Je unit test blijkt niet correct te zijn.')
                    print('  We hebben de unit test dus niet toegevoegd aan onze code.')
                earnings -= 200
            elif answer == 'L':
                print()
                print('Lever unit testen in')
                print('  Bedankt!')
                print('  We hebben de laatste versie van de functie in productie gebracht.')
                failing_test_result = self.find_one_failing_test_result(userdefined_unit_tests)
                if failing_test_result:
                    print()
                    print(f'Foutmelding van een klant')
                    print(f'  Een klant heeft een fout in de functie gemeld.')
                    print(f'  De functie geeft "{failing_test_result.value}" voor {failing_test_result.arguments}.')
                    print(f'  Jouw bijdrag in de kosten om dat te herstellen is €500.')
                    earnings -= 500
            elif answer == 'E':
                print()
                print('Einde')
                if failing_test_result:
                    print('  Er zitten nog fouten in de functie, dus we betalen de €10000 niet aan je uit.')
                else:
                    print('  Gefeliciteerd! De functie is dankzij jouw unit testen helemaal foutloos.')
                    print('  We betalen je dan ook met plezier €10000 uit.')
                    earnings += 10000
                break
        print()
        print('Totale verdiensten')
        print(f'  €{earnings}')


if __name__ == '__main__':
    game = UnitTestGame('tesla')
    game.play()

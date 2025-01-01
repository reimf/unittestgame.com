import random
import json
import glob

from function import Function
from unittest import UnitTest
from testresult import TestResult
from variable import Variable
from template import Template
from language import Language


class UnitTestGame:
    def __init__(self, lang, description, parameters, function, function_generator, special_unit_tests, general_unit_tests, templates, language):
        self.lang = lang
        self.description = description
        self.parameters = [Variable(**parameter) for parameter in parameters]
        self.function = Variable(**function)
        self.function_generator = function_generator
        self.special_unit_tests = special_unit_tests
        self.general_unit_tests = general_unit_tests
        self.templates = language.templates | {name: Template(*template) for name, template in templates.items()}

    def generate_functions(self, function_generator, identifier):
        index = len(identifier)
        if index < len(function_generator):
            options = function_generator[index]
            for choice, option in enumerate(options):
                new_function_generator = [option if i == index else elem for i, elem in enumerate(function_generator)]
                new_identifier = identifier + chr(ord('a') + choice)
                yield from self.generate_functions(new_function_generator, new_identifier)
        else:
            name = f'{self.function.name}_{identifier}'
            parameterlist = ', '.join([parameter.name for parameter in self.parameters])
            definition = f'def {name}({parameterlist}):'
            lines = [definition] + [f'    {line}' for line in function_generator if line]
            code = '\n'.join(lines)
            yield Function(name, code)

    def generate_unit_tests(self, unit_tests):
        for unittest in unit_tests:
            arguments = [unittest[parameter.name] for parameter in self.parameters]
            expected = unittest[self.function.name]
            yield UnitTest(arguments, expected)

    def find_passing_functions(self, functions, unit_tests):
        return [function for function in functions if function.fail_count(unit_tests) == 0]

    def find_perfect_function(self, functions, unit_tests):
        perfect_functions = self.find_passing_functions(functions, unit_tests)
        if len(perfect_functions) != 1:
            raise ValueError(
                f'There are {len(perfect_functions)} perfect functions instead of 1.\n' +
                '\n'.join([str(function) for function in perfect_functions])
            )
        return perfect_functions.pop()

    def check_unit_tests_are_correct(self, perfect_function, unit_tests):
        for unit_test in unit_tests:
            test_result = TestResult(perfect_function, unit_test)
            if not test_result.passes:
                raise ValueError(f'Unit test {unit_test} is incorrect, because the expected result should be "{test_result.result}".')

    def check_unit_tests_are_needed(self, functions, unit_tests):
        for unit_test in unit_tests:
            all_minus_one_unit_tests = [other_unit_test for other_unit_test in unit_tests if other_unit_test != unit_test]
            almost_perfect_functions = self.find_passing_functions(functions, all_minus_one_unit_tests)
            if len(almost_perfect_functions) == 1:
                raise ValueError(f'Unit test {unit_test} is not needed.')

    def find_shortest_passing_function(self, functions, userdefined_unit_tests):
        functions = self.find_passing_functions(functions, userdefined_unit_tests)
        return min(functions, key=lambda c: c.code_length())

    def convert_to(self, value, type):
        CONVERSIONS = {
            'bool': lambda val: True if val.lower() in ['true', 'yes', 'ja', '1'] else (False if val.lower() in ['false', 'no', 'nee', '0'] else bool(val)),
            'int': int,
            'float': float,
            'str': str,
        }
        return CONVERSIONS.get(type, lambda val: val)(value)

    def ask_unit_test(self):
        arguments = []
        for parameter in self.parameters:
            answer = Template('', parameter.question).input()
            argument = self.convert_to(answer, parameter.type)
            arguments.append(argument)
        answer = Template('', self.function.question).input()
        expected = self.convert_to(answer, self.function.type)
        return UnitTest(arguments, expected)

    def show_earnings(self, earnings):
        self.templates['earnings'].print(
            sign_value='-' if earnings < 0 else '',
            absolute_value=abs(earnings)
        )

    def show_unit_tests(self, unit_tests):
        if unit_tests:
            self.templates['unit_tests'].print(
                unit_tests=unit_tests
            )

    def play(self):
        Template(self.description).print()

        all_functions = list(self.generate_functions(self.function_generator, ''))
        all_special_unit_tests = list(self.generate_unit_tests(self.special_unit_tests))
        all_general_unit_tests = list(self.generate_unit_tests(self.general_unit_tests))
        perfect_function = self.find_perfect_function(all_functions, all_special_unit_tests)
        self.check_unit_tests_are_correct(perfect_function, all_special_unit_tests)
        self.check_unit_tests_are_correct(perfect_function, all_general_unit_tests)
        self.check_unit_tests_are_needed(all_functions, all_special_unit_tests)

        self.templates['introduction'].print()
        earnings = 0
        all_general_unit_tests_passed_before = False
        userdefined_unit_tests = []
        failing_test_result = None
        while True:
            self.show_earnings(earnings)
            self.show_unit_tests(userdefined_unit_tests)

            passing_functions = self.find_passing_functions(all_functions, userdefined_unit_tests)
            shortest_passing_function = self.find_shortest_passing_function(all_functions, userdefined_unit_tests)
            failing_general_test_results = shortest_passing_function.failing_test_results(all_general_unit_tests)
            failing_special_test_results = shortest_passing_function.failing_test_results(all_special_unit_tests)
            if failing_general_test_results:
                failing_test_result = random.choice(failing_general_test_results)
            elif failing_special_test_results:
                failing_test_result = random.choice(failing_special_test_results)
            else:
                failing_test_result = None

            if not all_general_unit_tests_passed_before and not failing_general_test_results:
                self.templates['early_payout'].print()
                earnings += 5000
                all_general_unit_tests_passed_before = True

            self.templates['menu'].print()
            answer = self.templates['choice'].input()

            if answer == '1':
                self.templates['specification'].print()
            elif answer == '2':
                self.templates['contract'].print()
            elif answer == '3':
                self.templates['add_unit_test'].print()
                unit_test = self.ask_unit_test()
                test_result = TestResult(perfect_function, unit_test)
                if test_result.passes:
                    userdefined_unit_tests.append(unit_test)
                    new_shortest_passing_function = self.find_shortest_passing_function(all_functions, userdefined_unit_tests)
                    if new_shortest_passing_function == shortest_passing_function:
                        self.templates['useless_unit_test'].print()
                    else:
                        self.templates['useful_unit_test'].print()
                else:
                    self.templates['incorrect_unit_test'].print()
                earnings -= 200
            elif answer == '4':
                self.templates['current_function'].print(
                    shortest_passing_function=shortest_passing_function
                )
                earnings -= 700
            elif answer == '5':
                self.templates['hint_unit_test'].print(
                    failing_unit_test=failing_test_result.unit_test
                )
                earnings -= 200
            elif answer == '6':
                self.templates['perfect_function'].print(
                    perfect_function=perfect_function
                )
                earnings -= 5000
            elif answer == '7':
                self.templates['hand_in_unit_tests'].print()
                if failing_test_result:
                    self.templates['bug_found'].print(
                        arguments=failing_test_result.arguments,
                        result=failing_test_result.result
                    )
                    earnings -= 500
                else:
                    self.templates['no_bug_found'].print()
            elif answer == '0':
                if failing_test_result:
                    self.templates['end_negative'].print()
                else:
                    self.templates['end_positive'].print()
                    earnings += 5000
                break
        self.show_earnings(earnings)

    @staticmethod
    def ask_language():
        languages = []
        for language_file in glob.glob('langs/*.json'):
            with open(language_file) as json_file:
                json_content = json.load(json_file)
                languages.append(Language(**json_content))
        languages.sort(key=lambda language: language.lang)
        Template(
            'Language / Taal',
            '{languages}',
            '[0] Quit / Einde\n',
        ).print(
            languages=[f'[{index + 1}] {language}\n' for index, language in enumerate(languages)]
        )
        answer = Template('', 'Choice / Keuze').input()
        if answer == '0' or not answer.isascii() or not answer.isdecimal() or int(answer) > len(languages):
            return
        return languages[int(answer) - 1]

    @staticmethod
    def ask_game():
        language = UnitTestGame.ask_language()
        games = []
        for case_file in glob.glob('cases/*.json'):
            with open(case_file) as json_file:
                case = json.load(json_file)
                game = UnitTestGame(**case, language=language)
                if game.lang == language.lang:
                    games.append(game)
        games.sort(key=lambda game: game.description)
        language.templates['games'].print(
            games=[f'[{index + 1}] {game.description}\n' for index, game in enumerate(games)]
        )
        answer = language.templates['choice'].input()
        if answer == '0' or not answer.isascii() or not answer.isdecimal() or int(answer) > len(games):
            return
        game = games[int(answer) - 1]
        game.play()


if __name__ == '__main__':
    UnitTestGame.ask_game()

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
    def __init__(self, lang, description, parameters, function, function_generator, special_unit_tests, general_unit_tests, templates):
        self.lang = lang
        self.description = description
        self.parameters = [Variable(**parameter) for parameter in parameters]
        self.function = Variable(**function)
        self.function_generator = function_generator
        self.special_unit_tests = special_unit_tests
        self.general_unit_tests = general_unit_tests
        self.templates = templates

    def generate_functions(self, function_generator, identifier):
        index = len(identifier)
        if index < len(function_generator):
            options = function_generator[index]
            for choice, option in enumerate(options):
                new_function_generator = [option if i == index else elem for i, elem in enumerate(function_generator)]
                new_identifier = identifier + chr(ord('0') + choice if choice < 10 else ord('a') + choice - 10)
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
                raise ValueError(f'Unit test {unit_test} is incorrect, "{test_result.result}" expected.')

    def check_unit_tests_are_needed(self, functions, unit_tests):
        for unit_test in unit_tests:
            all_minus_one_unit_tests = [other_unit_test for other_unit_test in unit_tests if other_unit_test != unit_test]
            almost_perfect_functions = self.find_passing_functions(functions, all_minus_one_unit_tests)
            if len(almost_perfect_functions) == 1:
                raise ValueError(f'Unit test {unit_test} is not needed.')

    def find_shortest_passing_function(self, functions, userdefined_unit_tests):
        functions = self.find_passing_functions(functions, userdefined_unit_tests)
        return min(functions, key=lambda function: function.code_length())

    def convert_to(self, value, datatype):
        CONVERSIONS = {
            'bool': lambda value: True if value.lower() in ['true', 'yes', 'ja', '1'] else (False if value.lower() in ['false', 'no', 'nee', '0'] else bool(value)),
            'int': int,
            'str': str,
        }
        return CONVERSIONS.get(datatype, lambda value: value)(value)

    def ask_unit_test(self):
        arguments = []
        for parameter in self.parameters:
            answer = Template('', parameter.question).input()
            argument = self.convert_to(answer, parameter.datatype)
            arguments.append(argument)
        answer = Template('', self.function.question).input()
        expected = self.convert_to(answer, self.function.datatype)
        return UnitTest(arguments, expected)

    def play(self):
        Template(self.description).print()

        all_functions = list(self.generate_functions(self.function_generator, ''))
        all_special_unit_tests = list(self.generate_unit_tests(self.special_unit_tests))
        all_general_unit_tests = list(self.generate_unit_tests(self.general_unit_tests))
        perfect_function = self.find_perfect_function(all_functions, all_special_unit_tests)
        self.check_unit_tests_are_correct(perfect_function, all_special_unit_tests)
        self.check_unit_tests_are_correct(perfect_function, all_general_unit_tests)
        self.check_unit_tests_are_needed(all_functions, all_special_unit_tests)

        all_templates = {name: Template(*template) for name, template in (Language(self.lang).templates | self.templates).items()}

        all_templates['introduction'].print()
        earnings = 0
        had_early_payout = False
        userdefined_unit_tests = []
        while True:
            if userdefined_unit_tests:
                all_templates['unit_tests'].print(
                    unit_tests=userdefined_unit_tests
                )

            passing_functions = self.find_passing_functions(all_functions, userdefined_unit_tests)
            shortest_passing_function = self.find_shortest_passing_function(all_functions, userdefined_unit_tests)
            failing_general_test_results = shortest_passing_function.failing_test_results(all_general_unit_tests)
            failing_special_test_results = shortest_passing_function.failing_test_results(all_special_unit_tests)
            failing_test_results_to_choose_from = failing_general_test_results if failing_general_test_results else failing_special_test_results
            failing_test_result = random.choice(failing_test_results_to_choose_from) if failing_test_results_to_choose_from else None

            if not had_early_payout and not failing_general_test_results:
                all_templates['early_payout'].print()
                earnings += 5000
                had_early_payout = True

            all_templates['earnings'].print(
                sign_value='-' if earnings < 0 else '',
                absolute_value=abs(earnings)
            )

            all_templates['menu'].print()
            answer = all_templates['choice'].input()

            if answer == '1':
                all_templates['specification'].print()
            elif answer == '2':
                all_templates['contract'].print()
            elif answer == '3':
                all_templates['add_unit_test'].print()
                unit_test = self.ask_unit_test()
                test_result = TestResult(perfect_function, unit_test)
                if test_result.passes:
                    userdefined_unit_tests.append(unit_test)
                    current_passing_functions = self.find_passing_functions(all_functions, userdefined_unit_tests)
                    if len(current_passing_functions) == len(passing_functions):
                        all_templates['useless_unit_test'].print()
                    else:
                        all_templates['useful_unit_test'].print()
                else:
                    all_templates['incorrect_unit_test'].print()
                earnings -= 200
            elif answer == '4':
                all_templates['current_function'].print(shortest_passing_function=shortest_passing_function)
                earnings -= 700
            elif answer == '5':
                all_templates['hint_unit_test'].print(failing_unit_test=failing_test_result.unit_test)
                earnings -= 200
            elif answer == '6':
                all_templates['perfect_function'].print(perfect_function=perfect_function)
                earnings -= 5000
            elif answer == '7':
                all_templates['hand_in_unit_tests'].print()
                if failing_test_result:
                    all_templates['bug_found'].print(arguments=failing_test_result.arguments, result=failing_test_result.result)
                    earnings -= 500
                else:
                    break
            elif answer == '0':
                break
        if failing_test_result:
            all_templates['end_negative'].print()
        else:
            all_templates['end_positive'].print()
            earnings += 5000
        all_templates['end_game'].print(sign_value='-' if earnings < 0 else '', absolute_value=abs(earnings))

    @staticmethod
    def ask_game():
        games = []
        for case_filename in glob.glob('case/*.json'):
            with open(case_filename) as case_filehandle:
                case_content = json.load(case_filehandle)
            games.append(UnitTestGame(**case_content))
        games.sort(key=lambda game: (game.lang, game.description))
        Template(
            'UnitTestGame',
            '{games}',
            '[0] Quit / Einde',
        ).print(games=[f'[{index + 1}] {game.description}\n' for index, game in enumerate(games)])
        answer = Template('', 'Choice / Keuze').input()
        if answer == '0' or not answer.isascii() or not answer.isdecimal() or int(answer) > len(games):
            return
        games[int(answer) - 1].play()


if __name__ == '__main__':
    UnitTestGame.ask_game()

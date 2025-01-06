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
    def __init__(self, case_filename):
        with open(case_filename, 'r', encoding='utf-8') as case_filehandle:
            case_content = json.load(case_filehandle)
        self.__set_attributes(**case_content)

    def __set_attributes(self, lang, description, parameters, function, function_generator, special_unit_tests, general_unit_tests, templates):
        self.lang = lang
        self.description = description
        self.parameters = [Variable(**parameter) for parameter in parameters]
        self.function = Variable(**function)
        self.function_generator = function_generator
        self.special_unit_tests = special_unit_tests
        self.general_unit_tests = general_unit_tests
        self.templates = templates

    def generate_functions(self, function_generator, identifier, general_unit_tests, special_unit_tests):
        index = len(identifier)
        if index < len(function_generator):
            options = function_generator[index]
            for choice, option in enumerate(options):
                new_function_generator = [option if i == index else elem for i, elem in enumerate(function_generator)]
                new_identifier = identifier + chr(ord('0') + choice if choice < 10 else ord('a') + choice - 10)
                yield from self.generate_functions(new_function_generator, new_identifier, general_unit_tests, special_unit_tests)
        else:
            name = f'{self.function.name}_{identifier}'
            parameterlist = ', '.join([parameter.name for parameter in self.parameters])
            definition = f'def {name}({parameterlist}):'
            lines = [definition] + [f'    {line}' for line in function_generator if line]
            code = '\n'.join(lines)
            yield Function(name, code, general_unit_tests, special_unit_tests)

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

    def find_simplest_passing_function(self, functions, userdefined_unit_tests, general_unit_tests, special_unit_tests):
        functions = self.find_passing_functions(functions, userdefined_unit_tests)
        return min(functions, key=lambda function: function.complexity)

    def ask_unit_test(self):
        arguments = [parameter.ask() for parameter in self.parameters]
        expected = self.function.ask()
        return UnitTest(arguments, expected)

    def play(self):
        Template(self.description).print()

        language_templates = Language(self.lang).templates
        all_templates = {name: Template(*template) for name, template in (language_templates | self.templates).items()}

        all_special_unit_tests = list(self.generate_unit_tests(self.special_unit_tests))
        all_general_unit_tests = list(self.generate_unit_tests(self.general_unit_tests))
        
        all_functions = list(self.generate_functions(self.function_generator, '', all_general_unit_tests, all_special_unit_tests))
        perfect_function = self.find_perfect_function(all_functions, all_special_unit_tests)

        self.check_unit_tests_are_needed(all_functions, all_special_unit_tests)
        self.check_unit_tests_are_correct(perfect_function, all_general_unit_tests)

        all_templates['introduction'].print()
        earnings = 0
        had_early_payout = False
        userdefined_unit_tests = []
        while True:
            if userdefined_unit_tests:
                all_templates['unit_tests'].print(unit_tests=userdefined_unit_tests)

            simplest_passing_function = self.find_simplest_passing_function(all_functions, userdefined_unit_tests, all_general_unit_tests, all_special_unit_tests)
            failing_general_test_results = simplest_passing_function.failing_test_results(all_general_unit_tests)
            failing_special_test_results = simplest_passing_function.failing_test_results(all_special_unit_tests)
            failing_test_results_to_choose_from = failing_general_test_results if failing_general_test_results else failing_special_test_results
            failing_test_result = random.choice(failing_test_results_to_choose_from) if failing_test_results_to_choose_from else None

            if not had_early_payout and not failing_general_test_results:
                all_templates['early_payout'].print()
                earnings += 5000
                had_early_payout = True

            all_templates['earnings'].print(sign_value='-' if earnings < 0 else '', absolute_value=abs(earnings))

            all_templates['menu'].print()
            choice = all_templates['choice'].input()

            if choice == '1':
                all_templates['specification'].print()
            elif choice == '2':
                all_templates['contract'].print()
            elif choice == '3':
                all_templates['add_unit_test'].print()
                unit_test = self.ask_unit_test()
                test_result = TestResult(perfect_function, unit_test)
                if test_result.passes:
                    passing_functions_before = self.find_passing_functions(all_functions, userdefined_unit_tests)
                    userdefined_unit_tests.append(unit_test)
                    passing_functions_after = self.find_passing_functions(all_functions, userdefined_unit_tests)
                    if len(passing_functions_after) == len(passing_functions_before):
                        all_templates['useless_unit_test'].print()
                    else:
                        all_templates['useful_unit_test'].print()
                else:
                    all_templates['incorrect_unit_test'].print()
                earnings -= 200
            elif choice == '4':
                all_templates['current_function'].print(simplest_passing_function=simplest_passing_function)
                earnings -= 700
            elif choice == '5':
                all_templates['hint_unit_test'].print(failing_unit_test=failing_test_result.unit_test)
                earnings -= 200
            elif choice == '6':
                all_templates['perfect_function'].print(perfect_function=perfect_function)
                earnings -= 5000
            elif choice == '7':
                all_templates['hand_in_unit_tests'].print()
                if failing_test_result:
                    all_templates['bug_found'].print(test_result=failing_test_result)
                    earnings -= 1000
                else:
                    all_templates['no_bug_found'].print()
            elif choice == '0':
                if failing_test_result:
                    all_templates['end_negative'].print()
                else:
                    all_templates['end_positive'].print()
                    earnings += 5000
                break
            else:
                all_templates['invalid_choice'].print(choice=choice)
        if earnings >= 0:
            all_templates['total_positive'].print(absolute_value=earnings)
        else:
            all_templates['total_negative'].print(absolute_value=abs(earnings))

    @staticmethod
    def game_menu():
        TEMPLATE_GAME_MENU = Template('UnitTestGame', '{games}', '[0] Quit')
        TEMPLATE_INVALID_CHOICE = Template('Invalid choice', 'You have entered invalid choice "{choice}".')
        games = [UnitTestGame(case_filename) for case_filename in glob.glob('case/*.json')]
        games.sort(key=lambda game: (game.lang, game.description))
        while True:
            TEMPLATE_GAME_MENU.print(games=[f'[{index + 1}] {game.description}\n' for index, game in enumerate(games)])
            choice = Template('', 'Choice').input()
            if game := ([None] + [game for index, game in enumerate(games) if str(index + 1) == choice]).pop():
                game.play()
                break
            elif choice == '0':
                break
            else:
                TEMPLATE_INVALID_CHOICE.print(choice=choice)


if __name__ == '__main__':
    UnitTestGame.game_menu()

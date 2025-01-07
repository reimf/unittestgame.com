import random
from abc import ABC, abstractmethod

from function import Function
from unit_test import UnitTest
from test_result import TestResult
from template import Template


class Game(ABC):
    def __init__(self):
        pass

    @property
    @abstractmethod
    def lang(self):
        pass

    @property
    @abstractmethod
    def games_template(self):
        pass

    @property
    @abstractmethod
    def menu_template(self):
        pass

    @property
    @abstractmethod
    def choice_template(self):
        pass

    @property
    @abstractmethod
    def contract_template(self):
        pass

    @property
    @abstractmethod
    def earnings_template(self):
        pass

    @property
    @abstractmethod
    def unit_tests_template(self):
        pass

    @property
    @abstractmethod
    def early_payout_template(self):
        pass

    @property
    @abstractmethod
    def perfect_function_template(self):
        pass

    @property
    @abstractmethod
    def current_function_template(self):
        pass

    @property
    @abstractmethod
    def hint_unit_test_template(self):
        pass

    @property
    @abstractmethod
    def add_unit_test_template(self):
        pass

    @property
    @abstractmethod
    def useless_unit_test_template(self):
        pass

    @property
    @abstractmethod
    def useful_unit_test_template(self):
        pass

    @property
    @abstractmethod
    def incorrect_unit_test_template(self):
        pass

    @property
    @abstractmethod
    def hand_in_unit_tests_template(self):
        pass

    @property
    @abstractmethod
    def bug_found_template(self):
        pass

    @property
    @abstractmethod
    def no_bug_found_template(self):
        pass

    @property
    @abstractmethod
    def end_negative_template(self):
        pass

    @property
    @abstractmethod
    def end_positive_template(self):
        pass

    @property
    @abstractmethod
    def total_negative_template(self):
        pass

    @property
    @abstractmethod
    def total_positive_template(self):
        pass

    @property
    @abstractmethod
    def invalid_choice_template(self):
        pass

    @property
    @abstractmethod
    def description(self):
        pass

    @property
    @abstractmethod
    def introduction_template(self):
        pass

    @property
    @abstractmethod
    def specification_template(self):
        pass

    @property
    @abstractmethod
    def parameters(self):
        pass

    @property
    @abstractmethod
    def unit(self):
        pass

    @property
    @abstractmethod
    def function_generator(self):
        pass

    @property
    @abstractmethod
    def special_unit_tests(self):
        pass

    @abstractmethod
    def general_arguments_generator(self):
        pass

    def generate_functions(self, function_generator, identifier):
        index = len(identifier)
        if index < len(function_generator):
            options = function_generator[index]
            for choice, option in enumerate(options):
                new_function_generator = [option if i == index else elem for i, elem in enumerate(function_generator)]
                new_identifier = identifier + chr(ord('0') + choice if choice < 10 else ord('a') + choice - 10)
                yield from self.generate_functions(new_function_generator, new_identifier)
        else:
            name = f'{self.unit.name}_{identifier}'
            parameterlist = ', '.join([parameter.name for parameter in self.parameters])
            definition = f'def {name}({parameterlist}):'
            lines = [definition] + [f'    {line}' for line in function_generator if line]
            code = '\n'.join(lines)
            yield Function(name, code)

    def generate_unit_tests(self, unit_tests):
        for unit_test in unit_tests:
            arguments = [unit_test[parameter.name] for parameter in self.parameters]
            expected = unit_test[self.unit.name]
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

    def check_unit_tests_are_needed(self, functions, unit_tests):
        for unit_test in unit_tests:
            all_minus_one_unit_tests = [other_unit_test for other_unit_test in unit_tests if other_unit_test != unit_test]
            almost_perfect_functions = self.find_passing_functions(functions, all_minus_one_unit_tests)
            if len(almost_perfect_functions) == 1:
                raise ValueError(
                    f'Unit test {unit_test} is not needed.\n' +
                    str(almost_perfect_functions[0])
                )

    def find_simplest_passing_function(self, functions, userdefined_unit_tests, general_unit_tests, special_unit_tests):
        functions = self.find_passing_functions(functions, userdefined_unit_tests)
        return min(functions, key=lambda function: function.complexity)

    def ask_unit_test(self):
        arguments = [parameter.ask() for parameter in self.parameters]
        expected = self.unit.ask()
        return UnitTest(arguments, expected)

    def play(self):
        Template(self.description).print()

        functions = list(self.generate_functions(self.function_generator, ''))
        perfect_function = self.find_perfect_function(functions, self.special_unit_tests)
        self.check_unit_tests_are_needed(functions, self.special_unit_tests)

        general_unit_tests = [UnitTest(arguments, perfect_function.call_method(arguments)) for arguments in self.general_arguments_generator()]

        for function in functions:
            function.set_complexity(self.special_unit_tests, general_unit_tests)

        self.introduction_template.print()
        earnings = 0
        had_early_payout = False
        userdefined_unit_tests = []
        while True:
            if userdefined_unit_tests:
                self.unit_tests_template.print(unit_tests=userdefined_unit_tests)

            simplest_passing_function = self.find_simplest_passing_function(functions, userdefined_unit_tests, general_unit_tests, self.special_unit_tests)
            failing_general_test_results = simplest_passing_function.failing_test_results(general_unit_tests)
            failing_special_test_results = simplest_passing_function.failing_test_results(self.special_unit_tests)
            failing_test_results_to_choose_from = failing_general_test_results if failing_general_test_results else failing_special_test_results
            failing_test_result = random.choice(failing_test_results_to_choose_from) if failing_test_results_to_choose_from else None

            if not had_early_payout and not failing_general_test_results:
                self.early_payout_template.print()
                earnings += 5000
                had_early_payout = True

            self.earnings_template.print(sign_value='-' if earnings < 0 else '', absolute_value=abs(earnings))

            self.menu_template.print()
            choice = self.choice_template.input()

            if choice == '1':
                self.specification_template.print()
            elif choice == '2':
                self.contract_template.print()
            elif choice == '3':
                self.add_unit_test_template.print()
                unit_test = self.ask_unit_test()
                test_result = TestResult(perfect_function, unit_test)
                if test_result.passes:
                    passing_functions_before = self.find_passing_functions(functions, userdefined_unit_tests)
                    userdefined_unit_tests.append(unit_test)
                    passing_functions_after = self.find_passing_functions(functions, userdefined_unit_tests)
                    if len(passing_functions_after) == len(passing_functions_before):
                        self.useless_unit_test_template.print()
                    else:
                        self.useful_unit_test_template.print()
                else:
                    self.incorrect_unit_test_template.print()
                earnings -= 200
            elif choice == '4':
                self.current_function_template.print(simplest_passing_function=simplest_passing_function)
                earnings -= 700
            elif choice == '5':
                self.hint_unit_test_template.print(failing_unit_test=failing_test_result.unit_test)
                earnings -= 200
            elif choice == '6':
                self.perfect_function_template.print(perfect_function=perfect_function)
                earnings -= 5000
            elif choice == '7':
                self.hand_in_unit_tests_template.print()
                if failing_test_result:
                    self.bug_found_template.print(test_result=failing_test_result)
                    earnings -= 1000
                else:
                    self.no_bug_found_template.print()
            elif choice == '0':
                if failing_test_result:
                    self.end_negative_template.print()
                else:
                    self.end_positive_template.print()
                    earnings += 5000
                break
            else:
                self.invalid_choice_template.print(choice=choice)
        if earnings >= 0:
            self.total_positive_template.print(absolute_value=earnings)
        else:
            self.total_negative_template.print(absolute_value=abs(earnings))

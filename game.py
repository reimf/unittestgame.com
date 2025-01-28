import random

from function import Function
from unit_test import UnitTest
from test_result import TestResult
from template import Template
from form import Form

class Game():
    INITIAL_SCORE = 100
    PENALTY_HINT = 10
    PENALTY_BUG = 20
    PENALTY_END = 100

    def __init__(self):
        pass

    def general_arguments_generator(self):
        raise NotImplementedError()

    def format_score(self, score):
        raise NotImplementedError()

    def generate_functions(self, elements, choices=[]):
        if elements:
            for choice in enumerate(elements[0]):
                yield from self.generate_functions(elements[1:], choices + [choice])
        else:
            yield self.__create_function(choices)

    def __create_function(self, choices):
        id = ''.join([chr(ord('a') + index) for index, _ in choices])
        indented_lines = [f'    {line}' for _, line in choices if line]
        parameterlist = ', '.join([f'{parameter.name}: {parameter.datatype}' for parameter in self.parameters])
        anonymous_name = self.unit.name
        anonymous_definition = f'def {anonymous_name}({parameterlist}) -> {self.unit.datatype}:'
        anonymous_code = '\n'.join([anonymous_definition] + indented_lines)
        unique_name = f'{anonymous_name}_{id}'
        unique_definition = f'def {unique_name}({parameterlist}) -> {self.unit.datatype}:'
        unique_code = '\n'.join([unique_definition] + indented_lines)
        return Function(unique_name, unique_code, anonymous_code)

    def find_passing_functions(self, functions, unit_tests):
        return [function for function in functions if function.fail_count(unit_tests) == 0]

    def find_a_perfect_function(self, functions, unit_tests):
        perfect_functions = self.find_passing_functions(functions, unit_tests)
        if not perfect_functions:
            raise ValueError(f'There is no perfect function for game {self.__class__.__name__}.')
        return random.choice(perfect_functions)

    def check_unit_tests_are_needed(self, functions, unit_tests):
        for unit_test in unit_tests:
            all_minus_one_unit_tests = [other_unit_test for other_unit_test in unit_tests if other_unit_test != unit_test]
            almost_perfect_functions = self.find_passing_functions(functions, all_minus_one_unit_tests)
            if len(almost_perfect_functions) == 1:
                raise ValueError(
                    f'Unit test {unit_test} is not needed.\n' +
                    str(almost_perfect_functions[0])
                )

    def find_worst_passing_function(self, functions, userdefined_unit_tests, quality):
        functions = self.find_passing_functions(functions, userdefined_unit_tests)
        return min(functions, key=lambda function: quality[function])

    def play(self):
        Template(self.description).show(id='last-reply')

        self.functions = list(self.generate_functions(self.function_elements))
        self.perfect_function = self.find_a_perfect_function(self.functions, self.special_unit_tests)
        self.check_unit_tests_are_needed(self.functions, self.special_unit_tests)
        self.general_unit_tests = [UnitTest(arguments, self.perfect_function.call_method(arguments)) for arguments in self.general_arguments_generator()]
        self.quality = {function: function.quality(self.special_unit_tests, self.general_unit_tests) for function in self.functions}
        self.userdefined_unit_tests = []
        self.score = Game.INITIAL_SCORE

        self.introduction_template.show(id='last-reply')
        self.menu()

    def menu(self):
        if self.userdefined_unit_tests:
            self.unit_tests_template.show(id='unit-tests', unit_tests=self.userdefined_unit_tests)
        else:
            self.no_unit_tests_template.show(id='unit-tests')

        worst_passing_function = self.find_worst_passing_function(self.functions, self.userdefined_unit_tests, self.quality)
        self.current_function_template.show(id='current-function', worst_passing_function=worst_passing_function)

        failing_general_test_results = worst_passing_function.failing_test_results(self.general_unit_tests)
        failing_special_test_results = worst_passing_function.failing_test_results(self.special_unit_tests)
        failing_test_results_to_choose_from = failing_general_test_results if failing_general_test_results else failing_special_test_results
        self.failing_test_result = random.choice(failing_test_results_to_choose_from) if failing_test_results_to_choose_from else None

        self.score_template.show(id='score', score=self.format_score(self.score))

        self.menu_template.show(
            id='menu',
            callback=lambda values: self.reply(**values),
            penalty_hint=self.format_score(Game.PENALTY_HINT),
            penalty_bug=self.format_score(Game.PENALTY_BUG),
            penalty_end=self.format_score(Game.PENALTY_END),
        )

    def reply(self, choice):
        if choice == '1':
            self.contract_template.show(
                id='last-reply',
                initial_score=self.format_score(Game.INITIAL_SCORE),
                penalty_bug=self.format_score(Game.PENALTY_BUG),
            )
            self.menu()
        elif choice == '2':
            self.specification_template.show(id='last-reply')
            self.menu()
        elif choice == '3':
            self.add_unit_test_template.show(
                id='add-unit-test', 
                callback=lambda values: self.add_unit_test(values),
                form=Form(*self.parameters, self.unit),
            )
        elif choice == '4':
            self.hint_unit_test_template.show(
                id='last-reply',
                failing_unit_test=self.failing_test_result.unit_test,
                penalty_hint=self.format_score(Game.PENALTY_HINT),
            )
            self.score -= Game.PENALTY_HINT
            self.menu()
        elif choice == '5':
            self.hand_in_unit_tests_template.show(id='last-reply')
            if self.failing_test_result:
                self.bug_found_template.show(
                    id='last-reply',
                    test_result=self.failing_test_result,
                    penalty_bug=self.format_score(Game.PENALTY_BUG),
                )
                self.score -= Game.PENALTY_BUG
                self.menu()
            else:
                self.end()
        elif choice == '0':
            self.end()
        else:
            self.invalid_choice_template.show(id='last-reply', choice=choice)
            self.menu()

    def end(self):
        if self.failing_test_result:
            self.score = 0
            self.score_template.show(id='score', score=self.format_score(self.score))
            self.end_with_bug_template.show(id='last-reply')
        elif self.score == 100:
            self.end_perfect_template.show(id='last-reply', score=self.format_score(self.score))
        elif self.score > 50:
            self.end_positive_template.show(id='last-reply', score=self.format_score(self.score))
        else:
            self.end_negative_template.show(id='last-reply', score=self.format_score(self.score))

    def add_unit_test(self, values):
        arguments = [values[parameter.name] for parameter in self.parameters]
        expected = values[self.unit.name]
        unit_test = UnitTest(arguments, expected)
        test_result = TestResult(self.perfect_function, unit_test)
        if test_result.passes:
            passing_functions_before = self.find_passing_functions(self.functions, self.userdefined_unit_tests)
            self.userdefined_unit_tests.append(unit_test)
            passing_functions_after = self.find_passing_functions(self.functions, self.userdefined_unit_tests)
            if len(passing_functions_after) == len(passing_functions_before):
                self.useless_unit_test_template.show(id='last-reply')
            else:
                self.useful_unit_test_template.show(id='last-reply')
        else:
            self.incorrect_unit_test_template.show(id='last-reply')
        self.menu()

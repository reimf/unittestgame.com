import random

from function import Function
from unit_test import UnitTest
from test_result import TestResult
from template import Template


class Game():
    def __init__(self):
        pass

    def general_arguments_generator(self):
        raise NotImplementedError()

    def format_score(self, score: float):
        raise NotImplementedError()
    
    def generate_functions(self, elements, id):
        current = len(id)
        if current < len(elements):
            element = elements[current]
            for choice, line in enumerate(element):
                new_elements = [line if index == current else elem for index, elem in enumerate(elements)]
                new_id = id + chr(ord('0') + choice if choice < 10 else ord('a') + choice - 10)
                yield from self.generate_functions(new_elements, new_id)
        else:
            parameterlist = ', '.join([f'{parameter.name}: {parameter.datatype}' for parameter in self.parameters])
            definition = f'def {self.unit.name}_{id}({parameterlist}) -> {self.unit.datatype}:'
            lines = [definition] + [f'    {line}' for line in elements if line]
            code = '\n'.join(lines)
            yield Function(code)

    def find_passing_functions(self, functions, unit_tests):
        return [function for function in functions if function.fail_count(unit_tests) == 0]

    def find_a_perfect_function(self, functions, unit_tests):
        perfect_functions = self.find_passing_functions(functions, unit_tests)
        if not perfect_functions:
            raise ValueError(f'There is no perfect function.')
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
        Template(self.description).print()

        functions = list(self.generate_functions(self.function_elements, ''))
        perfect_function = self.find_a_perfect_function(functions, self.special_unit_tests)
        self.check_unit_tests_are_needed(functions, self.special_unit_tests)
        general_unit_tests = [UnitTest(arguments, perfect_function.call_method(arguments)) for arguments in self.general_arguments_generator()]
        quality = {function: function.quality(self.special_unit_tests, general_unit_tests) for function in functions}

        self.introduction_template.print()

        INITIAL_SCORE = 1.0
        PENALTY_HINT = 0.1
        PENALTY_BUG = 0.2
        PENALTY_END = 1.0
        score = INITIAL_SCORE
        userdefined_unit_tests = []
        while True:
            if userdefined_unit_tests:
                self.unit_tests_template.print(unit_tests=userdefined_unit_tests)
            else:
                self.no_unit_tests_template.print()

            worst_passing_function = self.find_worst_passing_function(functions, userdefined_unit_tests, quality)
            self.current_function_template.print(worst_passing_function=worst_passing_function)

            failing_general_test_results = worst_passing_function.failing_test_results(general_unit_tests)
            failing_special_test_results = worst_passing_function.failing_test_results(self.special_unit_tests)
            failing_test_results_to_choose_from = failing_general_test_results if failing_general_test_results else failing_special_test_results
            failing_test_result = random.choice(failing_test_results_to_choose_from) if failing_test_results_to_choose_from else None

            self.score_template.print(score=self.format_score(score))

            self.menu_template.print(
                penalty_hint=self.format_score(PENALTY_HINT),
                penalty_bug=self.format_score(PENALTY_BUG),
                penalty_end=self.format_score(PENALTY_END),
            )
            choice = self.choice_template.input()

            if choice == '1':
                self.specification_template.print()
            elif choice == '2':
                self.contract_template.print(
                    initial_score=self.format_score(INITIAL_SCORE),
                    penalty_bug=self.format_score(PENALTY_BUG),
                )
            elif choice == '3':
                self.add_unit_test_template.print()
                arguments = [parameter.ask() for parameter in self.parameters]
                expected = self.unit.ask()
                unit_test = UnitTest(arguments, expected)
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
            elif choice == '4':
                self.current_function_template.print(worst_passing_function=worst_passing_function)
            elif choice == '5':
                self.hint_unit_test_template.print(
                    failing_unit_test=failing_test_result.unit_test,
                    penalty_hint=self.format_score(PENALTY_HINT),
                )
                score -= PENALTY_HINT
            elif choice == '6':
                self.hand_in_unit_tests_template.print()
                if failing_test_result:
                    self.bug_found_template.print(
                        test_result=failing_test_result,
                        penalty_bug=self.format_score(PENALTY_BUG),
                    )
                    score -= PENALTY_BUG
                else:
                    self.no_bug_found_template.print()
                    break
            elif choice == '0':
                break
            else:
                self.invalid_choice_template.print(choice=choice)
        if failing_test_result:
            self.end_negative_template.print()
            score = 0.0
        else:
            self.end_positive_template.print(score=self.format_score(score))
        if score >= 0.0:
            self.total_positive_template.print(score=self.format_score(score))
        else:
            self.total_negative_template.print(score=self.format_score(score))

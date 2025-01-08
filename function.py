import re

from test_result import TestResult


class Function:
    def __init__(self, name, code):
        self.name = name
        self.code = code
        self.method = self.__add_method()

    def __add_method(self):
        namespace = {}
        exec(self.code, globals(), namespace)
        return namespace[self.name]

    def call_method(self, arguments):
        try:
            return self.method(*arguments)
        except Exception as error:
            return type(error).__name__

    def set_quality(self, special_unit_tests, general_unit_tests):
        self.quality = (
            -self.fail_count(special_unit_tests),
            -self.fail_count(general_unit_tests),
            len(self.code)
        )

    def test_results(self, unit_tests):
        return [TestResult(self, unit_test) for unit_test in unit_tests]

    def failing_test_results(self, unit_tests):
        return [test_result for test_result in self.test_results(unit_tests) if not test_result.passes]

    def fail_count(self, unit_tests):
        return len(self.failing_test_results(unit_tests))

    def __str__(self):
        anonymous_code = re.sub(r'^(def \w+)_[0-9a-z]+', r'\1', self.code)
        return '\n'.join('| ' + line for line in anonymous_code.split('\n'))

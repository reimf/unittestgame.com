from testresult import TestResult


class Candidate:
    def __init__(self, name, code):
        self.name = name
        self.code = code
        self.method = self.add_method()

    def add_method(self):
        namespace = {}
        exec(self.code, {}, namespace)
        return namespace[self.name]

    def call_method(self, arguments):
        try:
            return self.method(*arguments)
        except Exception as error:
            return type(error).__name__

    def test_results(self, unit_tests):
        return [TestResult(self, unit_test) for unit_test in unit_tests]

    def failing_test_results(self, unit_tests):
        return [test_result for test_result in self.test_results(unit_tests) if not test_result.passes]

    def fail_count(self, unit_tests):
        return len(self.failing_test_results(unit_tests))

    def code_length(self):
        return len(self.code)

    def __str__(self):
        return '\n'.join('| ' + line for line in self.code.split('\n'))

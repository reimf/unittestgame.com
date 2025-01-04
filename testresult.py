class TestResult:
    def __init__(self, function, unit_test):
        self.function = function
        self.unit_test = unit_test
        self.result = function.call_method(unit_test.arguments)
        self.passes = self.result == unit_test.expected

    def __str__(self):
        return f'{self.unit_test.arguments} -> {self.result}'

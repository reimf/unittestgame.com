class TestResult:
    def __init__(self, candidate, unit_test):
        self.candidate = candidate
        self.unit_test = unit_test
        self.value = candidate.call_method(unit_test.arguments)
        self.passes = self.value == unit_test.expected

    def arguments(self):
        return self.unit_test.arguments

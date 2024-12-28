class UnitTest:
    def __init__(self, arguments, expected):
        self.arguments = arguments
        self.expected = expected

    def __str__(self):
        return f'{self.arguments} -> {self.expected}'
    
class UnitTest:
    def __init__(self, arguments, expected):
        self.arguments = arguments
        self.expected = expected

    def __str__(self):
        return f'assert average_speed{self.arguments} == "{self.expected}"'
    
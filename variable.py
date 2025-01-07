class Variable:
    CONVERSIONS = {
        'bool': lambda value: False if value.lower() in ['false', 'no', 'nee', '0'] else bool(value),
        'int': int,
        'str': str,
    }

    def __init__(self, name, datatype, template):
        self.name = name
        self.datatype = datatype
        self.template = template

    def ask(self):
        answer = self.template.input()
        return Variable.CONVERSIONS[self.datatype](answer)

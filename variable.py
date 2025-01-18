class Variable:
    def __init__(self, name, datatype, template):
        self.name = name
        self.datatype = datatype
        self.template = template

    def ask(self):
        answer = self.template.input()
        if self.datatype == 'bool':
            return answer.lower() not in ['false', 'no', 'nee', '0'] and bool(answer)
        if self.datatype == 'int':
            return int(answer)
        return str(answer)

class Variable:
    def __init__(self, label, datatype, name):
        self.label = label
        self.datatype = datatype
        self.name = name

    def convert(self, value: str):
        if self.datatype == 'str':
            return value
        if self.datatype == 'bool':
            return {'True': True, 'False': False}.get(value, None)
        if self.datatype == 'int':
            try:
                return int(value)
            except ValueError:
                return None
        raise ValueError(f'Unknown datatype {self.datatype}')

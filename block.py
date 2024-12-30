class Block:
    @staticmethod
    def generate_lines(some_list):
        some_list = list(some_list) + [None]
        buffer = []
        for element in some_list:
            if type(element) == str and element[-1] != '\n':
                buffer.append(element)
            else:
                if buffer:
                    yield ' '.join(buffer)
                    buffer.clear()
                if element == None:
                    pass
                elif type(element) in (tuple, list):
                    yield from Block.generate_lines(element)
                elif type(element) == str:
                    yield element.strip('\n')
                else:
                    yield from str(element).split('\n')

    @staticmethod
    def indent(line):
        return f'  {line}'

    @staticmethod
    def show(title, *block):
        MAX_LINE_LENGTH = 80
        print()
        print(title)
        for line in Block.generate_lines(block):
            while line:
                if len(line) <= MAX_LINE_LENGTH:
                    pos = MAX_LINE_LENGTH
                else:
                    pos = line.rfind(' ', 0, MAX_LINE_LENGTH)
                    if pos == -1:
                        pos = MAX_LINE_LENGTH
                print(Block.indent(line[:pos]))
                line = line[pos + 1:]

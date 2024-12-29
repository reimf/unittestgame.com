class Block:
    @staticmethod
    def generate_lines(some_list):
        for element in some_list:
            if type(element) in (tuple, list):
                yield from Block.generate_lines(element)
            else:
                yield from str(element).split('\n')

    @staticmethod
    def indent(line):
        return f'  {line}'

    @staticmethod
    def show(*block):
        lines = list(Block.generate_lines(block))
        print()
        print(lines[0])
        for line in lines[1:]:
            print(Block.indent(line))

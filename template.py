import re

class Template:
    def __init__(self, title, *block):
        self.title = title
        self.block = block

    def __replace_placeholders(self, element, **values):
        if match := re.search(r'^\{(\w+)\}$', element):
            placeholder = match.group(1)
            return values[placeholder]
        while match := re.search(r'\{(\w+)\}', element):
            placeholder = match.group(1)
            element = element.replace(f'{{{placeholder}}}', str(values[placeholder]))
        return element

    def __generate_paragraphs(self, some_list, **values):
        some_list = list(some_list) + [None]
        buffer = []
        for element in some_list:
            if type(element) == str:
                element = self.__replace_placeholders(element, **values)
            if type(element) == str and element[-1] != '\n':
                buffer.append(element)
            else:
                if buffer:
                    yield ' '.join(buffer)
                    buffer.clear()
                if element == None:
                    pass
                elif type(element) in (tuple, list):
                    yield from self.__generate_paragraphs(element)
                elif type(element) == str:
                    yield element.strip('\n')
                else:
                    yield from str(element).split('\n')

    def fullstring(self, **values):
        paragraphs = [self.title] + list(self.__generate_paragraphs(self.block, **values))
        lines = []
        MAX_LINE_LENGTH = 80
        for index, paragraph in enumerate(paragraphs):
            while paragraph:
                if index > 0:
                    paragraph = '  ' + paragraph
                if len(paragraph) <= MAX_LINE_LENGTH:
                    pos = MAX_LINE_LENGTH
                else:
                    pos = paragraph.rfind(' ', 0, MAX_LINE_LENGTH)
                    if pos == -1:
                        pos = MAX_LINE_LENGTH
                lines.append(paragraph[:pos])
                paragraph = paragraph[pos + 1:]
        return '\n'.join(lines)

    def print(self, **values):
        print()
        print(self.fullstring(**values))

    def input(self, **values):
        return input(self.fullstring(**values) + ': ')

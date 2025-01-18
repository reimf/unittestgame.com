import re


class Template:
    def __init__(self, *block):
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
            if type(element) == str:
                buffer.append(element)
            if type(element) != str or element.endswith('\n'):
                yield ' '.join(buffer).strip('\n')
                buffer.clear()
            if element == None or type(element) == str:
                pass
            elif type(element) in (tuple, list):
                yield from self.__generate_paragraphs(element)
            else:
                yield from str(element).split('\n')

    def __fullstring(self, **values):
        paragraphs = list(self.__generate_paragraphs(self.block, **values))
        lines = []
        MAX_LINE_LENGTH = 80
        for paragraph in paragraphs:
            while paragraph:
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
        print('\n' + self.__fullstring(**values))

    def input(self, **values):
        return input(self.__fullstring(**values) + ': ')

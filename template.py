from browser import Browser
from terminal import Terminal
from variable import Variable
from form import Form

class Template:
    def __init__(self, *block):
        self.block = block

    def add(self, *block):
        self.block = self.block + block

    def __replace_placeholders(self, element, **values):
        pos_open, pos_close = element.find('{'), element.find('}')
        if pos_open == 0 and pos_close == len(element) - 1:
            return values[element[1:-1]]
        while pos_open >= 0 and pos_close > pos_open:
            placeholder = element[pos_open + 1:pos_close]
            element = element[:pos_open] + str(values[placeholder]) + element[pos_close + 1:]
            pos_open, pos_close = element.find('{'), element.find('}')
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
            elif type(element) == Form:
                yield element
            elif type(element) in (tuple, list):
                yield from self.__generate_paragraphs(element)
            else:
                yield from str(element).split('\n')

    def __generate_lines(self, max_line_length, **values):
        paragraphs = self.__generate_paragraphs(self.block, **values)
        for paragraph in paragraphs:
            if type(paragraph) == str:
                while paragraph:
                    pos = paragraph.rfind(' ', 0, max_line_length)
                    if len(paragraph) <= max_line_length or pos == -1:
                        pos = max_line_length
                    yield paragraph[:pos]
                    paragraph = paragraph[pos + 1:]
            else:
                yield paragraph

    def show(self, id=None, callback=None, **values):
        lines = self.__generate_lines(max_line_length=80, **values)
        if id and Browser.is_available():
            Browser.show(lines, callback, id)
        else:
            Terminal.show(lines, callback)

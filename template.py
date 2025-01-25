from browser import Browser

class Template:
    def __init__(self, *block):
        self.block = block

    def __replace_placeholders(self, element, **values):
        import re

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

    def __fullstring(self, max_line_length, **values):
        paragraphs = list(self.__generate_paragraphs(self.block, **values))
        lines = []
        for paragraph in paragraphs:
            while paragraph:
                if len(paragraph) <= max_line_length:
                    pos = max_line_length
                else:
                    pos = paragraph.rfind(' ', 0, max_line_length)
                    if pos == -1:
                        pos = max_line_length
                lines.append(paragraph[:pos])
                paragraph = paragraph[pos + 1:]
        return '\n'.join(lines)

    def print(self, id=None, **values):
        if id and Browser.is_available():
            content = self.__fullstring(max_line_length=50, **values)
            Browser.set_text(id, content)
        else:
            content = self.__fullstring(max_line_length=80, **values)
            print('\n' + content)

    def input(self, **values):
        content = self.__fullstring(max_line_length=80, **values)
        return input(content + ': ')

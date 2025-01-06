import json

class Language:
    def __init__(self, lang):
        with open(f'lang/{lang}.json', 'r', encoding='utf-8') as language_filehandle:
            content = json.load(language_filehandle)
        self.templates = content['templates']

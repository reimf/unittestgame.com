import json

class Language:
    def __init__(self, lang):
        with open(f'lang/{lang}.json') as language_filehandle:
            content = json.load(language_filehandle)
        self.templates = content['templates']

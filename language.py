from template import Template

class Language:
    def __init__(self, lang, fullname, templates):
        self.lang = lang
        self.fullname = fullname
        self.templates = {name: Template(*template) for name, template in templates.items()}

    def __str__(self):
        return self.fullname

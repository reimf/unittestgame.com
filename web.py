try:
    from pyscript import document
except ModuleNotFoundError:
    document = None


class Web:
    def has_document():
        return bool(document)
    
    def set_text(id, content):
        if document:
            document.querySelector('#' + id).innerText = content

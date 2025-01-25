try:
    from pyscript import document
except ModuleNotFoundError:
    document = None


class Browser:
    def is_available():
        return document is not None

    def set_text(id, content):
        element = document.querySelector('#' + id)
        element.innerText = content
        element.style.display = 'block'

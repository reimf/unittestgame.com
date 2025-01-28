try:
    from pyscript import document
    from pyodide.ffi.wrappers import create_proxy
except ModuleNotFoundError:
    document = None
from variable import Variable
from form import Form

class Browser:
    def is_available():
        return document is not None

    def show(lines, callback, id):
        old_block_element = document.querySelector('#' + id)
        if old_block_element:
            old_block_element.remove()

        block_element = document.createElement('div')
        block_element.id = id

        sidebar_element = document.querySelector('#sidebar')
        sidebar_element.appendChild(block_element)

        for line in lines:
            if type(line) == Form:
                form = line
                form_element = document.createElement('div')
                for variable in form.variables:
                    input_element = document.createElement('input')
                    input_element.type = 'text'
                    input_element.name = variable.name
                    input_element.autocomplete = 'off'

                    label_element = document.createElement('label')
                    label_element.innerText = variable.label
                    label_element.appendChild(input_element)

                    form_element.appendChild(label_element)

                button_element = document.createElement('button')
                button_element.innerText = 'Go!'
                form_element.appendChild(button_element)

                def invoke(event):
                    values = {
                        variable.name: variable.convert(document.querySelector(f'input[name="{variable.name}"]').value)
                        for variable in form.variables
                    }
                    block_element.remove()
                    callback(values)

                button_element.addEventListener('click', create_proxy(invoke))

                block_element.appendChild(form_element)
            else:
                text_element = document.createElement('div')
                text_element.innerText = line

                block_element.appendChild(text_element)

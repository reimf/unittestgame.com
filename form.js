"use strict";
class Form {
    constructor(variables, callback) {
        this.variables = variables;
        this.callback = callback;
    }
    toHtmlElement() {
        const form = document.createElement('form');
        form.addEventListener('submit', event => {
            event.preventDefault();
            const target = event.target;
            const section = target.closest('section');
            const values = this.variables.map(variable => {
                const input = section.querySelector(`input[name="${variable.name}"]`);
                input.disabled = true;
                return variable.value(input);
            });
            const button = section.querySelector('input[type="submit"]');
            button.remove();
            this.callback(...values);
        });
        for (const variable of this.variables)
            form.appendChild(variable.toHtmlElement());
        const button = document.createElement('input');
        button.type = 'submit';
        button.innerText = 'Go!';
        form.appendChild(button);
        return form;
    }
}

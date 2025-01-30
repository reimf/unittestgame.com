"use strict";
class Form {
    constructor(variables, callback) {
        this.variables = variables;
        this.callback = callback;
    }
    toHtml() {
        const callbackProxy = (event) => {
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
        };
        const inputs = this.variables.map(variable => variable.toHtml());
        const button = new Html('input').type('submit').value('Go!');
        const block = new Html('div').appendChild(button);
        return new Html('form').onSubmit(callbackProxy).appendChildren(inputs).appendChild(block);
    }
}

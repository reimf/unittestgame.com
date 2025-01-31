"use strict";
class Form {
    constructor(variables, buttonText, callback) {
        this.variables = variables;
        this.buttonText = buttonText;
        this.callback = callback;
    }
    toHtml() {
        const callbackProxy = (event) => {
            event.preventDefault();
            const target = event.target;
            const section = target.closest('section');
            const values = this.variables.map(variable => {
                const input = section.querySelector(`input[name="${variable.name}"]`);
                console.log(input);
                input.disabled = true;
                return variable.value(input);
            });
            const button = section.querySelector('input[type="submit"]');
            button.remove();
            this.callback(...values);
        };
        const inputs = this.variables.map(variable => variable.toHtml());
        const button = new Html('input').type('submit').value(this.buttonText);
        const block = new Html('div').appendChild(button);
        return new Html('form').on('submit', callbackProxy).appendChildren(inputs).appendChild(block);
    }
}

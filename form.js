"use strict";
class Form extends Html {
    constructor(variables, buttonText, callback) {
        super('form');
        this.variables = variables;
        this.callback = callback;
        const inputs = variables.map(variable => variable.toHtml());
        const button = new Input().type('submit').value(buttonText);
        const block = new Div().appendChild(button);
        this.on('submit', event => this.submit(event)).appendChildren(inputs).appendChild(block);
    }
    submit(event) {
        event.preventDefault();
        const target = event.target;
        const section = target.closest('section');
        const values = this.variables.map(variable => {
            const input = section.querySelector(`input[name="${variable.name}"]`);
            return variable.value(input);
        });
        this.callback(values);
    }
}

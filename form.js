"use strict";
class Form extends Html {
    constructor(variables, buttonText, callback) {
        super('form');
        const callbackProxy = (event) => {
            event.preventDefault();
            const target = event.target;
            const section = target.closest('section');
            const values = variables.map(variable => {
                const input = section.querySelector(`input[name="${variable.name}"]`);
                input.disabled = true;
                return variable.value(input);
            });
            const button = section.querySelector('input[type="submit"]');
            button.remove();
            callback(...values);
        };
        const inputs = variables.map(variable => variable.toHtml());
        const button = new Input().type('submit').value(buttonText);
        const block = new Div().appendChild(button);
        this.on('submit', callbackProxy).appendChildren(inputs).appendChild(block);
    }
}

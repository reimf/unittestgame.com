"use strict";
class Form extends Html {
    constructor(variables, submitButtonText, callbackSubmit, cancelButtonText, callbackCancel) {
        super('form');
        this.variables = variables;
        this.callbackSubmit = callbackSubmit;
        const inputs = variables.map(variable => variable.toHtml());
        const submitButton = new Input().type('submit').value(submitButtonText);
        const cancelButton = new Button(cancelButtonText).on('click', event => callbackCancel(event));
        const block = new Div().appendChildren([submitButton, cancelButton]);
        this.appendChildren(inputs).appendChild(block).on('submit', event => this.callbackSubmit(event));
    }
}

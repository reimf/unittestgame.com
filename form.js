"use strict";
class Form extends Html {
    constructor(variables, submitButtonText, callbackSubmit, cancelButtonText, callbackCancel) {
        super('form');
        this.variables = variables;
        this.callbackSubmit = callbackSubmit;
        const inputs = variables.map(variable => variable.toHtml());
        const submitButton = new Input('submit').value(submitButtonText);
        const cancelButton = new Button(cancelButtonText, event => callbackCancel(event));
        const buttonBlock = new Div().appendChildren([submitButton, cancelButton]);
        this.appendChildren(inputs).appendChild(buttonBlock).on('submit', event => this.callbackSubmit(event));
    }
}

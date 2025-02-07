"use strict";
class Form extends Html {
    constructor(variables, submitButtonText, callbackSubmit, cancelButtonText, callbackCancel) {
        super('form');
        this.callbackSubmit = callbackSubmit;
        const inputs = variables.map(variable => variable.toHtml());
        const submitButton = new Input('submit');
        submitButton.value(submitButtonText);
        const cancelButton = new Button(cancelButtonText, event => callbackCancel(event));
        const buttonBlock = new Div();
        buttonBlock.appendChild(submitButton);
        buttonBlock.appendChild(cancelButton);
        this.appendChildren(inputs);
        this.appendChild(buttonBlock);
        this.on('submit', event => this.callbackSubmit(event));
    }
}

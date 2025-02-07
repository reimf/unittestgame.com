class Form extends Html {
    public constructor(variables: Variable[], submitButtonText: string, private callbackSubmit: () => void, cancelButtonText: string, callbackCancel: () => void) {
        super('form')
        const inputs = variables.map(variable => variable.toHtml())
        const submitButton = new Input('submit')
        submitButton.value(submitButtonText)
        const cancelButton = new Button(cancelButtonText, () => callbackCancel())
        const buttonBlock = new Div()
        buttonBlock.appendChild(submitButton)
        buttonBlock.appendChild(cancelButton)
        this.appendChildren(inputs)
        this.appendChild(buttonBlock)
        this.on('submit', () => this.callbackSubmit())
    }
}
